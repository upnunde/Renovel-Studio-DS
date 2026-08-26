import type { ComponentPropSpec } from "@/lib/component-case-specs"
import { formatPropValue, formatSpecPropertyName } from "@/lib/component-case-specs"
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
  /** 기본 `slider` · 직접 입력이 필요하면 `input` */
  control?: "slider" | "input"
  /** 동적 하한 — 예: value ← state.min */
  minFromState?: (state: PlaygroundState) => number
  /** 동적 상한 — 예: hypertextCount ← hypertextMax */
  maxFromState?: (state: PlaygroundState) => number
  /** 동적 step — 예: value ← state.step */
  stepFromState?: (state: PlaygroundState) => number
}

/** 슬라이더 현재값 — `50(0/100)` 형식 */
export function formatPlaygroundNumberValue(
  value: number,
  min: number,
  max: number
) {
  return `${value}(${min}/${max})`
}

const AVATAR_INITIALS_HANGUL_LIMIT = 2
const AVATAR_INITIALS_LATIN_LIMIT = 3

/** Avatar 이니셜 — 한글 최대 2자 · 영문 최대 3자 */
export function clampAvatarInitials(value: string) {
  let hangul = 0
  let latin = 0
  let result = ""

  for (const char of value) {
    if (/[\uac00-\ud7a3]/.test(char)) {
      if (hangul >= AVATAR_INITIALS_HANGUL_LIMIT) continue
      hangul += 1
      result += char
      continue
    }
    if (/[a-z]/i.test(char)) {
      if (latin >= AVATAR_INITIALS_LATIN_LIMIT) continue
      latin += 1
      result += char
    }
  }

  return result
}

/** Properties 테이블 전용 — 플레이그라운드 컨트롤·미리보기에 매핑하지 않음 */
const SKIPPED_SPEC_PROPS = new Set([
  "composition",
  "height",
  "box",
  "thickness",
  "itemHeight",
  "className",
  "text",
])

export type PlaygroundRegistryLike = {
  initialState: PlaygroundState
  textKeys?: string[]
  textareaKeys?: string[]
  numberKeys?: PlaygroundNumberField[]
  selectKeys?: Record<string, string[]>
  /** 플레이그라운드 컨트롤에서 제외 (Properties 표에는 유지) */
  skipControlKeys?: string[]
  /** 명시 그룹 — 미지정 시 showWhen 기반으로 자동 구성 */
  controlGroups?: string[][]
  showWhen?: Partial<Record<string, (state: PlaygroundState) => boolean>>
}

/** 플레이그라운드 좌측 컨트롤 — Properties 표(`spec.properties`) 순서를 그대로 유지 */
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
  return keys
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
): "text" | "textarea" | "number" | "select" | "boolean" | "skip" {
  if (entry.textareaKeys?.includes(key)) return "textarea"
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
  if (key === "children") {
    if (slug === "button") {
      return isPlaygroundIconOnlyButtonLabel(state) ? "aria-label" : "children"
    }
    if (slug === "chip" || slug === "badge") return "children"
    if (slug === "toggle") return "label"
    if (slug === "label") return "title"
    if (slug === "tooltip") return "tip"
    return "children"
  }
  if (slug === "chip" && key === "pressed") return "selected"
  if (key === "removable") return "removable"
  if (slug === "avatar" && key === "initials") return "initials"
  if (slug === "label" && key === "infoText") return "info text"
  return formatSpecPropertyName(key)
}

function evalPlaygroundShowWhen(
  entry: PlaygroundRegistryLike,
  key: string,
  state: PlaygroundState
) {
  const fn = entry.showWhen?.[key]
  return fn ? fn(state) : true
}

/** child 컨트롤이 parent 토글에 직접 종속되는지 (showWhen 기준) */
export function playgroundDependsOnToggle(
  entry: PlaygroundRegistryLike,
  childKey: string,
  parentKey: string,
  baseState: PlaygroundState
) {
  if (childKey === parentKey) return false
  const withParent = { ...baseState, [parentKey]: true }
  const withoutParent = { ...baseState, [parentKey]: false }
  return (
    evalPlaygroundShowWhen(entry, childKey, withParent) &&
    !evalPlaygroundShowWhen(entry, childKey, withoutParent)
  )
}

