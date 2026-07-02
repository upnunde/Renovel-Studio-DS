export type TypographyGroup = "heading" | "body" | "caption"
export type TypographyWeight = 400 | 500 | 700

export type TypographyToken = {
  /** className 그대로 — text-heading2_700 등 (typography.css @utility 와 1:1) */
  className: string
  /** size_lineHeight (예: "24_34") */
  label: string
  group: TypographyGroup
  /** heading 1~5 · body 1~4 · caption 1~2 */
  rank: number
  fontSizePx: number
  lineHeightPx: number
  fontWeight: TypographyWeight
  description: string
}

/** 합본 타이포 27토큰 — typography.css @utility 와 단일 소스 */
export const TYPOGRAPHY_SCALE: TypographyToken[] = [
  { className: "text-heading1_700", label: "32_38", group: "heading", rank: 1, fontSizePx: 32, lineHeightPx: 38, fontWeight: 700, description: "페이지 최상단 타이틀" },
  { className: "text-heading2_700", label: "24_34", group: "heading", rank: 2, fontSizePx: 24, lineHeightPx: 34, fontWeight: 700, description: "페이지 타이틀" },
  { className: "text-heading2_500", label: "24_34", group: "heading", rank: 2, fontSizePx: 24, lineHeightPx: 34, fontWeight: 500, description: "페이지 타이틀 (medium)" },
  { className: "text-heading3_700", label: "22_30", group: "heading", rank: 3, fontSizePx: 22, lineHeightPx: 30, fontWeight: 700, description: "섹션 타이틀" },
  { className: "text-heading3_500", label: "22_30", group: "heading", rank: 3, fontSizePx: 22, lineHeightPx: 30, fontWeight: 500, description: "섹션 타이틀 (medium)" },
  { className: "text-heading4_700", label: "20_28", group: "heading", rank: 4, fontSizePx: 20, lineHeightPx: 28, fontWeight: 700, description: "섹션 서브타이틀" },
  { className: "text-heading4_500", label: "20_28", group: "heading", rank: 4, fontSizePx: 20, lineHeightPx: 28, fontWeight: 500, description: "섹션 서브타이틀 (medium)" },
  { className: "text-heading5_700", label: "18_26", group: "heading", rank: 5, fontSizePx: 18, lineHeightPx: 26, fontWeight: 700, description: "카드/모달 타이틀" },
  { className: "text-heading5_500", label: "18_26", group: "heading", rank: 5, fontSizePx: 18, lineHeightPx: 26, fontWeight: 500, description: "카드/모달 타이틀 (medium)" },
  { className: "text-body1_700", label: "16_24", group: "body", rank: 1, fontSizePx: 16, lineHeightPx: 24, fontWeight: 700, description: "본문 강조 (bold)" },
  { className: "text-body1_500", label: "16_24", group: "body", rank: 1, fontSizePx: 16, lineHeightPx: 24, fontWeight: 500, description: "본문 강조 (medium)" },
  { className: "text-body1_400", label: "16_24", group: "body", rank: 1, fontSizePx: 16, lineHeightPx: 24, fontWeight: 400, description: "본문 강조 (regular)" },
  { className: "text-body2_700", label: "15_22", group: "body", rank: 2, fontSizePx: 15, lineHeightPx: 22, fontWeight: 700, description: "본문 (bold)" },
  { className: "text-body2_500", label: "15_22", group: "body", rank: 2, fontSizePx: 15, lineHeightPx: 22, fontWeight: 500, description: "본문 (medium)" },
  { className: "text-body2_400", label: "15_22", group: "body", rank: 2, fontSizePx: 15, lineHeightPx: 22, fontWeight: 400, description: "본문 (regular)" },
  { className: "text-body3_700", label: "14_20", group: "body", rank: 3, fontSizePx: 14, lineHeightPx: 20, fontWeight: 700, description: "기본 텍스트 (bold)" },
  { className: "text-body3_500", label: "14_20", group: "body", rank: 3, fontSizePx: 14, lineHeightPx: 20, fontWeight: 500, description: "기본 텍스트 (medium) — 가장 많이 사용" },
  { className: "text-body3_400", label: "14_20", group: "body", rank: 3, fontSizePx: 14, lineHeightPx: 20, fontWeight: 400, description: "기본 텍스트 (regular) — 가장 많이 사용" },
  { className: "text-body4_700", label: "13_18", group: "body", rank: 4, fontSizePx: 13, lineHeightPx: 18, fontWeight: 700, description: "보조 텍스트 (bold)" },
  { className: "text-body4_500", label: "13_18", group: "body", rank: 4, fontSizePx: 13, lineHeightPx: 18, fontWeight: 500, description: "보조 텍스트 (medium)" },
  { className: "text-body4_400", label: "13_18", group: "body", rank: 4, fontSizePx: 13, lineHeightPx: 18, fontWeight: 400, description: "보조 텍스트 (regular)" },
  { className: "text-caption1_700", label: "12_16", group: "caption", rank: 1, fontSizePx: 12, lineHeightPx: 16, fontWeight: 700, description: "라벨/메타 (bold)" },
  { className: "text-caption1_500", label: "12_16", group: "caption", rank: 1, fontSizePx: 12, lineHeightPx: 16, fontWeight: 500, description: "라벨/메타 (medium)" },
  { className: "text-caption1_400", label: "12_16", group: "caption", rank: 1, fontSizePx: 12, lineHeightPx: 16, fontWeight: 400, description: "라벨/메타 (regular)" },
  { className: "text-caption2_700", label: "11_14", group: "caption", rank: 2, fontSizePx: 11, lineHeightPx: 14, fontWeight: 700, description: "최소 라벨 (bold)" },
  { className: "text-caption2_500", label: "11_14", group: "caption", rank: 2, fontSizePx: 11, lineHeightPx: 14, fontWeight: 500, description: "최소 라벨 (medium)" },
  { className: "text-caption2_400", label: "11_14", group: "caption", rank: 2, fontSizePx: 11, lineHeightPx: 14, fontWeight: 400, description: "최소 라벨 (regular)" },
]

/** className → token 빠른 조회 */
export const TYPOGRAPHY_BY_CLASS: Record<string, TypographyToken> =
  Object.fromEntries(TYPOGRAPHY_SCALE.map((t) => [t.className, t]))

/** className 매처 — cn 확장·docs 생성용 */
export const isTypographyClass = (className: string): boolean =>
  /^text-(?:body|heading|caption)\d+_\d{3}$/.test(className)

export type FontFamilyToken = {
  label: string
  token: string
  css: string
  family: string
  weightRange: string
  usage: string
}

export const FONT_FAMILIES: FontFamilyToken[] = [
  {
    label: "sans",
    token: "font-sans",
    css: "--font-sans → --font-family",
    family: "Pretendard Variable",
    weightRange: "100–900",
    usage: "html · body · 기본 UI",
  },
  {
    label: "heading",
    token: "font-heading",
    css: "--font-heading → --font-family",
    family: "Pretendard Variable",
    weightRange: "100–900",
    usage: "DialogTitle · CardTitle · Sidebar · 페이지 제목",
  },
  {
    label: "mono",
    token: "font-mono",
    css: "--font-mono → --font-family",
    family: "Pretendard Variable",
    weightRange: "100–900",
    usage: "토큰 표 · Properties · 코드 블록",
  },
]
