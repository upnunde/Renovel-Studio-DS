export type SpacingToken = {
  token: string
  /** 직관적 라벨 — token_px */
  label: string
  variable: string
  px: number
  rem: string
  className: string
}

/** 디자인 시스템 간격 정본 — Material 결 13단계
 *  미세 (px·0.5) · 4px 그리드 (1~6) · 8px 점프 (8·10·12·16·20)
 *  최대 80px. 그 외 임의값은 사용처에서 [px] 임의값으로 처리.
 */
export const SPACING_MIN_PX = 1 as const
export const SPACING_MAX_PX = 80 as const

export const SPACING_SCALE: SpacingToken[] = [
  { token: "px", label: "px", variable: "--space-px", px: 1, rem: "1px", className: "w-px" },
  { token: "0.5", label: "0.5_2", variable: "--space-0-5", px: 2, rem: "0.125rem", className: "w-0.5" },
  { token: "1", label: "1_4", variable: "--space-1", px: 4, rem: "0.25rem", className: "w-1" },
  { token: "2", label: "2_8", variable: "--space-2", px: 8, rem: "0.5rem", className: "w-2" },
  { token: "3", label: "3_12", variable: "--space-3", px: 12, rem: "0.75rem", className: "w-3" },
  { token: "4", label: "4_16", variable: "--space-4", px: 16, rem: "1rem", className: "w-4" },
  { token: "5", label: "5_20", variable: "--space-5", px: 20, rem: "1.25rem", className: "w-5" },
  { token: "6", label: "6_24", variable: "--space-6", px: 24, rem: "1.5rem", className: "w-6" },
  { token: "8", label: "8_32", variable: "--space-8", px: 32, rem: "2rem", className: "w-8" },
  { token: "10", label: "10_40", variable: "--space-10", px: 40, rem: "2.5rem", className: "w-10" },
  { token: "12", label: "12_48", variable: "--space-12", px: 48, rem: "3rem", className: "w-12" },
  { token: "16", label: "16_64", variable: "--space-16", px: 64, rem: "4rem", className: "w-16" },
  { token: "20", label: "20_80", variable: "--space-20", px: 80, rem: "5rem", className: "w-20" },
]

export function spacingClass(token: string, property: "p" | "px" | "py" | "gap" | "m" = "gap") {
  return `${property}-${token}` as const
}

export function formatSpacingToken(token: SpacingToken): string {
  return `${token.label} · ${token.className} · ${token.px}px · ${token.rem}`
}

/* ────────────────────────────────────────────────────────────────────────────
 * Semantic Spacing — 페이지/서비스 레벨 공통 간격 규칙
 *
 * 원시 SPACING_SCALE 토큰을 사용처 시맨틱으로 매핑한다.
 * 컴포넌트는 자체 패딩(button px 등)을 가지고, 이 매핑은 그 바깥의 페이지·섹션·폼 등에 적용된다.
 * ──────────────────────────────────────────────────────────────────────────── */

export type SemanticSpaceToken = {
  /** 시맨틱 키 — 코드에서 import 키 */
  key: string
  /** Tailwind 클래스 (gap-X · p-X · px-X · py-X 등) */
  className: string
  /** 원시 token (SPACING_SCALE.token) */
  token: string
  px: number
  description: string
}

/** 페이지 레이아웃 — 최상위 셸·섹션 묶음 */
export const SEMANTIC_SPACE_LAYOUT = {
  pagePadX: { key: "pagePadX", className: "px-5", token: "5", px: 20, description: "페이지 좌우 여백" },
  pagePadY: { key: "pagePadY", className: "py-10", token: "10", px: 40, description: "페이지 상하 여백" },
  sectionGap: { key: "sectionGap", className: "gap-10", token: "10", px: 40, description: "섹션 사이 간격" },
} as const satisfies Record<string, SemanticSpaceToken>

