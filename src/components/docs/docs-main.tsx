import type { ReactNode } from "react"

import { DocsToc } from "@/components/docs/docs-toc"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

const DOCS_MAIN_ID = "docs-main"

export function DocsMain({
  children,
  className,
  width = "6xl",
  id,
  toc = true,
}: {
  children: ReactNode
  className?: string
  width?: "5xl" | "6xl"
  id?: string
  /** 우측 sticky "On this page" TOC — 기본 켜짐, 필요 시 false */
  toc?: boolean
}) {
  const mainId = id ?? DOCS_MAIN_ID

  if (!toc) {
    return (
      <main
        id={mainId}
        className={cn(
          "mx-auto w-full flex-1 min-w-0",
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

  return (
    <div className="mx-auto flex w-full max-w-7xl gap-8 px-5 xl:pr-10">
      <main
        id={mainId}
        className={cn(
          "min-w-0 flex-1",
          docsSpace.pageStack,
          "pt-10 pb-10",
          className
        )}
      >
        {children}
      </main>
      <DocsToc containerId={mainId} />
    </div>
  )
}
