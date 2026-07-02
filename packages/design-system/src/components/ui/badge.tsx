import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border border-transparent font-medium whitespace-nowrap transition-all duration-short ease-standard focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary-container text-primary-container-foreground [a]:hover:bg-primary-container/80 [a[data-hovered=true]]:bg-primary-container/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-accent [a]:hover:text-accent-foreground [a[data-hovered=true]]:bg-accent [a[data-hovered=true]]:text-accent-foreground",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20 [a[data-hovered=true]]:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-accent [a]:hover:text-accent-foreground [a[data-hovered=true]]:bg-accent [a[data-hovered=true]]:text-accent-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground data-[hovered=true]:bg-accent data-[hovered=true]:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline data-[hovered=true]:underline",
      },
      size: {
        default: "h-5 px-2 text-xs [&>svg]:size-3!",
        md: "h-6 px-2 text-xs [&>svg]:size-3!",
        lg: "h-7 px-2.5 text-xs [&>svg]:size-3.5!",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "circle",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "default",
  shape = "circle",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size, shape }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      size,
      shape,
    },
  })
}

export { Badge, badgeVariants }
