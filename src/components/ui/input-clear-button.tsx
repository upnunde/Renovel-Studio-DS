"use client"

import * as React from "react"

import { cn } from "../../lib/utils"
import { ICONS } from "../icons"
import { Button } from "./button"
import { Icon } from "./icon"

type InputSize = "sm" | "default" | "xl" | "2xl" | null | undefined

export function inputEndActionSize(size: InputSize): "icon-xs" | "icon-sm" {
  switch (size) {
    case "sm":
      return "icon-xs"
    case "xl":
    case "2xl":
      return "icon-sm"
    default:
      return "icon-sm"
  }
}

/** 우측 액션 1개 · 2개일 때 input padding */
export function inputEndActionPadding(actionCount: 0 | 1 | 2) {
  if (actionCount >= 2) return "pe-16"
  if (actionCount === 1) return "pe-9"
  return undefined
}

function InputClearButton({
  size = "default",
  disabled,
  className,
  onClick,
}: {
  size?: InputSize
  disabled?: boolean
  className?: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size={inputEndActionSize(size)}
      disabled={disabled}
      aria-label="입력 내용 지우기"
      tabIndex={-1}
      data-slot="input-clear"
      className={cn(
        "absolute top-1/2 z-10 -translate-y-1/2 text-foreground-muted hover:text-foreground",
        className
      )}
      onClick={onClick}
    >
      <Icon icon={ICONS.close} size="sm" />
    </Button>
  )
}

function clearNativeInputValue(
  input: HTMLInputElement,
  onChange?: React.ChangeEventHandler<HTMLInputElement>
) {
  const descriptor = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )
  descriptor?.set?.call(input, "")
  input.dispatchEvent(new Event("input", { bubbles: true }))
  onChange?.({
    target: input,
    currentTarget: input,
  } as React.ChangeEvent<HTMLInputElement>)
}

export { InputClearButton, clearNativeInputValue }
