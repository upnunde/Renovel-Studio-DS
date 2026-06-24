"use client"

import Link from "next/link"
import { Fragment, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { Icon } from "@/components/ui/icon"
import { ICONS } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { Separator } from "@/components/ui/separator"
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
          "flex cursor-not-allowed items-center rounded-full px-3 py-1.5 text-sm text-muted-foreground/50",
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
        "flex items-center rounded-full px-3 py-1.5 text-sm transition-colors",
        isActive
          ? "bg-primary font-medium text-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
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
  const sectionHrefs = section.items.map((item) => item.href)
  const isInSection = sectionHrefs.some((href) => href === activeHref)
  const [expanded, setExpanded] = useState(isInSection)

  useEffect(() => {
    if (isInSection) setExpanded(true)
  }, [isInSection])

  if (!defaultHref) return null

  return (
    <div className="space-y-0.5">
      <div className="flex items-center rounded-full text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
        <Link
          href={defaultHref}
          onClick={() => setExpanded(true)}
          className="flex min-w-0 flex-1 items-center px-3 py-1.5"
        >
          {section.label}
        </Link>
        <button
          type="button"
          className="mr-1 flex size-7 shrink-0 items-center justify-center"
          aria-expanded={expanded}
          aria-label={`${section.label} submenu ${expanded ? "collapse" : "expand"}`}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            setExpanded((open) => !open)
          }}
        >
          <Icon
            icon={ICONS.chevronDown}
            size="sm"
            className={cn(
              "text-muted-foreground transition-transform duration-200",
              expanded && "rotate-180"
            )}
          />
        </button>
      </div>

      {expanded ? (
        <ul className="space-y-0.5 pl-2">
          {section.items.map((item) => (
            <li key={item.href}>
              <NavLink
                item={item}
                isActive={item.href === activeHref}
              />
            </li>
          ))}
        </ul>
      ) : null}
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
        <p className="px-2 text-xs font-medium tracking-wide text-muted-foreground/80">
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

function NavGroups({ activeHref }: { activeHref: string | null }) {
  const pathname = usePathname()
  const routeTab = getDocsNavTab(pathname)
  const [tab, setTab] = useState<DocsNavTab>(routeTab)

  useEffect(() => {
    setTab(routeTab)
  }, [routeTab])

  const groups = getDocsNavGroupsForTab(tab)

  return (
    <>
      <div className="shrink-0 border-b border-sidebar-border px-3 py-2.5">
        <div
          className="flex items-center gap-0.5"
          role="tablist"
          aria-label="Documentation sections"
        >
          {docsNavTabs.map((item) => {
            const isSelected = tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  isSelected
                    ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                    : "font-medium text-muted-foreground hover:text-sidebar-foreground"
                )}
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <nav
        className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 py-4"
        role="tabpanel"
        aria-label={tab === "foundation" ? "Foundation" : "Components"}
      >
        {groups.map((group, groupIndex) => (
          <Fragment key={group.title}>
            {groupIndex > 0 ? (
              <Separator className="my-6 bg-sidebar-border" />
            ) : null}
            <div>
              <div
                className={cn(
                  group.tab === "foundation" && "space-y-0.5"
                )}
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
    </>
  )
}

export function DocsSidebar() {
  const pathname = usePathname()
  const activeHref = getActiveDocsNavHref(pathname)

  return (
    <aside className="sticky top-0 flex h-svh w-56 shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:w-60">
      <div className="shrink-0 px-4 py-5">
        <Link href="/foundation/color-tokens" className="block space-y-0.5">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Design System
          </p>
          <p className="font-heading text-sm font-semibold tracking-tight">Docs</p>
        </Link>
      </div>

      <NavGroups activeHref={activeHref} />

      <div className="shrink-0 border-t border-sidebar-border px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">Theme</span>
          <ModeToggle />
        </div>
      </div>
    </aside>
  )
}
