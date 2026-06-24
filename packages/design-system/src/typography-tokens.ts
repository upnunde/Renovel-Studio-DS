export type TypographyScaleToken = {
  /** 직관적 라벨 — size_lineHeight */
  label: string
  /** Tailwind / shadcn 클래스 */
  name: string
  fontSizePx: number
  lineHeightPx: number
  rem: string
  usage: string
}

export type FontWeightToken = {
  label: string
  name: string
  value: number
  usage: string
}

export type ComponentTypographyToken = {
  component: string
  classes: string
  /** 수치 포함 표시 문자열 */
  display: string
  usage: string
}

/** shadcn·Tailwind 기본 type scale — 코드에서 사용하는 정본 */
export const TYPOGRAPHY_SCALE: TypographyScaleToken[] = [
  {
    label: "xs_12_16",
    name: "text-xs",
    fontSizePx: 12,
    lineHeightPx: 16,
    rem: "0.75rem / 1rem",
    usage: "Badge · Tooltip · 라벨 · 보조 문구",
  },
  {
    label: "sm_14_20",
    name: "text-sm",
    fontSizePx: 14,
    lineHeightPx: 20,
    rem: "0.875rem / 1.25rem",
    usage: "Button · Input · Menu · 본문 기본 (shadcn 컴포넌트 다수)",
  },
  {
    label: "base_16_24",
    name: "text-base",
    fontSizePx: 16,
    lineHeightPx: 24,
    rem: "1rem / 1.5rem",
    usage: "Dialog title · Card title · 강조 본문",
  },
  {
    label: "lg_18_28",
    name: "text-lg",
    fontSizePx: 18,
    lineHeightPx: 28,
    rem: "1.125rem / 1.75rem",
    usage: "소제목 · 강조 텍스트",
  },
  {
    label: "xl_20_28",
    name: "text-xl",
    fontSizePx: 20,
    lineHeightPx: 28,
    rem: "1.25rem / 1.75rem",
    usage: "섹션 제목",
  },
  {
    label: "2xl_24_32",
    name: "text-2xl",
    fontSizePx: 24,
    lineHeightPx: 32,
    rem: "1.5rem / 2rem",
    usage: "페이지 제목 (DocsPageHeader)",
  },
  {
    label: "3xl_30_36",
    name: "text-3xl",
    fontSizePx: 30,
    lineHeightPx: 36,
    rem: "1.875rem / 2.25rem",
    usage: "히어로 · 대형 제목",
  },
  {
    label: "4xl_36_40",
    name: "text-4xl",
    fontSizePx: 36,
    lineHeightPx: 40,
    rem: "2.25rem / 2.5rem",
    usage: "마케팅 · 디스플레이",
  },
]

export const FONT_WEIGHTS: FontWeightToken[] = [
  { label: "normal_400", name: "font-normal", value: 400, usage: "본문 · 설명" },
  { label: "medium_500", name: "font-medium", value: 500, usage: "Button · Label · Tabs · 강조 본문" },
  { label: "semibold_600", name: "font-semibold", value: 600, usage: "제목 · Sidebar · Section heading" },
  { label: "bold_700", name: "font-bold", value: 700, usage: "강한 강조 · 배지 (필요 시)" },
]

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
    usage: "html · body · 기본 UI (shadcn font-sans)",
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

/** 타이포그래피 문서 Usage 열 정책 */
export const TYPOGRAPHY_DOC_POLICY = {
  code: "shadcn·Tailwind 클래스가 코드 정본 (text-sm, font-medium, font-sans)",
  label: "문서 라벨은 크기_행간 · px 수치 (예: sm_14_20 · 14/20px)",
  usage: "Usage 열은 UI 적용처 — 컨트롤 크기 토큰은 /foundation/icons 참고",
  family: "Font Family는 shadcn 시맨틱 토큰 + Pretendard Variable (프로젝트 추가)",
  spec: "디자인 스펙 참고는 Figma 매핑용 — 코드 정본 아님",
  surface:
    "기본 표면(background·card·문서 패널)에는 drop shadow·ring elevation 미적용 — border만. Popover·Menu·Dialog 등 부유 레이어만 shadow",
  heading:
    "h1 페이지 제목(DocsPageHeader) · h2 섹션 소제목(속성·Playground·예시) · h3 예시 그룹(Variant·Size)",
} as const

