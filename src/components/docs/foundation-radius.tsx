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
import { RADIUS_BASE, RADIUS_SCALE, formatRadiusToken } from "design-system/radius-tokens"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

export function FoundationRadiusShowcase() {
  return (
    <div className={docsSpace.stack}>
      <ShowcaseBlock name="Base Radius">
        <div className={cn("flex h-24 items-center justify-center rounded-lg border border-dashed bg-muted/50", docsType.tableMono)}>
          base_{RADIUS_BASE.px} · {RADIUS_BASE.variable} = {RADIUS_BASE.rem} ({RADIUS_BASE.px}px)
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock name="Radius Scale" flush>
        <DocsTable>
          <DocsTableColGroup columns={3} />
          <DocsTableHead>
            <DocsTableHeaderRow>
              <DocsTableTh>Token</DocsTableTh>
              <DocsTableTh>rem</DocsTableTh>
              <DocsTableTh>Preview</DocsTableTh>
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {RADIUS_SCALE.map((r) => (
              <DocsTableRow key={r.class}>
                <DocsTableTd mono>{formatRadiusToken(r)}</DocsTableTd>
                <DocsTableTd mono muted>
                  {r.rem}
                </DocsTableTd>
                <DocsTableTd>
                  <div
                    className={cn(
                      "flex h-14 w-24 items-center justify-center border-2 border-primary/40 bg-primary/10",
                      docsType.bodyMuted,
                      r.class
                    )}
                  >
                    {r.px}px
                  </div>
                </DocsTableTd>
              </DocsTableRow>
            ))}
          </DocsTableBody>
        </DocsTable>
      </ShowcaseBlock>
    </div>
  )
}
