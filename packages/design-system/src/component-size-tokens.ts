export type ControlSizeToken = {
  /** 문서용 라벨 — 축·px (예: md_h36, md_s36) */
  label: string
  /** shadcn API 값 */
  api: string
  heightPx: number
  rem: string
  tailwind: string
  description: string
}

export type IconGlyphToken = {
  /** 문서용 라벨 — 글리프 px (예: md_g16) */
  label: string
  /** Icon 컴포넌트 size prop */
  api: "xs" | "sm" | "md" | "lg" | "xl"
  sizePx: number
  rem: string
  variable: string
  /** 짝이 되는 컨트롤 높이 라벨 */
  controlLabel: string
  description: string
}

/** 텍스트 버튼·인풋 등 — 높이(h) 기준 */
export const CONTROL_SIZE_SCALE: ControlSizeToken[] = [
  {
    label: "xs_h24",
    api: "xs",
    heightPx: 24,
    rem: "1.5rem",
    tailwind: "h-6",
    description: "최소 버튼·배지·인라인",
  },
  {
    label: "sm_h32",
    api: "sm",
    heightPx: 32,
    rem: "2rem",
    tailwind: "h-8",
    description: "소형 버튼·폼 컨트롤",
  },
  {
    label: "md_h36",
    api: "default",
    heightPx: 36,
    rem: "2.25rem",
    tailwind: "h-9",
    description: "기본 버튼·Input · Select",
  },
  {
    label: "xl_h40",
    api: "xl",
    heightPx: 40,
    rem: "2.5rem",
    tailwind: "h-10",
    description: "대형 폼·터치 영역",
  },
  {
    label: "lg_h42",
    api: "lg",
    heightPx: 42,
    rem: "2.625rem",
    tailwind: "h-[42px]",
    description: "강조 버튼·헤더 액션",
  },
  {
    label: "2xl_h48",
    api: "2xl",
    heightPx: 48,
    rem: "3rem",
    tailwind: "h-12",
    description: "최대 폼·모바일 터치",
  },
]

/** 아이콘 전용 버튼 — 정사각(s), CONTROL_SIZE_SCALE 과 동일 px */
export const CONTROL_ICON_SIZE_SCALE: ControlSizeToken[] = [
  {
    label: "xs_s24",
    api: "icon-xs",
    heightPx: 24,
    rem: "1.5rem",
    tailwind: "size-6",
    description: "아이콘 버튼 최소",
  },
  {
    label: "sm_s32",
    api: "icon-sm",
    heightPx: 32,
    rem: "2rem",
    tailwind: "size-8",
    description: "소형 아이콘 버튼",
  },
  {
    label: "md_s36",
    api: "icon",
    heightPx: 36,
    rem: "2.25rem",
    tailwind: "size-9",
    description: "기본 아이콘 버튼",
  },
  {
    label: "xl_s40",
    api: "icon-xl",
    heightPx: 40,
    rem: "2.5rem",
    tailwind: "size-10",
    description: "대형 아이콘 버튼",
  },
  {
    label: "lg_s42",
    api: "icon-lg",
    heightPx: 42,
    rem: "2.625rem",
    tailwind: "size-[42px]",
    description: "강조 아이콘 버튼",
  },
  {
    label: "2xl_s48",
    api: "icon-2xl",
    heightPx: 48,
    rem: "3rem",
    tailwind: "size-12",
    description: "최대 아이콘 버튼",
  },
]

