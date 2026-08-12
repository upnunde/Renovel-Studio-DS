export type ColorToken = {
  /** shadcn 토큰 stem — 스와치 렌더 판별·React key 용 (실제 토큰 정본은 variable) */
  name: string
  /** tokens.css CSS 변수 — 코드에서 쓰는 shadcn 유전자 (bg-background 등) */
  variable: string
  /** 문서 표기 기준 — Material 3 역할명. 원시 스케일 토큰에는 없음 */
  m3?: string
  /** 문서용 — 컴포넌트·상태에서의 실제 역할 */
  role?: string
  /** tokens.css :root / .dark 매핑 — 시맨틱이 가리키는 원시 토큰 */
  source?: { light: string; dark: string }
}

export type TokenGroup = {
  id: string
  title: string
  tokens: ColorToken[]
}

/** 시맨틱 팔레트 상위 그룹 — 카테고리(h2) → 서브그룹(h3) 2단 위계 */
export type TokenCategory = {
  id: string
  title: string
  groups: TokenGroup[]
}

export {
  BRAND_BASE,
  BRAND_SCALE,
  brandGradientCss,
  type BrandScaleStep,
} from "design-system/brand-colors"

export {
  GRAYSCALE_SCALE,
  GRAYSCALE_DARK,
  GRAYSCALE_LIGHT,
  grayscaleGradientCss,
  type GrayscaleStep,
} from "design-system/grayscale-colors"

export {
  ABSOLUTE_BASE,
  ABSOLUTE_COLOR_STEPS,
  BLACK,
  BLACK_OPACITY_SCALE,
  WHITE,
  WHITE_OPACITY_SCALE,
  type AbsoluteColorStep,
} from "design-system/absolute-colors"

export {
  STATE_COLOR_FAMILIES,
  SUCCESS_BASE,
  SUCCESS_SCALE,
  WARNING_BASE,
  WARNING_SCALE,
  INFO_BASE,
  INFO_SCALE,
  ERROR_BASE,
  ERROR_SCALE,
  stateColorGradientCss,
  type StateColorFamily,
  type StateColorScaleStep,
} from "design-system/semantic-state-colors"

import { ABSOLUTE_BASE, BLACK_OPACITY_SCALE, WHITE_OPACITY_SCALE } from "design-system/absolute-colors"
import { BRAND_SCALE } from "design-system/brand-colors"
import { GRAYSCALE_SCALE } from "design-system/grayscale-colors"
import { STATE_COLOR_FAMILIES } from "design-system/semantic-state-colors"

const ABSOLUTE_BASE_GROUP: TokenGroup = {
  id: "absolute-base",
  title: "White · Black",
  tokens: ABSOLUTE_BASE.map((c) => ({ name: c.name, variable: c.variable })),
}

const WHITE_OPACITY_GROUP: TokenGroup = {
  id: "white-opacity",
  title: "White Opacity",
  tokens: WHITE_OPACITY_SCALE.map((c) => ({ name: c.name, variable: c.variable })),
}

const BLACK_OPACITY_GROUP: TokenGroup = {
  id: "black-opacity",
  title: "Black Opacity",
  tokens: BLACK_OPACITY_SCALE.map((c) => ({ name: c.name, variable: c.variable })),
}

const BRAND_SCALE_GROUP: TokenGroup = {
  id: "brand-scale",
  title: "Brand Scale",
  tokens: BRAND_SCALE.map((b) => ({ name: b.name, variable: b.variable })),
}

const GRAYSCALE_SCALE_GROUP: TokenGroup = {
  id: "grayscale-scale",
  title: "Grayscale Scale",
  tokens: GRAYSCALE_SCALE.map((g) => ({ name: g.name, variable: g.variable })),
}

const STATE_COLOR_GROUPS: TokenGroup[] = STATE_COLOR_FAMILIES.map((family) => ({
  id: `${family.id}-scale`,
  title: `${family.title} Scale`,
  tokens: family.scale.map((step) => ({ name: step.name, variable: step.variable })),
}))

