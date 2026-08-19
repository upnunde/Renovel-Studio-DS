"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { uiDisabledInteractive } from "../../lib/ui-disabled"

/**
 * variant = 표현 (default 면 없음 · outline 윤곽)
 * tone    = 선택 색 (neutral · brand)
 */
const toggleVariants = cva(
  `group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-short ease-standard outline-none hover:bg-muted hover:text-foreground data-[hovered=true]:bg-muted data-[hovered=true]:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 ${uiDisabledInteractive} aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 in-data-[slot=toggle-group]:rounded-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-border-emphasis bg-transparent hover:bg-muted hover:text-foreground data-[hovered=true]:bg-muted data-[hovered=true]:text-foreground",
      },
      tone: {
        /** 툴바·세그먼트 — 선택 면 muted-strong (Figma Flow, 아이콘색 유지) */
        neutral: "",
        /** 브랜드 강조 선택 — accent */
        brand: "",
      },
      size: {
        default:
          "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        sm: "h-8 min-w-8 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-4 in-data-[slot=toggle-group]:rounded-none",
        xl: "h-10 min-w-10 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        "2xl":
          "h-12 min-w-12 px-3 text-base has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
      },
    },
    compoundVariants: [
      {
        tone: "neutral",
        class:
          "aria-pressed:bg-muted-strong aria-pressed:text-muted-strong-foreground aria-pressed:hover:bg-muted-strong aria-pressed:hover:text-muted-strong-foreground aria-pressed:data-[hovered=true]:bg-muted-strong aria-pressed:data-[hovered=true]:text-muted-strong-foreground",
      },
      {
        tone: "brand",
        class:
          "aria-pressed:bg-accent aria-pressed:text-accent-foreground aria-pressed:hover:bg-accent/80 aria-pressed:data-[hovered=true]:bg-accent/80",
      },
    ],
    defaultVariants: {
      variant: "default",
      tone: "neutral",
      size: "default",
    },
  }
)

type ToggleTone = NonNullable<VariantProps<typeof toggleVariants>["tone"]>

type ToggleProps = TogglePrimitive.Props & VariantProps<typeof toggleVariants>

function Toggle({
  className,
  variant = "default",
  tone = "neutral",
  size = "default",
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      data-tone={tone}
      className={cn(toggleVariants({ variant, tone, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
export type { ToggleProps, ToggleTone }
