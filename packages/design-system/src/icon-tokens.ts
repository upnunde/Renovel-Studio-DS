import {
  ICON_GLYPH_SCALE,
  type IconGlyphToken,
} from "./component-size-tokens"

export type IconSizeToken = IconGlyphToken & {
  name: string
  componentSize: string
}

/** @deprecated ICON_GLYPH_SCALE 사용 — 문서·Icon 컴포넌트 호환 */
export const ICON_SIZE_SCALE: IconSizeToken[] = ICON_GLYPH_SCALE.map((token) => ({
  ...token,
  name: `icon-${token.api === "md" ? "md" : token.api}`,
  componentSize: token.controlLabel,
}))

export const ICON_LIBRARY = {
  name: "Lucide",
  package: "lucide-react",
  license: "ISC",
} as const

export {
  CONTROL_ICON_SIZE_SCALE,
  CONTROL_SIZE_SCALE,
  CONTROL_ALL_SIZE_APIS,
  CONTROL_FORM_SIZE_APIS,
  CONTROL_ICON_SIZE_APIS,
  CONTROL_TEXT_SIZE_APIS,
  ICON_GLYPH_SCALE,
  controlCaseMeta,
  formatControlSizeOption,
  formatControlSizeRow,
  formatIconGlyphOption,
  getControlSizeToken,
  getIconGlyphToken,
  iconGlyphCaseMeta,
  avatarCaseMeta,
  AVATAR_SIZE_SCALE,
  formatAvatarSizeOption,
  controlSizeToIconGlyph,
  iconButtonSizeToIconGlyph,
  sortAvatarSizeApis,
  sortControlSizeApis,
} from "./component-size-tokens"
