#!/usr/bin/env node
/**
 * OS-중립 토큰 JSON → 플랫폼 산출물 빌더 + 검증기.
 *
 *   node tokens/build.mjs verify   # 생성값이 현재 tokens.css와 일치하는지만 검사 (기본)
 *   node tokens/build.mjs css      # dist/tokens.generated.css 생성 (참고 산출물)
 *   node tokens/build.mjs swift    # dist/Tokens.generated.swift 생성 (iOS 참고)
 *   node tokens/build.mjs xml      # dist/tokens_generated.xml 생성 (AOS 참고)
 *   node tokens/build.mjs all      # 위 전부
 *
 * 정본: primitives.json + semantic.json + semantic-spacing.json.
 * 이 스크립트는 tokens.css를 "덮어쓰지 않는다" — 산출물은 dist/ 에만 쓰고,
 * verify가 현재 src/tokens.css 값과 0-drift 임을 보장한다. (리노벨 영향 0의 근거)
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "..", "src");
const DIST = join(HERE, "dist");

const read = (f) => JSON.parse(readFileSync(join(HERE, f), "utf8"));
const primitives = read("primitives.json");
const semantic = read("semantic.json");
const semanticSpacing = read("semantic-spacing.json");

// ── 원시 토큰: "group.key" → 값. px 문자열은 rem/px 둘 다 얻도록 원시 px 보관.
const prim = new Map(); // key(dot) -> { css, raw }
function walkPrimitives(node, path) {
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith("$")) continue;
    const p = path ? `${path}.${k}` : k;
    if (v && typeof v === "object" && "$value" in v) {
      prim.set(p, v.$value);
    } else if (v && typeof v === "object") {
      walkPrimitives(v, p);
    }
  }
}
walkPrimitives(primitives, "");

// 참조 {a.b} → 대상 stem. 시맨틱 참조는 CSS에서 var(--a-b)로, 원시 참조는 실제 값으로 해석.
const dot2var = (s) => "--" + s.replace(/\./g, "-");

// px 문자열 → rem (CSS용). "16px" -> "1rem", "1px"는 그대로(획), "0.5px"도 그대로.
function pxToRem(px) {
  const n = parseFloat(px);
  // tokens.css 관례: space/radius/icon-size는 rem, stroke(0.5px)·space-px(1px)는 px 유지
  return `${n / 16}rem`;
}

/**
 * 참조 문자열 해석.
 *  - "{grayscale.140}"  → 원시: 실제 hex (semantic의 최종 CSS는 var() 체인이지만,
 *    tokens.css는 semantic이 var(--grayscale-140) 형태이므로 CSS 출력은 var() 유지)
 * CSS 출력 규칙(현재 tokens.css와 동일):
 *  - semantic 토큰 값이 원시를 가리키면 var(--grayscale-140)
 *  - semantic 토큰 값이 다른 semantic을 가리키면 var(--card) 등
 * 따라서 참조는 항상 var(dot2var) 로 변환하면 tokens.css와 일치한다.
 */
function refToCssVar(ref) {
  const m = /^\{(.+)\}$/.exec(ref.trim());
  if (!m) return null;
  return `var(${dot2var(m[1])})`;
}

// ── 참조를 최종 원시값(hex/px/리터럴)까지 해석. iOS/AOS 상수 생성용.
// {muted}(mode) → {grayscale.10} → "#f8f8fc". alias 체인·모드 재귀.
function resolveToRaw(ref, mode, seen = new Set()) {
  const m = /^\{(.+)\}$/.exec(ref.trim());
  if (!m) return ref; // 리터럴 (transparent, shadow 문자열 등)
  const path = m[1];
  if (seen.has(path)) return "CYCLE";
  seen.add(path);
  if (prim.has(path)) return prim.get(path); // 원시 도달
  const tok = semantic[path] ?? semanticSpacing[path];
  if (!tok) return `UNRESOLVED(${path})`;
  let v = tok.$value;
  if (mode === "dark" && tok.$extensions?.mode?.dark !== undefined) v = tok.$extensions.mode.dark;
  if (typeof v === "string" && v.startsWith("{")) return resolveToRaw(v, mode, seen);
  return v;
}

