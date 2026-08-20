import * as React from "react"

import { cn } from "../../lib/utils"
import { uiDisabledField, uiReadOnlyField, readOnlyFieldHandlers } from "../../lib/ui-disabled"

function Textarea({
  className,
  rows,
  style,
  readOnly,
  tabIndex,
  onFocus,
  onMouseDown,
  ...props
}: React.ComponentProps<"textarea">) {
  const hasRows = rows != null && rows > 0
  const readOnlyProps = readOnlyFieldHandlers(readOnly, {
    tabIndex,
    onFocus,
    onMouseDown,
  })

  return (
    <textarea
      data-slot="textarea"
      rows={rows}
      readOnly={readOnly}
      className={cn(
        `flex field-sizing-content w-full rounded-lg border border-border-emphasis bg-transparent px-2.5 py-2 text-base text-foreground transition-colors duration-short ease-standard outline-none placeholder:text-foreground-placeholder focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${uiDisabledField} ${uiReadOnlyField} aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40`,
        !hasRows && "min-h-16",
        className
      )}
      style={{
        ...style,
        ...(hasRows ? { minBlockSize: `${rows}lh` } : undefined),
      }}
      {...props}
      {...readOnlyProps}
    />
  )
}

export { Textarea }
