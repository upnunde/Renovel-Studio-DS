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

const CONTROL_SIZE_SORT_INDEX = new Map(
  ALL_CONTROL.map((token, index) => [token.api, index])
)

/** 텍스트 컨트롤 size API 타입 */
export type ControlTextSizeApi =
  | "xs"
  | "sm"
  | "default"
  | "xl"
  | "lg"
  | "2xl"

/** xs 제외 폼·토글 컨트롤 size API 타입 */
export type ControlFormSizeApi = Exclude<ControlTextSizeApi, "xs">

/** 텍스트 컨트롤 size API — 높이 오름차순 */
export const CONTROL_TEXT_SIZE_APIS = CONTROL_SIZE_SCALE.map(
  (token) => token.api
) as ControlTextSizeApi[]

/** xs 제외 폼 컨트롤 size API — 높이 오름차순 */
export const CONTROL_FORM_SIZE_APIS = CONTROL_SIZE_SCALE.filter(
  (token) => token.api !== "xs"
).map((token) => token.api) as ControlFormSizeApi[]

/** Tabs TabsList size API — 폼 컨트롤 높이 스케일과 동일 (sm ~ 2xl) */
export type TabsSizeApi = ControlFormSizeApi

export const TABS_SIZE_APIS = CONTROL_FORM_SIZE_APIS

/**
 * line · text variant 탭 타이포 — TabsList size(h) 단계별 (비활성/활성).
 * 2xl_h48 이 최대 — 하위 size는 body·heading 스케일에 맞춤.
 */
export const TABS_TYPOGRAPHY_BY_SIZE = {
  sm: { inactive: "text-body3_400", active: "text-body3_700", label: "14_20" },
  default: { inactive: "text-body2_400", active: "text-body2_700", label: "15_22" },
  xl: { inactive: "text-body1_400", active: "text-body1_700", label: "16_24" },
  lg: { inactive: "text-heading5_500", active: "text-heading5_700", label: "18_26" },
  "2xl": { inactive: "text-heading4_500", active: "text-heading4_700", label: "20_28" },
} as const satisfies Record<
  TabsSizeApi,
  { inactive: string; active: string; label: string }
>

/** @deprecated TABS_TYPOGRAPHY_BY_SIZE 사용 */
export const TABS_TEXT_TYPOGRAPHY = TABS_TYPOGRAPHY_BY_SIZE

/**
 * text variant TabsList 항목 간격 — 2xl_h48 기준 16px, 하위 size는 spacing 스케일에 맞춤.
 */
export const TABS_TEXT_LIST_GAP_BY_SIZE = {
  sm: { className: "gap-2", px: 8, token: "2" },
  default: { className: "gap-3", px: 12, token: "3" },
  xl: { className: "gap-3.5", px: 14, token: "3.5" },
  lg: { className: "gap-3.5", px: 14, token: "3.5" },
  "2xl": { className: "gap-4", px: 16, token: "4" },
} as const satisfies Record<
  TabsSizeApi,
  { className: string; px: number; token: string }
>

/** @deprecated TABS_TEXT_LIST_GAP_BY_SIZE 사용 */
export const TABS_TEXT_LIST_GAP_CLASS = TABS_TEXT_LIST_GAP_BY_SIZE["2xl"].className

/** 아이콘 전용 버튼 size API — 높이 오름차순 */
export const CONTROL_ICON_SIZE_APIS = CONTROL_ICON_SIZE_SCALE.map(
  (token) => token.api
)

/** 텍스트 + 아이콘 버튼 size API — 높이 오름차순 */
export const CONTROL_ALL_SIZE_APIS = ALL_CONTROL.map((token) => token.api)

/** 텍스트 버튼 size → 좌우 패딩 class (Button cva와 동일) */
export function controlSizeToButtonPxClass(api: string): string {
  switch (api) {
    case "xs":
      return "px-2"
    case "sm":
    case "default":
      return "px-2.5"
    case "lg":
    case "xl":
    case "2xl":
      return "px-3"
    default:
      return "px-2.5"
  }
}

/** 텍스트 버튼 size → gap class (Button cva와 동일) */
export function controlSizeToButtonGapClass(api: string): string {
  switch (api) {
    case "xs":
    case "sm":
      return "gap-1"
    case "2xl":
      return "gap-2"
    default:
      return "gap-1.5"
  }
}

/** 아이콘 전용 + chevron — 정사각 해제 시 size별 좌우 패딩 */
export function iconChevronButtonClass(api: string): string {
  return `w-auto ${controlSizeToButtonGapClass(api)} ${controlSizeToButtonPxClass(api)}`
}