// alpha 접미사 파싱: "{primary}/80" → { ref:"{primary}", alpha:0.8 }
function splitAlpha(expr) {
  const m = /^(\{[^}]+\}|[a-z]+)(?:\/(\d+(?:\.\d+)?))?$/.exec(expr.trim());
  if (!m) return { base: expr, alpha: null };
  return { base: m[1], alpha: m[2] != null ? parseFloat(m[2]) / 100 : null };
}

// hex(#rrggbb) → 컴포넌트. rgb(a b c / d%)도 처리.
function parseColor(raw) {
  if (raw.startsWith("#")) {
    const h = raw.slice(1);
    const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    return { r: parseInt(n.slice(0, 2), 16), g: parseInt(n.slice(2, 4), 16), b: parseInt(n.slice(4, 6), 16), a: 1 };
  }
  const m = /rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\/\s*(\d+(?:\.\d+)?)%\s*\)/.exec(raw);
  if (m) return { r: +m[1], g: +m[2], b: +m[3], a: +m[4] / 100 };
  return null;
}

const round3 = (n) => Math.round(n * 1000) / 1000;

// SwiftUI Color(.sRGB, red:green:blue:opacity:)
function swiftColor(raw, alpha) {
  if (raw === "transparent") return "Color.clear";
  const c = parseColor(raw);
  if (!c) return null;
  const a = alpha != null ? round3(alpha * c.a) : round3(c.a);
  return `Color(.sRGB, red: ${round3(c.r / 255)}, green: ${round3(c.g / 255)}, blue: ${round3(c.b / 255)}, opacity: ${a})`;
}

// Android #AARRGGBB
function androidColor(raw, alpha) {
  if (raw === "transparent") return "#00000000";
  const c = parseColor(raw);
  if (!c) return null;
  const a = Math.round((alpha != null ? alpha * c.a : c.a) * 255);
  const hx = (n) => n.toString(16).padStart(2, "0");
  return `#${hx(a)}${hx(c.r)}${hx(c.g)}${hx(c.b)}`.toUpperCase();
}

// camelCase 변환: "background-muted-foreground" → "backgroundMutedForeground"
const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const snake = (s) => s.replace(/-/g, "_");

// ── 모드별 semantic 값 추출 (css 표현). raw 값(shadow 등 참조 아님)도 처리.
function semanticCssValue(token, mode) {
  let v = token.$value;
  if (mode === "dark" && token.$extensions?.mode?.dark !== undefined) {
    v = token.$extensions.mode.dark;
  }
  if (typeof v === "string" && v.startsWith("{")) return refToCssVar(v);
  return v; // shadow 문자열 등 리터럴
}

// ── CSS 생성 (참고 산출물). :root = light, .dark = dark override(값이 다른 것만)
function buildCss() {
  const lightLines = [];
  const darkLines = [];

  // primitives (항상 :root, 모드 무관) — 순서: tokens.css와 동일 그룹 순
  // radius/stroke/icon/motion/space
  lightLines.push(`  --radius: ${pxToRem(prim.get("radius.base"))};`);
  lightLines.push(`  --stroke-width: ${prim.get("stroke-width")};`);
  for (const s of ["xs", "sm", "md", "lg", "xl"])
    lightLines.push(`  --icon-size-${s}: ${pxToRem(prim.get(`icon-size.${s}`))};`);
  lightLines.push(`  --icon-stroke-width: ${prim.get("icon-stroke-width")};`);
  for (const d of ["short", "medium", "long"])
    lightLines.push(`  --motion-duration-${d}: ${prim.get(`motion-duration.${d}`)};`);
  for (const [name, key] of [["standard", "standard"], ["emphasized-decelerate", "emphasized-decelerate"], ["emphasized-accelerate", "emphasized-accelerate"]]) {
    const b = prim.get(`motion-easing.${key}`);
    lightLines.push(`  --motion-easing-${name}: cubic-bezier(${b.join(", ")});`);
  }
  for (const k of ["px", "0-5", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20"]) {
    const px = prim.get(`space.${k}`);
    const val = (k === "px") ? px : pxToRem(px);
    lightLines.push(`  --space-${k}: ${val};`);
  }
  // semantic spacing (참조)
  for (const [name, tok] of Object.entries(semanticSpacing)) {
    if (name.startsWith("$")) continue;
    lightLines.push(`  --${name.replace(/^space-/, "space-")}: ${refToCssVar(tok.$value)};`.replace("--space-space-", "--space-"));
  }
  // primitive color scales
  for (const scale of ["grayscale", "brand", "success", "warning", "info", "error"])
    for (const [k] of Object.entries(primitives[scale]).filter(([kk]) => !kk.startsWith("$")))
      lightLines.push(`  --${scale}-${k}: ${prim.get(`${scale}.${k}`)};`);
  lightLines.push(`  --white: ${prim.get("white")};`);
  lightLines.push(`  --black: ${prim.get("black")};`);
  for (const scale of ["white-opacity", "black-opacity"])
    for (const [k] of Object.entries(primitives[scale]).filter(([kk]) => !kk.startsWith("$")))
      lightLines.push(`  --${scale}-${k}: ${prim.get(`${scale}.${k}`)};`);

  // semantic (light + dark override)
  for (const [name, tok] of Object.entries(semantic)) {
    if (name.startsWith("$")) continue;
    lightLines.push(`  --${name}: ${semanticCssValue(tok, "light")};`);
    const dv = semanticCssValue(tok, "dark");
    if (dv !== semanticCssValue(tok, "light"))
      darkLines.push(`  --${name}: ${dv};`);
  }

  return `:root {\n${lightLines.join("\n")}\n}\n\n.dark {\n${darkLines.join("\n")}\n}\n`;
}

// ── 현재 tokens.css 파싱: --var → 값 (주석/공백 무시, :root 와 .dark 분리)
function parseTokensCss() {
  const css = readFileSync(join(SRC, "tokens.css"), "utf8");
  const root = {}, dark = {};
  const rootBlock = css.slice(css.indexOf(":root"), css.indexOf(".dark"));
  const darkBlock = css.slice(css.indexOf(".dark"));
  const grab = (block, out) => {
    for (const m of block.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g))
      out[m[1]] = m[2].trim().replace(/\s+/g, " ");
  };
  grab(rootBlock, root);
  grab(darkBlock, dark);
  return { root, dark };
}

