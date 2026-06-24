import { LucideIconGallery } from "@/components/docs/lucide-icon-gallery"
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
import { ICON_REGISTRY, ICONS } from "@/components/icons"
import { Icon } from "@/components/ui/icon"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import {
  CONTROL_ICON_SIZE_SCALE,
  CONTROL_SIZE_SCALE,
  ICON_GLYPH_SCALE,
  formatControlSizeRow,
  formatIconGlyphOption,
} from "design-system/icon-tokens"
import { cn } from "@/lib/utils"

export function FoundationIconsShowcase() {
  const sampleIcon = ICONS.formatBold

  return (
    <div className={docsSpace.stack}>
      <ShowcaseBlock name="Control Size" flush>
        <DocsTable>
          <DocsTableColGroup columns={3} />
          <DocsTableHead>
            <DocsTableHeaderRow>
              <DocsTableTh>Token</DocsTableTh>
              <DocsTableTh>rem</DocsTableTh>
              <DocsTableTh>Usage</DocsTableTh>
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {CONTROL_SIZE_SCALE.map((token) => (
              <DocsTableRow key={token.api}>
                <DocsTableTd mono>{formatControlSizeRow(token)}</DocsTableTd>
                <DocsTableTd mono muted>
                  {token.rem}
                </DocsTableTd>
                <DocsTableTd muted>{token.description}</DocsTableTd>
              </DocsTableRow>
            ))}
          </DocsTableBody>
        </DocsTable>
      </ShowcaseBlock>

      <ShowcaseBlock name="Icon Glyph Size" flush>
        <DocsTable>
          <DocsTableColGroup columns={2} />
          <DocsTableHead>
            <DocsTableHeaderRow>
              <DocsTableTh>Token</DocsTableTh>
              <DocsTableTh>Preview</DocsTableTh>
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {ICON_GLYPH_SCALE.map((token) => (
              <DocsTableRow key={token.api}>
                <DocsTableTd mono>{formatIconGlyphOption(token)}</DocsTableTd>
                <DocsTableTd>
                  <Icon icon={sampleIcon} size={token.api} className="text-foreground" />
                </DocsTableTd>
              </DocsTableRow>
            ))}
          </DocsTableBody>
        </DocsTable>
      </ShowcaseBlock>

      <ShowcaseBlock name="Icon Button Size" flush>
        <DocsTable>
          <DocsTableColGroup columns={2} />
          <DocsTableHead>
            <DocsTableHeaderRow>
              <DocsTableTh>Token</DocsTableTh>
              <DocsTableTh aria-hidden />
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {CONTROL_ICON_SIZE_SCALE.map((token) => (
              <DocsTableRow key={token.api}>
                <DocsTableTd mono colSpan={2}>
                  {formatControlSizeRow(token)}
                </DocsTableTd>
              </DocsTableRow>
            ))}
          </DocsTableBody>
        </DocsTable>
      </ShowcaseBlock>

      {ICON_REGISTRY.map((group) => (
        <ShowcaseBlock key={group.id} name={`In use · ${group.title}`}>
          <div className={cn("grid sm:grid-cols-2 lg:grid-cols-3", docsSpace.gap)}>
            {group.icons.map((item) => (
              <div
                key={item.name}
                className={cn(
                  "flex items-center rounded-lg border border-border bg-card",
                  docsSpace.gap,
                  docsSpace.cardHeader
                )}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                  <Icon icon={item.icon} size="md" className="text-foreground" />
                </div>
                <div className="min-w-0">
                  <p className={docsType.tokenName}>{item.name}</p>
                  <p className={cn("truncate", docsType.tokenMeta)}>
                    md_g16 · {item.usage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ShowcaseBlock>
      ))}

      <LucideIconGallery />
    </div>
  )
}
