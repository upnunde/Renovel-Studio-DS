export type RadiusToken = {
  label: string
  class: string
  token: string
  px: number
  rem: string
  formula: string
}

export const RADIUS_MIN_PX = 2 as const
export const RADIUS_MAX_PX = 20 as const

const BASE_RADIUS_PX = 12
const BASE_RADIUS_REM = "0.75rem"

/** --radius: 0.75rem (12px) · 2px · 4px 단위 · 최대 20px · full 9999px */
export const RADIUS_SCALE: RadiusToken[] = [
  {
    label: "xs_2",
    class: "rounded-xs",
    token: "--radius-xs",
    px: 2,
    rem: "0.125rem",
    formula: "0.125rem",
  },
  {
    label: "sm_4",
    class: "rounded-sm",
    token: "--radius-sm",
    px: 4,
    rem: "0.25rem",
    formula: "0.25rem",
  },
  {
    label: "md_8",
    class: "rounded-md",
    token: "--radius-md",
    px: 8,
    rem: "0.5rem",
    formula: "0.5rem",
  },
  {
    label: "lg_12",
    class: "rounded-lg",
    token: "--radius-lg",
    px: 12,
    rem: BASE_RADIUS_REM,
    formula: "var(--radius)",
  },
  {
    label: "xl_16",
    class: "rounded-xl",
    token: "--radius-xl",
    px: 16,
    rem: "1rem",
    formula: "1rem",
  },
  {
    label: "2xl_20",
    class: "rounded-2xl",
    token: "--radius-2xl",
    px: 20,
    rem: "1.25rem",
    formula: "1.25rem",
  },
  {
    label: "full_9999",
    class: "rounded-full",
    token: "--radius-full",
    px: 9999,
    rem: "9999px",
    formula: "9999px",
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
