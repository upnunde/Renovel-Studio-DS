import type * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border border-transparent whitespace-nowrap transition-all duration-short ease-standard focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary-container text-primary-container-foreground [a]:hover:bg-primary-container/80 [a[data-hovered=true]]:bg-primary-container/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-muted [a]:hover:text-foreground [a[data-hovered=true]]:bg-muted [a[data-hovered=true]]:text-foreground",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-foreground [a[data-hovered=true]]:bg-muted [a[data-hovered=true]]:text-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground data-[hovered=true]:bg-muted data-[hovered=true]:text-foreground",
      },
      /**
       * 의미론적 상태 톤 — variant와 직교하는 상태 축.
       * default 는 톤 없음, 나머지는 각 상태 컨테이너로 오버라이드.
       */
      status: {
        default: "",
        success:
          "border-transparent bg-success/10 text-success focus-visible:ring-success/20 dark:bg-success/20 dark:focus-visible:ring-success/40 [a]:hover:bg-success/20 [a[data-hovered=true]]:bg-success/20",
        warning:
          "border-transparent bg-warning/15 text-warning focus-visible:ring-warning/20 dark:bg-warning/20 dark:focus-visible:ring-warning/40 [a]:hover:bg-warning/25 [a[data-hovered=true]]:bg-warning/25",
        destructive:
          "border-transparent bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20 [a[data-hovered=true]]:bg-destructive/20",
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
        square: "rounded-md",
      },
    },
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
