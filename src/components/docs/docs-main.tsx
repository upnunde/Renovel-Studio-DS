import type { ReactNode } from "react"

import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

export function DocsMain({
  children,
  className,
  width = "6xl",
}: {
  children: ReactNode
  className?: string
  width?: "5xl" | "6xl"
}) {
  return (
    <main
      className={cn(
        "mx-auto w-full flex-1",
        width === "6xl" ? "max-w-6xl" : "max-w-5xl",
        docsSpace.pageStack,
        docsSpace.pagePad,
        className
      )}
    >
      {children}
    </main>
  )
}
