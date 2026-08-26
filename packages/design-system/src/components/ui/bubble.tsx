"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props}
    />
  )
}

/**
 * shadcn Bubble API 축약 · 색만 DS 시맨틱 토큰.
 */
const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 data-[align=end]:self-end",
  {
    variants: {
      variant: {
        default:
          "*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-primary-foreground [&>[data-slot=bubble-content]:is(button,a)]:hover:bg-primary/80 [&>[data-slot=bubble-content]:is(button,a)]:data-[hovered=true]:bg-primary/80",
        secondary:
          "*:data-[slot=bubble-content]:bg-background-muted *:data-[slot=bubble-content]:text-foreground [&>[data-slot=bubble-content]:is(button,a)]:hover:bg-muted-strong [&>[data-slot=bubble-content]:is(button,a)]:hover:text-muted-strong-foreground [&>[data-slot=bubble-content]:is(button,a)]:data-[hovered=true]:bg-muted-strong [&>[data-slot=bubble-content]:is(button,a)]:data-[hovered=true]:text-muted-strong-foreground",
        tinted:
          "*:data-[slot=bubble-content]:bg-primary-container *:data-[slot=bubble-content]:text-primary-container-foreground [&>[data-slot=bubble-content]:is(button,a)]:hover:bg-primary-container/80 [&>[data-slot=bubble-content]:is(button,a)]:data-[hovered=true]:bg-primary-container/80",
        destructive:
          "*:data-[slot=bubble-content]:bg-destructive/10 *:data-[slot=bubble-content]:text-destructive dark:*:data-[slot=bubble-content]:bg-destructive/20 [&>[data-slot=bubble-content]:is(button,a)]:hover:bg-destructive/20 [&>[data-slot=bubble-content]:is(button,a)]:data-[hovered=true]:bg-destructive/20 dark:[&>[data-slot=bubble-content]:is(button,a)]:hover:bg-destructive/30 dark:[&>[data-slot=bubble-content]:is(button,a)]:data-[hovered=true]:bg-destructive/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    align?: "start" | "end"
  }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  )
}

function BubbleContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "w-fit max-w-full min-w-0 overflow-hidden rounded-xl border border-transparent px-3 py-2 text-body3_400 whitespace-pre-wrap wrap-break-word transition-colors duration-short ease-standard group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:outline-none [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-ring/50",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "bubble-content",
    },
  })
}

const bubbleReactionsVariants = cva(
  "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-background-muted px-1.5 py-0.5 text-body3_400 ring-3 ring-background has-[button]:p-0",
  {
    variants: {
      side: {
        top: "top-0 -translate-y-3/4",
        bottom: "bottom-0 translate-y-3/4",
      },
      align: {
        start: "left-3",
        end: "right-3",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  }
)

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end"
  side?: "top" | "bottom"
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  )
}

export {
  BubbleGroup,
  Bubble,
  BubbleContent,
  BubbleReactions,
  bubbleVariants,
  bubbleReactionsVariants,
}
