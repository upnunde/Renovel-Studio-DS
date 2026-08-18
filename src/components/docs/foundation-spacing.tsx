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
import { SPACING_SCALE } from "design-system/spacing-tokens"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

const gapExamples = [
  { utility: "gap-px", variable: "--space-px", px: 1 },
  { utility: "gap-0.5", variable: "--space-0-5", px: 2 },
  { utility: "gap-2", variable: "--space-2", px: 8 },
  { utility: "gap-4", variable: "--space-4", px: 16 },
  { utility: "gap-6", variable: "--space-6", px: 24 },
  { utility: "gap-10", variable: "--space-10", px: 40 },
  { utility: "gap-16", variable: "--space-16", px: 64 },
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
          <DocsTableColGroup columns={5} />
          <DocsTableHead>
            <DocsTableHeaderRow>
              <DocsTableTh>Token</DocsTableTh>
              <DocsTableTh>Tailwind</DocsTableTh>
              <DocsTableTh>px</DocsTableTh>
              <DocsTableTh>Variable</DocsTableTh>
              <DocsTableTh>Preview</DocsTableTh>
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {SPACING_SCALE.map((s) => (
              <DocsTableRow key={s.token}>
                <DocsTableTd mono>{s.token}</DocsTableTd>
                <DocsTableTd mono muted>
                  {s.className.replace("w-", "")}
                </DocsTableTd>
                <DocsTableTd mono muted>
                  {s.px}px
                </DocsTableTd>
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
            <div key={g.utility} className="flex flex-col gap-2">
              <p className={cn(docsSpace.headerBottom, docsType.bodyMuted)}>
                <span className="font-mono text-foreground">{g.utility}</span>
                {" · "}
                {g.px}px
              </p>
              <div className="flex" style={{ gap: `var(${g.variable})` }}>
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={cn("flex h-8 w-20 shrink-0 items-center justify-center rounded-md bg-background-muted", docsType.body)}
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
