export type ColorToken = {
  name: string
  variable: string
  /** tokens.css :root / .dark 매핑 — 시맨틱이 가리키는 원시 토큰 */
  source?: { light: string; dark: string }
}

export type TokenGroup = {
  id: string
  title: string
  tokens: ColorToken[]
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

/** tokens.css :root / .dark 와 동기화 */
export const COLOR_SEMANTIC_GROUPS: TokenGroup[] = [
  {
    id: "surface",
    title: "Surface · Foreground",
    tokens: [
      { name: "canvas", variable: "--canvas" },
      { name: "background", variable: "--background" },
      { name: "foreground", variable: "--foreground" },
      { name: "card", variable: "--card" },
      { name: "card-foreground", variable: "--card-foreground" },
      { name: "popover", variable: "--popover" },
      { name: "popover-foreground", variable: "--popover-foreground" },
    ],
  },
  {
    id: "emphasis",
    title: "Emphasis · Action",
    tokens: [
      { name: "primary", variable: "--primary" },
      { name: "primary-foreground", variable: "--primary-foreground" },
      { name: "accent", variable: "--accent" },
      { name: "accent-foreground", variable: "--accent-foreground" },
      { name: "ring", variable: "--ring" },
    ],
  },
  {
    id: "interaction",
    title: "Interaction",
    tokens: [
      { name: "secondary", variable: "--secondary" },
      { name: "secondary-foreground", variable: "--secondary-foreground" },
      { name: "muted", variable: "--muted" },
      { name: "muted-foreground", variable: "--muted-foreground" },
    ],
  },
  {
    id: "state",
    title: "State · Feedback",
    tokens: [
      { name: "success", variable: "--success" },
      { name: "success-foreground", variable: "--success-foreground" },
      { name: "warning", variable: "--warning" },
      { name: "warning-foreground", variable: "--warning-foreground" },
      { name: "info", variable: "--info" },
      { name: "info-foreground", variable: "--info-foreground" },
      { name: "destructive", variable: "--destructive" },
      { name: "destructive-foreground", variable: "--destructive-foreground" },
    ],
  },
  {
    id: "ui",
    title: "UI · Border",
    tokens: [
      { name: "border", variable: "--border" },
      { name: "input", variable: "--input" },
      { name: "disabled", variable: "--disabled" },
      { name: "disabled-foreground", variable: "--disabled-foreground" },
      { name: "disabled-border", variable: "--disabled-border" },
    ],
  },
  {
    id: "chart",
    title: "Chart",
    tokens: [
      { name: "chart-1", variable: "--chart-1" },
      { name: "chart-2", variable: "--chart-2" },
      { name: "chart-3", variable: "--chart-3" },
      { name: "chart-4", variable: "--chart-4" },
      { name: "chart-5", variable: "--chart-5" },
    ],
  },
  {
    id: "sidebar",
    title: "Sidebar",
    tokens: [
      { name: "sidebar", variable: "--sidebar" },
      { name: "sidebar-foreground", variable: "--sidebar-foreground" },
      { name: "sidebar-primary", variable: "--sidebar-primary" },
      { name: "sidebar-primary-foreground", variable: "--sidebar-primary-foreground" },
      { name: "sidebar-accent", variable: "--sidebar-accent" },
      { name: "sidebar-accent-foreground", variable: "--sidebar-accent-foreground" },
      { name: "sidebar-border", variable: "--sidebar-border" },
      { name: "sidebar-ring", variable: "--sidebar-ring" },
    ],
  },
]
