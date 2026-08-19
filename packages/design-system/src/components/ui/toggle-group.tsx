"use client"

import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

/**
 * Toggle Group — Toggle을 세그먼트로 묶는다 (Figma Resizing).
 * 그룹이 높이·양끝 모서리·단일/다중 선택을 규정하고, 각 Toggle이 variant·tone을 가진다.
 */
const toggleGroupVariants = cva(
  [
    "flex w-fit items-stretch",
    "*:focus-visible:relative *:focus-visible:z-10",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "[&>button]:h-8 [&>button]:min-w-8 [&>button]:px-2.5 [&_button]:h-8",
        default: "[&>button]:h-9 [&>button]:min-w-9 [&_button]:h-9",
        xl: "[&>button]:h-10 [&>button]:min-w-10 [&>button]:px-3 [&_button]:h-10",
        "2xl":
          "[&>button]:h-12 [&>button]:min-w-12 [&>button]:px-3 [&>button]:text-base [&_button]:h-12",
      },
      shape: {
        square:
          "[&>:first-child]:rounded-l-md [&>:last-child]:rounded-r-md",
        circle:
          "[&>:first-child]:rounded-l-full [&>:last-child]:rounded-r-full",
      },
    },
    defaultVariants: {
      size: "default",
      shape: "square",
    },
  }
)

type ToggleGroupProps = ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleGroupVariants>

function ToggleGroup({
  className,
  size = "default",
  shape = "square",
  multiple = false,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-size={size ?? "default"}
      data-shape={shape ?? "square"}
      data-multiple={multiple ? "" : undefined}
      multiple={multiple}
      className={cn(toggleGroupVariants({ size, shape }), className)}
      {...props}
    />
  )
}

export { ToggleGroup, toggleGroupVariants }
export type { ToggleGroupProps }
