"use client"

import { useTheme } from "next-themes"

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
import {
  COLOR_SEMANTIC_GROUPS,
  type ColorToken,
  type TokenGroup,
} from "@/lib/color-tokens"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { getSemanticTokenSource } from "@/lib/semantic-token-sources"
import { cn } from "@/lib/utils"

function ThemeNote() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <p className={docsType.bodyMuted}>
      현재{" "}
      <span className="font-medium text-foreground">
        {isDark ? "Dark" : "Light"}
      </span>{" "}
      모드 기준입니다. 테마를 전환하면 아래 값이 갱신됩니다.
    </p>
  )
}

function SemanticTokenRow({ token }: { token: ColorToken }) {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === "dark" ? "dark" : "light"
  const source = getSemanticTokenSource(token.variable, theme)
  const isForeground =
    token.name.endsWith("-foreground") || token.name === "foreground"

  return (
    <DocsTableRow>
      <DocsTableTd>
        <DocsColorSwatch
          className={cn(
            "flex items-center justify-center text-sm font-medium",
            isForeground && "bg-background"
          )}
          style={
            isForeground
              ? { color: `var(${token.variable})` }
              : { background: `var(${token.variable})` }
          }
        >
          {isForeground ? "Aa" : null}
        </DocsColorSwatch>
      </DocsTableTd>
      <DocsTableTd mono>{token.name}</DocsTableTd>
      <DocsTableTd mono muted>
        {token.variable}
      </DocsTableTd>
      <DocsTableTd muted>{source}</DocsTableTd>
    </DocsTableRow>
  )
}

function SemanticTokenGroup({ group }: { group: TokenGroup }) {
  return (
    <ShowcaseBlock name={group.title} flush>
      <DocsTable>
        <DocsTableColGroup columns={4} />
        <DocsTableHead>
          <DocsTableHeaderRow>
            <DocsTableTh>Preview</DocsTableTh>
            <DocsTableTh>Token</DocsTableTh>
            <DocsTableTh>Variable</DocsTableTh>
            <DocsTableTh>Maps to</DocsTableTh>
          </DocsTableHeaderRow>
        </DocsTableHead>
        <DocsTableBody>
          {group.tokens.map((token) => (
            <SemanticTokenRow key={token.name} token={token} />
          ))}
        </DocsTableBody>
      </DocsTable>
    </ShowcaseBlock>
  )
}

export function ColorSemanticPalette() {
  return (
    <div className={docsSpace.stack}>
      <ThemeNote />
      {COLOR_SEMANTIC_GROUPS.map((group) => (
        <SemanticTokenGroup key={group.id} group={group} />
      ))}
    </div>
  )
}
