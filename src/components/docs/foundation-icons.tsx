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
import { docsType } from "@/lib/docs-type"
import {
  ICON_GLYPH_SCALE,
  formatIconGlyphOption,
} from "design-system/icon-tokens"
import { cn } from "@/lib/utils"

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

      <ShowcaseBlock name="Icon Set">
        <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between", docsSpace.gap)}>
          <p className={docsType.bodyMuted}>
            아이콘은 Lucide 세트를 사용합니다. 전체 목록·검색은 공식 사이트에서 확인하세요.
          </p>
          <a
            href="https://lucide.dev/icons/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "shrink-0 underline-offset-4 hover:text-foreground hover:underline data-[hovered=true]:text-foreground data-[hovered=true]:underline",
              docsType.bodyMuted
            )}
          >
            전체 아이콘 보기 (Lucide) ↗
          </a>
        </div>
      </ShowcaseBlock>
    </div>
  )
}
