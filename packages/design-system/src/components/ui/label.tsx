"use client"

import * as React from "react"

import { cn } from "../../lib/utils"
import { uiDisabledLabel } from "../../lib/ui-disabled"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        `flex items-center gap-2 text-sm leading-none font-medium select-none ${uiDisabledLabel}`,
        className
      )}
      {...props}
    />
  )
}

export { Label }