export function sortControlSizeApis(apis: readonly string[]): string[] {
  return [...apis].sort(
    (a, b) =>
      (CONTROL_SIZE_SORT_INDEX.get(a) ?? Number.MAX_SAFE_INTEGER) -
      (CONTROL_SIZE_SORT_INDEX.get(b) ?? Number.MAX_SAFE_INTEGER)
  )
}

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

/** 텍스트 컨트롤 size → Icon size prop
 *  컨트롤은 용도별 6단계(xs/sm/default/xl/lg/2xl), 글리프는 시각 단위 5단계.
 *  xl(h40)·lg(h42)는 2px 차이라 같은 글리프(lg=18px)를 공유한다 — 두 단계의 차이는
 *  높이가 아니라 용도(폼·터치 vs 강조·헤더 액션)이기 때문.
 */
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

/** 아이콘 전용 버튼 size → Icon size prop
 *  매핑 의도는 controlSizeToIconGlyph 와 동일 — icon-xl·icon-lg 모두 lg(18px) 공유.
 */
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

/** Avatar — 정사각(s) · 인라인 ~ 프로필 히어로 */
export const AVATAR_SIZE_SCALE: AvatarSizeToken[] = [
  { label: "xs_s20", api: "xs", sizePx: 20, tailwind: "size-5" },
  { label: "sm_s24", api: "sm", sizePx: 24, tailwind: "size-6" },
  { label: "md_s32", api: "default", sizePx: 32, tailwind: "size-8" },
  { label: "md_s36", api: "md", sizePx: 36, tailwind: "size-9" },
  { label: "lg_s40", api: "lg", sizePx: 40, tailwind: "size-10" },
  { label: "xl_s48", api: "xl", sizePx: 48, tailwind: "size-12" },
  { label: "2xl_s64", api: "2xl", sizePx: 64, tailwind: "size-16" },
  { label: "3xl_s80", api: "3xl", sizePx: 80, tailwind: "size-20" },
  { label: "4xl_s96", api: "4xl", sizePx: 96, tailwind: "size-24" },
  { label: "5xl_s128", api: "5xl", sizePx: 128, tailwind: "size-32" },
]

/** Avatar size API — 크기 오름차순 */
export type AvatarSizeApi =
  | "xs"
  | "sm"
  | "default"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"

export const AVATAR_SIZE_APIS = AVATAR_SIZE_SCALE.map(
  (token) => token.api
) as AvatarSizeApi[]

const AVATAR_SIZE_SORT_INDEX = new Map(
  AVATAR_SIZE_SCALE.map((token, index) => [token.api, index])
)

export function sortAvatarSizeApis(apis: readonly string[]): string[] {
  return [...apis].sort(
    (a, b) =>
      (AVATAR_SIZE_SORT_INDEX.get(a) ?? Number.MAX_SAFE_INTEGER) -
      (AVATAR_SIZE_SORT_INDEX.get(b) ?? Number.MAX_SAFE_INTEGER)
  )
}

export function formatAvatarSizeOption(api: string): string {
  return AVATAR_SIZE_SCALE.find((t) => t.api === api)?.label ?? api
}

export function avatarCaseMeta(api: string) {
  const token = AVATAR_SIZE_SCALE.find((t) => t.api === api)
  if (!token) return { label: api, tags: [`size: ${api}`] as string[] }
  return {
    label: token.label,
    tags: [`size: ${api}`, `s${token.sizePx}`],
  }
}

export type BadgeSizeToken = {
  label: string
  api: string
  heightPx: number
  tailwind: string
}

/** Badge — 높이(h) */
export const BADGE_SIZE_SCALE: BadgeSizeToken[] = [
  { label: "default_h20", api: "default", heightPx: 20, tailwind: "h-5" },
  { label: "md_h24", api: "md", heightPx: 24, tailwind: "h-6" },
  { label: "lg_h28", api: "lg", heightPx: 28, tailwind: "h-7" },
]

export type BadgeSizeApi = "default" | "md" | "lg"

export const BADGE_SIZE_APIS = BADGE_SIZE_SCALE.map(
  (token) => token.api
) as BadgeSizeApi[]

export const BADGE_SHAPE_APIS = ["circle", "square"] as const

export type BadgeShapeApi = (typeof BADGE_SHAPE_APIS)[number]

/** Button shape */
export const BUTTON_SHAPE_APIS = ["circle", "square"] as const

export type ButtonShapeApi = (typeof BUTTON_SHAPE_APIS)[number]

export function formatBadgeSizeOption(api: string): string {
  return BADGE_SIZE_SCALE.find((t) => t.api === api)?.label ?? api
}

export function badgeCaseMeta(api: string) {
  const token = BADGE_SIZE_SCALE.find((t) => t.api === api)
  if (!token) return { label: api, tags: [`size: ${api}`] as string[] }
  return {
    label: token.label,
    tags: [`size: ${api}`, `h${token.heightPx}`],
  }
}
