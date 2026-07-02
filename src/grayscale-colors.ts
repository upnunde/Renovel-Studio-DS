/**
 * 그레이스케일 컬러 스케일 정본
 * 기준: grayscale-0 #FFFFFF · grayscale-10 #F8F8FC → grayscale-140 #212124
 * R=G 동일 luminance + B 채널에 은은한 쿨 블루 오프셋 (#F1F1F5 패턴)
 * tokens.css · color-tokens.ts 와 동기화
 */
export const GRAYSCALE_LIGHT = "#F8F8FC" as const
export const GRAYSCALE_DARK = "#212124" as const

export type GrayscaleStep = {
  name: string
  variable: string
  hex: string
  role: string
}

export const GRAYSCALE_SCALE: GrayscaleStep[] = [
  { name: "grayscale-0", variable: "--grayscale-0", hex: "#FFFFFF", role: "canvas · 페이지 바탕 · 흰 표면" },
  { name: "grayscale-10", variable: "--grayscale-10", hex: "#F8F8FC", role: "은은한 배경 틴트" },
  { name: "grayscale-15", variable: "--grayscale-15", hex: "#F1F1F5", role: "secondary · muted · 중간 배경 틴트" },
  { name: "grayscale-20", variable: "--grayscale-20", hex: "#E7E7EB", role: "border" },
  { name: "grayscale-30", variable: "--grayscale-30", hex: "#D7D7DB", role: "input" },
  { name: "grayscale-40", variable: "--grayscale-40", hex: "#C6C6CA", role: "비활성 보더" },
  { name: "grayscale-50", variable: "--grayscale-50", hex: "#B6B6BA", role: "비활성 보더" },
  { name: "grayscale-60", variable: "--grayscale-60", hex: "#A5A5A9", role: "플레이스홀더" },
  { name: "grayscale-70", variable: "--grayscale-70", hex: "#959598", role: "보조 아이콘" },
  { name: "grayscale-80", variable: "--grayscale-80", hex: "#848487", role: "캡션 텍스트" },
  { name: "grayscale-90", variable: "--grayscale-90", hex: "#747478", role: "muted-foreground" },
  { name: "grayscale-100", variable: "--grayscale-100", hex: "#636366", role: "보조 본문" },
  { name: "grayscale-110", variable: "--grayscale-110", hex: "#535356", role: "다크 border" },
  { name: "grayscale-120", variable: "--grayscale-120", hex: "#424245", role: "다크 muted · secondary" },
  { name: "grayscale-130", variable: "--grayscale-130", hex: "#323235", role: "다크 card · elevated surface" },
  { name: "grayscale-140", variable: "--grayscale-140", hex: "#212124", role: "foreground · 다크 배경" },
]

/** CSS linear-gradient용 문자열 */
export function grayscaleGradientCss(): string {
  const steps = GRAYSCALE_SCALE.map((s, i) => {
    const pct = (i / (GRAYSCALE_SCALE.length - 1)) * 100
    return `${s.hex} ${pct}%`
  })
  return `linear-gradient(to right, ${steps.join(", ")})`
}
