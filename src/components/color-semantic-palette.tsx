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
  COLOR_SEMANTIC_CATEGORIES,
  type ColorToken,
  type TokenCategory,
  type TokenGroup,
} from "@/lib/color-tokens"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { getSemanticTokenSource } from "@/lib/semantic-token-sources"
import { cn } from "@/lib/utils"

export function ThemeNote() {
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

  return (
    <DocsTableRow>
      <DocsTableTd>
        <DocsColorSwatch style={{ background: `var(${token.variable})` }} />
      </DocsTableTd>
      <DocsTableTd>
        {token.m3 ? (
          <span className="font-medium">{token.m3}</span>
        ) : (
          <span className={docsType.tableMono}>{token.name}</span>
        )}
      </DocsTableTd>
      <DocsTableTd mono muted>
        {token.variable}
      </DocsTableTd>
      <DocsTableTd muted>{token.role ?? "—"}</DocsTableTd>
      <DocsTableTd mono muted>
        {source}
      </DocsTableTd>
    </DocsTableRow>
  )
}

function SemanticTokenGroup({ group }: { group: TokenGroup }) {
  return (
    <ShowcaseBlock name={group.title} headingId={group.id} flush as="h3">
      <DocsTable>
        <DocsTableColGroup columns={5} />
        <DocsTableHead>
          <DocsTableHeaderRow>
            <DocsTableTh>Preview</DocsTableTh>
            <DocsTableTh>Token (M3)</DocsTableTh>
            <DocsTableTh>Variable</DocsTableTh>
            <DocsTableTh>Role</DocsTableTh>
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

function SemanticTokenCategory({ category }: { category: TokenCategory }) {
  return (
    <section className={docsSpace.stackGap}>
      <h2
        id={category.id}
        className={cn(
          docsType.sectionTitle,
          "scroll-mt-10 border-b border-border pb-3"
        )}
      >
        {category.title}
      </h2>
      {category.groups.map((group) => (
        <SemanticTokenGroup key={group.id} group={group} />
      ))}
    </section>
  )
}

export function ColorSemanticPalette() {
  return (
    <div className={docsSpace.groupStack}>
      {COLOR_SEMANTIC_CATEGORIES.map((category) => (
        <SemanticTokenCategory key={category.id} category={category} />
      ))}
    </div>
  )
}
