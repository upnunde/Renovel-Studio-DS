"use client"

import Link from "next/link"
import { Fragment, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import { ModeToggle } from "@/components/mode-toggle"
import { RenvelStudioLogo } from "@/components/renovel-studio-logo"
import { Separator } from "design-system/ui/separator"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "design-system/ui/sidebar"
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

const NAV_SIZE = "sm" as const

function NavMenuButton({
  item,
  isActive,
}: {
  item: DocsNavItem
  isActive: boolean
}) {
  if (item.disabled) {
    return (
      <SidebarMenuButton size={NAV_SIZE} disabled>
        {item.title}
        <span className="ml-auto text-caption2_400">Soon</span>
      </SidebarMenuButton>
    )
  }

  return (
    <SidebarMenuButton
      size={NAV_SIZE}
      isActive={isActive}
      render={<Link href={item.href} />}
    >
      {item.title}
    </SidebarMenuButton>
  )
}

function NavSection({
  section,
  activeHref,
}: {
  section: DocsNavSection
  activeHref: string | null
}) {
  return (
    <SidebarGroup>
      {section.label ? (
        <SidebarGroupLabel size={NAV_SIZE}>{section.label}</SidebarGroupLabel>
      ) : null}
      <SidebarMenu>
        {section.items.map((item) => (
          <SidebarMenuItem key={item.href}>
            <NavMenuButton
              item={item}
              isActive={item.href === activeHref}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
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
            <Separator className="my-6 bg-border" />
          ) : null}
          {/* SidebarGroup 스택 간격 — 컴포넌트 정본(gap-1)·메뉴(gap-0)와 겹치지 않게 부모 gap만 */}
          <div className="flex flex-col gap-5">
            {group.sections.map((section, sectionIndex) => (
              <NavSection
                key={section.label ?? sectionIndex}
                section={section}
                activeHref={activeHref}
              />
            ))}
          </div>
        </Fragment>
      ))}
    </nav>
  )
}

function NavGroups({ activeHref }: { activeHref: string | null }) {
  const pathname = usePathname()
  const router = useRouter()
  const routeTab = getDocsNavTab(pathname)
  const [tab, setTab] = useState<DocsNavTab>(routeTab)

  useEffect(() => {
    setTab(routeTab)
  }, [routeTab])

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => {
        const next = value as DocsNavTab
        setTab(next)
        router.push(next === "components" ? "/components" : "/foundation")
      }}
      className="flex min-h-0 flex-1 flex-col gap-0"
    >
      <div className="shrink-0 border-b border-border px-5 pt-0 pb-[1px]">
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
    <aside className="sticky top-0 flex h-svh w-56 shrink-0 flex-col overflow-hidden border-r border-border bg-background text-foreground lg:w-60">
      <div className="shrink-0 px-5 py-5">
        <Link href="/foundation" className="block space-y-0.5">
          <p className="mb-2 text-caption1_500 uppercase tracking-widest text-foreground-muted">
            Design System
          </p>
          <RenvelStudioLogo />
        </Link>
      </div>

      <NavGroups activeHref={activeHref} />

      <div className="shrink-0 border-t border-border px-5 py-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-caption1_400 text-foreground-muted">Theme</span>
          <ModeToggle />
        </div>
      </div>
    </aside>
  )
}
