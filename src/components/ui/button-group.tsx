import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { Separator } from "./separator"
import { cn } from "../../lib/utils"

/**
 * Button Group — Button을 어떻게 묶는지(높이·양끝 모서리)를 규정하는 컨테이너.
 * ButtonGroupText / Separator는 부가 슬롯(composition)이며 그룹 본질 API가 아님.
 */
const buttonGroupVariants = cva(
  [
    "flex w-fit items-stretch",
    "*:focus-visible:relative *:focus-visible:z-10",
    "has-[>[role=group]]:gap-2",
    /** size-* / w-* 아이콘 버튼은 정사각 유지 — w-fit으로 width 덮지 않음 */
    "[&_button:not([class*='w-']):not([class*='size-'])]:w-fit",
    "[&>input]:flex-1",
  ].join(" "),
  {
    variants: {
      size: {
        xs: "[&>button]:h-6 [&>button]:px-2 [&>button]:text-xs [&>input]:h-6 [&_button]:h-6",
        sm: "[&>button]:h-8 [&>button]:px-2.5 [&>button]:text-[0.8rem] [&>input]:h-8 [&_button]:h-8",
        default: "[&>button]:h-9 [&>input]:h-9 [&_button]:h-9",
        xl: "[&>button]:h-10 [&>input]:h-10 [&_button]:h-10",
        "2xl":
          "[&>button]:h-12 [&>button]:text-base [&>input]:h-12 [&_button]:h-12",
      },
      /** 그룹 양끝 모서리 — 중간 세그먼트는 Button의 button-group 규칙으로 각짐 */
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

function ButtonGroup({
  className,
  size,
  shape,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-size={size ?? "default"}
      data-shape={shape ?? "square"}
      className={cn(buttonGroupVariants({ size, shape }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex items-center gap-2 rounded-none border bg-background-muted px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg]:shrink-0",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "button-group-text",
    },
  })
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative self-stretch bg-border-emphasis data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
