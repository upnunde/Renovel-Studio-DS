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
import {
  FONT_FAMILIES,
  TYPOGRAPHY_SCALE,
} from "design-system/typography-tokens"
import {
  formatFontFamily,
  formatTypographyToken,
} from "design-system/typography-display"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

export function FoundationTypographyShowcase() {
  return (
    <div className={docsSpace.stack}>
      <ShowcaseBlock name="Type Scale" flush>
        <DocsTable>
          <DocsTableColGroup columns={4} />
          <DocsTableHead>
            <DocsTableHeaderRow>
              <DocsTableTh>Token</DocsTableTh>
              <DocsTableTh>px</DocsTableTh>
              <DocsTableTh>Usage</DocsTableTh>
              <DocsTableTh>Preview</DocsTableTh>
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {TYPOGRAPHY_SCALE.map((token) => (
              <DocsTableRow key={token.className}>
                <DocsTableTd mono>{formatTypographyToken(token)}</DocsTableTd>
                <DocsTableTd mono muted>
                  {token.fontSizePx}/{token.lineHeightPx}px
                </DocsTableTd>
                <DocsTableTd muted>{token.description}</DocsTableTd>
                <DocsTableTd>
                  <span className={cn("text-foreground", token.className)}>
                    가나다 ABC 123
                  </span>
                </DocsTableTd>
              </DocsTableRow>
            ))}
          </DocsTableBody>
        </DocsTable>
      </ShowcaseBlock>

      <ShowcaseBlock name="Font Family" flush>
        <DocsTable>
          <DocsTableColGroup columns={4} />
          <DocsTableHead>
            <DocsTableHeaderRow>
              <DocsTableTh>Token</DocsTableTh>
              <DocsTableTh>CSS</DocsTableTh>
              <DocsTableTh>Usage</DocsTableTh>
              <DocsTableTh>Preview</DocsTableTh>
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {FONT_FAMILIES.map((f) => (
              <DocsTableRow key={f.token}>
                <DocsTableTd mono>{formatFontFamily(f)}</DocsTableTd>
                <DocsTableTd mono muted>
                  {f.css}
                </DocsTableTd>
                <DocsTableTd muted>{f.usage}</DocsTableTd>
                <DocsTableTd className={cn("text-base", f.token)}>
                  {f.family} · {f.weightRange}
                </DocsTableTd>
              </DocsTableRow>
            ))}
          </DocsTableBody>
        </DocsTable>
      </ShowcaseBlock>

      <ShowcaseBlock name="정책" flush>
        <div className={cn("p-5 space-y-2", docsType.bodyMuted)}>
          <p>합본 클래스만 사용 — <code>text-body3_500</code> 같은 단일 utility로 size·line-height·font-weight를 묶는다.</p>
          <p>개별 속성 조합(<code>text-sm + font-bold</code> 등) 금지. 폰트 패밀리는 fonts.css에서 전역 적용.</p>
          <p>27개 utility는 <code>typography.css</code> @utility와 <code>typography-tokens.ts</code> TYPOGRAPHY_SCALE에서 1:1 동기화.</p>
        </div>
      </ShowcaseBlock>
    </div>
  )
}
