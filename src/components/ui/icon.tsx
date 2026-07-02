import { cva, type VariantProps } from "class-variance-authority"
import type { LucideIcon, LucideProps } from "lucide-react"

import { cn } from "../../lib/utils"

const iconSizeVariants = cva("shrink-0 pointer-events-none", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-3.5",
      md: "size-4",
      lg: "size-[1.125rem]",
      xl: "size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type IconSize = NonNullable<VariantProps<typeof iconSizeVariants>["size"]>

export type IconProps = Omit<LucideProps, "ref"> & {
  icon: LucideIcon
  size?: IconSize
  /**
   * 라벨 앞/뒤에 붙는 아이콘일 때 지정.
   * Button·Toggle 등의 `has-data-[icon=…]` 패딩 보정이 작동합니다.
   */
  position?: "inline-start" | "inline-end"
}

export function Icon({
  icon: IconComponent,
  size = "md",
  position,
  className,
  ...props
}: IconProps) {
  return (
    <IconComponent
      data-slot="icon"
      {...(position ? { "data-icon": position } : {})}
      className={cn(iconSizeVariants({ size }), className)}
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    />
  )
}
