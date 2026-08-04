#!/usr/bin/env node
/**
 * Style Dictionary 러너 — light/dark CSS를 tokens/dist/sd/ 에 생성.
 *   node tokens/sd-build.mjs
 * 생성 후 build.mjs 의 검증 로직으로 tokens.css 와 0-drift 확인은 sd-verify.mjs 참고.
 */
import StyleDictionary from "style-dictionary";
import { makeConfig } from "./style-dictionary.config.mjs";

for (const mode of ["light", "dark"]) {
  const sd = new StyleDictionary(makeConfig(mode));
  await sd.buildAllPlatforms();
}
console.log("→ tokens/dist/sd/tokens.light.css + tokens.dark.css (Style Dictionary)");
