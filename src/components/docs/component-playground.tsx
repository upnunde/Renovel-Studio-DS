"use client"

import { useEffect, useMemo, useState } from "react"

import { Input } from "design-system/ui/input"
import { Slider } from "design-system/ui/slider"
import { DocsFilterChips } from "@/components/docs/docs-filter-chips"
import { getComponentCaseSpec } from "@/lib/component-case-specs"
import { formatPlaygroundSnippet } from "@/lib/playground-snippet"

import { getPlaygroundEntry } from "./playground-registry"
import {
  PlaygroundField,
  PlaygroundLayout,
  PlaygroundShell,
  PlaygroundSwitch,
} from "./playground-shell"
import type { PlaygroundState } from "./playground-utils"
import {
  buildPlaygroundControlGroups,
  buildPlaygroundInitialState,
  clampAvatarInitials,
  classifyPlaygroundControlKey,
  createPlaygroundRenderContext,
  findSpecProp,
  formatPlaygroundNumberValue,
  formatPlaygroundOption,
  getPlaygroundControlLabel,
  playgroundGroupUsesToggleNest,
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

  const code = useMemo(
    () => (entry ? formatPlaygroundSnippet(entry.buildCode(state)) : ""),
    [entry, state]
  )

  if (!entry || !spec) return null

  const properties = spec.properties
  const controlKeys = resolvePlaygroundControlKeys(properties, entry)

  function updateState(key: string, value: string | boolean | number) {
    setState((current) => {
      const next = { ...current, [key]: value }
      if (slug === "textarea" && key === "rows") {
        next.rows = Math.min(8, Math.max(4, Number(value) || 4))
      }
      if (slug === "avatar" && key === "initials") {
        next.initials = clampAvatarInitials(String(value))
      }
      if (
        (slug === "input" || slug === "textarea") &&
        (key === "hypertextMax" || key === "hypertextCount")
      ) {
        const max = Number(next.hypertextMax)
        if (max > 0) {
          const count = Number(next.hypertextCount) || 0
          next.hypertextCount = Math.min(max, Math.max(0, count))
        }
      }
      if (
        slug === "slider" &&
        (key === "min" ||
          key === "max" ||
          key === "value" ||
          key === "valueEnd" ||
          key === "step")
      ) {
        const min = Number(next.min) || 0
        let max = Number(next.max)
        if (!Number.isFinite(max)) max = min
        if (max < min) {
          next.max = min
          max = min
        }
        const step = Math.max(1, Number(next.step) || 1)
        next.step = step
        next.value = Math.min(max, Math.max(min, Number(next.value) || min))
        next.valueEnd = Math.min(
          max,
          Math.max(min, Number(next.valueEnd) || min)
        )
      }
      // Button link — 아이콘 type 불가, text로 되돌림
      if (slug === "button" && key === "variant" && value === "link") {
        next.type = "text"
      }
      if (slug === "tabs" && (key === "tabCount" || key === "defaultValue")) {
        const count = Math.min(4, Math.max(2, Number(next.tabCount) || 3))
        next.tabCount = String(count)
        const allowed = ["tab-1", "tab-2", "tab-3", "tab-4"].slice(0, count)
        const active = String(next.defaultValue)
        if (!allowed.includes(active)) {
          next.defaultValue = allowed[0]
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
      const min = numberField.minFromState
        ? numberField.minFromState(state)
        : numberField.min
      const max = numberField.maxFromState
        ? numberField.maxFromState(state)
        : numberField.max
      const boundedMax = Math.max(min, max)
      const step = Math.max(
        1,
        numberField.stepFromState
          ? numberField.stepFromState(state)
          : (numberField.step ?? 1)
      )
      const current = Math.min(
        boundedMax,
        Math.max(min, Number(state[key] ?? min))
      )
      const label =
        numberField.label ?? getPlaygroundControlLabel(slug, key, state)
      const useInput = numberField.control === "input"

      return (
        <PlaygroundField key={key} label={label}>
          {useInput ? (
            <Input
              type="number"
              clearable={false}
              inputMode="numeric"
              min={min}
              max={boundedMax}
              step={step}
              value={Number.isFinite(current) ? current : min}
              onChange={(event) => {
                const raw = event.target.value
                if (raw === "") {
                  updateState(key, min)
                  return
                }
                const next = Number(raw)
                if (Number.isNaN(next)) return
                updateState(key, Math.min(boundedMax, Math.max(min, next)))
              }}
            />
          ) : (
            <Slider
              type="default"
              min={min}
              max={boundedMax}
              step={step}
              value={[current]}
              onValueChange={(values) => {
                const next = Array.isArray(values) ? values[0] : values
                updateState(key, Number(next) || min)
              }}
            />
          )}
          <p className="mt-1 text-right font-mono text-sm text-foreground-muted tabular-nums">
            {formatPlaygroundNumberValue(current, min, boundedMax)}
          </p>
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
          label={getPlaygroundControlLabel(slug, key, state)}
          checked={state[key] === true || state[key] === "true"}
          onCheckedChange={(checked) => updateState(key, checked)}
        />
      )
    }

    return null
  }

  function renderControlGroup(keys: string[], groupIndex: number) {
    const visibleKeys = keys.filter(
      (key) => !entry.showWhen?.[key] || entry.showWhen[key](state)
    )
    if (visibleKeys.length === 0) return null

    const useToggleNest = playgroundGroupUsesToggleNest(
      keys,
      properties,
      entry,
      mergedInitialState
    )

    if (useToggleNest) {
      const [anchorKey, ...childKeys] = keys
      const childNodes = childKeys.map(renderControl).filter(Boolean)
      return (
        <div key={`${anchorKey}-${groupIndex}`} className="space-y-3">
          {renderControl(anchorKey)}
          {childNodes.length > 0 ? (
            <div className="space-y-3">{childNodes}</div>
          ) : null}
        </div>
      )
    }

    const nodes = keys.map(renderControl).filter(Boolean)
    if (nodes.length === 0) return null

    return (
      <div key={groupIndex} className="space-y-3">
        {nodes}
      </div>
    )
  }

  const controlGroups = buildPlaygroundControlGroups(
    controlKeys,
    properties,
    entry,
    mergedInitialState
  )

  const controls = (
    <>
      {controlGroups.map((group, index) => {
        const rendered = renderControlGroup(group, index)
        if (!rendered) return null
        return (
          <div
            key={index}
            className={
              index === 0 ? undefined : "border-t border-border pt-3 space-y-3"
            }
          >
            {rendered}
          </div>
        )
      })}
    </>
  )

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
