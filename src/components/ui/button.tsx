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
          "border-border bg-transparent hover:bg-accent hover:text-accent-foreground data-[hovered=true]:bg-accent data-[hovered=true]:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground dark:border-input dark:hover:bg-accent dark:data-[hovered=true]:bg-accent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground data-[hovered=true]:bg-accent data-[hovered=true]:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground data-[hovered=true]:bg-accent data-[hovered=true]:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground",
        link: "text-primary underline underline-offset-4",
      },
      /**
       * 의미론적 상태 톤 — variant(시각 위계)와 직교하는 상태 축.
       *  - default 는 아무 톤도 부여하지 않음(variant 색상 유지)
       *  - success·warning·destructive 는 각 상태 컨테이너 톤으로 강제 오버라이드
       */
      status: {
        default: "",
        success:
          "bg-success/10 text-success hover:bg-success/20 data-[hovered=true]:bg-success/20 focus-visible:border-success/40 focus-visible:ring-success/20 dark:bg-success/20 dark:hover:bg-success/30 dark:data-[hovered=true]:bg-success/30 dark:focus-visible:ring-success/40",
        warning:
          "bg-warning/15 text-warning hover:bg-warning/25 data-[hovered=true]:bg-warning/25 focus-visible:border-warning/40 focus-visible:ring-warning/20 dark:bg-warning/20 dark:hover:bg-warning/30 dark:data-[hovered=true]:bg-warning/30 dark:focus-visible:ring-warning/40",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 data-[hovered=true]:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:data-[hovered=true]:bg-destructive/30 dark:focus-visible:ring-destructive/40",
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
        /** 정사각 — w-* 명시로 ButtonGroup `w-fit`이 width를 덮지 않게 함 */
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
    defaultVariants: {
      variant: "default",
      status: "default",
      shape: "square",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  status = "default",
  shape = "square",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-status={status}
      className={cn(buttonVariants({ variant, status, shape, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
