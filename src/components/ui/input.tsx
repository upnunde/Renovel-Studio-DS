import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { uiDisabledField } from "../../lib/ui-disabled"

const inputVariants = cva(
  `peer/input w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors duration-short ease-standard outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-foreground-placeholder focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${uiDisabledField} aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40`,
  {
    variants: {
      size: {
        sm: "h-8 rounded-[min(var(--radius-md),12px)] px-2 text-[0.8rem]",
        default: "h-9",
        lg: "h-[42px]",
        xl: "h-10 px-3",
        "2xl": "h-12 px-3 text-base md:text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Input({
  className,
  type,
  size = "default",
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  )
}

const inputHypertextVariants = cva("text-body4_400", {
  variants: {
    variant: {
      default: "text-foreground-muted peer-aria-invalid/input:text-destructive",
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
        className={cn(inputHypertextVariants({ variant }), className)}
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
        "flex items-start justify-between gap-2",
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
        className="shrink-0 tabular-nums text-foreground-muted"
        aria-live="polite"
      >
        {count ?? 0}/{max}
      </span>
    </div>
  )
}

export { Input, InputGroup, InputHypertext, inputHypertextVariants, inputVariants }
