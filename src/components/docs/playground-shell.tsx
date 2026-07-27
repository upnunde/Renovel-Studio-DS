"use client"

import { useState } from "react"
import type { ReactNode } from "react"

import { ShowcaseBlock } from "@/components/docs/showcase-block"
import { Button } from "design-system/ui/button"
import { Label } from "design-system/ui/label"
import { Switch } from "design-system/ui/switch"
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
    <div className="grid gap-0 lg:grid-cols-[17rem_minmax(0,1fr)]">
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
            "flex min-h-[400px] w-full flex-1 items-center justify-center",
            docsSpace.previewGap,
            docsSpace.playgroundPreviewPad,
            previewClassName
          )}
        >
          {preview}
        </div>

        <PlaygroundCodeSection code={code} />
      </div>
    </div>
  )
}

function PlaygroundCodeSection({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={cn("border-t border-border bg-muted/20", docsSpace.pad)}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className={docsType.codeLabel}>Code</p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 shrink-0 px-2 text-xs"
          onClick={handleCopy}
          disabled={!code}
        >
          {copied ? "복사됨" : "복사"}
        </Button>
      </div>
      <pre
        className={cn(
          "h-[160px] overflow-x-auto overflow-y-auto rounded-lg border border-border bg-background",
          docsSpace.pad,
          docsType.code
        )}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function PlaygroundField({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className={docsSpace.fieldStack}>
      <Label className={docsType.tokenName}>{label}</Label>
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
