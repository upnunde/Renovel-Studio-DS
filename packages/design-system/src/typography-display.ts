import type { FontFamilyToken, TypographyScaleToken } from "./typography-tokens"
import { TYPOGRAPHY_SCALE } from "./typography-tokens"

/** text-xl · xl_20_28 · 20/28px */
export function formatTypographyToken(token: TypographyScaleToken): string {
  return `${token.label} · ${token.name} · ${token.fontSizePx}/${token.lineHeightPx}px`
}

/** font-medium · 500 */
export function formatFontWeight(name: string, value: number): string {
  const short = name.replace("font-", "")
  return `${short}_${value} · ${name} · ${value}`
}

/** sans · font-sans · Pretendard Variable · 100–900 */
export function formatFontFamily(token: FontFamilyToken): string {
  return `${token.label} · ${token.token} · ${token.family} · ${token.weightRange}`
}

export function resolveTypographyByClass(className: string): TypographyScaleToken | undefined {
  const match = className.match(/\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl)\b/)
  if (!match) return undefined
  return TYPOGRAPHY_SCALE.find((t) => t.name === `text-${match[1]}`)
}

/** text-sm font-medium · sm_14_20 · 14/20px */
export function formatTypographyClasses(classes: string): string {
  const token = resolveTypographyByClass(classes)
  const weight = classes.match(/\bfont-(normal|medium|semibold|bold)\b/)?.[0]
  if (!token) return classes
  const weightSuffix = weight ? ` · ${weight}` : ""
  return `${token.label} · ${classes}${weightSuffix} · ${token.fontSizePx}/${token.lineHeightPx}px`
}

/** text-xl font-bold · xl_20_28 · 20/28px */
export function formatTypographyRecommended(recommended: string, fontSizePx: number, lineHeightPx: number): string {
  const token = resolveTypographyByClass(recommended)
  const label = token?.label ?? `${fontSizePx}_${lineHeightPx}`
  return `${label} · ${recommended} · ${fontSizePx}/${lineHeightPx}px`
}
