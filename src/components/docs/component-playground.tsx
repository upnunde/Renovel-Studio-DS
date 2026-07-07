"use client"

import { useEffect, useMemo, useState } from "react"

import { Input } from "design-system/ui/input"
import { Slider } from "design-system/ui/slider"
import { DocsFilterChips } from "@/components/docs/docs-filter-chips"
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
  buildPlaygroundInitialState,
  classifyPlaygroundControlKey,
  createPlaygroundRenderContext,
  findSpecProp,
  formatPlaygroundOption,
  getPlaygroundControlLabel,
  resolvePlaygroundControlKeys,
  sortPlaygroundOptionValues,
} from "./playground-utils"

export function ComponentPlayground({ slug }: { slug: string }) {
  const entry = getPlaygroundEntry(slug)
  const spec = getComponentCaseSpec(slug)

  const mergedInitialState = useMemo(
    () =>
      entry && spec ? buildPlaygroundInitialState(spec.properties, entry) : {},
    [entry, spec]
  )

  const [state, setState] = useState<PlaygroundState>(
    () => mergedInitialState
  )

  useEffect(() => {
    setState(mergedInitialState)
  }, [slug, mergedInitialState])

  const code = useMemo(() => entry?.buildCode(state) ?? "", [entry, state])

  if (!entry || !spec) return null

  const properties = spec.properties
  const controlKeys = resolvePlaygroundControlKeys(properties, entry)

  const booleanKeys = controlKeys.filter(
    (key) => classifyPlaygroundControlKey(key, properties, entry) === "boolean"
  )

  const orderedKeys = [
    ...controlKeys.filter((key) => !booleanKeys.includes(key)),
    ...booleanKeys,
  ]

  const uniqueOrderedKeys = [...new Set(orderedKeys)]

  function updateState(key: string, value: string | boolean | number) {
    setState((current) => {
      const next = { ...current, [key]: value }
      if (slug === "tabs" && key === "tabCount") {
        const count = Math.min(4, Math.max(2, Number(value) || 2))
        const tabValues = ["tab-1", "tab-2", "tab-3", "tab-4"].slice(0, count)
        const currentDefault = String(next.defaultValue ?? "tab-1")
        if (!tabValues.includes(currentDefault)) {
          next.defaultValue = tabValues[0]
        }
      }
      if (
        (slug === "input" || slug === "label" || slug === "textarea") &&
        (key === "hypertextMax" || key === "hypertextCount")
      ) {
        const max = Number(next.hypertextMax)
        if (max > 0) {
          const count = Number(next.hypertextCount) || 0
          next.hypertextCount = Math.min(max, Math.max(0, count))
        }
      }
      return next
    })
  }

  const previewContext = createPlaygroundRenderContext(state, updateState)

  function renderControl(key: string) {
    if (entry.showWhen?.[key] && !entry.showWhen[key](state)) {
      return null
    }

    const kind = classifyPlaygroundControlKey(key, properties, entry)
    if (kind === "skip") return null

    const prop = findSpecProp(properties, key)
    const numberField = entry.numberKeys?.find((field) => field.key === key)

    if (kind === "text") {
      return (
        <PlaygroundField key={key} label={getPlaygroundControlLabel(slug, key, state)}>
          <Input
            value={String(state[key] ?? "")}
            onChange={(event) => updateState(key, event.target.value)}
          />
        </PlaygroundField>
      )
    }

    if (kind === "number" && numberField) {
      return (
        <PlaygroundField
          key={key}
          label={numberField.label ?? key}
        >
          <div className="space-y-2">
            <Slider
              value={[Number(state[key] ?? numberField.min)]}
              min={numberField.min}
              max={numberField.max}
              step={numberField.step ?? 1}
              onValueChange={(values) => {
                const next = Array.isArray(values) ? values[0] : values
                updateState(key, next ?? numberField.min)
              }}
            />
            <p className="text-center font-mono text-sm text-foreground-muted">
              {Number(state[key] ?? numberField.min)}
            </p>
          </div>
        </PlaygroundField>
      )
    }

    if (kind === "select") {
      const rawOptions =
        entry.selectKeys?.[key] ??
        (prop ? sortPlaygroundOptionValues(prop.values, key) : undefined)

      if (!rawOptions?.length) return null

      const filteredOptions =
        entry.filterSelectOptions?.(state, key, rawOptions) ?? rawOptions
      const options = sortPlaygroundOptionValues(filteredOptions, key)
      const rawValue = String(state[key] ?? options[0])
      const value = options.includes(rawValue) ? rawValue : options[0]
      return (
        <PlaygroundField key={key} label={key}>
          <DocsFilterChips
            size="sm"
            value={value}
            onValueChange={(next) => updateState(key, next)}
            options={options.map((option) => ({
              value: option,
              label: formatPlaygroundOption(prop, option),
            }))}
          />
        </PlaygroundField>
      )
    }

    if (kind === "boolean") {
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

  const controls = (() => {
    if (entry.controlGroups?.length) {
      const groupedKeys = new Set(entry.controlGroups.flat())
      const leftovers = uniqueOrderedKeys.filter((key) => !groupedKeys.has(key))
      const groups = leftovers.length
        ? [...entry.controlGroups, leftovers]
        : entry.controlGroups
      const renderedGroups = groups
        .map((keys) => keys.map(renderControl).filter(Boolean))
        .filter((rendered) => rendered.length > 0)
      return (
        <>
          {renderedGroups.map((rendered, index) => (
            <div
              key={index}
              className={
                index === 0
                  ? "space-y-3"
                  : "space-y-3 border-t border-border pt-3"
              }
            >
              {rendered}
            </div>
          ))}
        </>
      )
    }

    const primaryControls = uniqueOrderedKeys
      .filter((key) => !booleanKeys.includes(key))
      .map(renderControl)
      .filter(Boolean)
    const booleanControls = booleanKeys.map(renderControl).filter(Boolean)
    return (
      <>
        {primaryControls}
        {booleanControls.length > 0 ? (
          <div className="space-y-3 border-t border-border pt-3">
            {booleanControls}
          </div>
        ) : null}
      </>
    )
  })()

  return (
    <PlaygroundShell>
      <PlaygroundLayout
        previewClassName={entry.getPreviewClassName?.(state)}
        code={code}
        controls={controls}
        preview={entry.renderPreview(state, previewContext)}
      />
    </PlaygroundShell>
  )
}
