import type { ComponentPropSpec } from "@/lib/component-case-specs"
import { formatPropValue } from "@/lib/component-case-specs"
import {
  AVATAR_SIZE_SCALE,
  getControlSizeToken,
  sortAvatarSizeApis,
  sortControlSizeApis,
} from "design-system/component-size-tokens"

export type PlaygroundState = Record<string, string | boolean | number>

export type PlaygroundRenderContext = {
  set: (key: string, value: string | boolean | number) => void
  bindOpen: (
    key?: string,
    options?: { pin?: boolean }
  ) => {
    open: boolean
    onOpenChange: (open: boolean) => void
  }
  bindValue: (key: string) => {
    value: string
    onValueChange: (value: string) => void
  }
  bindSlider: (key: string) => {
    value: number[]
    onValueChange: (value: number | readonly number[]) => void
  }
  bindChecked: (key: string) => {
    checked: boolean | "indeterminate"
    onCheckedChange: (checked: boolean | "indeterminate") => void
  }
  bindPressed: (key: string) => {
    pressed: boolean
    onPressedChange: (pressed: boolean) => void
  }
  bindSwitch: (key: string) => {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
  }
}

export function createPlaygroundRenderContext(
  state: PlaygroundState,
  set: PlaygroundRenderContext["set"]
): PlaygroundRenderContext {
  return {
    set,
    bindOpen: (key = "open", options?: { pin?: boolean }) => {
      const isOpen = playgroundBool(state, key)
      return {
        open: isOpen,
        onOpenChange: (open) => {
          if (options?.pin && isOpen && !open) return
          set(key, open)
        },
      }
    },
    bindValue: (key) => ({
      value: String(state[key] ?? ""),
      onValueChange: (value) => set(key, value),
    }),
    bindSlider: (key) => ({
      value: [Number(state[key] ?? 0)],
      onValueChange: (values) =>
        set(key, Array.isArray(values) ? (values[0] ?? 0) : values),
    }),
    bindChecked: (key) => {
      const raw = state[key]
      const checked =
        raw === "indeterminate"
          ? "indeterminate"
          : raw === true || raw === "true"
      return {
        checked,
        onCheckedChange: (next) =>
          set(key, next === "indeterminate" ? "indeterminate" : next),
      }
    },
    bindPressed: (key) => ({
      pressed: state[key] === true,
      onPressedChange: (pressed) => set(key, pressed),
    }),
    bindSwitch: (key) => ({
      checked: state[key] === true,
      onCheckedChange: (checked) => set(key, checked),
    }),
  }
}

export type PlaygroundNumberField = {
  key: string
  min: number
  max: number
  step?: number
  label?: string
}

/** Properties 테이블 전용 — 플레이그라운드 컨트롤·미리보기에 매핑하지 않음 */
const SKIPPED_SPEC_PROPS = new Set([
  "구성",
  "height",
  "box",
  "thickness",
  "item-height",
  "className",
  "text",
])

export type PlaygroundRegistryLike = {
  initialState: PlaygroundState
  textKeys?: string[]
  numberKeys?: PlaygroundNumberField[]
  selectKeys?: Record<string, string[]>
  /** 플레이그라운드 컨트롤에서 제외 (Properties 표에는 유지) */
  skipControlKeys?: string[]
}

/** 플레이그라운드 좌측 컨트롤 상단 고정 순서 (앞일수록 위) */
const PLAYGROUND_CONTROL_PRIORITY = ["variant"] as const

export function orderPlaygroundControlKeys(keys: string[]): string[] {
  const priority = PLAYGROUND_CONTROL_PRIORITY.filter((key) => keys.includes(key))
  const rest = keys.filter((key) => !priority.includes(key))
  return [...priority, ...rest]
}

/** spec.properties + entry.initialState 기준 플레이그라운드 컨트롤 키 (정책: Properties 케이스 전부 노출) */
export function resolvePlaygroundControlKeys(
  properties: ComponentPropSpec[],
  entry: PlaygroundRegistryLike
): string[] {
  const skip = new Set(entry.skipControlKeys ?? [])
  const keys: string[] = []
  for (const prop of properties) {
    if (!shouldSkipSpecProp(prop.name) && !skip.has(prop.name)) keys.push(prop.name)
  }
  for (const key of Object.keys(entry.initialState)) {
    if (!keys.includes(key) && !skip.has(key)) keys.push(key)
  }
  return orderPlaygroundControlKeys(keys)
}

/** spec에만 있는 프로퍼티 기본값을 initialState에 병합 */
export function buildPlaygroundInitialState(
  properties: ComponentPropSpec[],
  entry: PlaygroundRegistryLike
): PlaygroundState {
  const state: PlaygroundState = { ...entry.initialState }

  for (const prop of properties) {
    if (shouldSkipSpecProp(prop.name)) continue
    if (prop.name in state) continue

    const selectOptions = entry.selectKeys?.[prop.name]
    if (selectOptions?.length) {
      state[prop.name] = selectOptions[0]
      continue
    }

    const numberField = entry.numberKeys?.find((field) => field.key === prop.name)
    if (numberField) {
      state[prop.name] = numberField.min
      continue
    }

    if (isBooleanProp(prop)) {
      state[prop.name] = false
      continue
    }

    if (prop.values.includes("false")) {
      state[prop.name] = "false"
      continue
    }

    if (
      prop.values[0] === "string" ||
      prop.values[0] === "id" ||
      prop.values[0] === "number"
    ) {
      state[prop.name] = ""
      continue
    }

    state[prop.name] = prop.values[0]
  }

  return state
}

