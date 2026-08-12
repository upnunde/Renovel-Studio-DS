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
import { ICONS } from "@/components/icons"
import { Icon } from "design-system/ui/icon"
import { docsSpace } from "@/lib/docs-space"
import {
  ICON_GLYPH_SCALE,
  formatIconGlyphOption,
} from "design-system/icon-tokens"

export function FoundationIconsShowcase() {
  const sampleIcon = ICONS.formatBold

  return (
    <div className={docsSpace.stack}>
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

      <LucideIconGallery />
    </div>
  )
}
