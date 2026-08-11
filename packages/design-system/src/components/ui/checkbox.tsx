"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { uiDisabledControl } from "../../lib/ui-disabled"
import { Icon } from "./icon"
import { ICONS } from "../icons"

const checkboxVariants = cva(
  `peer relative flex shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors duration-short ease-standard outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${uiDisabledControl} aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary`,
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

type CheckboxSize = NonNullable<VariantProps<typeof checkboxVariants>["size"]>

function Checkbox({
  className,
  size = "default",
  ...props
}: CheckboxPrimitive.Root.Props & VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-size={size}
      className={cn(checkboxVariants({ size }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <Icon icon={ICONS.check} size="md" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox, checkboxVariants }
export type { CheckboxSize }