/** 섹션 내부 — 카드·패널 단위 */
export const SEMANTIC_SPACE_SECTION = {
  pad: { key: "pad", className: "p-5", token: "5", px: 20, description: "섹션 내부 패딩" },
  headerGap: { key: "headerGap", className: "gap-1", token: "1", px: 4, description: "제목 ↔ 설명" },
  contentGap: { key: "contentGap", className: "gap-4", token: "4", px: 16, description: "헤더 ↔ 본문" },
  stack: { key: "stack", className: "gap-5", token: "5", px: 20, description: "섹션 내 블록 묶음" },
} as const satisfies Record<string, SemanticSpaceToken>

/** 폼 — 필드·컨트롤 묶음 */
export const SEMANTIC_SPACE_FORM = {
  fieldGap: { key: "fieldGap", className: "gap-4", token: "4", px: 16, description: "필드 묶음 사이 (Label-Input 단위)" },
  innerGap: { key: "innerGap", className: "gap-1.5", token: "—", px: 6, description: "Label ↔ Input ↔ Helper" },
  groupGap: { key: "groupGap", className: "gap-5", token: "5", px: 20, description: "폼 섹션 사이" },
} as const satisfies Record<string, SemanticSpaceToken>

/** 리스트·그리드 */
export const SEMANTIC_SPACE_LIST = {
  tight: { key: "tight", className: "gap-2", token: "2", px: 8, description: "촘촘한 리스트 (메뉴 항목 등)" },
  default: { key: "default", className: "gap-3", token: "3", px: 12, description: "기본 리스트" },
  loose: { key: "loose", className: "gap-4", token: "4", px: 16, description: "느슨한 리스트 (카드 그리드)" },
} as const satisfies Record<string, SemanticSpaceToken>

/** 인라인 — 텍스트·아이콘·뱃지 가로 묶음 */
export const SEMANTIC_SPACE_INLINE = {
  tight: { key: "tight", className: "gap-1", token: "1", px: 4, description: "아이콘 ↔ 텍스트" },
  default: { key: "default", className: "gap-1.5", token: "—", px: 6, description: "일반 인라인 묶음" },
  loose: { key: "loose", className: "gap-2", token: "2", px: 8, description: "넉넉한 인라인" },
} as const satisfies Record<string, SemanticSpaceToken>

/** 액션 — 버튼 그룹·툴바 */
export const SEMANTIC_SPACE_ACTIONS = {
  gap: { key: "gap", className: "gap-2", token: "2", px: 8, description: "버튼 사이" },
  groupGap: { key: "groupGap", className: "gap-3", token: "3", px: 12, description: "액션 그룹 사이" },
} as const satisfies Record<string, SemanticSpaceToken>

/** 통합 시맨틱 스페이스 — 앱 전역 사용
 *
 * 사용 예:
 *   import { space } from "design-system/spacing-tokens"
 *   <main className={cn(space.layout.pagePadX, space.layout.pagePadY)}>
 *   <section className={cn("flex flex-col", space.section.stack, space.section.pad)}>
 */
export const space = {
  layout: SEMANTIC_SPACE_LAYOUT,
  section: SEMANTIC_SPACE_SECTION,
  form: SEMANTIC_SPACE_FORM,
  list: SEMANTIC_SPACE_LIST,
  inline: SEMANTIC_SPACE_INLINE,
  actions: SEMANTIC_SPACE_ACTIONS,
} as const

export type SemanticSpaceGroup = keyof typeof space

/** Foundation Spacing 페이지·외부 문서화 용 */
export const SEMANTIC_SPACE_GROUPS = [
  { id: "layout", title: "Layout", description: "페이지·섹션 묶음 최상위", tokens: Object.values(SEMANTIC_SPACE_LAYOUT) },
  { id: "section", title: "Section", description: "카드·패널 내부", tokens: Object.values(SEMANTIC_SPACE_SECTION) },
  { id: "form", title: "Form", description: "필드·컨트롤 묶음", tokens: Object.values(SEMANTIC_SPACE_FORM) },
  { id: "list", title: "List", description: "리스트·그리드", tokens: Object.values(SEMANTIC_SPACE_LIST) },
  { id: "inline", title: "Inline", description: "텍스트·아이콘 가로 묶음", tokens: Object.values(SEMANTIC_SPACE_INLINE) },
  { id: "actions", title: "Actions", description: "버튼 그룹·툴바", tokens: Object.values(SEMANTIC_SPACE_ACTIONS) },
] as const
