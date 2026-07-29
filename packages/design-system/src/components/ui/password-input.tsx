"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import type { VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { ICONS } from "../icons"
import { Button } from "./button"
import { Icon } from "./icon"
import {
  InputClearButton,
  clearNativeInputValue,
  inputEndActionPadding,
  inputEndActionSize,
} from "./input-clear-button"
import { inputVariants } from "./input"

type PasswordInputProps = Omit<React.ComponentProps<"input">, "size" | "type"> &
  VariantProps<typeof inputVariants> & {
    clearable?: boolean
  }

function PasswordInput({
  className,
  size = "default",
  disabled,
  clearable = true,
  value,
  defaultValue,
  onChange,
  ...props
}: PasswordInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [visible, setVisible] = React.useState(false)
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState(
    String(defaultValue ?? "")
  )
  const current = isControlled ? String(value ?? "") : internalValue
  const showClear = clearable && !disabled && current.length > 0

  return (
    <div data-slot="password-input" className="relative w-full">
      <InputPrimitive
        ref={inputRef}
        type={visible ? "text" : "password"}
        data-slot="input"
        disabled={disabled}
        value={isControlled ? value : internalValue}
        onChange={(event) => {
          if (!isControlled) setInternalValue(event.target.value)
          onChange?.(event)
        }}
        className={cn(
          inputVariants({ size }),
          inputEndActionPadding(showClear ? 2 : 1),
          className
        )}
        {...props}
      />
      {showClear ? (
        <InputClearButton
          size={size}
          disabled={disabled}
          className="right-9"
          onClick={(event) => {
            event.preventDefault()
            const input = inputRef.current
            if (!input) return
            if (!isControlled) setInternalValue("")
            clearNativeInputValue(input, onChange)
          }}
        />
      ) : null}
      <Button
        type="button"
        variant="ghost"
        size={inputEndActionSize(size)}
        disabled={disabled}
        aria-label={visible ? "비밀번호 숨기기" : "비밀번호 표시"}
        aria-pressed={visible}
        tabIndex={-1}
        className="absolute top-1/2 right-1 z-10 -translate-y-1/2 text-foreground-muted hover:text-foreground"
        onClick={() => setVisible((currentVisible) => !currentVisible)}
      >
        <Icon icon={visible ? ICONS.eyeOff : ICONS.eye} size="sm" />
      </Button>
    </div>
  )
}

export { PasswordInput }
