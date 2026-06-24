import type { ComponentPropSpec } from "@/lib/component-case-specs"
import { formatPropValue } from "@/lib/component-case-specs"

export type PlaygroundState = Record<string, string | boolean | number>

export type PlaygroundRenderContext = {
  set: (key: string, value: string | boolean | number) => void
  bindOpen: (key?: string) => {
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
    bindOpen: (key = "open") => ({
      open: state[key] === true,
      onOpenChange: (open) => set(key, open),
    }),
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

const SKIPPED_SPEC_PROPS = new Set([
  "children",
  "구성",
  "height",
  "box",
  "list-height",
  "thickness",
  "item-height",
  "htmlFor",
  "rows",
  "className",
  "image",
  "defaultValue",
  "min / max / step",
  "delay",
  "text",
])

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
      value !== "string" &&
      value !== "number" &&
      value !== "number[]" &&
      value !== "string[]" &&
      value !== "id" &&
      !value.includes("…") &&
      !value.includes("*") &&
      !value.includes("–") &&
      !value.includes("/")
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

export function jsxBoolAttr(name: string, value: boolean) {
  return value ? ` ${name}` : ""
}

export function jsxStringAttr(name: string, value: string, defaultValue?: string) {
  if (value === defaultValue) return ""
  return ` ${name}="${value}"`
}
