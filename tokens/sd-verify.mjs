#!/usr/bin/env node
/**
 * Style Dictionary 산출물 검증 — SD가 생성한 light/dark CSS가
 * 정본 src/tokens.css 와 "최종 원시값" 단위로 일치하는지 확인.
 *
 * build.mjs verify 는 우리 커스텀 빌더의 0-drift 를 보장하고,
 * 이 스크립트는 "표준 파이프라인(SD)도 동일 결과를 낸다"를 독립 증명한다.
 *
 * 비교 방식: 양쪽 CSS를 파싱 → var() 체인을 원시값까지 해석 → 값 비교.
 * (SD는 semantic 만 다루므로, tokens.css 의 primitive-직접 변수는 비교 대상에서 제외하고
 *  SD가 실제로 생성한 변수 집합에 대해서만 대조한다.)
 *
 *   node tokens/sd-verify.mjs   (사전에 sd-build.mjs 실행 필요)
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "..", "src");
const SD = join(HERE, "dist", "sd");

if (!existsSync(join(SD, "tokens.light.css"))) {
  console.error("❌ SD 산출물 없음. 먼저: node tokens/sd-build.mjs");
  process.exit(1);
}

// selector { ... } 블록을 중괄호 매칭으로 정확히 추출 (파일 끝까지 슬라이스 금지)
function extractBlock(css, selector) {
  const at = css.indexOf(selector);
  if (at < 0) return "";
  const open = css.indexOf("{", at);
  if (open < 0) return "";
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") { depth--; if (depth === 0) return css.slice(open + 1, i); }
  }
  return "";
}

// --var: value; 를 맵으로 (주석 제거)
function parseVars(css, selector) {
  const block = extractBlock(css, selector);
  const out = {};
  for (const m of block.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    out[m[1]] = m[2].replace(/\/\*[\s\S]*?\*\//g, "").trim().replace(/\s+/g, " ");
  }
  return out;
}

// 값 정규화: 포맷 차이 흡수 (SD cubicBezier 배열, 공백/대소문자)
function normalize(v) {
  let s = v.trim().toLowerCase().replace(/\s+/g, " ");
  // cubic-bezier(a, b, c, d) ↔ a,b,c,d
  const cb = /^cubic-bezier\(([^)]+)\)$/.exec(s);
  if (cb) s = cb[1].replace(/\s/g, "");
  s = s.replace(/,\s+/g, ",");
  return s;
}

// var(--x) 체인을 원시값까지 해석
function resolve(map, val, seen = new Set()) {
  const m = /^var\((--[a-z0-9-]+)\)$/.exec(val);
  if (!m) return val;
  if (seen.has(m[1])) return "CYCLE";
  seen.add(m[1]);
  if (map[m[1]] === undefined) return `UNRESOLVED(${m[1]})`;
  return resolve(map, map[m[1]], seen);
}

// 정본 tokens.css
const tokensCss = readFileSync(join(SRC, "tokens.css"), "utf8");
const canonRoot = parseVars(tokensCss, ":root");
const canonDarkRaw = parseVars(tokensCss, ".dark");
const canonDark = { ...canonRoot, ...canonDarkRaw }; // effective dark

// SD 산출물
const sdLight = parseVars(readFileSync(join(SD, "tokens.light.css"), "utf8"), ":root");
const sdDark = parseVars(readFileSync(join(SD, "tokens.dark.css"), "utf8"), ".dark");

const problems = [];
function compare(label, canonMap, sdMap) {
  for (const k of Object.keys(sdMap)) {
    if (canonMap[k] === undefined) continue; // primitive-직접 변수 등 SD 범위 외 스킵
    const a = normalize(resolve(canonMap, canonMap[k]));
    const b = normalize(resolve(sdMap, sdMap[k]));
    if (a !== b) problems.push(`[${label}] ${k}\n    tokens.css: ${a}\n    SD        : ${b}`);
  }
}
compare("light", canonRoot, sdLight);
compare("dark", canonDark, sdDark);

const checked = Object.keys(sdLight).filter((k) => canonRoot[k] !== undefined).length;
if (problems.length) {
  console.error(`❌ SD DRIFT ${problems.length}건 — Style Dictionary 산출물이 tokens.css와 다릅니다:\n`);
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`✅ SD 0-DRIFT — Style Dictionary 생성 CSS가 tokens.css와 최종 원시값 단위로 일치 (light+dark ${checked}개 시맨틱 변수).`);
console.log("   → 표준 파이프라인(SD)과 커스텀 빌더가 동일 결과. 정본 JSON 하나로 둘 다 구동 가능.");
