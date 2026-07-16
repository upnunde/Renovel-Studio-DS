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
 *
 * 네이밍 — Color Semantic과 동일 패턴:
 *   name  : kebab-case 역할명 (page-padding-x)
 *   role  : 한국어 사용 맥락
 *   source: SPACING_SCALE.label (Maps to)
 *   코드  : space.{group}.{camelCase}.className
 * ──────────────────────────────────────────────────────────────────────────── */

export type SemanticSpaceToken = {
  /** kebab-case 역할명 — 문서·공유 시 직관적 식별자 */
  name: string
  /** tokens.css alias 변수 — 예: --space-section-stack-gap */
  variable: string
  /** Tailwind 클래스 (gap-X · p-X · px-X · py-X 등) */
  className: string
  /** SPACING_SCALE.label — 시맨틱이 가리키는 원시 스케일 */
  source: string
  px: number
  /** 문서용 — 컴포넌트·레이아웃에서의 실제 역할 */
  role: string
}

function createSemanticSpaceToken(
  name: string,
  className: string,
  sourceToken: string,
  role: string,
): SemanticSpaceToken {
  const scaleEntry = SPACING_SCALE.find((entry) => entry.token === sourceToken)
  if (!scaleEntry) {
    throw new Error(`Unknown spacing token: ${sourceToken}`)
  }

  return {
    name,
    variable: `--space-${name}`,
    className,
    source: scaleEntry.label,
    px: scaleEntry.px,
    role,
  }
}

/** 페이지 레이아웃 — 최상위 셸·섹션 묶음 */
export const SEMANTIC_SPACE_LAYOUT = {
  pagePaddingX: createSemanticSpaceToken(
    "page-padding-x",
    "px-5",
    "5",
    "페이지 좌우 여백",
  ),
  pagePaddingY: createSemanticSpaceToken(
    "page-padding-y",
    "py-10",
    "10",
    "페이지 상하 여백",
  ),
  sectionGap: createSemanticSpaceToken(
    "section-gap",
    "gap-10",
    "10",
    "섹션 사이 간격",
  ),
} as const satisfies Record<string, SemanticSpaceToken>

/** 섹션 내부 — 카드·패널 단위 */
export const SEMANTIC_SPACE_SECTION = {
  sectionPadding: createSemanticSpaceToken(
    "section-padding",
    "p-5",
    "5",
    "카드·패널 내부 패딩",
  ),
  sectionHeaderGap: createSemanticSpaceToken(
    "section-header-gap",
    "gap-2",
    "2",
    "제목 ↔ 설명 텍스트",
  ),
  sectionContentGap: createSemanticSpaceToken(
    "section-content-gap",
    "gap-4",
    "4",
    "헤더 ↔ 본문 블록",
  ),
  sectionStackGap: createSemanticSpaceToken(
    "section-stack-gap",
    "gap-5",
    "5",
    "섹션 내 블록 수직 묶음",
  ),
} as const satisfies Record<string, SemanticSpaceToken>

/** 폼 — 필드·컨트롤 묶음 */
export const SEMANTIC_SPACE_FORM = {
  formLabelGap: createSemanticSpaceToken(
    "form-label-gap",
    "gap-1",
    "1",
    "Label ↔ Input (밀착)",
  ),
  formFieldGap: createSemanticSpaceToken(
    "form-field-gap",
    "gap-4",
    "4",
    "필드 단위(Label+Input+Helper) 사이",
  ),
  formGroupGap: createSemanticSpaceToken(
    "form-group-gap",
    "gap-6",
    "6",
    "폼 섹션·그룹 사이",
  ),
} as const satisfies Record<string, SemanticSpaceToken>

/** 리스트·그리드 */
export const SEMANTIC_SPACE_LIST = {
  listItemGapCompact: createSemanticSpaceToken(
    "list-item-gap-compact",
    "gap-2",
    "2",
    "촘촘한 리스트 (메뉴·드롭다운 항목)",
  ),
  listItemGap: createSemanticSpaceToken(
    "list-item-gap",
    "gap-3",
    "3",
    "기본 리스트",
  ),
  listItemGapRelaxed: createSemanticSpaceToken(
    "list-item-gap-relaxed",
    "gap-5",
    "5",
    "느슨한 리스트·카드 그리드",
  ),
} as const satisfies Record<string, SemanticSpaceToken>