// 생성 CSS도 같은 파서로 정규화해서 값 비교
function parseGeneratedCss(cssText) {
  const root = {}, dark = {};
  const rootBlock = cssText.slice(cssText.indexOf(":root"), cssText.indexOf(".dark"));
  const darkBlock = cssText.slice(cssText.indexOf(".dark"));
  const grab = (block, out) => {
    for (const m of block.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g))
      out[m[1]] = m[2].trim().replace(/\s+/g, " ");
  };
  grab(rootBlock, root);
  grab(darkBlock, dark);
  return { root, dark };
}

function verify() {
  const current = parseTokensCss();
  const generated = parseGeneratedCss(buildCss());

  // .dark 의미 정규화: tokens.css는 .dark에 override만; 생성도 override만. 비교 시
  // "effective dark" = {...root, ...dark} 로 만들어 비교하면 override 누락/추가도 잡힘.
  const effCurrent = { root: current.root, dark: { ...current.root, ...current.dark } };
  const effGen = { root: generated.root, dark: { ...generated.root, ...generated.dark } };

  const problems = [];
  for (const mode of ["root", "dark"]) {
    const cur = effCurrent[mode], gen = effGen[mode];
    const keys = new Set([...Object.keys(cur), ...Object.keys(gen)]);
    for (const k of keys) {
      if (!(k in cur)) { problems.push(`[${mode}] 생성에만 있음: ${k} = ${gen[k]}`); continue; }
      if (!(k in gen)) { problems.push(`[${mode}] tokens.css에만 있음: ${k} = ${cur[k]}`); continue; }
      if (cur[k] !== gen[k]) problems.push(`[${mode}] 값 불일치: ${k}\n    tokens.css: ${cur[k]}\n    generated : ${gen[k]}`);
    }
  }
  if (problems.length) {
    console.error(`❌ DRIFT ${problems.length}건 — JSON 정본이 현재 tokens.css와 다릅니다:\n`);
    console.error(problems.join("\n"));
    process.exit(1);
  }
  const n = Object.keys(effCurrent.root).length;
  console.log(`✅ 0-DRIFT — 생성 CSS가 현재 tokens.css와 값 단위로 완전 일치 (root ${n}개 변수 · dark override 포함).`);
  console.log("   → 이 JSON을 정본으로 삼아도 웹 산출물은 불변. 리노벨(v0.1.22 pin) 영향 0.");
}

