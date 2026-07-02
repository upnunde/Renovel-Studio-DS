"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { uiDisabledInteractive } from "../../lib/ui-disabled"
import { TABS_TEXT_LIST_GAP_BY_SIZE } from "../../component-size-tokens"

function Tabs({
  className,
  ...props
}: Omit<TabsPrimitive.Root.Props, "orientation">) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation="horizontal"
      orientation="horizontal"
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center text-foreground-muted group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "gap-2 bg-transparent p-0",
        line: "justify-start gap-1 rounded-none bg-transparent p-0",
        text: "justify-start bg-transparent p-0",
      },
      size: {
        sm: "",
        default: "",
        lg: "",
        xl: "",
        "2xl": "",
      },
    },
    compoundVariants: [
      { variant: "default", size: "sm", class: "gap-1.5" },
      { variant: "default", size: "default", class: "gap-2" },
      { variant: "default", size: "lg", class: "gap-2" },
      { variant: "default", size: "xl", class: "gap-2.5" },
      { variant: "default", size: "2xl", class: "gap-3" },
      ...(
        Object.entries(TABS_TEXT_LIST_GAP_BY_SIZE) as [
          keyof typeof TABS_TEXT_LIST_GAP_BY_SIZE,
          (typeof TABS_TEXT_LIST_GAP_BY_SIZE)[keyof typeof TABS_TEXT_LIST_GAP_BY_SIZE],
        ][]
      ).map(([size, { className }]) => ({
        variant: "text" as const,
        size,
        class: className,
      })),
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/** default variant 전용 — line·text 타이포는 tabs.css */
const tabsTriggerDefaultSizeClasses = [
  "group-data-[variant=default]/tabs-list:group-data-[size=sm]/tabs-list:gap-1",
  "group-data-[variant=default]/tabs-list:group-data-[size=sm]/tabs-list:px-3",
  "group-data-[variant=default]/tabs-list:group-data-[size=sm]/tabs-list:text-[0.8rem]",
  "group-data-[variant=default]/tabs-list:group-data-[size=sm]/tabs-list:has-data-[icon=inline-start]:pl-2",
  "group-data-[variant=default]/tabs-list:group-data-[size=sm]/tabs-list:has-data-[icon=inline-end]:pr-2",
  "group-data-[variant=default]/tabs-list:group-data-[size=sm]/tabs-list:[&_svg:not([class*='size-'])]:size-3.5",
  "group-data-[variant=default]/tabs-list:group-data-[size=default]/tabs-list:gap-1.5",
  "group-data-[variant=default]/tabs-list:group-data-[size=default]/tabs-list:px-3.5",
  "group-data-[variant=default]/tabs-list:group-data-[size=default]/tabs-list:text-sm",
  "group-data-[variant=default]/tabs-list:group-data-[size=default]/tabs-list:has-data-[icon=inline-start]:pl-2.5",
  "group-data-[variant=default]/tabs-list:group-data-[size=default]/tabs-list:has-data-[icon=inline-end]:pr-2.5",
  "group-data-[variant=default]/tabs-list:group-data-[size=lg]/tabs-list:gap-1.5",
  "group-data-[variant=default]/tabs-list:group-data-[size=lg]/tabs-list:px-4",
  "group-data-[variant=default]/tabs-list:group-data-[size=lg]/tabs-list:text-sm",
  "group-data-[variant=default]/tabs-list:group-data-[size=lg]/tabs-list:has-data-[icon=inline-start]:pl-3",
  "group-data-[variant=default]/tabs-list:group-data-[size=lg]/tabs-list:has-data-[icon=inline-end]:pr-3",
  "group-data-[variant=default]/tabs-list:group-data-[size=xl]/tabs-list:gap-1.5",
  "group-data-[variant=default]/tabs-list:group-data-[size=xl]/tabs-list:px-4",
  "group-data-[variant=default]/tabs-list:group-data-[size=xl]/tabs-list:text-sm",
  "group-data-[variant=default]/tabs-list:group-data-[size=xl]/tabs-list:has-data-[icon=inline-start]:pl-3",
  "group-data-[variant=default]/tabs-list:group-data-[size=xl]/tabs-list:has-data-[icon=inline-end]:pr-3",
  "group-data-[variant=default]/tabs-list:group-data-[size=2xl]/tabs-list:gap-2",
  "group-data-[variant=default]/tabs-list:group-data-[size=2xl]/tabs-list:px-4",
  "group-data-[variant=default]/tabs-list:group-data-[size=2xl]/tabs-list:text-base",
  "group-data-[variant=default]/tabs-list:group-data-[size=2xl]/tabs-list:has-data-[icon=inline-start]:pl-3",
  "group-data-[variant=default]/tabs-list:group-data-[size=2xl]/tabs-list:has-data-[icon=inline-end]:pr-3",
  "group-data-[variant=default]/tabs-list:group-data-[size=2xl]/tabs-list:[&_svg:not([class*='size-'])]:size-5",
].join(" ")

/** sm_h32 · md_h36 · xl_h40 · lg_h42 · 2xl_h48 — variant 공통
 *  min-width는 정사각 최소 (짧은 라벨·아이콘 전용도 터치 목표 확보) — text variant는 제외
 */
const tabsTriggerHeightClasses =
  "group-data-[size=sm]/tabs-list:h-8 group-data-[size=default]/tabs-list:h-9 group-data-[size=xl]/tabs-list:h-10 group-data-[size=lg]/tabs-list:h-[42px] group-data-[size=2xl]/tabs-list:h-12 group-data-[variant=default]/tabs-list:group-data-[size=sm]/tabs-list:min-w-8 group-data-[variant=default]/tabs-list:group-data-[size=default]/tabs-list:min-w-9 group-data-[variant=default]/tabs-list:group-data-[size=xl]/tabs-list:min-w-10 group-data-[variant=default]/tabs-list:group-data-[size=lg]/tabs-list:min-w-[42px] group-data-[variant=default]/tabs-list:group-data-[size=2xl]/tabs-list:min-w-12 group-data-[variant=line]/tabs-list:group-data-[size=sm]/tabs-list:min-w-8 group-data-[variant=line]/tabs-list:group-data-[size=default]/tabs-list:min-w-9 group-data-[variant=line]/tabs-list:group-data-[size=xl]/tabs-list:min-w-10 group-data-[variant=line]/tabs-list:group-data-[size=lg]/tabs-list:min-w-[42px] group-data-[variant=line]/tabs-list:group-data-[size=2xl]/tabs-list:min-w-12"

function TabsList({
  className,
  variant = "default",
  size = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      data-size={size}
      className={cn(tabsListVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        `relative inline-flex items-center justify-center whitespace-nowrap transition-all duration-short ease-standard focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring ${uiDisabledInteractive} [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
        tabsTriggerDefaultSizeClasses,
        tabsTriggerHeightClasses,
        "group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start",
        "group-data-[variant=default]/tabs-list:font-medium group-data-[variant=default]/tabs-list:flex-none group-data-[variant=default]/tabs-list:rounded-md group-data-[variant=default]/tabs-list:border group-data-[variant=default]/tabs-list:border-border group-data-[variant=default]/tabs-list:bg-background group-data-[variant=default]/tabs-list:py-0.5 group-data-[variant=default]/tabs-list:text-muted-foreground group-data-[variant=default]/tabs-list:not-data-active:hover:bg-muted group-data-[variant=default]/tabs-list:not-data-active:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:border-transparent group-data-[variant=default]/tabs-list:data-active:bg-inverse group-data-[variant=default]/tabs-list:data-active:text-inverse-foreground group-data-[variant=default]/tabs-list:data-active:hover:bg-inverse/90 group-data-[variant=default]/tabs-list:data-active:hover:text-inverse-foreground",
        "group-data-[variant=line]/tabs-list:flex-none group-data-[variant=line]/tabs-list:rounded-md group-data-[variant=line]/tabs-list:border group-data-[variant=line]/tabs-list:border-transparent group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:py-0.5 group-data-[variant=line]/tabs-list:not-data-active:hover:bg-accent group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:shadow-none",
        "group-data-[variant=text]/tabs-list:rounded-none group-data-[variant=text]/tabs-list:border-0 group-data-[variant=text]/tabs-list:bg-transparent group-data-[variant=text]/tabs-list:px-0 group-data-[variant=text]/tabs-list:py-0 group-data-[variant=text]/tabs-list:data-active:bg-transparent group-data-[variant=text]/tabs-list:data-active:shadow-none",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity after:duration-short after:ease-standard group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-[variant=line]/tabs-list:group-data-horizontal/tabs:after:!bottom-[-3px] group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100 group-data-[variant=text]/tabs-list:after:hidden",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
