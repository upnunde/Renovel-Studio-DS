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
  COMPONENT_TYPOGRAPHY,
  DESIGN_SPEC_REFERENCE,
  FONT_FAMILIES,
  FONT_WEIGHTS,
  TYPOGRAPHY_SCALE,
} from "design-system/typography-tokens"
import {
  formatFontFamily,
  formatFontWeight,
  formatTypographyRecommended,
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
              <DocsTableTh>rem</DocsTableTh>
              <DocsTableTh>Usage</DocsTableTh>
              <DocsTableTh>Preview</DocsTableTh>
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {TYPOGRAPHY_SCALE.map((token) => (
              <DocsTableRow key={token.name}>
                <DocsTableTd mono>{formatTypographyToken(token)}</DocsTableTd>
                <DocsTableTd mono muted>
                  {token.rem}
                </DocsTableTd>
                <DocsTableTd muted>{token.usage}</DocsTableTd>
                <DocsTableTd>
                  <div className="space-y-1">
                    <span className={cn("text-foreground", token.name)}>가나다 ABC 123</span>
                    <p className={docsType.bodyMuted}>
                      {token.fontSizePx}px / {token.lineHeightPx}px
                    </p>
                  </div>
                </DocsTableTd>
              </DocsTableRow>
            ))}
          </DocsTableBody>
        </DocsTable>
      </ShowcaseBlock>

      <ShowcaseBlock name="Font Weight" flush>
        <DocsTable>
          <DocsTableColGroup columns={4} />
          <DocsTableHead>
            <DocsTableHeaderRow>
              <DocsTableTh>Token</DocsTableTh>
              <DocsTableTh>Usage</DocsTableTh>
              <DocsTableTh>Preview</DocsTableTh>
              <DocsTableTh aria-hidden />
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {FONT_WEIGHTS.map((w) => (
              <DocsTableRow key={w.name}>
                <DocsTableTd mono>{formatFontWeight(w.name, w.value)}</DocsTableTd>
                <DocsTableTd muted>{w.usage}</DocsTableTd>
                <DocsTableTd colSpan={2} className={cn("text-base", w.name)}>
                  Pretendard {w.value}
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

      <ShowcaseBlock name="Component Defaults" flush>
        <DocsTable>
          <DocsTableColGroup columns={3} />
          <DocsTableHead>
            <DocsTableHeaderRow>
              <DocsTableTh>Component</DocsTableTh>
              <DocsTableTh>Token</DocsTableTh>
              <DocsTableTh>Usage</DocsTableTh>
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {COMPONENT_TYPOGRAPHY.map((row) => (
              <DocsTableRow key={row.component}>
                <DocsTableTd mono>{row.component}</DocsTableTd>
                <DocsTableTd mono>{row.display}</DocsTableTd>
                <DocsTableTd muted>{row.usage}</DocsTableTd>
              </DocsTableRow>
            ))}
          </DocsTableBody>
        </DocsTable>
      </ShowcaseBlock>

      <ShowcaseBlock name="Design Spec Reference" flush>
        <DocsTable>
          <DocsTableColGroup columns={4} />
          <DocsTableHead>
            <DocsTableHeaderRow>
              <DocsTableTh>Spec name</DocsTableTh>
              <DocsTableTh>px</DocsTableTh>
              <DocsTableTh>→ shadcn</DocsTableTh>
              <DocsTableTh>Note</DocsTableTh>
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {DESIGN_SPEC_REFERENCE.map((row) => (
              <DocsTableRow key={row.specName}>
                <DocsTableTd mono muted>
                  {row.specName} · {row.weight}
                </DocsTableTd>
                <DocsTableTd mono className="tabular-nums">
                  {row.fontSizePx}/{row.lineHeightPx}px
                </DocsTableTd>
                <DocsTableTd mono>
                  {formatTypographyRecommended(
                    row.recommended,
                    row.fontSizePx,
                    row.lineHeightPx
                  )}
                </DocsTableTd>
                <DocsTableTd muted>
                  {row.note ?? "—"}
                </DocsTableTd>
              </DocsTableRow>
            ))}
          </DocsTableBody>
        </DocsTable>
      </ShowcaseBlock>
    </div>
  )
}
