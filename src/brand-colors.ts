/**
 * 브랜드 컬러 스케일 정본 — base #F642D4
 * 버튼·선택·강조 영역에만 사용 (본문 UI 톤은 grayscale)
 * tokens.css · color-tokens.ts 와 동기화
 */
export const BRAND_BASE = "#F642D4" as const

export type BrandScaleStep = {
  name: string
  variable: string
  hex: string
  role: string
}

export const BRAND_SCALE: BrandScaleStep[] = [
  {
    name: "brand-950",
    variable: "--brand-950",
    hex: "#3A0532",
    role: "브랜드 다크 틴트",
  },
  {
    name: "brand-800",
    variable: "--brand-800",
    hex: "#780F66",
    role: "브랜드 딥 톤 · 다크 accent",
  },
  {
    name: "brand-600",
    variable: "--brand-600",
    hex: "#D91BB8",
    role: "primary hover · pressed · accent-foreground",
  },
  {
    name: "brand-500",
    variable: "--brand-500",
    hex: BRAND_BASE,
    role: "primary · CTA · 선택 · 포커스 링",
  },
  {
    name: "brand-400",
    variable: "--brand-400",
    hex: "#F06AD9",
    role: "다크 모드 primary · ring",
  },
  {
    name: "brand-200",
    variable: "--brand-200",
    hex: "#F9CFF0",
    role: "브랜드 라이트 틴트",
  },
  {
    name: "brand-100",
    variable: "--brand-100",
    hex: "#FCE8F8",
    role: "브랜드 서피스 틴트",
  },
  {
    name: "brand-50",
    variable: "--brand-50",
    hex: "#FDF2FC",
    role: "브랜드 최연한 틴트 · accent",
  },
]

/** CSS linear-gradient용 문자열 */
export function brandGradientCss(): string {
  const steps = BRAND_SCALE.map((s, i) => {
    const pct = (i / (BRAND_SCALE.length - 1)) * 100
    return `${s.hex} ${pct}%`
  })
  return `linear-gradient(to right, ${steps.join(", ")})`
}
