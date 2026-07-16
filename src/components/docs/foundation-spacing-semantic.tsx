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
import { SPACING_SEMANTIC_CATEGORIES } from "design-system/spacing-tokens"
import { docsSpace } from "@/lib/docs-space"
import { docsType } from "@/lib/docs-type"
import { docsTocId } from "@/lib/docs-toc-id"
import { cn } from "@/lib/utils"

export function FoundationSpacingSemanticShowcase() {
  return (
    <div className={docsSpace.groupStack}>
      {SPACING_SEMANTIC_CATEGORIES.map((category) => (
        <section key={category.id} className={docsSpace.stackGap}>
          <h2
            id={docsTocId(category.title)}
            className={cn(docsType.sectionTitle, "scroll-mt-10")}
          >
            {category.title}
          </h2>
          <div className={docsSpace.stack}>
            {category.groups.map((group) => (
              <ShowcaseBlock key={group.id} name={group.title} flush as="h3">
                <DocsTable>
                  <DocsTableColGroup columns={5} />
                  <DocsTableHead>
                    <DocsTableHeaderRow>
                      <DocsTableTh>Name</DocsTableTh>
                      <DocsTableTh>Variable</DocsTableTh>
                      <DocsTableTh>Tailwind</DocsTableTh>
                      <DocsTableTh>Maps to</DocsTableTh>
                      <DocsTableTh>Role</DocsTableTh>
                    </DocsTableHeaderRow>
                  </DocsTableHead>
                  <DocsTableBody>
                    {group.tokens.map((token) => (
                      <DocsTableRow key={`${group.id}-${token.name}`}>
                        <DocsTableTd mono>{token.name}</DocsTableTd>
                        <DocsTableTd mono muted>
                          {token.variable}
                        </DocsTableTd>
                        <DocsTableTd mono muted>
                          {token.className}
                        </DocsTableTd>
                        <DocsTableTd mono muted>
                          {token.source} · {token.px}px
                        </DocsTableTd>
                        <DocsTableTd muted>{token.role}</DocsTableTd>
                      </DocsTableRow>
                    ))}
                  </DocsTableBody>
                </DocsTable>
              </ShowcaseBlock>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