/** Lucide 글리프 — g(glyph) 기준 */
export const ICON_GLYPH_SCALE: IconGlyphToken[] = [
  {
    label: "xs_g12",
    api: "xs",
    sizePx: 12,
    rem: "0.75rem",
    variable: "--icon-size-xs",
    controlLabel: "xs_h24",
    description: "최소 버튼·배지·인라인",
  },
  {
    label: "sm_g14",
    api: "sm",
    sizePx: 14,
    rem: "0.875rem",
    variable: "--icon-size-sm",
    controlLabel: "sm_h32",
    description: "소형 버튼·폼 컨트롤",
  },
  {
    label: "md_g16",
    api: "md",
    sizePx: 16,
    rem: "1rem",
    variable: "--icon-size-md",
    controlLabel: "md_h36",
    description: "기본 버튼·메뉴·알림",
  },
  {
    label: "lg_g18",
    api: "lg",
    sizePx: 18,
    rem: "1.125rem",
    variable: "--icon-size-lg",
    controlLabel: "lg_h42",
    description: "강조 버튼·헤더 액션",
  },
  {
    label: "xl_g20",
    api: "xl",
    sizePx: 20,
    rem: "1.25rem",
    variable: "--icon-size-xl",
    controlLabel: "—",
    description: "빈 상태·일러스트형",
  },
]

const ALL_CONTROL = [...CONTROL_SIZE_SCALE, ...CONTROL_ICON_SIZE_SCALE]

export function getControlSizeToken(api: string): ControlSizeToken | undefined {
  return ALL_CONTROL.find((t) => t.api === api)
}

export function getIconGlyphToken(api: string): IconGlyphToken | undefined {
  return ICON_GLYPH_SCALE.find((t) => t.api === api)
}

/** Properties 표·플레이그라운드 — 토큰 라벨만 */
export function formatControlSizeOption(api: string): string {
  return getControlSizeToken(api)?.label ?? api
}

export function formatIconGlyphOption(token: IconGlyphToken): string {
  return token.label
}

/** Foundation 테이블 Token 열 */
export function formatControlSizeRow(token: ControlSizeToken): string {
  return token.label
}

export function controlCaseMeta(api: string) {
  const token = getControlSizeToken(api)
  if (!token) return { label: api, tags: [`size: ${api}`] as string[] }
  return {
    label: token.label,
    tags: [`size: ${api}`],
  }
}

export function iconGlyphCaseMeta(api: string) {
  const token = getIconGlyphToken(api)
  if (!token) return { label: api, tags: [`icon: ${api}`] as string[] }
  return {
    label: token.label,
    tags: [`icon: ${api}`],
  }
}

/** 텍스트 컨트롤 size → Icon size prop */
export function controlSizeToIconGlyph(
  api: string
): IconGlyphToken["api"] {
  switch (api) {
    case "xs":
      return "xs"
    case "sm":
      return "sm"
    case "lg":
    case "xl":
      return "lg"
    case "2xl":
      return "xl"
    default:
      return "md"
  }
}

/** 아이콘 전용 버튼 size → Icon size prop */
export function iconButtonSizeToIconGlyph(
  api: string
): IconGlyphToken["api"] {
  switch (api) {
    case "icon-xs":
      return "xs"
    case "icon-sm":
      return "sm"
    case "icon-lg":
      return "lg"
    case "icon-xl":
      return "lg"
    case "icon-2xl":
      return "xl"
    default:
      return "md"
  }
}

export type AvatarSizeToken = {
  label: string
  api: string
  sizePx: number
  tailwind: string
}

/** Avatar — 정사각(s) */
export const AVATAR_SIZE_SCALE: AvatarSizeToken[] = [
  { label: "sm_s24", api: "sm", sizePx: 24, tailwind: "size-6" },
  { label: "md_s32", api: "default", sizePx: 32, tailwind: "size-8" },
  { label: "lg_s40", api: "lg", sizePx: 40, tailwind: "size-10" },
]

export function formatAvatarSizeOption(api: string): string {
  return AVATAR_SIZE_SCALE.find((t) => t.api === api)?.label ?? api
}

export function avatarCaseMeta(api: string) {
  const token = AVATAR_SIZE_SCALE.find((t) => t.api === api)
  if (!token) return { label: api, tags: [`size: ${api}`] as string[] }
  return {
    label: token.label,
    tags: [`size: ${api}`],
  }
}
