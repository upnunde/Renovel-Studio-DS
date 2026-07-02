export type ColorToken = {
  name: string
  variable: string
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
          { name: "canvas", variable: "--canvas" },
          { name: "background", variable: "--background" },
          {
            name: "background-muted",
            variable: "--background-muted",
            role: "페이지·레이아웃 보조 면",
          },
          {
            name: "background-muted-foreground",
            variable: "--background-muted-foreground",
            role: "background-muted 면 위 텍스트·아이콘",
          },
          { name: "foreground", variable: "--foreground" },
        ],
      },
      {
        id: "surface-elevated",
        title: "Elevated · Card · Popover",
        tokens: [
          { name: "card", variable: "--card", role: "카드·패널 면" },
          {
            name: "card-foreground",
            variable: "--card-foreground",
            role: "card 면 위 텍스트·아이콘",
          },
          {
            name: "popover",
            variable: "--popover",
            role: "플로팅 면 — card alias",
          },
          {
            name: "popover-foreground",
            variable: "--popover-foreground",
            role: "popover 면 위 텍스트·아이콘 — card-foreground alias",
          },
          {
            name: "card-muted",
            variable: "--card-muted",
            role: "카드 내 보조 면 — background-muted alias",
          },
          {
            name: "card-muted-foreground",
            variable: "--card-muted-foreground",
            role: "card-muted 면 위 텍스트 — background-muted-foreground alias",
          },
        ],
      },
      {
        id: "surface-inverse",
        title: "Inverse",
        tokens: [
          { name: "inverse", variable: "--inverse" },
          { name: "inverse-foreground", variable: "--inverse-foreground" },
        ],
      },
    ],
  },
  {
    id: "foreground",
    title: "Foreground",
    groups: [
      {
        id: "foreground-hierarchy",
        title: "Hierarchy",
        tokens: [
          { name: "foreground-muted", variable: "--foreground-muted", role: "보조 텍스트·아이콘 — grayscale-100 (라이트)" },
          { name: "foreground-placeholder", variable: "--foreground-placeholder" },
          { name: "foreground-disabled", variable: "--foreground-disabled" },
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
            role: "주 액션 면 (filled 버튼·CTA)",
          },
          {
            name: "primary-foreground",
            variable: "--primary-foreground",
            role: "primary 면 위 텍스트·아이콘",
          },
          {
            name: "primary-container",
            variable: "--primary-container",
            role: "저채도 브랜드 컨테이너 면",
          },
          {
            name: "primary-container-foreground",
            variable: "--primary-container-foreground",
            role: "primary-container 면 위 텍스트·아이콘",
          },
          {
            name: "ring",
            variable: "--ring",
            role: "포커스 링 (브랜드)",
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
            role: "브랜드 호버·포커스·선택 하이라이트 (outline/ghost/select·menu)",
          },
          {
            name: "accent-foreground",
            variable: "--accent-foreground",
            role: "highlight 면 위 텍스트·아이콘",
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
            role: "무채색 호버·크롬 면 (chip, tabs, skeleton, track) — grayscale-10",
          },
          {
            name: "muted-foreground",
            variable: "--muted-foreground",
            role: "neutral fill 위 보조 텍스트",
          },
          {
            name: "secondary",
            variable: "--secondary",
            role: "보조 버튼·배지 기본면 — muted alias (foreground만 별도)",
          },
          {
            name: "secondary-foreground",
            variable: "--secondary-foreground",
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
          { name: "success", variable: "--success" },
          { name: "success-foreground", variable: "--success-foreground" },
        ],
      },
      {
        id: "state-warning",
        title: "Warning",
        tokens: [
          { name: "warning", variable: "--warning" },
          { name: "warning-foreground", variable: "--warning-foreground" },
        ],
      },
      {
        id: "state-info",
        title: "Info",
        tokens: [
          { name: "info", variable: "--info" },
          { name: "info-foreground", variable: "--info-foreground" },
        ],
      },
      {
        id: "state-destructive",
        title: "Destructive",
        tokens: [
          { name: "destructive", variable: "--destructive" },
          { name: "destructive-foreground", variable: "--destructive-foreground" },
          { name: "destructive-container", variable: "--destructive-container" },
          { name: "destructive-container-foreground", variable: "--destructive-container-foreground" },
        ],
      },
    ],
  },
  {
    id: "ui-chrome",
    title: "UI",
    groups: [
      {
        id: "ui-border",
        title: "Border",
        tokens: [
          { name: "border", variable: "--border" },
          { name: "border-strong", variable: "--border-strong" },
          { name: "border-inverse", variable: "--border-inverse" },
        ],
      },
      {
        id: "ui-divider",
        title: "Divider",
        tokens: [
          { name: "divider", variable: "--divider", role: "구분선 — muted alias (라이트·다크)" },
          { name: "divider-strong", variable: "--divider-strong" },
        ],
      },
      {
        id: "ui-input-disabled",
        title: "Input · Disabled",
        tokens: [
          { name: "input", variable: "--input", role: "인풋·셀렉트 보더 — 라이트 grayscale-20" },
          {
            name: "disabled",
            variable: "--disabled",
            role: "비활성 면 — 라이트: muted alias, 다크: 전용",
          },
          { name: "disabled-foreground", variable: "--disabled-foreground" },
          {
            name: "disabled-border",
            variable: "--disabled-border",
            role: "비활성 보더 — 라이트: border alias",
          },
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
          { name: "dim-10", variable: "--dim-10" },
          { name: "dim-20", variable: "--dim-20" },
          { name: "dim-30", variable: "--dim-30" },
          { name: "dim-40", variable: "--dim-40" },
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
  {
    id: "sidebar",
    title: "Sidebar",
    groups: [
      {
        id: "sidebar-aliases",
        title: "Context aliases",
        tokens: [
          {
            name: "sidebar",
            variable: "--sidebar",
            role: "사이드바 면 — background alias",
          },
          {
            name: "sidebar-foreground",
            variable: "--sidebar-foreground",
            role: "사이드바 텍스트 — foreground alias",
          },
          {
            name: "sidebar-primary",
            variable: "--sidebar-primary",
            role: "사이드바 주 액션 — primary alias",
          },
          {
            name: "sidebar-primary-foreground",
            variable: "--sidebar-primary-foreground",
            role: "sidebar-primary 텍스트 — primary-foreground alias",
          },
          {
            name: "sidebar-accent",
            variable: "--sidebar-accent",
            role: "사이드바 호버·선택 — accent alias",
          },
          {
            name: "sidebar-accent-foreground",
            variable: "--sidebar-accent-foreground",
            role: "sidebar-accent 텍스트 — accent-foreground alias",
          },
          {
            name: "sidebar-border",
            variable: "--sidebar-border",
            role: "사이드바 구분선 — 라이트: border, 다크: input alias",
          },
          {
            name: "sidebar-ring",
            variable: "--sidebar-ring",
            role: "사이드바 포커스 링 — ring alias",
          },
        ],
      },
    ],
  },
]
