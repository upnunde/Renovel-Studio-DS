"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { uiDisabledField, uiDisabledFieldGroup, uiReadOnlyField, readOnlyFieldHandlers } from "../../lib/ui-disabled"
import {
  InputClearButton,
  clearNativeInputValue,
  inputEndActionPadding,
} from "./input-clear-button"

const inputVariants = cva(
  `peer/input w-full min-w-0 rounded-lg border border-border-emphasis bg-transparent px-2.5 py-0 text-foreground transition-colors duration-short ease-standard outline-none file:mr-3 file:inline-flex file:items-center file:border-0 file:bg-transparent file:px-0 file:py-0 file:text-body3_500 file:text-foreground placeholder:text-foreground-placeholder focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${uiDisabledField} ${uiReadOnlyField} aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40`,
  {
    variants: {
      size: {
        sm: "h-8 rounded-[min(var(--radius-md),12px)] px-2 text-body4_400 !leading-8",
        default: "h-9 text-body3_400 !leading-9",
        xl: "h-10 px-3 text-body2_400 !leading-10",
        "2xl": "h-12 px-3 text-body1_400 !leading-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    /** 값이 있을 때 우측 지우기 버튼 · file 타입은 제외 */
    clearable?: boolean
  }

function Input({
  className,
  type,
  size = "default",
  clearable = true,
  disabled,
  readOnly,
  value,
  defaultValue,
  onChange,
  tabIndex,
  onFocus,
  onMouseDown,
  ...props
}: InputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState(
    String(defaultValue ?? "")
  )
  const current = isControlled ? String(value ?? "") : internalValue
  const showClear =
    clearable &&
    !disabled &&
    !readOnly &&
    type !== "file" &&
    type !== "hidden" &&
    current.length > 0

  const control = (
    <InputPrimitive
      ref={inputRef}
      type={type}
      data-slot="input"
      disabled={disabled}
      readOnly={readOnly}
      value={isControlled ? value : internalValue}
      onChange={(event) => {
        if (!isControlled) setInternalValue(event.target.value)
        onChange?.(event)
      }}
      className={cn(
        inputVariants({ size }),
        type === "number" &&
          "[appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
        showClear && inputEndActionPadding(1),
        className
      )}
      {...props}
      {...readOnlyFieldHandlers(readOnly, { tabIndex, onFocus, onMouseDown })}
    />
  )

  if (!clearable || type === "file" || type === "hidden") {
    return control
  }

  return (
    <div data-slot="input-root" className="relative w-full">
      {control}
      {showClear ? (
        <InputClearButton
          size={size}
          disabled={disabled}
          className="right-1"
          onClick={(event) => {
            event.preventDefault()
            const input = inputRef.current
            if (!input) return
            if (!isControlled) setInternalValue("")
            clearNativeInputValue(input, onChange)
          }}
        />
      ) : null}
    </div>
  )
}

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        /* FieldLabel↔Input · Input↔Hypertext 모두 8px (formFieldGapTight). 크기별 재정의 금지 */
        "grid w-full gap-2",
        uiDisabledFieldGroup,
        className
      )}
      {...props}
    />
  )
}

const inputHypertextVariants = cva("text-body4_400", {
  variants: {
    variant: {
      default: "text-foreground-placeholder peer-aria-invalid/input:text-destructive",
      error: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function InputHypertext({
  className,
  variant = "default",
  count,
  max,
  children,
  ...props
}: Omit<React.ComponentProps<"p">, "children"> &
  VariantProps<typeof inputHypertextVariants> & {
    children?: React.ReactNode
    /** 현재 글자 수 — `max`와 함께 지정 시 우측에 `count/max` 표시 */
    count?: number
    /** 최대 글자 수 */
    max?: number
  }) {
  const message = children
  const showCount = max != null

  if (!showCount) {
    return (
      <p
        data-slot="input-hypertext"
        className={cn("px-3", inputHypertextVariants({ variant }), className)}
        {...props}
      >
        {message}
      </p>
    )
  }

  return (
    <div
      data-slot="input-hypertext"
      className={cn(
        "flex items-start justify-between gap-2 px-3",
        inputHypertextVariants({ variant }),
        className
      )}
      {...(props as React.ComponentProps<"div">)}
    >
      {message ? (
        <p className="min-w-0 flex-1">{message}</p>
      ) : (
        <span className="min-w-0 flex-1" aria-hidden />
      )}
      <span
        className="shrink-0 tabular-nums text-foreground-placeholder"
        aria-live="polite"
      >
        {count ?? 0}/{max}
      </span>
    </div>
  )
}

export { Input, InputGroup, InputHypertext, inputHypertextVariants, inputVariants }
export type { InputProps }
