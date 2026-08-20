"use client"

import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { uiDisabledField } from "../../lib/ui-disabled"
import { ICONS } from "../icons"
import { Icon } from "./icon"
import { InputClearButton, inputEndActionPaddingWhenFocused } from "./input-clear-button"
import { inputVariants } from "./input"

type FileInputProps = Omit<React.ComponentProps<"input">, "size" | "type"> &
  VariantProps<typeof inputVariants>

function FileInput({
  className,
  size = "default",
  disabled,
  id,
  onChange,
  placeholder = "파일을 선택하세요",
  "aria-invalid": ariaInvalid,
  ...props
}: FileInputProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [fileLabel, setFileLabel] = React.useState("")

  function updateLabel(files: FileList | null) {
    if (!files?.length) {
      setFileLabel("")
    } else if (files.length === 1) {
      setFileLabel(files[0]?.name ?? "")
    } else {
      setFileLabel(`${files.length}개 파일`)
    }
  }

  function clearFile(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    const input = inputRef.current
    if (!input) return
    input.value = ""
    setFileLabel("")
    onChange?.({
      ...event,
      target: input,
      currentTarget: input,
    } as unknown as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <div data-slot="file-input" className="group/input-root relative w-full">
      <input
        {...props}
        ref={inputRef}
        id={inputId}
        type="file"
        data-slot="input"
        disabled={disabled}
        aria-invalid={ariaInvalid}
        className="peer/input sr-only"
        onChange={(event) => {
          updateLabel(event.target.files)
          onChange?.(event)
        }}
      />
      <label
        htmlFor={inputId}
        data-slot="file-input-trigger"
        aria-disabled={disabled || undefined}
        className={cn(
          inputVariants({ size }),
          "flex cursor-pointer items-center gap-2",
          fileLabel && inputEndActionPaddingWhenFocused(1),
          uiDisabledField,
          "peer-disabled/input:pointer-events-none peer-disabled/input:cursor-not-allowed peer-disabled/input:border-disabled-border peer-disabled/input:bg-disabled peer-disabled/input:text-disabled-foreground",
          "peer-aria-invalid/input:border-destructive peer-aria-invalid/input:ring-3 peer-aria-invalid/input:ring-destructive/20",
          className
        )}
      >
        <Icon
          icon={ICONS.file}
          size="md"
          className="shrink-0 text-foreground"
          aria-hidden
        />
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-left",
            !fileLabel && "text-foreground-placeholder"
          )}
        >
          {fileLabel || placeholder}
        </span>
      </label>
      {fileLabel && !disabled ? (
        <InputClearButton
          size={size}
          className="right-1"
          onClick={clearFile}
        />
      ) : null}
    </div>
  )
}

export { FileInput }
