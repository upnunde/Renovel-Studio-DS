export type RadiusToken = {
  label: string
  class: string
  token: string
  px: number
  rem: string
  formula: string
}

const BASE_RADIUS_PX = 10
const BASE_RADIUS_REM = "0.625rem"

/** --radius: 0.625rem (10px) 기준 계산 */
export const RADIUS_SCALE: RadiusToken[] = [
  {
    label: "sm_6",
    class: "rounded-sm",
    token: "--radius-sm",
    px: 6,
    rem: "0.375rem",
    formula: "calc(var(--radius) * 0.6)",
  },
  {
    label: "md_8",
    class: "rounded-md",
    token: "--radius-md",
    px: 8,
    rem: "0.5rem",
    formula: "calc(var(--radius) * 0.8)",
  },
  {
    label: "lg_10",
    class: "rounded-lg",
    token: "--radius-lg",
    px: 10,
    rem: BASE_RADIUS_REM,
    formula: "var(--radius)",
  },
  {
    label: "xl_14",
    class: "rounded-xl",
    token: "--radius-xl",
    px: 14,
    rem: "0.875rem",
    formula: "calc(var(--radius) * 1.4)",
  },
  {
    label: "2xl_18",
    class: "rounded-2xl",
    token: "--radius-2xl",
    px: 18,
    rem: "1.125rem",
    formula: "calc(var(--radius) * 1.8)",
  },
  {
    label: "3xl_22",
    class: "rounded-3xl",
    token: "--radius-3xl",
    px: 22,
    rem: "1.375rem",
    formula: "calc(var(--radius) * 2.2)",
  },
  {
    label: "4xl_26",
    class: "rounded-4xl",
    token: "--radius-4xl",
    px: 26,
    rem: "1.625rem",
    formula: "calc(var(--radius) * 2.6)",
  },
]

export function formatRadiusToken(token: RadiusToken): string {
  return `${token.label} · ${token.class} · ${token.px}px`
}

export const RADIUS_BASE = {
  px: BASE_RADIUS_PX,
  rem: BASE_RADIUS_REM,
  variable: "--radius",
} as const
