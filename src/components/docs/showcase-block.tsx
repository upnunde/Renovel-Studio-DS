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
  as: Heading = "h2",
  headingId,
}: {
  name?: string
  description?: string
  children: ReactNode
  className?: string
  /** 테이블 등 가장자리까지 채우는 콘텐츠 */
  flush?: boolean
  /** 헤딩 레벨 — 카테고리 h2 아래 서브그룹은 "h3" 로 낮춰 위계 유지 */
  as?: "h2" | "h3"
  /** TOC 앵커 id — 미지정 시 name에서 생성 (동일 제목 충돌 시 지정) */
  headingId?: string
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-background">
      {name || description ? (
        <div className={cn("border-b bg-background-muted/30", docsSpace.cardHeader)}>
          {name ? (
            <Heading
              id={headingId ?? (name ? docsTocId(name) : undefined)}
              className="scroll-mt-10 text-body1_700 text-foreground"
            >
              {name}
            </Heading>
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
