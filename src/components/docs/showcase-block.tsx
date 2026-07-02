import { type ReactNode } from "react"

import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { docsTocId } from "@/lib/docs-toc-id"
import { cn } from "@/lib/utils"

export function ShowcaseBlock({
  name,
  description,
  children,
  className,
  flush,
}: {
  name?: string
  description?: string
  children: ReactNode
  className?: string
  /** 테이블 등 가장자리까지 채우는 콘텐츠 */
  flush?: boolean
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      {name || description ? (
        <div className={cn("border-b bg-muted/30", docsSpace.cardHeader)}>
          {name ? (
            <h2 id={docsTocId(name)} className={cn(docsType.sectionTitle, "scroll-mt-10")}>
              {name}
            </h2>
          ) : null}
          {description ? (
            <p className={cn(docsType.sectionDescription, name && "mt-1")}>
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className={cn(flush ? "overflow-x-auto" : docsSpace.pad, className)}>{children}</div>
    </section>
  )
}

export function ShowcaseGrid({
  children,
  columns = 1,
}: {
  children: ReactNode
  columns?: 1 | 2
}) {
  return (
    <div
      className={cn(
        docsSpace.gap,
        columns === 2 && "lg:grid-cols-2"
      )}
    >
      {children}
    </div>
  )
}
