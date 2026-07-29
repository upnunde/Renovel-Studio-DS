"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { uiDisabledControl } from "../../lib/ui-disabled"

type RadioSize = NonNullable<VariantProps<typeof radioGroupItemVariants>["size"]>

const RadioGroupSizeContext = React.createContext<RadioSize>("default")

const radioGroupItemVariants = cva(
  `group/radio-group-item peer relative flex aspect-square shrink-0 items-center justify-center rounded-full border border-input bg-background outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${uiDisabledControl} aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary`,
  {
    variants: {
      size: {
        /** default_h20 */
        default: "size-5",
        /** md_h24 */
        md: "size-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const radioGroupIndicatorVariants = cva("flex items-center justify-center", {
  variants: {
    size: {
      default: "size-2.5",
      md: "size-3",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const radioGroupDotVariants = cva("rounded-full bg-primary-foreground", {
  variants: {
    size: {
      default: "size-2.5",
      md: "size-3",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function RadioGroup({
  className,
  size = "default",
  ...props
}: RadioGroupPrimitive.Props & {
  size?: RadioSize
}) {
  return (
    <RadioGroupSizeContext.Provider value={size}>
      <RadioGroupPrimitive
        data-slot="radio-group"
        data-size={size}
        className={cn("flex w-fit flex-col gap-2", className)}
        {...props}
      />
    </RadioGroupSizeContext.Provider>
  )
}

function RadioGroupItem({
  className,
  size: sizeProp,
  ...props
}: RadioPrimitive.Root.Props & VariantProps<typeof radioGroupItemVariants>) {
  const sizeFromGroup = React.useContext(RadioGroupSizeContext)
  const size = sizeProp ?? sizeFromGroup

  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      data-size={size}
      className={cn(radioGroupItemVariants({ size }), className)}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={radioGroupIndicatorVariants({ size })}
      >
        <span className={radioGroupDotVariants({ size })} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem, radioGroupItemVariants }
export type { RadioSize }
