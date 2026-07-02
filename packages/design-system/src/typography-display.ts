import type { FontFamilyToken, TypographyToken } from "./typography-tokens"

/** text-body3_500 · body3_500 · 14/20px · 500 */
export function formatTypographyToken(token: TypographyToken): string {
  return `${token.label} · ${token.className} · ${token.fontSizePx}/${token.lineHeightPx}px · ${token.fontWeight}`
}

/** sans · font-sans · Pretendard Variable · 100–900 */
export function formatFontFamily(token: FontFamilyToken): string {
  return `${token.label} · ${token.token} · ${token.family} · ${token.weightRange}`
}
