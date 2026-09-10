"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { uiDisabledBlock } from "../../lib/ui-disabled"

/**
 * size = 트랙 높이 (sm_h16 · default_h20 · md_h24)
 * tone = 켜짐 색 (neutral · brand)
 *
 * size별 트랙 · thumb · 이동량 (p-0.5 = 2px 균일 inset)
 * sm      h16×w28 · thumb 12 · travel 12
 * default h20×w36 · thumb 16 · travel 16
 * md      h24×w44 · thumb 20 · travel 20
 */
const switchVariants = cva(
  `peer group/switch relative inline-flex shrink-0 items-center rounded-full p-0.5 transition-all duration-short ease-standard outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 data-unchecked:bg-border-emphasis dark:data-unchecked:bg-border-emphasis/80 ${uiDisabledBlock} data-disabled:data-unchecked:bg-disabled`,
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        default: "h-5 w-9",
        md: "h-6 w-11",
      },
      tone: {
        /** 중립 ON — Button default/neutral · Chip pressed와 동일 inverse-muted */
        neutral:
          "data-checked:bg-inverse-muted data-disabled:data-checked:bg-inverse-muted/40",
        /** 브랜드 ON — primary (기존 Switch 기본 표현) */
        brand: "data-checked:bg-primary data-disabled:data-checked:bg-primary/40",
      },
    },
    defaultVariants: {
      size: "default",
      tone: "brand",
    },
  }
)

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background ring-0 transition-transform duration-short ease-standard data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground",
  {
    variants: {
      size: {
        sm: "size-3 group-data-checked/switch:translate-x-3",
        default: "size-4 group-data-checked/switch:translate-x-4",
        md: "size-5 group-data-checked/switch:translate-x-5",
      },
      tone: {
        neutral: "dark:group-data-checked/switch:bg-inverse-muted-foreground",
        brand: "dark:group-data-checked/switch:bg-primary-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      tone: "brand",
    },
  }
)

type SwitchTone = NonNullable<VariantProps<typeof switchVariants>["tone"]>
type SwitchSize = NonNullable<VariantProps<typeof switchVariants>["size"]>

type SwitchProps = SwitchPrimitive.Root.Props &
  VariantProps<typeof switchVariants>

function Switch({
  className,
  size = "default",
  tone = "brand",
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      data-tone={tone}
      className={cn(switchVariants({ size, tone }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(switchThumbVariants({ size, tone }))}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch, switchVariants }
export type { SwitchProps, SwitchTone, SwitchSize }
