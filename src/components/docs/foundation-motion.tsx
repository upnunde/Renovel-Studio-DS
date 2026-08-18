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
  MOTION_CHOREOGRAPHY,
  MOTION_DURATION_SCALE,
  MOTION_EASING_SCALE,
} from "design-system/motion-tokens"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

export function FoundationMotionShowcase() {
  return (
    <div className={docsSpace.stack}>
      <ShowcaseBlock name="Duration" flush>
        <DocsTable>
          <DocsTableColGroup columns={4} />
          <DocsTableHead>
            <DocsTableHeaderRow>
              <DocsTableTh>Token</DocsTableTh>
              <DocsTableTh>ms</DocsTableTh>
              <DocsTableTh>Tailwind</DocsTableTh>
              <DocsTableTh>Usage</DocsTableTh>
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {MOTION_DURATION_SCALE.map((token) => (
              <DocsTableRow key={token.api}>
                <DocsTableTd mono>{token.label}</DocsTableTd>
                <DocsTableTd mono muted>
                  {token.ms}ms
                </DocsTableTd>
                <DocsTableTd mono muted>
                  {token.tailwind}
                </DocsTableTd>
                <DocsTableTd muted>{token.description}</DocsTableTd>
              </DocsTableRow>
            ))}
          </DocsTableBody>
        </DocsTable>
      </ShowcaseBlock>

      <ShowcaseBlock name="Easing" flush>
        <DocsTable>
          <DocsTableColGroup columns={4} />
          <DocsTableHead>
            <DocsTableHeaderRow>
              <DocsTableTh>Token</DocsTableTh>
              <DocsTableTh>cubic-bezier</DocsTableTh>
              <DocsTableTh>Tailwind</DocsTableTh>
              <DocsTableTh>Usage</DocsTableTh>
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {MOTION_EASING_SCALE.map((token) => (
              <DocsTableRow key={token.api}>
                <DocsTableTd mono>{token.label}</DocsTableTd>
                <DocsTableTd mono muted>
                  {token.value}
                </DocsTableTd>
                <DocsTableTd mono muted>
                  {token.tailwind}
                </DocsTableTd>
                <DocsTableTd muted>{token.description}</DocsTableTd>
              </DocsTableRow>
            ))}
          </DocsTableBody>
        </DocsTable>
      </ShowcaseBlock>

      <ShowcaseBlock name="Choreography" flush>
        <DocsTable>
          <DocsTableColGroup columns={4} />
          <DocsTableHead>
            <DocsTableHeaderRow>
              <DocsTableTh>Scenario</DocsTableTh>
              <DocsTableTh>Duration</DocsTableTh>
              <DocsTableTh>Easing</DocsTableTh>
              <DocsTableTh>Example</DocsTableTh>
            </DocsTableHeaderRow>
          </DocsTableHead>
          <DocsTableBody>
            {MOTION_CHOREOGRAPHY.map((step) => (
              <DocsTableRow key={step.scenario}>
                <DocsTableTd mono>{step.scenario}</DocsTableTd>
                <DocsTableTd mono muted>
                  {step.duration}
                </DocsTableTd>
                <DocsTableTd mono muted>
                  {step.easing}
                </DocsTableTd>
                <DocsTableTd muted>{step.example}</DocsTableTd>
              </DocsTableRow>
            ))}
          </DocsTableBody>
        </DocsTable>
      </ShowcaseBlock>

      <ShowcaseBlock name="Preview · Easing curves">
        <div className={cn("grid gap-4 sm:grid-cols-3", docsSpace.gap)}>
          {MOTION_EASING_SCALE.map((token) => (
            <MotionEasingPreview key={token.api} label={token.label} variable={token.variable} />
          ))}
        </div>
      </ShowcaseBlock>
    </div>
  )
}

function MotionEasingPreview({
  label,
  variable,
}: {
  label: string
  variable: string
}) {
  return (
    <div className="group/preview flex flex-col gap-3 overflow-hidden rounded-lg border border-border bg-background p-3">
      <div className="flex flex-col gap-0.5">
        <span className={cn(docsType.tokenName)}>{label}</span>
        <span className={cn("font-mono text-[0.7rem]", docsType.bodyMuted)}>
          {variable}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-background-muted">
        <span
          aria-hidden
          className="block h-full w-full origin-left -translate-x-full rounded-full bg-primary transition-transform duration-medium group-hover/preview:translate-x-0"
          style={{ transitionTimingFunction: `var(${variable})` }}
        />
      </div>
    </div>
  )
}
