"use client"

import Link from "next/link"
import { Fragment, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { ModeToggle } from "@/components/mode-toggle"
import { RenvelStudioLogo } from "@/components/renovel-studio-logo"
import { Separator } from "design-system/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "design-system/ui/tabs"
import {
  docsNavTabs,
  getActiveDocsNavHref,
  getDocsNavGroupsForTab,
  getDocsNavTab,
  type DocsNavItem,
  type DocsNavSection,
  type DocsNavTab,
} from "@/lib/docs-nav"
import { cn } from "@/lib/utils"

function NavLink({
  item,
  isActive,
  className,
}: {
  item: DocsNavItem
  isActive: boolean
  className?: string
}) {
  if (item.disabled) {
    return (
      <span
        className={cn(
          "flex h-9 cursor-not-allowed items-center rounded-full px-3 text-sm text-foreground-disabled",
          className
        )}
        aria-disabled
      >
        {item.title}
        <span className="ml-auto text-xs">Soon</span>
      </span>
    )
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex h-9 items-center rounded-full px-3 text-sm transition-colors",
        isActive
          ? "bg-primary font-medium text-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[hovered=true]:bg-sidebar-accent data-[hovered=true]:text-sidebar-accent-foreground",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {item.title}
    </Link>
  )
}

function NavCollapsibleSection({
  section,
  activeHref,
}: {
  section: DocsNavSection & { label: string; collapsible: true }
  activeHref: string | null
}) {
  const defaultHref = section.items[0]?.href

  if (!defaultHref) return null

  return (
    <div className="space-y-0.5">
      <Link
        href={defaultHref}
        className="flex h-9 items-center rounded-full px-3 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[hovered=true]:bg-sidebar-accent data-[hovered=true]:text-sidebar-accent-foreground"
      >
        {section.label}
      </Link>

      <ul className="space-y-0.5 pl-2">
        {section.items.map((item) => (
          <li key={item.href}>
            <NavLink item={item} isActive={item.href === activeHref} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function NavSection({
  section,
  activeHref,
  compact = false,
}: {
  section: DocsNavSection
  activeHref: string | null
  compact?: boolean
}) {
  const sectionSpacing = compact
    ? ""
    : section.label && !section.collapsible
      ? "mt-5 space-y-1"
      : "space-y-1"

  if (section.collapsible && section.label) {
    return (
      <div className={sectionSpacing}>
        <NavCollapsibleSection
          section={{ ...section, label: section.label, collapsible: true }}
          activeHref={activeHref}
        />
      </div>
    )
  }

  return (
    <div className={sectionSpacing}>
      {section.label ? (
        <p className="px-2 text-xs font-medium tracking-wide text-foreground-muted/80">
          {section.label}
        </p>
      ) : null}
      <ul className="space-y-0.5">
        {section.items.map((item) => (
          <li key={item.href}>
            <NavLink item={item} isActive={item.href === activeHref} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function NavTabPanel({
  tab,
  activeHref,
}: {
  tab: DocsNavTab
  activeHref: string | null
}) {
  const groups = getDocsNavGroupsForTab(tab)

  return (
    <nav className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 py-4">
      {groups.map((group, groupIndex) => (
        <Fragment key={group.title}>
          {groupIndex > 0 ? (
            <Separator className="my-6 bg-sidebar-border" />
          ) : null}
          <div>
            <div
              className={cn(group.tab === "foundation" && "space-y-0.5")}
            >
              {group.sections.map((section, sectionIndex) => (
                <NavSection
                  key={section.label ?? sectionIndex}
                  section={section}
                  activeHref={activeHref}
                  compact={group.tab === "foundation"}
                />
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </nav>
  )
}

function NavGroups({ activeHref }: { activeHref: string | null }) {
  const pathname = usePathname()
  const routeTab = getDocsNavTab(pathname)
  const [tab, setTab] = useState<DocsNavTab>(routeTab)

  useEffect(() => {
    setTab(routeTab)
  }, [routeTab])

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as DocsNavTab)}
      className="flex min-h-0 flex-1 flex-col gap-0"
    >
      <div className="shrink-0 border-b border-sidebar-border px-3 pt-0 pb-[1px]">
        <TabsList variant="line" size="sm" className="w-full">
          {docsNavTabs.map((item) => (
            <TabsTrigger key={item.id} value={item.id}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {docsNavTabs.map((item) => (
        <TabsContent
          key={item.id}
          value={item.id}
          className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden p-0 outline-none"
        >
          <NavTabPanel tab={item.id} activeHref={activeHref} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export function DocsSidebar() {
  const pathname = usePathname()
  const activeHref = getActiveDocsNavHref(pathname)

  return (
    <aside className="sticky top-0 flex h-svh w-56 shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:w-60">
      <div className="shrink-0 px-4 py-5">
        <Link href="/foundation/color-tokens" className="block space-y-0.5">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-foreground-muted">
            Design System
          </p>
          <RenvelStudioLogo />
        </Link>
      </div>

      <NavGroups activeHref={activeHref} />

      <div className="shrink-0 border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-foreground-muted">Theme</span>
          <ModeToggle />
        </div>
      </div>
    </aside>
  )
}
