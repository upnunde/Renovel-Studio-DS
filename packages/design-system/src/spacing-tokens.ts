export type SpacingToken = {
  token: string
  /** 직관적 라벨 — token_px */
  label: string
  variable: string
  px: number
  rem: string
  className: string
}

/** 디자인 시스템 간격 정본 — 1px~2px · 4px 단위 · 최대 40px */
export const SPACING_MIN_PX = 1 as const
export const SPACING_MAX_PX = 40 as const

export const SPACING_SCALE: SpacingToken[] = [
  { token: "px", label: "px_1", variable: "--space-px", px: 1, rem: "1px", className: "w-px" },
  { token: "0.5", label: "0.5_2", variable: "--space-0-5", px: 2, rem: "0.125rem", className: "w-0.5" },
  { token: "1", label: "1_4", variable: "--space-1", px: 4, rem: "0.25rem", className: "w-1" },
  { token: "2", label: "2_8", variable: "--space-2", px: 8, rem: "0.5rem", className: "w-2" },
  { token: "3", label: "3_12", variable: "--space-3", px: 12, rem: "0.75rem", className: "w-3" },
  { token: "4", label: "4_16", variable: "--space-4", px: 16, rem: "1rem", className: "w-4" },
  { token: "5", label: "5_20", variable: "--space-5", px: 20, rem: "1.25rem", className: "w-5" },
  { token: "6", label: "6_24", variable: "--space-6", px: 24, rem: "1.5rem", className: "w-6" },
  { token: "7", label: "7_28", variable: "--space-7", px: 28, rem: "1.75rem", className: "w-7" },
  { token: "8", label: "8_32", variable: "--space-8", px: 32, rem: "2rem", className: "w-8" },
  { token: "9", label: "9_36", variable: "--space-9", px: 36, rem: "2.25rem", className: "w-9" },
  { token: "10", label: "10_40", variable: "--space-10", px: 40, rem: "2.5rem", className: "w-10" },
]

export function spacingClass(token: string, property: "p" | "px" | "py" | "gap" | "m" = "gap") {
  return `${property}-${token}` as const
}

export function formatSpacingToken(token: SpacingToken): string {
  return `${token.label} · ${token.className} · ${token.px}px · ${token.rem}`
}
