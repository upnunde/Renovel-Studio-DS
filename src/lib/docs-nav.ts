import { componentDocsBySection } from "@/lib/component-docs"

export type DocsNavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type DocsNavSection = {
  label?: string
  items: DocsNavItem[]
}

export type DocsNavTab = "foundation" | "components"

export type DocsNavGroup = {
  title: string
  tab: DocsNavTab
  sections: DocsNavSection[]
}

export const docsNavTabs: { id: DocsNavTab; label: string }[] = [
  { id: "foundation", label: "Foundation" },
  { id: "components", label: "Components" },
]

export const docsNav: DocsNavGroup[] = [
  {
    title: "Foundation",
    tab: "foundation",
    sections: [
      {
        items: [{ title: "Overview", href: "/foundation" }],
      },
      {
        label: "Color",
        items: [
          { title: "Tokens", href: "/foundation/color-tokens" },
          { title: "Semantic", href: "/foundation/color-semantic" },
        ],
      },
      {
        label: "Spacing",
        items: [
          { title: "Tokens", href: "/foundation/spacing" },
          { title: "Semantic", href: "/foundation/spacing-semantic" },
        ],
      },
      {
        items: [
          { title: "Typography", href: "/foundation/typography" },
          { title: "Icons", href: "/foundation/icons" },
          { title: "Radius", href: "/foundation/radius" },
          { title: "Elevation", href: "/foundation/elevation" },
          { title: "Motion", href: "/foundation/motion" },
        ],
      },
    ],
  },
  {
    title: "Components",
    tab: "components",
    sections: [
      {
        items: [{ title: "Overview", href: "/components" }],
      },
      ...componentDocsBySection().map(({ section, items }) => ({
        label: section,
        items: items.map((doc) => ({
          title: doc.title,
          href: `/components/${doc.slug}`,
        })),
      })),
    ],
  },
]

export function getDocsNavTab(pathname: string): DocsNavTab {
  return pathname === "/components" || pathname.startsWith("/components/")
    ? "components"
    : "foundation"
}

export function getDocsNavGroupsForTab(tab: DocsNavTab) {
  return docsNav.filter((group) => group.tab === tab)
}

export function getActiveDocsNavHref(
  pathname: string,
  nav: DocsNavGroup[] = docsNav
): string | null {
  const hrefs = nav.flatMap((group) =>
    group.sections.flatMap((section) => section.items.map((item) => item.href))
  )

  const matches = hrefs.filter(
    (href) =>
      pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
  )

  if (matches.length === 0) return null

  return matches.sort((a, b) => b.length - a.length)[0] ?? null
}
