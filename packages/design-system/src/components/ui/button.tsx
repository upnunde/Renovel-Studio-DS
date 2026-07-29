import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { uiDisabledInteractive } from "../../lib/ui-disabled"

/**
 * variant = 표현 방식 (채움·소프트·윤곽·고스트·링크)
 * tone    = 색 역할 (neutral·brand·success·warning·destructive)
 *
 * @deprecated variant="primary" → variant="default" tone="brand"
 * @deprecated status → tone (default→neutral, success|warning|destructive 동일)
 */
const buttonVariants = cva(
  `group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-short ease-standard outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${uiDisabledInteractive} aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
  {
    variants: {
      variant: {
        /** solid CTA — 색은 tone */
        default: "",
        secondary: "",
        outline: "",
        ghost: "",
        link: "underline underline-offset-4",
        /** @deprecated default + tone=brand 로 해석 */
        primary: "",
      },
      tone: {
        neutral: "",
        brand: "",
        success: "",
        warning: "",
        destructive: "",
      },
      shape: {
        circle: "rounded-full in-data-[slot=button-group]:rounded-none",
        square: "rounded-md in-data-[slot=button-group]:rounded-none",
      },
      size: {
        default:
          "h-9 min-w-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 min-w-6 gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 min-w-8 gap-1 px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-[42px] min-w-[42px] gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xl: "h-10 min-w-10 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        "2xl":
          "h-12 min-w-12 gap-2 px-3 text-base has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        icon: "aspect-square size-9 w-9 p-0",
        "icon-xs":
          "aspect-square size-6 w-6 p-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "aspect-square size-8 w-8 p-0",
        "icon-lg": "aspect-square size-[42px] w-[42px] p-0",
        "icon-xl": "aspect-square size-10 w-10 p-0",
        "icon-2xl":
          "aspect-square size-12 w-12 p-0 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    compoundVariants: [
      // —— solid (default) ——
      {
        variant: "default",
        tone: "neutral",
        class:
          "bg-inverse-muted text-inverse-muted-foreground hover:bg-inverse-muted/80 data-[hovered=true]:bg-inverse-muted/80",
      },
      {
        variant: "default",
        tone: "brand",
        class:
          "bg-primary text-primary-foreground hover:bg-primary/80 data-[hovered=true]:bg-primary/80",
      },
      {
        variant: "default",
        tone: "success",
        class:
          "bg-success text-success-foreground hover:bg-success/80 data-[hovered=true]:bg-success/80 focus-visible:border-success/40 focus-visible:ring-success/20",
      },
      {
        variant: "default",
        tone: "warning",
        class:
          "bg-warning text-warning-foreground hover:bg-warning/80 data-[hovered=true]:bg-warning/80 focus-visible:border-warning/40 focus-visible:ring-warning/20",
      },
      {
        variant: "default",
        tone: "destructive",
        class:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80 data-[hovered=true]:bg-destructive/80 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
      },

      // —— secondary (soft fill) ——
      {
        variant: "secondary",
        tone: "neutral",
        class:
          "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground data-[hovered=true]:bg-accent data-[hovered=true]:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground",
      },
      {
        variant: "secondary",
        tone: "brand",
        class:
          "bg-primary-container text-primary-container-foreground hover:bg-primary-container/80 data-[hovered=true]:bg-primary-container/80 focus-visible:border-primary/40 focus-visible:ring-primary/20",
      },
      {
        variant: "secondary",
        tone: "success",
        class:
          "bg-success/10 text-success hover:bg-success/20 data-[hovered=true]:bg-success/20 focus-visible:border-success/40 focus-visible:ring-success/20 dark:bg-success/20 dark:hover:bg-success/30 dark:data-[hovered=true]:bg-success/30",
      },
      {
        variant: "secondary",
        tone: "warning",
        class:
          "bg-warning/15 text-warning hover:bg-warning/25 data-[hovered=true]:bg-warning/25 focus-visible:border-warning/40 focus-visible:ring-warning/20 dark:bg-warning/20 dark:hover:bg-warning/30 dark:data-[hovered=true]:bg-warning/30",
      },
      {
        variant: "secondary",
        tone: "destructive",
        class:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 data-[hovered=true]:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:data-[hovered=true]:bg-destructive/30",
      },

      // —— outline ——
      {
        variant: "outline",
        tone: "neutral",
        class:
          "border-border bg-transparent hover:bg-accent hover:text-accent-foreground data-[hovered=true]:bg-accent data-[hovered=true]:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground dark:border-input dark:hover:bg-accent dark:data-[hovered=true]:bg-accent",
      },
      {
        variant: "outline",
        tone: "brand",
        class:
          "border-primary/40 bg-transparent text-primary hover:bg-primary/10 hover:text-primary data-[hovered=true]:bg-primary/10 data-[hovered=true]:text-primary focus-visible:border-primary/40 focus-visible:ring-primary/20",
      },
      {
        variant: "outline",
        tone: "success",
        class:
          "border-success/40 bg-transparent text-success hover:bg-success/10 hover:text-success data-[hovered=true]:bg-success/10 data-[hovered=true]:text-success focus-visible:border-success/40 focus-visible:ring-success/20 dark:hover:bg-success/15 dark:data-[hovered=true]:bg-success/15",
      },
      {
        variant: "outline",
        tone: "warning",
        class:
          "border-warning/40 bg-transparent text-warning hover:bg-warning/15 hover:text-warning data-[hovered=true]:bg-warning/15 data-[hovered=true]:text-warning focus-visible:border-warning/40 focus-visible:ring-warning/20 dark:hover:bg-warning/20 dark:data-[hovered=true]:bg-warning/20",
      },
      {
        variant: "outline",
        tone: "destructive",
        class:
          "border-destructive/40 bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive data-[hovered=true]:bg-destructive/10 data-[hovered=true]:text-destructive focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:hover:bg-destructive/15 dark:data-[hovered=true]:bg-destructive/15",
      },

      // —— ghost ——
      {
        variant: "ghost",
        tone: "neutral",
        class:
          "hover:bg-accent hover:text-accent-foreground data-[hovered=true]:bg-accent data-[hovered=true]:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground",
      },
      {
        variant: "ghost",
        tone: "brand",
        class:
          "text-primary hover:bg-primary/10 hover:text-primary data-[hovered=true]:bg-primary/10 data-[hovered=true]:text-primary focus-visible:border-primary/40 focus-visible:ring-primary/20",
      },
      {
        variant: "ghost",
        tone: "success",
        class:
          "bg-transparent text-success hover:bg-success/10 hover:text-success data-[hovered=true]:bg-success/10 data-[hovered=true]:text-success focus-visible:border-success/40 focus-visible:ring-success/20",
      },
      {
        variant: "ghost",
        tone: "warning",
        class:
          "bg-transparent text-warning hover:bg-warning/15 hover:text-warning data-[hovered=true]:bg-warning/15 data-[hovered=true]:text-warning focus-visible:border-warning/40 focus-visible:ring-warning/20",
      },
      {
        variant: "ghost",
        tone: "destructive",
        class:
          "bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive data-[hovered=true]:bg-destructive/10 data-[hovered=true]:text-destructive focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
      },

      // —— link (텍스트만) ——
      {
        variant: "link",
        tone: "neutral",
        class:
          "bg-transparent text-primary hover:bg-transparent data-[hovered=true]:bg-transparent",
      },
      {
        variant: "link",
        tone: "brand",
        class:
          "bg-transparent text-primary hover:bg-transparent data-[hovered=true]:bg-transparent",
      },
      {
        variant: "link",
        tone: "success",
        class:
          "bg-transparent text-success hover:bg-transparent data-[hovered=true]:bg-transparent",
      },
      {
        variant: "link",
        tone: "warning",
        class:
          "bg-transparent text-warning hover:bg-transparent data-[hovered=true]:bg-transparent",
      },
      {
        variant: "link",
        tone: "destructive",
        class:
          "bg-transparent text-destructive hover:bg-transparent data-[hovered=true]:bg-transparent",
      },
    ],
    defaultVariants: {
      variant: "default",
      tone: "neutral",
      shape: "square",
      size: "default",
    },
  }
)

type ButtonTone = NonNullable<VariantProps<typeof buttonVariants>["tone"]>
/** @deprecated tone 사용 — default→neutral */
type LegacyButtonStatus = "default" | "success" | "warning" | "destructive"

type ButtonProps = ButtonPrimitive.Props &
  Omit<VariantProps<typeof buttonVariants>, "tone"> & {
    tone?: ButtonTone | null
    /** @deprecated `tone` 사용. default→neutral */
    status?: LegacyButtonStatus | null
  }

function mapStatusToTone(status: LegacyButtonStatus | null | undefined): ButtonTone | undefined {
  if (status == null) return undefined
  if (status === "default") return "neutral"
  return status
}

function resolveButtonAxes(
  variant: VariantProps<typeof buttonVariants>["variant"],
  tone: ButtonTone | null | undefined,
  status: LegacyButtonStatus | null | undefined
) {
  const fromStatus = mapStatusToTone(status)
  let resolvedVariant = variant ?? "default"
  let resolvedTone: ButtonTone = tone ?? fromStatus ?? "neutral"

  // deprecated: variant="primary" → default + brand (명시 tone/status 의미색이 있으면 유지)
  if (resolvedVariant === "primary") {
    resolvedVariant = "default"
    if (tone == null && (status == null || status === "default")) {
      resolvedTone = "brand"
    }
  }

  return { variant: resolvedVariant, tone: resolvedTone }
}

function Button({
  className,
  variant = "default",
  tone,
  status,
  shape = "square",
  size = "default",
  ...props
}: ButtonProps) {
  const axes = resolveButtonAxes(variant, tone, status)

  return (
    <ButtonPrimitive
      data-slot="button"
      data-tone={axes.tone}
      data-status={status ?? undefined}
      className={cn(
        buttonVariants({
          variant: axes.variant,
          tone: axes.tone,
          shape,
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }
export type { ButtonProps, ButtonTone, LegacyButtonStatus }
