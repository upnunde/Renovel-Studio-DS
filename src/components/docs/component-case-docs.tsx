import { type ReactNode } from "react"

import { Badge } from "design-system/ui/badge"
import { ShowcaseBlock } from "@/components/docs/showcase-block"
import {
  DocsTable,
  DocsTableBody,
  DocsTableColGroup,
  DocsTableHead,
  DocsTableHeaderRow,
  DocsTableRow,
  DocsTableTd,
  DocsTableTh,
} from "@/components/docs/docs-table"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { docsTocId } from "@/lib/docs-toc-id"
import { cn } from "@/lib/utils"
import { formatPropValue, type ComponentCaseSpec } from "@/lib/component-case-specs"
import { sortPlaygroundOptionValues } from "@/components/docs/playground-utils"

export function ComponentCaseDocs({
  spec,
  playground,
  examples,
}: {
  spec: ComponentCaseSpec
  playground: ReactNode
  examples: ReactNode
}) {
  return (
    <div className={docsSpace.stack}>
      <div className="flex flex-col gap-10">
        <ComponentSpecTable spec={spec} />
        {playground}
        <section className={docsSpace.stackGap}>
          <h2 id="examples" className={cn(docsType.sectionTitle, "scroll-mt-10")}>
            Examples
          </h2>
          <div className={docsSpace.stackGap}>{examples}</div>
        </section>
      </div>
    </div>
  )
}

export function ComponentSpecTable({ spec }: { spec: ComponentCaseSpec }) {
  return (
    <ShowcaseBlock name="Properties" flush>
      <DocsTable>
        <DocsTableColGroup columns={3} />
        <DocsTableHead>
          <DocsTableHeaderRow>
            <DocsTableTh>Property</DocsTableTh>
            <DocsTableTh>Values</DocsTableTh>
            <DocsTableTh>Description</DocsTableTh>
          </DocsTableHeaderRow>
        </DocsTableHead>
        <DocsTableBody>
          {spec.properties.map((prop) => (
            <DocsTableRow key={prop.name}>
              <DocsTableTd mono>{prop.name}</DocsTableTd>
              <DocsTableTd>
                <div className={cn("flex flex-wrap", docsSpace.inlineGap)}>
                  {sortPlaygroundOptionValues(prop.values, prop.name).map((value) => (
                    <Badge key={value} variant="outline" className="font-mono text-sm">
                      {formatPropValue(prop, value)}
                    </Badge>
                  ))}
                </div>
              </DocsTableTd>
              <DocsTableTd muted>{prop.description}</DocsTableTd>
            </DocsTableRow>
          ))}
        </DocsTableBody>
      </DocsTable>
    </ShowcaseBlock>
  )
}

export function ComponentCaseGroup({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn(docsSpace.caseGroupStack, className)}>
      <div>
        <h3 id={docsTocId(title)} className={cn(docsType.groupLabel, "scroll-mt-10")}>
          {title}
        </h3>
      </div>
      {children}
    </section>
  )
}

export function ComponentCaseGrid({
  children,
  columns = 3,
}: {
  children: ReactNode
  columns?: 2 | 3 | 4
}) {
  return (
    <div
      className={cn(
        "grid",
        docsSpace.caseGridGap,
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4"
      )}
    >
      {children}
    </div>
  )
}

export function ComponentCase({
  label,
  tags,
  children,
}: {
  label: string
  tags?: string[]
  children: ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className={cn("flex flex-wrap items-center border-b border-border bg-muted/20", docsSpace.inlineGap, docsSpace.cardHeader)}>
        <span className={docsType.tokenName}>{label}</span>
        {tags?.map((tag) => (
          <Badge key={tag} variant="secondary" className="font-mono text-sm">
            {tag}
          </Badge>
        ))}
      </div>
      <div className={cn("flex min-h-14 flex-wrap items-center", docsSpace.inlineGap, docsSpace.pad)}>
        {children}
      </div>
    </div>
  )
}