/** 원시 컬러 토큰 */
export const COLOR_PRIMITIVE_GROUPS: TokenGroup[] = [
  ABSOLUTE_BASE_GROUP,
  WHITE_OPACITY_GROUP,
  BLACK_OPACITY_GROUP,
  GRAYSCALE_SCALE_GROUP,
  BRAND_SCALE_GROUP,
  ...STATE_COLOR_GROUPS,
]

/** tokens.css :root / .dark 와 동기화 — 카테고리(h2) → 서브그룹(h3) 2단 위계 */
export const COLOR_SEMANTIC_CATEGORIES: TokenCategory[] = [
  {
    id: "surface",
    title: "Surface",
    groups: [
      {
        id: "surface-base",
        title: "Base",
        tokens: [
          { name: "canvas", variable: "--canvas", m3: "Background", role: "최하위 앱 배경 면" },
          {
            name: "canvas-muted",
            variable: "--canvas-muted",
            m3: "Background Container",
            role: "앱 배경(Background) 위 보조 면 — grayscale-15 (라이트)",
          },
          { name: "background", variable: "--background", m3: "Surface", role: "기본 페이지 면" },
          {
            name: "background-muted",
            variable: "--background-muted",
            m3: "Surface Container",
            role: "페이지·레이아웃 보조 면",
          },
        ],
      },
      {
        id: "surface-elevated",
        title: "Card · Popover",
        tokens: [
          {
            name: "card",
            variable: "--card",
            m3: "Surface (Card)",
            role: "카드·패널 면 — 값은 background와 동일, 깊이는 shadow-elevation이 담당",
          },
          {
            name: "popover",
            variable: "--popover",
            m3: "Surface (Popover)",
            role: "플로팅 면 (드롭다운·팝오버) — card alias, 깊이는 shadow-elevation-30",
          },
          {
            name: "card-muted",
            variable: "--card-muted",
            m3: "Surface Container (Card)",
            role: "카드 내 보조 면 — background-muted alias",
          },
        ],
      },
      {
        id: "surface-inverse",
        title: "Inverse",
        tokens: [
          { name: "inverse", variable: "--inverse", m3: "Inverse Surface", role: "반전 면 (toast·tooltip)" },
          {
            name: "inverse-muted",
            variable: "--inverse-muted",
            m3: "Inverse Surface Container",
            role: "Inverse 보조 면 — 2단계",
          },
        ],
      },
    ],
  },
  {
    id: "on-surface",
    title: "On Surface",
    groups: [
      {
        id: "on-surface-base",
        title: "Base",
        tokens: [
          {
            name: "foreground",
            variable: "--foreground",
            m3: "On Surface",
            role: "background·canvas 면 위 본문 텍스트·아이콘 — grayscale-140 (라이트)",
          },
          {
            name: "canvas-muted-foreground",
            variable: "--canvas-muted-foreground",
            m3: "On Background Container",
            role: "canvas-muted 면 위 텍스트·아이콘 — background-muted-foreground alias",
          },
          {
            name: "background-muted-foreground",
            variable: "--background-muted-foreground",
            m3: "On Surface Container",
            role: "background-muted 면 위 텍스트·아이콘 — 값은 foreground와 동일",
          },
          { name: "foreground-muted", variable: "--foreground-muted", m3: "On Surface Variant", role: "보조 텍스트·아이콘 — grayscale-110 (라이트)" },
          { name: "foreground-placeholder", variable: "--foreground-placeholder", m3: "On Surface Variant (Placeholder)", role: "placeholder 텍스트 — grayscale-70" },
          { name: "foreground-disabled", variable: "--foreground-disabled", m3: "On Surface Variant (Disabled)", role: "비활성 텍스트 — M3에선 On Surface @ 38%" },
        ],
      },
      {
        id: "on-surface-elevated",
        title: "Card · Popover",
        tokens: [
          {
            name: "card-foreground",
            variable: "--card-foreground",
            m3: "On Surface (Card)",
            role: "card 면 위 텍스트·아이콘 — 값은 foreground와 동일",
          },
          {
            name: "popover-foreground",
            variable: "--popover-foreground",
            m3: "On Surface (Popover)",
            role: "popover 면 위 텍스트·아이콘 — card-foreground alias",
          },
          {
            name: "card-muted-foreground",
            variable: "--card-muted-foreground",
            m3: "On Surface Container (Card)",
            role: "card-muted 면 위 텍스트 — background-muted-foreground alias",
          },
        ],
      },
      {
        id: "on-surface-inverse",
        title: "Inverse",
        tokens: [
          { name: "inverse-foreground", variable: "--inverse-foreground", m3: "On Inverse Surface", role: "inverse 면 위 텍스트·아이콘" },
          {
            name: "inverse-muted-foreground",
            variable: "--inverse-muted-foreground",
            m3: "On Inverse Surface Container",
            role: "inverse-muted 면 위 텍스트·아이콘",
          },
        ],
      },
    ],
  },
  {
    id: "action",
    title: "Action",
    groups: [
      {
        id: "action-primary",
        title: "Primary",
        tokens: [
          {
            name: "primary",
            variable: "--primary",
            m3: "Primary",
            role: "주 액션 면 (filled 버튼·CTA)",
          },
          {
            name: "primary-foreground",
            variable: "--primary-foreground",
            m3: "On Primary",
            role: "primary 면 위 텍스트·아이콘",
          },
          {
            name: "primary-container",
            variable: "--primary-container",
            m3: "Primary Container",
            role: "저채도 브랜드 컨테이너 면",
          },
          {
            name: "primary-container-foreground",
            variable: "--primary-container-foreground",
            m3: "On Primary Container",
            role: "primary-container 면 위 텍스트·아이콘",
          },
        ],
      },
    ],
  },
  {
    id: "interaction",
    title: "Interaction",
    groups: [
      {
        id: "interaction-highlight-brand",
        title: "Highlight · Brand",
        tokens: [
          {
            name: "accent",
            variable: "--accent",
            m3: "Secondary Container",
            role: "브랜드 호버·포커스·선택 하이라이트 (outline/ghost/select·menu)",
          },
          {
            name: "accent-foreground",
            variable: "--accent-foreground",
            m3: "On Secondary Container",
            role: "highlight 면 위 텍스트·아이콘",
          },
          {
            name: "ring",
            variable: "--ring",
            m3: "Focus Ring",
            role: "포커스 링 (브랜드) — 모든 포커스 가능 요소 (M3 포커스 인디케이터, primary 값)",
          },
        ],
      },
      {
        id: "interaction-fill-neutral",
        title: "Fill · Neutral",
        tokens: [
          {
            name: "muted",
            variable: "--muted",
            m3: "Surface Variant",
            role: "무채색 호버·크롬 면 (chip, tabs, skeleton, track) — grayscale-10",
          },
          {
            name: "muted-foreground",
            variable: "--muted-foreground",
            m3: "On Surface Variant (Muted Fill)",
            role: "neutral fill(muted) 면 위 보조 텍스트 — grayscale-90",
          },
          {
            name: "secondary",
            variable: "--secondary",
            m3: "Secondary",
            role: "보조 버튼·배지 기본면 — muted alias (foreground만 별도)",
          },
          {
            name: "secondary-foreground",
            variable: "--secondary-foreground",
            m3: "On Secondary",
            role: "secondary 면 위 텍스트·아이콘",
          },
        ],
      },
    ],
  },
  {
    id: "state",
    title: "State",
    groups: [
      {
        id: "state-success",
        title: "Success",
        tokens: [
          { name: "success", variable: "--success", m3: "Success" },
          { name: "success-foreground", variable: "--success-foreground", m3: "On Success" },
        ],
      },
      {
        id: "state-warning",
        title: "Warning",
        tokens: [
          { name: "warning", variable: "--warning", m3: "Warning" },
          { name: "warning-foreground", variable: "--warning-foreground", m3: "On Warning" },
        ],
      },
      {
        id: "state-info",
        title: "Info",
        tokens: [
          { name: "info", variable: "--info", m3: "Info" },
          { name: "info-foreground", variable: "--info-foreground", m3: "On Info" },
        ],
      },
      {
        id: "state-destructive",
        title: "Destructive",
        tokens: [
          { name: "destructive", variable: "--destructive", m3: "Error" },
          { name: "destructive-foreground", variable: "--destructive-foreground", m3: "On Error" },
          { name: "destructive-container", variable: "--destructive-container", m3: "Error Container" },
          { name: "destructive-container-foreground", variable: "--destructive-container-foreground", m3: "On Error Container" },
        ],
      },
      {
        id: "state-disabled",
        title: "Disabled",
        tokens: [
          {
            name: "disabled",
            variable: "--disabled",
            m3: "Disabled Surface",
            role: "비활성 면 — 라이트: muted alias, 다크: 전용",
          },
          {
            name: "disabled-foreground",
            variable: "--disabled-foreground",
            m3: "On Disabled Surface",
            role: "비활성 텍스트·아이콘 — M3에선 On Surface @ 38%",
          },
          {
            name: "disabled-border",
            variable: "--disabled-border",
            m3: "Disabled Outline",
            role: "비활성 보더 — 라이트: border alias",
          },
        ],
      },
    ],
  },
  {
    id: "line",
    title: "Line",
    groups: [
      {
        id: "ui-border",
        title: "Border",
        tokens: [
          { name: "border", variable: "--border", m3: "Outline", role: "기본 보더 — grayscale-15 (라이트)" },
          { name: "border-strong", variable: "--border-strong", m3: "Outline Strong", role: "강조 보더" },
          { name: "border-inverse", variable: "--border-inverse", m3: "Outline Inverse", role: "반전 면 위 보더" },
        ],
      },
      {
        id: "ui-divider",
        title: "Divider",
        tokens: [
          { name: "divider", variable: "--divider", m3: "Outline Variant", role: "구분선 — grayscale-15 (라이트) / grayscale-130 (다크)" },
          { name: "divider-strong", variable: "--divider-strong", m3: "Outline Variant Strong", role: "강조 구분선" },
        ],
      },
      {
        id: "ui-input",
        title: "Input",
        tokens: [
          { name: "input", variable: "--input", m3: "Input Outline", role: "인풋·셀렉트 보더 — 라이트 grayscale-20" },
        ],
      },
    ],
  },
  {
    id: "overlay",
    title: "Overlay",
    groups: [
      {
        id: "overlay-dim",
        title: "Dim",
        tokens: [
          { name: "dim-10", variable: "--dim-10", m3: "Scrim 10", role: "가벼운 호버 백드롭" },
          { name: "dim-20", variable: "--dim-20", m3: "Scrim 20", role: "모달 배경" },
          { name: "dim-30", variable: "--dim-30", m3: "Scrim 30", role: "이미지 위 텍스트 보호" },
          { name: "dim-40", variable: "--dim-40", m3: "Scrim 40", role: "최대 농도" },
        ],
      },
    ],
  },
  {
    id: "chart",
    title: "Chart",
    groups: [
      {
        id: "chart-series",
        title: "Series",
        tokens: [
          { name: "chart-1", variable: "--chart-1" },
          { name: "chart-2", variable: "--chart-2" },
          { name: "chart-3", variable: "--chart-3" },
          { name: "chart-4", variable: "--chart-4" },
          { name: "chart-5", variable: "--chart-5" },
        ],
      },
    ],
  },
]
