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
import { SPACING_SCALE, formatSpacingToken } from "design-system/spacing-tokens"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

const gapExamples = [
  { utility: "gap-px", label: "px", variable: "--space-px", px: 1 },
  { utility: "gap-0.5", label: "0.5_2", variable: "--space-0-5", px: 2 },
  { utility: "gap-2", label: "2_8", variable: "--space-2", px: 8 },
  { utility: "gap-4", label: "4_16", variable: "--space-4", px: 16 },
  { utility: "gap-6", label: "6_24", variable: "--space-6", px: 24 },
  { utility: "gap-10", label: "10_40", variable: "--space-10", px: 40 },
  { utility: "gap-16", label: "16_64", variable: "--space-16", px: 64 },
] as const

export function FoundationSpacingShowcase() {
  return (
    <div className={docsSpace.stack}>
      <div
        className="hidden gap-px gap-0.5 gap-1 gap-2 gap-3 gap-4 gap-5 gap-6 gap-8 gap-10 gap-12 gap-16 gap-20 w-px w-0.5 w-1 w-2 w-3 w-4 w-5 w-6 w-8 w-10 w-12 w-16 w-20"
        aria-hidden
      />

      <ShowcaseBlock name="Spacing Scale" flush>
        <DocsTable>
          <DocsTableColGroup columns={3} />
          <DocsTableHead>
            <DocsTableHeaderRow>
              <DocsTableTh>Token</DocsTableTh>
              <DocsTableTh>Variable</DocsTableTh>
              <DocsTableTh>Preview</DocsTableTh>
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {SPACING_SCALE.map((s) => (
              <DocsTableRow key={s.token}>
                <DocsTableTd mono>{formatSpacingToken(s)}</DocsTableTd>
                <DocsTableTd mono muted>
                  {s.variable}
                </DocsTableTd>
                <DocsTableTd>
                  <div
                    className="h-4 shrink-0 rounded-sm bg-primary"
                    style={{ width: `var(${s.variable})` }}
                  />
                </DocsTableTd>
              </DocsTableRow>
            ))}
          </DocsTableBody>
        </DocsTable>
      </ShowcaseBlock>

      <ShowcaseBlock name="Gap">
        <div className={docsSpace.stack}>
          {gapExamples.map((g) => (
            <div key={g.utility}>
              <p className={cn(docsSpace.headerBottom, docsType.bodyMuted)}>
                {g.utility} · {g.label} · {g.px}px · {g.variable}
              </p>
              <div className="flex" style={{ gap: `var(${g.variable})` }}>
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={cn("flex h-8 w-20 shrink-0 items-center justify-center rounded-md bg-muted", docsType.body)}
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ShowcaseBlock>
    </div>
  )
}
