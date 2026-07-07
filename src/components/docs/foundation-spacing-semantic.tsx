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
import { SEMANTIC_SPACE_GROUPS } from "design-system/spacing-tokens"
import { docsSpace } from "@/lib/docs-space"

export function FoundationSpacingSemanticShowcase() {
  return (
    <div className={docsSpace.stack}>
      {SEMANTIC_SPACE_GROUPS.map((group) => (
        <ShowcaseBlock
          key={group.id}
          name={`${group.title}`}
          description={group.description}
          flush
        >
          <DocsTable>
            <DocsTableColGroup columns={4} />
            <DocsTableHead>
              <DocsTableHeaderRow>
                <DocsTableTh>Key</DocsTableTh>
                <DocsTableTh>Tailwind</DocsTableTh>
                <DocsTableTh>px</DocsTableTh>
                <DocsTableTh>Usage</DocsTableTh>
              </DocsTableHeaderRow>
            </DocsTableHead>
            <DocsTableBody>
              {group.tokens.map((token) => (
                <DocsTableRow key={`${group.id}-${token.key}`}>
                  <DocsTableTd mono>{`space.${group.id}.${token.key}`}</DocsTableTd>
                  <DocsTableTd mono muted>
                    {token.className}
                  </DocsTableTd>
                  <DocsTableTd mono muted>
                    {token.px}px
                  </DocsTableTd>
                  <DocsTableTd muted>{token.description}</DocsTableTd>
                </DocsTableRow>
              ))}
            </DocsTableBody>
          </DocsTable>
        </ShowcaseBlock>
      ))}
    </div>
  )
}
