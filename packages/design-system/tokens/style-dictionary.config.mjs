/**
 * Style Dictionary 5.x 설정 — 표준 파이프라인 옵션.
 *
 * 기존 커스텀 빌더(build.mjs)와 병행한다:
 *  - build.mjs = 정본 검증기(0-drift) + iOS/AOS 동적색 생성 (우리 자산, 유지)
 *  - Style Dictionary = 업계 표준 파이프라인으로 동일 JSON에서 CSS/기타 생성 (호환성 증명)
 *
 * 우리 JSON 특성 대응:
 *  - 키가 이미 CSS 변수 stem (background-muted) → name 변환 최소화
 *  - light = $value, dark = $extensions.mode.dark → light/dark 2개 플랫폼으로 분리 생성
 *  - 참조 {grayscale.140} → SD DTCG 참조로 그대로 해석
 *
 * 실행: node tokens/sd-build.mjs (SD를 코드로 구동 — CLI 대신 register+build API)
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import StyleDictionary from "style-dictionary";

const HERE = dirname(fileURLToPath(import.meta.url));
const PRIM = JSON.parse(readFileSync(join(HERE, "primitives.json"), "utf8"));

/**
 * 이름 충돌 해소 preprocessor.
 * primitives 의 색 스케일 success/warning/info 는 최상위 키가 semantic 의 동명 시맨틱
 * 토큰(success/warning/info)과 겹친다. SD 는 소스를 단일 트리로 병합하므로 스케일이
 * 시맨틱 값에 덮여 {success.500} 참조가 깨진다. 정본 JSON(파일 분리)은 옳으므로 건드리지 않고,
 * SD 트리에서만 시맨틱 토큰의 {family.NNN} 참조를 primitives.json 실제 원시값으로 인라인한다.
 * (해당 3개 계열만 outputReferences 미적용 — 나머지 참조 체인은 유지)
 */
const COLLIDING = new Set(["success", "warning", "info"]);
const scaleVal = (fam, step) => PRIM?.[fam]?.[step]?.$value;
StyleDictionary.registerPreprocessor({
  name: "ds-resolve-collisions",
  preprocessor: (dictionary) => {
    const inline = (node) => {
      if (!node || typeof node !== "object") return;
      for (const field of ["$value"]) {
        if (typeof node[field] === "string") {
          const m = /^\{([a-z]+)\.(\d+)\}$/.exec(node[field]);
          if (m && COLLIDING.has(m[1])) node[field] = scaleVal(m[1], m[2]) ?? node[field];
        }
      }
      const dk = node.$extensions?.mode?.dark;
      if (typeof dk === "string") {
        const m = /^\{([a-z]+)\.(\d+)\}$/.exec(dk);
        if (m && COLLIDING.has(m[1])) node.$extensions.mode.dark = scaleVal(m[1], m[2]) ?? dk;
      }
      for (const k of Object.keys(node)) if (!k.startsWith("$")) inline(node[k]);
    };
    inline(dictionary);
    return dictionary;
  },
});

// dark 값을 $value로 승격하는 preprocessor (mode=dark 빌드에서만)
StyleDictionary.registerPreprocessor({
  name: "dark-mode",
  preprocessor: (dictionary) => {
    const walk = (node) => {
      if (node && typeof node === "object") {
        if ("$value" in node && node.$extensions?.mode?.dark !== undefined) {
          node.$value = node.$extensions.mode.dark;
        }
        for (const k of Object.keys(node)) if (!k.startsWith("$")) walk(node[k]);
      }
    };
    walk(dictionary);
    return dictionary;
  },
});

// CSS 변수명 = 토큰 경로를 kebab (grayscale.140 → grayscale-140, background-muted 유지)
StyleDictionary.registerTransform({
  name: "name/ds-kebab",
  type: "name",
  transform: (token) => token.path.join("-"),
});

// px → rem (space/radius/icon-size). stroke(0.5px)·space-px(1px)는 px 유지.
StyleDictionary.registerTransform({
  name: "size/ds-rem",
  type: "value",
  filter: (token) => token.$type === "dimension" && typeof token.$value === "string" && token.$value.endsWith("px"),
  transform: (token) => {
    const n = parseFloat(token.$value);
    const keepPx = token.path.includes("px") || token.$value === "0.5px";
    return keepPx ? token.$value : `${n / 16}rem`;
  },
});

const TRANSFORMS = ["name/ds-kebab", "size/ds-rem"];

/** light/dark 2개 destination을 만드는 config 팩토리 */
export function makeConfig(mode) {
  return {
    source: ["tokens/primitives.json", "tokens/semantic.json", "tokens/semantic-spacing.json"],
    preprocessors: mode === "dark" ? ["ds-resolve-collisions", "dark-mode"] : ["ds-resolve-collisions"],
    platforms: {
      css: {
        transforms: TRANSFORMS,
        buildPath: "tokens/dist/sd/",
        files: [
          {
            destination: mode === "dark" ? "tokens.dark.css" : "tokens.light.css",
            format: "css/variables",
            options: { selector: mode === "dark" ? ".dark" : ":root", outputReferences: true },
          },
        ],
      },
    },
  };
}