/** 인라인 — 텍스트·아이콘·뱃지 가로 묶음 */
export const SEMANTIC_SPACE_INLINE = {
  inlineIconGap: createSemanticSpaceToken(
    "inline-icon-gap",
    "gap-1",
    "1",
    "아이콘 ↔ 텍스트 (최소 여백)",
  ),
  inlineGap: createSemanticSpaceToken(
    "inline-gap",
    "gap-2",
    "2",
    "일반 인라인 요소 묶음",
  ),
  inlineGapRelaxed: createSemanticSpaceToken(
    "inline-gap-relaxed",
    "gap-3",
    "3",
    "인라인 요소 넉넉한 묶음",
  ),
} as const satisfies Record<string, SemanticSpaceToken>

/** 액션 — 버튼 그룹·툴바 */
export const SEMANTIC_SPACE_ACTIONS = {
  actionGap: createSemanticSpaceToken(
    "action-gap",
    "gap-2",
    "2",
    "버튼·칩 사이",
  ),
  actionGroupGap: createSemanticSpaceToken(
    "action-group-gap",
    "gap-4",
    "4",
    "액션 그룹 사이",
  ),
} as const satisfies Record<string, SemanticSpaceToken>

/** 통합 시맨틱 스페이스 — 앱 전역 사용
 *
 * 사용 예:
 *   import { space } from "design-system/spacing-tokens"
 *   <main className={cn(space.layout.pagePaddingX.className, space.layout.pagePaddingY.className)}>
 *   <section className={cn("flex flex-col", space.section.sectionStackGap.className, space.section.sectionPadding.className)}>
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

export type SpacingSemanticGroup = {
  id: string
  title: string
  tokens: SemanticSpaceToken[]
}

/** 시맨틱 스페이스 상위 그룹 — 카테고리(h2) → 서브그룹(h3) 2단 위계 */
export type SpacingSemanticCategory = {
  id: string
  title: string
  groups: SpacingSemanticGroup[]
}

/** Foundation Spacing Semantic 페이지 — Color Semantic과 동일 2단 위계 */
export const SPACING_SEMANTIC_CATEGORIES: SpacingSemanticCategory[] = [
  {
    id: "layout",
    title: "Layout",
    groups: [
      {
        id: "layout-page",
        title: "Page Shell",
        tokens: Object.values(SEMANTIC_SPACE_LAYOUT),
      },
    ],
  },
  {
    id: "section",
    title: "Section",
    groups: [
      {
        id: "section-interior",
        title: "Card · Panel",
        tokens: Object.values(SEMANTIC_SPACE_SECTION),
      },
    ],
  },
  {
    id: "form",
    title: "Form",
    groups: [
      {
        id: "form-fields",
        title: "Fields",
        tokens: Object.values(SEMANTIC_SPACE_FORM),
      },
    ],
  },
  {
    id: "list",
    title: "List",
    groups: [
      {
        id: "list-items",
        title: "Item Gap",
        tokens: Object.values(SEMANTIC_SPACE_LIST),
      },
    ],
  },
  {
    id: "inline",
    title: "Inline",
    groups: [
      {
        id: "inline-horizontal",
        title: "Horizontal",
        tokens: Object.values(SEMANTIC_SPACE_INLINE),
      },
    ],
  },
  {
    id: "actions",
    title: "Actions",
    groups: [
      {
        id: "actions-toolbar",
        title: "Button · Toolbar",
        tokens: Object.values(SEMANTIC_SPACE_ACTIONS),
      },
    ],
  },
]

/** @deprecated SPACING_SEMANTIC_CATEGORIES 사용 */
export const SEMANTIC_SPACE_GROUPS = SPACING_SEMANTIC_CATEGORIES.flatMap((category) =>
  category.groups.map((group) => ({
    id: group.id,
    title: group.title,
    description: category.title,
    tokens: group.tokens,
  })),
)
