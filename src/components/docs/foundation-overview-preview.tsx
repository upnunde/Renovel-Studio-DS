import type { ReactNode } from "react"

import { ICONS } from "@/components/icons"
import { Icon } from "design-system/ui/icon"
import { cn } from "@/lib/utils"

const previewShell =
  "pointer-events-none flex w-full max-w-full min-w-0 min-h-28 items-center justify-center select-none"

export type FoundationOverviewId =
  | "color-tokens"
  | "color-semantic"
  | "spacing"
  | "spacing-semantic"
  | "typography"
  | "icons"
  | "radius"
  | "elevation"
  | "motion"

function PreviewColorTokens() {
  return (
    <div className={cn(previewShell, "gap-2")}>
      {["bg-primary", "bg-accent", "bg-muted", "bg-destructive", "bg-inverse"].map(
        (swatch) => (
          <span
            key={swatch}
            className={cn("size-8 rounded-md border border-border", swatch)}
            aria-hidden
          />
        )
      )}
    </div>
  )
}

function PreviewColorSemantic() {
  return (
    <div className={cn(previewShell, "flex-wrap gap-2 px-2")}>
      <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
        Primary
      </span>
      <span className="rounded-md bg-background-muted px-2.5 py-1 text-xs font-medium text-foreground">
        Secondary
      </span>
      <span className="rounded-md bg-destructive-container px-2.5 py-1 text-xs font-medium text-destructive-container-foreground">
        Destructive
      </span>
    </div>
  )
}

function PreviewSpacing() {
  return (
    <div className={previewShell}>
      <div className="flex items-end gap-1.5">
        <span className="h-2 w-3 rounded-sm bg-primary/70" aria-hidden />
        <span className="h-3 w-3 rounded-sm bg-primary/70" aria-hidden />
        <span className="h-4 w-3 rounded-sm bg-primary/70" aria-hidden />
        <span className="h-5 w-3 rounded-sm bg-primary/70" aria-hidden />
        <span className="h-6 w-3 rounded-sm bg-primary/70" aria-hidden />
        <span className="h-8 w-3 rounded-sm bg-primary/70" aria-hidden />
      </div>
    </div>
  )
}

function PreviewSpacingSemantic() {
  return (
    <div className={previewShell}>
      <div className="flex w-full max-w-48 flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-caption1_500 text-foreground-muted">gap</span>
          <div className="flex flex-1 gap-2">
            <span className="h-6 flex-1 rounded-md bg-background-muted" />
            <span className="h-6 flex-1 rounded-md bg-background-muted" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-caption1_500 text-foreground-muted">pad</span>
          <div className="flex flex-1 rounded-md border border-dashed border-border p-2">
            <span className="h-5 flex-1 rounded-sm bg-primary/20" />
          </div>
        </div>
      </div>
    </div>
  )
}

function PreviewTypography() {
  return (
    <div className={cn(previewShell, "flex-col gap-1")}>
      <span className="text-heading4_700 text-foreground">Aa</span>
      <span className="text-body3_500 text-foreground-muted">Body · Caption</span>
    </div>
  )
}

function PreviewIcons() {
  return (
    <div className={cn(previewShell, "gap-3 text-foreground-muted")}>
      <Icon icon={ICONS.check} size="md" />
      <Icon icon={ICONS.search} size="md" />
      <Icon icon={ICONS.settings2} size="md" />
      <Icon icon={ICONS.chevronRight} size="md" />
    </div>
  )
}

function PreviewRadius() {
  return (
    <div className={cn(previewShell, "gap-3")}>
      <span className="size-10 rounded-none border border-border bg-background-muted" aria-hidden />
      <span className="size-10 rounded-md border border-border bg-background-muted" aria-hidden />
      <span className="size-10 rounded-xl border border-border bg-background-muted" aria-hidden />
      <span className="size-10 rounded-full border border-border bg-background-muted" aria-hidden />
    </div>
  )
}

function PreviewElevation() {
  return (
    <div className={cn(previewShell, "gap-3")}>
      <span
        className="size-10 rounded-lg border border-border bg-background shadow-elevation-10"
        aria-hidden
      />
      <span
        className="size-10 rounded-lg border border-border bg-background shadow-elevation-30"
        aria-hidden
      />
      <span
        className="size-10 rounded-lg border border-border bg-background shadow-elevation-50"
        aria-hidden
      />
    </div>
  )
}

function PreviewMotion() {
  return (
    <div className={cn(previewShell, "gap-3")}>
      <span className="size-3 rounded-full bg-primary animate-pulse" aria-hidden />
      <div className="flex flex-col gap-1">
        <span className="text-caption1_500 text-foreground">short · medium · long</span>
        <span className="h-1.5 w-28 overflow-hidden rounded-full bg-background-muted">
          <span className="block h-full w-2/3 rounded-full bg-primary/80" />
        </span>
      </div>
    </div>
  )
}

const previewById: Record<FoundationOverviewId, () => ReactNode> = {
  "color-tokens": PreviewColorTokens,
  "color-semantic": PreviewColorSemantic,
  spacing: PreviewSpacing,
  "spacing-semantic": PreviewSpacingSemantic,
  typography: PreviewTypography,
  icons: PreviewIcons,
  radius: PreviewRadius,
  elevation: PreviewElevation,
  motion: PreviewMotion,
}

export function FoundationOverviewPreview({ id }: { id: FoundationOverviewId }) {
  const Preview = previewById[id]
  return (
    <div className="flex min-h-36 w-full min-w-0 max-w-full items-center justify-center overflow-hidden">
      {Preview ? <Preview /> : null}
    </div>
  )
}
