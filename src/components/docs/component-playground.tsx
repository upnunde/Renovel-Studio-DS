"use client"

import { useMemo, useState } from "react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { getComponentCaseSpec } from "@/lib/component-case-specs"

import { getPlaygroundEntry } from "./playground-registry"
import {
  PlaygroundField,
  PlaygroundLayout,
  PlaygroundShell,
  PlaygroundSwitch,
} from "./playground-shell"
import type { PlaygroundState } from "./playground-utils"
import {
  createPlaygroundRenderContext,
  findSpecProp,
  formatPlaygroundOption,
  isBooleanProp,
  isFiniteEnumProp,
  shouldSkipSpecProp,
} from "./playground-utils"

export function ComponentPlayground({ slug }: { slug: string }) {
  const entry = getPlaygroundEntry(slug)
  const spec = getComponentCaseSpec(slug)

  const [state, setState] = useState<PlaygroundState>(
    () => entry?.initialState ?? {}
  )

  const code = useMemo(() => entry?.buildCode(state) ?? "", [entry, state])

  if (!entry || !spec) return null

  const properties = spec.properties

  const textKeys = new Set(entry.textKeys ?? [])
  const numberKeys = new Map(
    (entry.numberKeys ?? []).map((field) => [field.key, field])
  )
  const selectKeys = entry.selectKeys ?? {}
  const booleanKeys: string[] = []
  const enumKeys: string[] = []

  for (const key of Object.keys(entry.initialState)) {
    if (textKeys.has(key) || numberKeys.has(key) || selectKeys[key]) continue

    const prop = findSpecProp(properties, key)
    if (prop && !shouldSkipSpecProp(prop.name)) {
      if (isBooleanProp(prop)) booleanKeys.push(key)
      else if (isFiniteEnumProp(prop)) enumKeys.push(key)
      else if (typeof entry.initialState[key] === "boolean") booleanKeys.push(key)
      else if (typeof entry.initialState[key] === "string") enumKeys.push(key)
    } else if (typeof entry.initialState[key] === "boolean") {
      booleanKeys.push(key)
    } else if (selectKeys[key]) {
      // handled above
    } else if (typeof entry.initialState[key] === "string" && !textKeys.has(key)) {
      enumKeys.push(key)
    }
  }

  const orderedKeys = [
    ...Object.keys(entry.initialState).filter(
      (key) =>
        !booleanKeys.includes(key) &&
        (textKeys.has(key) ||
          numberKeys.has(key) ||
          enumKeys.includes(key) ||
          selectKeys[key])
    ),
    ...booleanKeys,
  ]

  const uniqueOrderedKeys = [...new Set(orderedKeys)]

  function updateState(key: string, value: string | boolean | number) {
    setState((current) => ({ ...current, [key]: value }))
  }

  const previewContext = createPlaygroundRenderContext(state, updateState)

  function renderControl(key: string) {
    if (entry.showWhen?.[key] && !entry.showWhen[key](state)) {
      return null
    }

    const prop = findSpecProp(properties, key)
    const description = prop?.description

    if (textKeys.has(key)) {
      const label =
        key === "label"
          ? isIconOnlyLabel(state)
            ? "aria-label"
            : "children"
          : key
      return (
        <PlaygroundField key={key} label={label} description={description}>
          <Input
            value={String(state[key] ?? "")}
            onChange={(event) => updateState(key, event.target.value)}
          />
        </PlaygroundField>
      )
    }

    if (numberKeys.has(key)) {
      const field = numberKeys.get(key)!
      return (
        <PlaygroundField
          key={key}
          label={field.label ?? key}
          description={description}
        >
          <div className="space-y-2">
            <Slider
              value={[Number(state[key] ?? field.min)]}
              min={field.min}
              max={field.max}
              step={field.step ?? 1}
              onValueChange={(values) => {
                const next = Array.isArray(values) ? values[0] : values
                updateState(key, next ?? field.min)
              }}
            />
            <p className="text-center font-mono text-sm text-muted-foreground">
              {Number(state[key] ?? field.min)}
            </p>
          </div>
        </PlaygroundField>
      )
    }

    const options =
      selectKeys[key] ??
      (prop && isFiniteEnumProp(prop) ? prop.values : undefined)

    if (options) {
      return (
        <PlaygroundField key={key} label={key} description={description}>
          <Select
            value={String(state[key] ?? options[0])}
            onValueChange={(value) => {
              if (value) updateState(key, value)
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((value) => (
                <SelectItem key={value} value={value}>
                  {formatPlaygroundOption(prop, value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PlaygroundField>
      )
    }

    if (booleanKeys.includes(key)) {
      return (
        <PlaygroundSwitch
          key={key}
          label={key}
          checked={state[key] === true || state[key] === "true"}
          onCheckedChange={(checked) => updateState(key, checked)}
        />
      )
    }

    return null
  }

  const primaryControls = uniqueOrderedKeys
    .filter((key) => !booleanKeys.includes(key))
    .map(renderControl)
    .filter(Boolean)

  const booleanControls = booleanKeys.map(renderControl).filter(Boolean)

  return (
    <PlaygroundShell>
      <PlaygroundLayout
        previewClassName={entry.getPreviewClassName?.(state)}
        code={code}
        controls={
          <>
            {primaryControls}
            {booleanControls.length > 0 ? (
              <div className="space-y-3 border-t border-border pt-3">
                {booleanControls}
              </div>
            ) : null}
          </>
        }
        preview={entry.renderPreview(state, previewContext)}
      />
    </PlaygroundShell>
  )
}

function isIconOnlyLabel(state: PlaygroundState) {
  const size = String(state.size ?? "")
  return size === "icon" || size.startsWith("icon-")
}
