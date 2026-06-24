"use client"

import type { ReactNode } from "react"

import { ShowcaseBlock } from "@/components/docs/showcase-block"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

export function PlaygroundShell({ children }: { children: ReactNode }) {
  return (
    <ShowcaseBlock name="Playground" flush>
      {children}
    </ShowcaseBlock>
  )
}

export function PlaygroundLayout({
  controls,
  preview,
  code,
  previewClassName,
}: {
  controls: ReactNode
  preview: ReactNode
  code: string
  previewClassName?: string
}) {
  return (
    <div className="grid gap-0 lg:grid-cols-[minmax(0,17rem)_1fr]">
      <div
        className={cn(
          "border-b border-border lg:border-r lg:border-b-0",
          docsSpace.controlStack,
          docsSpace.pad
        )}
      >
        {controls}
      </div>

      <div className="flex min-h-48 flex-col">
        <div
          className={cn(
            "flex flex-1 flex-col items-center justify-center",
            docsSpace.previewGap,
            docsSpace.pad,
            previewClassName
          )}
        >
          {preview}
        </div>

        <div className={cn("border-t border-border bg-muted/20", docsSpace.pad)}>
          <p className={cn("pb-2", docsType.codeLabel)}>Code</p>
          <pre
            className={cn(
              "overflow-x-auto rounded-lg border border-border bg-background",
              docsSpace.pad,
              docsType.code
            )}
          >
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export function PlaygroundField({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: ReactNode
}) {
  return (
    <div className={docsSpace.fieldStack}>
      <Label className={docsType.tokenName}>{label}</Label>
      {description ? <p className={docsType.bodyMuted}>{description}</p> : null}
      {children}
    </div>
  )
}

export function PlaygroundSwitch({
  label,
  checked,
  onCheckedChange,
}: {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className={cn("flex items-center justify-between", docsSpace.gap)}>
      <Label htmlFor={`playground-${label}`} className={docsType.tokenName}>
        {label}
      </Label>
      <Switch
        id={`playground-${label}`}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  )
}
