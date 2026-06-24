"use client"

import {
  ABSOLUTE_BASE,
  BLACK_OPACITY_SCALE,
  BRAND_SCALE,
  GRAYSCALE_SCALE,
  STATE_COLOR_FAMILIES,
  WHITE_OPACITY_SCALE,
  brandGradientCss,
  grayscaleGradientCss,
  stateColorGradientCss,
  type AbsoluteColorStep,
  type StateColorFamily,
} from "@/lib/color-tokens"
import { ShowcaseBlock } from "@/components/docs/showcase-block"
import {
  DocsColorSwatch,
  DocsTable,
  DocsTableBody,
  DocsTableColGroup,
  DocsTableHead,
  DocsTableHeaderRow,
  DocsTableRow,
  DocsTableTd,
  DocsTableTh,
} from "@/components/docs/docs-table"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

export function ColorTokenPalette() {
  return (
    <div className={docsSpace.stack}>
      <AbsoluteBaseTable />
      <OpacityScaleTable title="White Opacity" steps={WHITE_OPACITY_SCALE} checkerDark={false} />
      <OpacityScaleTable title="Black Opacity" steps={BLACK_OPACITY_SCALE} checkerDark />
      <GrayscaleGradientBar />
      <HexScaleTable title="Grayscale Scale" steps={GRAYSCALE_SCALE} />
      <BrandGradientBar />
      <HexScaleTable title="Brand Scale" steps={BRAND_SCALE} />
      {STATE_COLOR_FAMILIES.map((family) => (
        <StateColorFamilySection key={family.id} family={family} />
      ))}
    </div>
  )
}

const CHECKERBOARD =
  "linear-gradient(45deg, #e7e7eb 25%, transparent 25%), linear-gradient(-45deg, #e7e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e7e7eb 75%), linear-gradient(-45deg, transparent 75%, #e7e7eb 75%)"

function AbsoluteBaseTable() {
  return (
    <ShowcaseBlock name="White · Black" flush>
      <DocsTable>
        <DocsTableColGroup columns={4} />
        <DocsTableHead>
          <DocsTableHeaderRow>
            <DocsTableTh>Color</DocsTableTh>
            <DocsTableTh>Token</DocsTableTh>
            <DocsTableTh>Value</DocsTableTh>
            <DocsTableTh>Role</DocsTableTh>
          </DocsTableHeaderRow>
        </DocsTableHead>
        <DocsTableBody>
          {ABSOLUTE_BASE.map((c) => (
            <DocsTableRow key={c.name}>
              <DocsTableTd>
                <DocsColorSwatch style={{ background: c.css }} />
              </DocsTableTd>
              <DocsTableTd mono>{c.name}</DocsTableTd>
              <DocsTableTd mono muted>
                {c.label}
              </DocsTableTd>
              <DocsTableTd muted>{c.role}</DocsTableTd>
            </DocsTableRow>
          ))}
        </DocsTableBody>
      </DocsTable>
    </ShowcaseBlock>
  )
}

function OpacityScaleTable({
  title,
  steps,
  checkerDark,
}: {
  title: string
  steps: AbsoluteColorStep[]
  checkerDark: boolean
}) {
  return (
    <ShowcaseBlock name={title} flush>
      <DocsTable>
        <DocsTableColGroup columns={4} />
        <DocsTableHead>
          <DocsTableHeaderRow>
            <DocsTableTh>Color</DocsTableTh>
            <DocsTableTh>Token</DocsTableTh>
            <DocsTableTh>Alpha</DocsTableTh>
            <DocsTableTh>Role</DocsTableTh>
          </DocsTableHeaderRow>
        </DocsTableHead>
        <DocsTableBody>
          {steps.map((c) => (
            <DocsTableRow key={c.name}>
              <DocsTableTd>
                <DocsColorSwatch
                  className="overflow-hidden"
                  style={{
                    backgroundColor: checkerDark ? "#848486" : "#f8f8fc",
                    backgroundImage: CHECKERBOARD,
                    backgroundSize: "8px 8px",
                    backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0",
                  }}
                >
                  <div className="h-full w-full" style={{ background: `var(${c.variable})` }} />
                </DocsColorSwatch>
              </DocsTableTd>
              <DocsTableTd mono>{c.name}</DocsTableTd>
              <DocsTableTd mono muted>
                {c.label}
              </DocsTableTd>
              <DocsTableTd muted>{c.role}</DocsTableTd>
            </DocsTableRow>
          ))}
        </DocsTableBody>
      </DocsTable>
    </ShowcaseBlock>
  )
}

function HexScaleTable({
  title,
  steps,
}: {
  title: string
  steps: readonly { name: string; hex: string; role: string }[]
}) {
  return (
    <ShowcaseBlock name={title} flush>
      <DocsTable>
        <DocsTableColGroup columns={4} />
        <DocsTableHead>
          <DocsTableHeaderRow>
            <DocsTableTh>Color</DocsTableTh>
            <DocsTableTh>Token</DocsTableTh>
            <DocsTableTh>Hex</DocsTableTh>
            <DocsTableTh>Role</DocsTableTh>
          </DocsTableHeaderRow>
        </DocsTableHead>
        <DocsTableBody>
          {steps.map((step) => (
            <DocsTableRow key={step.name}>
              <DocsTableTd>
                <DocsColorSwatch style={{ background: step.hex }} />
              </DocsTableTd>
              <DocsTableTd mono>{step.name}</DocsTableTd>
              <DocsTableTd mono muted>
                {step.hex.toUpperCase()}
              </DocsTableTd>
              <DocsTableTd muted>{step.role}</DocsTableTd>
            </DocsTableRow>
          ))}
        </DocsTableBody>
      </DocsTable>
    </ShowcaseBlock>
  )
}

function GrayscaleGradientBar() {
  return (
    <ShowcaseBlock name="Grayscale Gradient">
      <div
        className="h-14 w-full rounded-xl ring-1 ring-border"
        style={{ background: grayscaleGradientCss() }}
        role="img"
        aria-label="Grayscale gradient"
      />
      <div className={cn("mt-2 flex justify-between", docsType.tokenMeta)}>
        <span>10</span>
        <span>70</span>
        <span>140</span>
      </div>
    </ShowcaseBlock>
  )
}

function BrandGradientBar() {
  return (
    <ShowcaseBlock name="Brand Gradient">
      <div
        className="h-14 w-full rounded-xl ring-1 ring-border"
        style={{ background: brandGradientCss() }}
        role="img"
        aria-label="Brand gradient"
      />
      <div className={cn("mt-2 flex justify-between", docsType.tokenMeta)}>
        <span>950</span>
        <span>500</span>
        <span>50</span>
      </div>
    </ShowcaseBlock>
  )
}

function StateColorFamilySection({ family }: { family: StateColorFamily }) {
  return (
    <>
      <ShowcaseBlock name={`${family.title} Gradient`}>
        <div
          className="h-14 w-full rounded-xl ring-1 ring-border"
          style={{ background: stateColorGradientCss(family.scale) }}
          role="img"
          aria-label={`${family.title} gradient`}
        />
        <div className={cn("mt-2 flex justify-between", docsType.tokenMeta)}>
          <span>950</span>
          <span>500</span>
          <span>50</span>
        </div>
      </ShowcaseBlock>

      <HexScaleTable title={`${family.title} Scale`} steps={family.scale} />
    </>
  )
}
