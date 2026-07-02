import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { uiDisabledInteractive } from "../../lib/ui-disabled"

const buttonVariants = cva(
  `group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-short ease-standard outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px ${uiDisabledInteractive} aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
  {
    variants: {
      variant: {
        default:
          "bg-inverse text-inverse-foreground hover:bg-inverse/80 data-[hovered=true]:bg-inverse/80",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/80 data-[hovered=true]:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-accent hover:text-accent-foreground data-[hovered=true]:bg-accent data-[hovered=true]:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-accent dark:data-[hovered=true]:bg-accent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground data-[hovered=true]:bg-accent data-[hovered=true]:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground data-[hovered=true]:bg-accent data-[hovered=true]:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 data-[hovered=true]:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:data-[hovered=true]:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline underline-offset-4",
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
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-[42px]",
        "icon-xl": "size-10",
        "icon-2xl": "size-12 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "square",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  shape = "square",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, shape, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
