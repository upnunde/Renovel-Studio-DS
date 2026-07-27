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
import { ELEVATION_SCALE } from "design-system/elevation-tokens"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

export function FoundationElevationShowcase() {
  return (
    <div className={docsSpace.stack}>
      <p className={cn(docsType.bodyMuted, "max-w-3xl")}>
        Material 결 6단계 그림자. 라이트 alpha 0.06 · 다크 alpha 0.32. 기본 표면에는
        쓰지 않고, 부유 레이어(호버·메뉴·모달)에만 적용합니다.
      </p>

      <ShowcaseBlock name="Elevation Scale" flush>
        <DocsTable>
          <DocsTableColGroup columns={4} />
          <DocsTableHead>
            <DocsTableHeaderRow>
              <DocsTableTh>Token</DocsTableTh>
              <DocsTableTh>Tailwind</DocsTableTh>
              <DocsTableTh>Usage</DocsTableTh>
              <DocsTableTh>Preview</DocsTableTh>
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {ELEVATION_SCALE.map((token) => (
              <DocsTableRow key={token.level}>
                <DocsTableTd mono>{token.variable}</DocsTableTd>
                <DocsTableTd mono muted>
                  {token.className}
                </DocsTableTd>
                <DocsTableTd muted>{token.description}</DocsTableTd>
                <DocsTableTd>
                  <div className="flex h-20 items-center justify-center bg-muted/40 px-4 py-3">
                    <div
                      className={cn(
                        "flex h-12 w-28 items-center justify-center rounded-lg border border-border bg-card text-caption1_500 text-foreground-muted",
                        token.className
                      )}
                    >
                      {token.label}
                    </div>
                  </div>
                </DocsTableTd>
              </DocsTableRow>
            ))}
          </DocsTableBody>
        </DocsTable>
      </ShowcaseBlock>

      <ShowcaseBlock name="Preview · Compare">
        <div
          className={cn(
            "grid grid-cols-2 gap-5 sm:grid-cols-3",
            docsSpace.gap
          )}
        >
          {ELEVATION_SCALE.map((token) => (
            <div
              key={token.level}
              className="flex flex-col items-center gap-3 rounded-xl bg-muted/40 p-5"
            >
              <div
                className={cn(
                  "flex size-20 items-center justify-center rounded-xl border border-border bg-card text-body3_500 text-foreground",
                  token.className
                )}
              >
                {token.level}
              </div>
              <div className="flex flex-col items-center gap-0.5 text-center">
                <span className={docsType.tokenName}>{token.label}</span>
                <span className={cn(docsType.tokenMeta)}>{token.description}</span>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseBlock>
    </div>
  )
}