/** shadcn UI 컴포넌트가 실제로 쓰는 조합 */
export const COMPONENT_TYPOGRAPHY: ComponentTypographyToken[] = [
  {
    component: "Button",
    classes: "text-sm font-medium",
    display: "sm_14_20 · text-sm font-medium · 14/20px",
    usage: "Button · CTA · Toggle 라벨",
  },
  {
    component: "Button (xs)",
    classes: "text-xs font-medium",
    display: "xs_12_16 · text-xs font-medium · 12/16px",
    usage: "xs 버튼 · 최소 라벨",
  },
  {
    component: "Badge",
    classes: "text-xs font-medium",
    display: "xs_12_16 · text-xs font-medium · 12/16px",
    usage: "Badge · Tooltip · 보조 라벨",
  },
  {
    component: "Input / Select",
    classes: "text-sm",
    display: "sm_14_20 · text-sm · 14/20px",
    usage: "Input · Select · Menu 항목",
  },
  {
    component: "InputHypertext",
    classes: "text-body4_400",
    display: "body4_400 · 13/18px · font-normal",
    usage: "Input 하이퍼텍스트 · 도움말 · 글자 수",
  },
  {
    component: "DialogTitle",
    classes: "text-base font-medium",
    display: "base_16_24 · text-base font-medium · 16/24px",
    usage: "Dialog · Card 제목",
  },
  {
    component: "Alert",
    classes: "text-sm",
    display: "sm_14_20 · text-sm · 14/20px",
    usage: "Alert · Toast 본문",
  },
  {
    component: "DocsPageHeader",
    classes: "text-2xl font-semibold",
    display: "2xl_24_32 · text-2xl font-semibold · 24/32px",
    usage: "페이지 h1 · font-heading",
  },
]

export type DesignSpecReference = {
  /** 디자인 스펙 이름 (참고용) */
  specName: string
  fontSizePx: number
  lineHeightPx: number
  weight: number
  /** 권장 shadcn 조합 */
  recommended: string
  note?: string
}

/**
 * 디자인 스펙 참고 — 코드 정본이 아님.
 * Figma·가이드 문서 값과 가장 가까운 shadcn 클래스 매핑.
 */
export const DESIGN_SPEC_REFERENCE: DesignSpecReference[] = [
  { specName: "heading1_700", fontSizePx: 32, lineHeightPx: 38, weight: 700, recommended: "text-3xl font-bold", note: "lh 38px — 필요 시 leading-[38px]" },
  { specName: "heading2_700", fontSizePx: 24, lineHeightPx: 34, weight: 700, recommended: "text-2xl font-bold", note: "lh 34px — 필요 시 leading-[34px]" },
  { specName: "heading3_700", fontSizePx: 22, lineHeightPx: 30, weight: 700, recommended: "text-xl font-bold", note: "22px — Tailwind 기본에 없음" },
  { specName: "heading4_700", fontSizePx: 20, lineHeightPx: 28, weight: 700, recommended: "text-xl font-bold" },
  { specName: "heading5_700", fontSizePx: 18, lineHeightPx: 26, weight: 700, recommended: "text-lg font-bold" },
  { specName: "body1_400", fontSizePx: 16, lineHeightPx: 24, weight: 400, recommended: "text-base font-normal" },
  { specName: "body2_400", fontSizePx: 15, lineHeightPx: 22, weight: 400, recommended: "text-sm font-normal", note: "15px — text-sm(14px) 또는 text-base" },
  { specName: "body3_400", fontSizePx: 14, lineHeightPx: 20, weight: 400, recommended: "text-sm font-normal" },
  { specName: "body4_400", fontSizePx: 13, lineHeightPx: 18, weight: 400, recommended: "text-body4_400", note: "InputHypertext · 13px" },
  { specName: "caption1_400", fontSizePx: 12, lineHeightPx: 16, weight: 400, recommended: "text-xs font-normal" },
  { specName: "caption2_400", fontSizePx: 11, lineHeightPx: 14, weight: 400, recommended: "text-xs font-normal", note: "11px — Tailwind 기본에 없음" },
]
