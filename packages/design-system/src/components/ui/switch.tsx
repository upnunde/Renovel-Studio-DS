"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "../../lib/utils"
import { uiDisabledBlock } from "../../lib/ui-disabled"

/**
 * size별 트랙 · thumb · 이동량 (p-0.5 = 2px 균일 inset)
 * sm      h16×w28 · thumb 12 · travel 12
 * default h20×w36 · thumb 16 · travel 16
 * md      h24×w44 · thumb 20 · travel 20
 */
function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default" | "md"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        `peer group/switch relative inline-flex shrink-0 items-center rounded-full p-0.5 transition-all duration-short ease-standard outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 ${uiDisabledBlock} data-disabled:data-unchecked:bg-disabled data-disabled:data-checked:bg-primary/40`,
        "data-[size=sm]:h-4 data-[size=sm]:w-7",
        "data-[size=default]:h-5 data-[size=default]:w-9",
        "data-[size=md]:h-6 data-[size=md]:w-11",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-background ring-0 transition-transform duration-short ease-standard dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground",
          "group-data-[size=sm]/switch:size-3",
          "group-data-[size=default]/switch:size-4",
          "group-data-[size=md]/switch:size-5",
          "data-unchecked:translate-x-0",
          "group-data-[size=sm]/switch:data-checked:translate-x-3",
          "group-data-[size=default]/switch:data-checked:translate-x-4",
          "group-data-[size=md]/switch:data-checked:translate-x-5"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
