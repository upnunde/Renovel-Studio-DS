import type { FontFamilyToken, TypographyToken } from "./typography-tokens"

/** heading1_32_700 · body3_14_500 */
export function formatTypographyToken(token: TypographyToken): string {
  return `${token.group}${token.rank}_${token.fontSizePx}_${token.fontWeight}`
}

/** sans · font-sans · Pretendard Variable · 100–900 */
export function formatFontFamily(token: FontFamilyToken): string {
  return `${token.label} · ${token.token} · ${token.family} · ${token.weightRange}`
}