export function classifyPlaygroundControlKey(
  key: string,
  properties: ComponentPropSpec[],
  entry: PlaygroundRegistryLike
): "text" | "number" | "select" | "boolean" | "skip" {
  if (entry.textKeys?.includes(key)) return "text"
  if (entry.numberKeys?.some((field) => field.key === key)) return "number"
  if (entry.selectKeys?.[key]) return "select"

  const prop = findSpecProp(properties, key)
  if (prop && shouldSkipSpecProp(prop.name)) return "skip"
  if (prop) {
    if (isBooleanProp(prop)) return "boolean"
    if (prop.values.some(isMetadataPropValue)) return "text"
    if (isFiniteEnumProp(prop)) return "select"
    if (
      prop.values[0] === "string" ||
      prop.values[0] === "id" ||
      prop.values[0] === "number"
    ) {
      return "text"
    }
  }

  if (typeof entry.initialState[key] === "boolean") return "boolean"
  if (entry.selectKeys?.[key]) return "select"

  return "skip"
}

export function playgroundBool(state: PlaygroundState, key: string) {
  const value = state[key]
  return value === true || value === "true"
}

export function isBooleanProp(prop: ComponentPropSpec) {
  return (
    prop.values.length === 2 &&
    prop.values.includes("true") &&
    prop.values.includes("false")
  )
}

export function isFiniteEnumProp(prop: ComponentPropSpec) {
  if (isBooleanProp(prop)) return false
  if (prop.values.length === 0 || prop.values.length > 12) return false
  return prop.values.every(
    (value) =>
      !isMetadataPropValue(value) &&
      !value.includes("…") &&
      !value.includes("*") &&
      !value.includes("/")
  )
}

/** Properties 표기용 — 플레이그라운드 enum 옵션으로 취급하지 않음 */
export function isMetadataPropValue(value: string) {
  return (
    value === "string" ||
    value === "number" ||
    value === "id" ||
    value === "—" ||
    value === "–"
  )
}

export function findSpecProp(
  properties: ComponentPropSpec[],
  key: string
): ComponentPropSpec | undefined {
  return properties.find((prop) => prop.name === key)
}

export function shouldSkipSpecProp(name: string) {
  return SKIPPED_SPEC_PROPS.has(name)
}

export function formatPlaygroundOption(
  prop: ComponentPropSpec | undefined,
  value: string
) {
  if (!prop) return value
  return formatPropValue(prop, value)
}

const BOOLEAN_OPTION_ORDER = ["false", "true", "indeterminate"] as const

/** 플레이그라운드·Properties 표 — 옵션을 작은 값 → 큰 값 순으로 정렬 */
export function sortPlaygroundOptionValues(
  values: readonly string[],
  propName?: string
): string[] {
  if (values.length <= 1) return [...values]

  if (values.every((value) => getControlSizeToken(value))) {
    return sortControlSizeApis(values)
  }

  if (
    propName === "size" &&
    values.every((value) => AVATAR_SIZE_SCALE.some((token) => token.api === value))
  ) {
    return sortAvatarSizeApis(values)
  }

  if (
    values.every((value) =>
      BOOLEAN_OPTION_ORDER.includes(value as (typeof BOOLEAN_OPTION_ORDER)[number])
    )
  ) {
    return [...values].sort(
      (a, b) =>
        BOOLEAN_OPTION_ORDER.indexOf(a as (typeof BOOLEAN_OPTION_ORDER)[number]) -
        BOOLEAN_OPTION_ORDER.indexOf(b as (typeof BOOLEAN_OPTION_ORDER)[number])
    )
  }

  if (values.every((value) => /^\d+ms$/.test(value))) {
    return [...values].sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
  }

  return [...values]
}

export function jsxBoolAttr(name: string, value: boolean) {
  return value ? ` ${name}` : ""
}

export function jsxStringAttr(name: string, value: string, defaultValue?: string) {
  if (value === defaultValue) return ""
  return ` ${name}="${value}"`
}

/** 플레이그라운드 코드 — enum/string prop (기본값도 항상 명시, 복사·AI 인식용) */
export function playgroundPropAttr(name: string, value: string) {
  return `${name}="${value}"`
}

export function playgroundPropAttrs(
  parts: Array<string | false | null | undefined>
) {
  const attrs = parts.filter(Boolean)
  return attrs.length ? ` ${attrs.join(" ")}` : ""
}

/** 플레이그라운드 컨트롤 라벨 — Button 등 slug별 표시명 보정 */
export function getPlaygroundControlLabel(
  slug: string,
  key: string,
  state: PlaygroundState
) {
  if (key !== "label") return key
  if (slug === "button") {
    return isPlaygroundIconOnlyButtonLabel(state) ? "aria-label" : "children"
  }
  if (slug === "toggle") return "aria-label"
  if (slug === "chip" || slug === "badge") return "children"
  return key
}

function isPlaygroundIconOnlyButtonLabel(state: PlaygroundState) {
  if (state.type === "icon") return true
  const size = String(state.size ?? "")
  return size === "icon" || size.startsWith("icon-")
}