function writeCss() {
  mkdirSync(DIST, { recursive: true });
  const header = `/* AUTO-GENERATED from tokens/*.json — DO NOT EDIT. 정본: tokens/primitives.json + semantic.json */\n`;
  writeFileSync(join(DIST, "tokens.generated.css"), header + buildCss());
  console.log("→ dist/tokens.generated.css");
}

// iOS 완전 산출물 — semantic 색(light/dark 동적) + spacing + radius + typography
function writeSwift() {
  mkdirSync(DIST, { recursive: true });
  const L = [];
  L.push("// AUTO-GENERATED from tokens/*.json — DO NOT EDIT");
  L.push("// 정본: packages/design-system/tokens/*.json · 재생성: node tokens/build.mjs swift");
  L.push("import SwiftUI");
  L.push("");
  L.push("// MARK: - Dynamic color helper (light/dark)");
  L.push("public extension Color {");
  L.push("    /// UITraitCollection 기반 light/dark 자동 전환");
  L.push("    static func dsDynamic(light: Color, dark: Color) -> Color {");
  L.push("        #if canImport(UIKit)");
  L.push("        return Color(UIColor { $0.userInterfaceStyle == .dark ? UIColor(dark) : UIColor(light) })");
  L.push("        #else");
  L.push("        return light");
  L.push("        #endif");
  L.push("    }");
  L.push("}");
  L.push("");

  // Semantic colors — 각 토큰을 light/dark 원시값으로 해석해 동적 Color
  L.push("public enum DSColor {");
  for (const [name, tok] of Object.entries(semantic)) {
    if (name.startsWith("$") || tok.$type !== "color") continue;
    // 토큰 이름으로 해석해야 resolver가 semantic 조회 → 모드별 $extensions.dark 적용
    const lightRaw = resolveToRaw(`{${name}}`, "light");
    const darkRaw = resolveToRaw(`{${name}}`, "dark");
    const ls = swiftColor(lightRaw, null), ds = swiftColor(darkRaw, null);
    if (!ls || !ds) continue;
    if (ls === ds) L.push(`    public static let ${camel(name)} = ${ls}`);
    else L.push(`    public static let ${camel(name)} = Color.dsDynamic(light: ${ls}, dark: ${ds})`);
  }
  L.push("}");
  L.push("");

  // Spacing (pt = px 원시값)
  L.push("public enum DSSpacing {");
  for (const k of ["px", "0-5", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20"])
    L.push(`    public static let s${snake(k)}: CGFloat = ${parseFloat(prim.get(`space.${k}`))}`);
  L.push("}");
  L.push("");

  // Radius / stroke / icon
  L.push("public enum DSRadius {");
  L.push(`    public static let base: CGFloat = ${parseFloat(prim.get("radius.base"))}`);
  L.push("}");
  L.push("public enum DSIconSize {");
  for (const s of ["xs", "sm", "md", "lg", "xl"])
    L.push(`    public static let ${s}: CGFloat = ${parseFloat(prim.get(`icon-size.${s}`))}`);
  L.push("}");
  L.push("");

  // Typography (pt). lineSpacing = lineHeight - fontSize.
  const typo = read("typography.json");
  L.push("public struct DSTextStyle {");
  L.push("    public let size: CGFloat");
  L.push("    public let lineHeight: CGFloat");
  L.push("    public let weight: Font.Weight");
  L.push("    public var lineSpacing: CGFloat { max(0, lineHeight - size) }");
  L.push("}");
  L.push("public enum DSTypography {");
  const wmap = { 400: ".regular", 500: ".medium", 700: ".bold" };
  for (const [name, tok] of Object.entries(typo)) {
    if (name.startsWith("$")) continue;
    const v = tok.$value;
    L.push(`    public static let ${camel(name)} = DSTextStyle(size: ${parseFloat(v.fontSize)}, lineHeight: ${parseFloat(v.lineHeight)}, weight: ${wmap[v.fontWeight]})`);
  }
  L.push("}");

  writeFileSync(join(DIST, "Tokens.generated.swift"), L.join("\n") + "\n");
  console.log("→ dist/Tokens.generated.swift (semantic 동적색 + spacing + radius + typography)");
}

// AOS 완전 산출물 — semantic 색 values/(light) + values-night/(dark) + dimens
function writeXml() {
  mkdirSync(join(DIST, "res", "values"), { recursive: true });
  mkdirSync(join(DIST, "res", "values-night"), { recursive: true });

  const colorXml = (mode) => {
    const L = ['<?xml version="1.0" encoding="utf-8"?>', `<!-- AUTO-GENERATED from tokens/*.json (${mode}) — DO NOT EDIT -->`, "<resources>"];
    for (const [name, tok] of Object.entries(semantic)) {
      if (name.startsWith("$") || tok.$type !== "color") continue;
      const raw = resolveToRaw(`{${name}}`, mode);
      const argb = androidColor(raw, null);
      if (argb) L.push(`    <color name="ds_${snake(name)}">${argb}</color>`);
    }
    L.push("</resources>");
    return L.join("\n") + "\n";
  };
  writeFileSync(join(DIST, "res", "values", "ds_colors.xml"), colorXml("light"));
  writeFileSync(join(DIST, "res", "values-night", "ds_colors.xml"), colorXml("dark"));

  // dimens (dp) + radius + icon
  const dl = ['<?xml version="1.0" encoding="utf-8"?>', "<!-- AUTO-GENERATED from tokens/*.json — DO NOT EDIT -->", "<resources>"];
  for (const k of ["px", "0-5", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20"])
    dl.push(`    <dimen name="ds_space_${snake(k)}">${parseFloat(prim.get(`space.${k}`))}dp</dimen>`);
  dl.push(`    <dimen name="ds_radius_base">${parseFloat(prim.get("radius.base"))}dp</dimen>`);
  for (const s of ["xs", "sm", "md", "lg", "xl"])
    dl.push(`    <dimen name="ds_icon_${s}">${parseFloat(prim.get(`icon-size.${s}`))}dp</dimen>`);
  dl.push("</resources>");
  writeFileSync(join(DIST, "res", "values", "ds_dimens.xml"), dl.join("\n") + "\n");

  console.log("→ dist/res/values/ds_colors.xml + values-night/ds_colors.xml + ds_dimens.xml");
}

// ── 참조 무결성: semantic/spacing/spec 의 모든 {ref}가 실재 토큰을 가리키는지
function verifyRefs() {
  const knownSemantic = new Set(Object.keys(semantic).filter((k) => !k.startsWith("$")));
  const knownSpacing = new Set(Object.keys(semanticSpacing).filter((k) => !k.startsWith("$")));
  const problems = [];

  const resolvable = (ref) => {
    const path = ref.replace(/^\{|\}$/g, "").split("/")[0]; // {x}/80 → x
    if (prim.has(path)) return true;
    if (knownSemantic.has(path)) return true;
    if (knownSpacing.has(path)) return true;
    if (path === "transparent") return true;
    return false;
  };

  const scan = (obj, file) => {
    JSON.stringify(obj, (k, v) => {
      // $-접두 키(문서·주석)는 실제 참조가 아니므로 검사 제외
      if (k.startsWith("$")) return undefined;
      if (typeof v === "string") {
        for (const m of v.matchAll(/\{[^}]+\}/g)) {
          const ref = m[0];
          if (!resolvable(ref)) problems.push(`[${file}] 미해결 참조: ${ref} (in "${k}")`);
        }
      }
      return v;
    });
  };
  scan(semantic, "semantic.json");
  scan(semanticSpacing, "semantic-spacing.json");

  // specs/ 전체 스캔
  const specsDir = join(HERE, "..", "specs");
  let specCount = 0;
  if (existsSync(specsDir)) {
    for (const f of readdirSync(specsDir).filter((f) => f.endsWith(".spec.json"))) {
      try { scan(JSON.parse(readFileSync(join(specsDir, f), "utf8")), f); specCount++; } catch (e) {
        problems.push(`[${f}] JSON 파싱 실패: ${e.message}`);
      }
    }
  }

  if (problems.length) {
    console.error(`❌ 참조 무결성 ${problems.length}건 실패:\n` + [...new Set(problems)].join("\n"));
    process.exit(1);
  }
  console.log(`✅ 참조 무결성 — 모든 {ref}가 실재 토큰을 가리킴 (dangling 0). 스펙 ${specCount}개 검사.`);
}

const cmd = process.argv[2] || "verify";
if (cmd === "verify") { verify(); verifyRefs(); }
else if (cmd === "refs") verifyRefs();
else if (cmd === "css") writeCss();
else if (cmd === "swift") writeSwift();
else if (cmd === "xml") writeXml();
else if (cmd === "all") { verify(); writeCss(); writeSwift(); writeXml(); }
else { console.error(`unknown command: ${cmd}`); process.exit(1); }