function playgroundHasToggleDependents(
  entry: PlaygroundRegistryLike,
  toggleKey: string,
  keys: string[],
  baseState: PlaygroundState
) {
  return keys.some((key) =>
    playgroundDependsOnToggle(entry, key, toggleKey, baseState)
  )
}

function playgroundBooleanParentKey(
  entry: PlaygroundRegistryLike,
  childKey: string,
  keys: string[],
  properties: ComponentPropSpec[],
  baseState: PlaygroundState
) {
  return keys.find(
    (parentKey) =>
      parentKey !== childKey &&
      classifyPlaygroundControlKey(parentKey, properties, entry) ===
        "boolean" &&
      playgroundDependsOnToggle(entry, childKey, parentKey, baseState)
  )
}

/**
 * 플레이그라운드 좌측 컨트롤 그룹.
 * controlGroups 미지정 시: `keys`(Properties 순서)를 따라가며
 * 연속 필드·독립 토글·토글+하위(showWhen)를 묶되 상대 순서는 유지한다.
 * select 의존 showWhen(예: valueEnd)은 primary 순서에 두고, boolean 종속만 nest한다.
 */
export function buildPlaygroundControlGroups(
  keys: string[],
  properties: ComponentPropSpec[],
  entry: PlaygroundRegistryLike,
  baseState: PlaygroundState
): string[][] {
  if (entry.controlGroups?.length) {
    const grouped = new Set(entry.controlGroups.flat())
    const leftovers = keys.filter((key) => !grouped.has(key))
    return leftovers.length
      ? [...entry.controlGroups, leftovers]
      : entry.controlGroups
  }

  const groups: string[][] = []
  const assigned = new Set<string>()
  let primary: string[] = []
  let standaloneBooleans: string[] = []

  const flushPrimary = () => {
    if (!primary.length) return
    groups.push(primary)
    primary.forEach((key) => assigned.add(key))
    primary = []
  }

  const flushStandaloneBooleans = () => {
    if (!standaloneBooleans.length) return
    groups.push(standaloneBooleans)
    standaloneBooleans.forEach((key) => assigned.add(key))
    standaloneBooleans = []
  }

  for (const key of keys) {
    if (assigned.has(key)) continue

    const kind = classifyPlaygroundControlKey(key, properties, entry)
    if (kind === "skip") continue

    // boolean 토글 종속만 앵커 그룹으로 편입 — select 의존 showWhen은 순서 유지
    if (
      entry.showWhen?.[key] &&
      playgroundBooleanParentKey(entry, key, keys, properties, baseState)
    ) {
      continue
    }

    if (kind === "boolean") {
      if (playgroundHasToggleDependents(entry, key, keys, baseState)) {
        flushPrimary()
        flushStandaloneBooleans()
        const group = [
          key,
          ...keys.filter(
            (candidate) =>
              candidate !== key &&
              !assigned.has(candidate) &&
              playgroundDependsOnToggle(entry, candidate, key, baseState)
          ),
        ]
        group.forEach((item) => assigned.add(item))
        groups.push(group)
      } else {
        flushPrimary()
        standaloneBooleans.push(key)
      }
      continue
    }

    flushStandaloneBooleans()
    primary.push(key)
  }

  flushPrimary()
  flushStandaloneBooleans()

  const leftovers = keys.filter((key) => {
    if (assigned.has(key)) return false
    return classifyPlaygroundControlKey(key, properties, entry) !== "skip"
  })
  if (leftovers.length) groups.push(leftovers)

  return groups
}

export function playgroundGroupUsesToggleNest(
  group: string[],
  properties: ComponentPropSpec[],
  entry: PlaygroundRegistryLike,
  baseState: PlaygroundState
) {
  if (group.length <= 1) return false
  const [first, ...rest] = group
  if (classifyPlaygroundControlKey(first, properties, entry) !== "boolean") {
    return false
  }
  return rest.some((key) =>
    playgroundDependsOnToggle(entry, key, first, baseState)
  )
}

function isPlaygroundIconOnlyButtonLabel(state: PlaygroundState) {
  if (state.type === "icon") return true
  const size = String(state.size ?? "")
  return size === "icon" || size.startsWith("icon-")
}
