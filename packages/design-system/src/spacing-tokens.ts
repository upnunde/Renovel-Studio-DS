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
 *   name    : kebab-case 역할명 (page-padding-x)
 *   variable: --space-{name} (tokens.css alias)
 *   role    : 한국어 사용 맥락
 *   source  : SPACING_SCALE.label (Maps to)
 *   코드    : space.{group}.{camelCase}.className
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

function createResponsiveSpaceToken(
  name: string,
  className: string,
  sourceTokens: readonly [mobile: string, desktop: string],
  role: string,
): SemanticSpaceToken {
  const [mobileToken, desktopToken] = sourceTokens
  const mobile = SPACING_SCALE.find((entry) => entry.token === mobileToken)
  const desktop = SPACING_SCALE.find((entry) => entry.token === desktopToken)
  if (!mobile || !desktop) {
    throw new Error(`Unknown spacing token pair: ${mobileToken}, ${desktopToken}`)
  }

  return {
    name,
    variable: `--space-${name}`,
    className,
    source: `${mobile.label} → ${desktop.label}`,
    px: desktop.px,
    role,
  }
}

/** 페이지 레이아웃 — 앱 셸 정본 */
export const SEMANTIC_SPACE_LAYOUT = {
  pagePaddingX: createResponsiveSpaceToken(
    "page-padding-x",
    "max-lg:px-3 lg:px-5",
    ["3", "5"],
    "페이지 좌우 여백 (모바일 12 / 데스크톱 20)",
  ),
  pagePaddingY: createSemanticSpaceToken(
    "page-padding-y",
    "py-10",
    "10",
    "단순 정적 페이지 상하 여백 (앱 셸·하단 크롬 있는 UI에는 scrollBottom 사용)",
  ),
  scrollBottom: createSemanticSpaceToken(
    "scroll-bottom",
    "pb-20",
    "20",
    "스크롤 영역 하단 여유 (FAB·하단 크롬 회피) · 앱 셸 기본",
  ),
} as const satisfies Record<string, SemanticSpaceToken>

/** 오버레이 — Dialog 정본 인셋 */
export const SEMANTIC_SPACE_OVERLAY = {
  modalPaddingX: createResponsiveSpaceToken(
    "modal-padding-x",
    "max-lg:px-5 lg:px-6",
    ["5", "6"],
    "모달·시트 본문 좌우 인셋 (모바일 20 / 데스크톱 24)",
  ),
  modalPaddingY: createSemanticSpaceToken(
    "modal-padding-y",
    "py-5",
    "5",
    "모달·시트 본문 상하 인셋",
  ),
  modalHeaderPaddingY: createSemanticSpaceToken(
    "modal-header-padding-y",
    "py-4",
    "4",
    "모달·시트 헤더 상하 인셋 (DS 정본)",
  ),
  modalFooterPaddingY: createSemanticSpaceToken(
    "modal-footer-padding-y",
    "py-4",
    "4",
    "모달·시트 푸터 상하 인셋 (DS 정본)",
  ),
} as const satisfies Record<string, SemanticSpaceToken>

/** 통합 시맨틱 스페이스 — 앱 셸·Dialog 정본
 *
 * 사용 예:
 *   import { space } from "design-system/spacing-tokens"
 *   <main className={cn(space.layout.pagePaddingX.className, "flex flex-col gap-5")}>
 *   <div className={space.layout.scrollBottom.className} aria-hidden />
 *
 * 그 외 간격은 원시 토큰 사용: gap-1, gap-2, gap-4, p-5 등
 */
export const space = {
  layout: SEMANTIC_SPACE_LAYOUT,
  overlay: SEMANTIC_SPACE_OVERLAY,
} as const

export type SemanticSpaceGroup = keyof typeof space

export type SpacingSemanticGroup = {
  id: string
  title: string
  tokens: SemanticSpaceToken[]
}

/** 시맨틱 스페이스 상위 그룹 */
export type SpacingSemanticCategory = {
  id: string
  title: string
  groups: SpacingSemanticGroup[]
}

/** Foundation Spacing Semantic 페이지 */
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
    id: "overlay",
    title: "Overlay",
    groups: [
      {
        id: "overlay-modal",
        title: "Modal · Sheet",
        tokens: Object.values(SEMANTIC_SPACE_OVERLAY),
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
