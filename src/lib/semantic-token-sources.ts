/** tokens.css :root / .dark 시맨틱 → 원시 토큰 매핑 (정본) */
const LIGHT: Record<string, string> = {
  "--canvas": "white",
  "--canvas-muted": "grayscale-15",
  "--background": "white",
  "--foreground": "grayscale-140",
  "--background-muted": "grayscale-10",
  "--background-muted-foreground": "grayscale-140",
  // --card / --card-muted / --popover 계열: ALIAS_LIGHT 체인으로 해석 — 여기 중복 선언 안 함
  "--inverse": "grayscale-130",
  "--inverse-foreground": "white",
  "--inverse-muted": "grayscale-110",
  "--inverse-muted-foreground": "white",
  "--foreground-muted": "grayscale-110",
  "--foreground-placeholder": "grayscale-70",
  "--primary": "brand-500",
  "--primary-foreground": "white",
  "--primary-container": "brand-100",
  "--primary-container-foreground": "brand-500",
  // --secondary: ALIAS_LIGHT 체인(--background-muted) 으로 해석 — 중복 선언 안 함
  "--secondary-foreground": "grayscale-140",
  "--secondary-container": "grayscale-110",
  "--secondary-container-foreground": "white",
  "--muted": "grayscale-10",
  "--muted-foreground": "grayscale-90",
  "--muted-strong": "grayscale-20",
  "--muted-strong-foreground": "grayscale-140",
  "--accent": "brand-50",
  "--accent-foreground": "brand-600",
  "--destructive": "error-500",
  "--destructive-foreground": "white",
  "--destructive-container": "error-100",
  "--destructive-container-foreground": "error-600",
  "--dim-10": "black-opacity-10",
  "--dim-20": "black-opacity-60",
  "--dim-30": "black-opacity-80",
  "--dim-40": "black-opacity-90",
  "--divider": "grayscale-15",
  "--divider-strong": "grayscale-30",
  "--border-strong": "grayscale-140",
  "--border-inverse": "white",
  "--success": "success-500",
  "--success-foreground": "white",
  "--warning": "warning-500",
  "--warning-foreground": "white",
  "--info": "info-500",
  "--info-foreground": "white",
  "--border": "grayscale-15",
  "--border-emphasis": "grayscale-20",
  "--border-medium": "grayscale-30",
  // --input: ALIAS_LIGHT 체인(--border-emphasis) 으로 해석
  // --disabled: ALIAS_LIGHT 체인(--background-muted), --disabled-border: 체인(--border) 으로 해석
  "--disabled-foreground": "grayscale-60",
  "--ring": "brand-500",
  "--chart-1": "brand-500",
  "--chart-2": "brand-400",
  "--chart-3": "brand-600",
  "--chart-4": "brand-300",
  "--chart-5": "brand-700",
}

const DARK: Record<string, string> = {
  "--canvas": "grayscale-150",
  "--canvas-muted": "grayscale-150",
  "--background": "grayscale-140",
  "--foreground": "grayscale-10",
  "--background-muted": "grayscale-130",
  "--background-muted-foreground": "grayscale-10",
  // --card / --card-muted / --popover 계열: ALIAS_DARK 체인으로 해석 — 여기 중복 선언 안 함
  "--inverse": "grayscale-10",
  "--inverse-foreground": "grayscale-140",
  "--inverse-muted": "grayscale-20",
  "--inverse-muted-foreground": "grayscale-140",
  "--foreground-muted": "grayscale-40",
  "--foreground-placeholder": "grayscale-80",
  "--primary": "brand-500",
  "--primary-foreground": "white",
  "--primary-container": "brand-800",
  "--primary-container-foreground": "brand-100",
  // --secondary: 체인(--background-muted), --secondary-container: 체인(--background-muted) 으로 해석 (ALIAS_DARK)
  "--secondary-foreground": "grayscale-10",
  "--secondary-container-foreground": "white",
  "--muted": "grayscale-130",
  "--muted-foreground": "grayscale-70",
  "--muted-strong": "grayscale-120",
  "--muted-strong-foreground": "grayscale-10",
  "--accent": "brand-800",
  "--accent-foreground": "brand-100",
  "--destructive": "error-400",
  "--destructive-foreground": "white",
  "--destructive-container": "error-800",
  "--destructive-container-foreground": "error-100",
  "--dim-10": "black-opacity-10",
  "--dim-20": "black-opacity-60",
  "--dim-30": "black-opacity-80",
  "--dim-40": "black-opacity-90",
  "--divider": "grayscale-130",
  "--divider-strong": "grayscale-110",
  "--border-strong": "grayscale-10",
  "--border-inverse": "grayscale-140",
  "--success": "success-400",
  "--success-foreground": "white",
  "--warning": "warning-400",
  "--warning-foreground": "white",
  "--info": "info-400",
  "--info-foreground": "white",
  "--border": "grayscale-130",
  "--border-emphasis": "grayscale-110",
  "--border-medium": "grayscale-120",
  // --input: ALIAS_DARK 체인(--border-emphasis) 으로 해석
  "--disabled": "grayscale-120",
  "--disabled-foreground": "grayscale-70",
  "--disabled-border": "grayscale-110",
  "--ring": "brand-400",
  "--chart-1": "brand-400",
  "--chart-2": "brand-500",
  "--chart-3": "brand-300",
  "--chart-4": "brand-600",
  "--chart-5": "brand-200",
}

/** tokens.css 시맨틱 alias — Maps to는 최종 원시 토큰명만 표시 */
const ALIAS_LIGHT: Record<string, string> = {
  "--secondary": "--background-muted",
  "--canvas-muted-foreground": "--background-muted-foreground",
  "--card": "--background",
  "--card-foreground": "--foreground",
  "--card-muted": "--background-muted",
  "--card-muted-foreground": "--background-muted-foreground",
  "--popover": "--card",
  "--popover-foreground": "--card-foreground",
  "--disabled": "--background-muted",
  "--disabled-border": "--border",
  "--foreground-disabled": "--disabled-foreground",
  "--input": "--border-emphasis",
}

const ALIAS_DARK: Record<string, string> = {
  "--secondary": "--background-muted",
  "--canvas-muted-foreground": "--background-muted-foreground",
  "--card": "--background",
  "--card-foreground": "--foreground",
  "--card-muted": "--background-muted",
  "--card-muted-foreground": "--background-muted-foreground",
  "--popover": "--card",
  "--popover-foreground": "--card-foreground",
  "--secondary-container": "--background-muted",
  "--foreground-disabled": "--disabled-foreground",
  "--input": "--border-emphasis",
}

function resolveRawSource(
  variable: string,
  theme: "light" | "dark",
  visited = new Set<string>()
): string {
  if (visited.has(variable)) return "—"
  visited.add(variable)

  const aliases = theme === "dark" ? ALIAS_DARK : ALIAS_LIGHT
  const map = theme === "dark" ? DARK : LIGHT
  const aliasTarget = aliases[variable]

  if (aliasTarget) {
    return resolveRawSource(aliasTarget, theme, visited)
  }

  return map[variable] ?? "—"
}

export function getSemanticTokenSource(
  variable: string,
  theme: "light" | "dark"
): string {
  return resolveRawSource(variable, theme)
}
