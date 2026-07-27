import Link from "next/link"
import type { ReactNode } from "react"

import { docsType } from "@/lib/docs-type"
import { cn } from "@/lib/utils"

export function OverviewCardLink({
  href,
  title,
  children,
}: {
  href: string
  title: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className="group flex min-w-0 w-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-[colors,box-shadow] duration-short ease-standard hover:border-ring/40 hover:bg-accent/20 hover:shadow-elevation-40 data-[hovered=true]:border-ring/40 data-[hovered=true]:bg-accent/20 data-[hovered=true]:shadow-elevation-40"
    >
      <div className="border-b border-border px-4 py-3">
        <h3 className={cn(docsType.groupTitle, "min-w-0 truncate")}>{title}</h3>
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden bg-muted/30 px-3 py-4">
        {children}
      </div>
    </Link>
  )
}
