import type * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

/**
 * variant = 표현 (솔리드 · 소프트 · 윤곽 · 고스트)
 * status  = 색 역할 (default · success · warning · destructive)
 * → Button의 variant × tone 과 동일하게 compoundVariants로 조합
 */
const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border border-transparent whitespace-nowrap transition-all duration-short ease-standard focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
        outline: "bg-transparent",
        ghost: "",
      },
      status: {
        default: "",
        success: "",
        warning: "",
        destructive: "",
      },
      /** 높이 ↔ 타이포: h16·h20→caption2 · h24→caption1 · h28→body3 */
      size: {
        sm: "h-4 gap-0.5 px-1.5 text-caption2_500 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 [&>svg]:size-2.5!",
        default: "h-5 px-2 text-caption2_500 [&>svg]:size-3!",
        md: "h-6 px-2 text-caption1_500 [&>svg]:size-3!",
        lg: "h-7 px-2.5 text-body3_500 [&>svg]:size-3.5!",
      },
      shape: {
        circle: "rounded-full",
        /** square radius는 size compoundVariants (h16→2 · h20/h24→4 · h28→8) */
        square: "",
      },
    },
    compoundVariants: [
      // —— square radius by size ——
      { shape: "square", size: "sm", class: "rounded-xs" },
      { shape: "square", size: "default", class: "rounded-sm" },
      { shape: "square", size: "md", class: "rounded-sm" },
      { shape: "square", size: "lg", class: "rounded-md" },

      // —— default (솔리드 · status면 강하게) ——
      {
        variant: "default",
        status: "default",
        class:
          "bg-primary-container text-primary-container-foreground [a]:hover:bg-primary-container/80 [a[data-hovered=true]]:bg-primary-container/80",
      },
      {
        variant: "default",
        status: "success",
        class:
          "bg-success text-success-foreground [a]:hover:bg-success/80 [a[data-hovered=true]]:bg-success/80 focus-visible:ring-success/20",
      },
      {
        variant: "default",
        status: "warning",
        class:
          "bg-warning text-warning-foreground [a]:hover:bg-warning/80 [a[data-hovered=true]]:bg-warning/80 focus-visible:ring-warning/20",
      },
      {
        variant: "default",
        status: "destructive",
        class:
          "bg-destructive text-destructive-foreground [a]:hover:bg-destructive/80 [a[data-hovered=true]]:bg-destructive/80 focus-visible:ring-destructive/20",
      },

      // —— secondary (소프트 채움) ——
      {
        variant: "secondary",
        status: "default",
        class:
          "bg-background-muted text-foreground [a]:hover:bg-muted-strong [a]:hover:text-muted-strong-foreground [a[data-hovered=true]]:bg-muted-strong [a[data-hovered=true]]:text-muted-strong-foreground",
      },
      {
        variant: "secondary",
        status: "success",
        class:
          "bg-success/10 text-success dark:bg-success/20 [a]:hover:bg-success/20 [a[data-hovered=true]]:bg-success/20 focus-visible:ring-success/20",
      },
      {
        variant: "secondary",
        status: "warning",
        class:
          "bg-warning/15 text-warning dark:bg-warning/20 [a]:hover:bg-warning/25 [a[data-hovered=true]]:bg-warning/25 focus-visible:ring-warning/20",
      },
      {
        variant: "secondary",
        status: "destructive",
        class:
          "bg-destructive/10 text-destructive dark:bg-destructive/20 [a]:hover:bg-destructive/20 [a[data-hovered=true]]:bg-destructive/20 focus-visible:ring-destructive/20",
      },

      // —— outline (윤곽 · status 보더·텍스트) ——
      {
        variant: "outline",
        status: "default",
        class:
          "border-border bg-transparent text-foreground [a]:hover:bg-muted [a]:hover:text-foreground [a[data-hovered=true]]:bg-muted [a[data-hovered=true]]:text-foreground",
      },
      {
        variant: "outline",
        status: "success",
        class:
          "border-success/40 bg-transparent text-success [a]:hover:bg-success/10 [a[data-hovered=true]]:bg-success/10 focus-visible:ring-success/20",
      },
      {
        variant: "outline",
        status: "warning",
        class:
          "border-warning/40 bg-transparent text-warning [a]:hover:bg-warning/15 [a[data-hovered=true]]:bg-warning/15 focus-visible:ring-warning/20",
      },
      {
        variant: "outline",
        status: "destructive",
        class:
          "border-destructive/40 bg-transparent text-destructive [a]:hover:bg-destructive/10 [a[data-hovered=true]]:bg-destructive/10 focus-visible:ring-destructive/20",
      },

      // —— ghost (텍스트만) ——
      {
        variant: "ghost",
        status: "default",
        class:
          "hover:bg-muted hover:text-foreground data-[hovered=true]:bg-muted data-[hovered=true]:text-foreground",
      },
      {
        variant: "ghost",
        status: "success",
        class:
          "bg-transparent text-success hover:bg-success/10 data-[hovered=true]:bg-success/10 [a]:hover:bg-success/10 focus-visible:ring-success/20",
      },
      {
        variant: "ghost",
        status: "warning",
        class:
          "bg-transparent text-warning hover:bg-warning/15 data-[hovered=true]:bg-warning/15 [a]:hover:bg-warning/15 focus-visible:ring-warning/20",
      },
      {
        variant: "ghost",
        status: "destructive",
        class:
          "bg-transparent text-destructive hover:bg-destructive/10 data-[hovered=true]:bg-destructive/10 [a]:hover:bg-destructive/10 focus-visible:ring-destructive/20",
      },
    ],
    defaultVariants: {
      variant: "default",
      status: "default",
      size: "default",
      shape: "circle",
    },
  }
)

function Badge({
  className,
  variant = "default",
  status = "default",
  size = "default",
  shape = "circle",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, status, size, shape }), className),
        ...({ "data-status": status } as React.HTMLAttributes<HTMLSpanElement>),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      status,
      size,
      shape,
    },
  })
}

export { Badge, badgeVariants }
