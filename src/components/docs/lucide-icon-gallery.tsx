"use client"

import { useDeferredValue, useMemo, useState } from "react"

import { ShowcaseBlock } from "@/components/docs/showcase-block"
import { Icon } from "@/components/ui/icon"
import {
  LUCIDE_ICON_CATALOG,
  LUCIDE_ICON_COMMON_COUNT,
} from "@/lib/lucide-icon-catalog"
import { resolveLucideIcon } from "@/lib/lucide-icon-map"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

function IconTile({ name }: { name: string }) {
  const LucideIcon = resolveLucideIcon(name)
  if (!LucideIcon) return null

  return (
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText(name)}
      title={`${name} — 클릭하여 이름 복사`}
      className={cn(
        "flex w-full flex-col items-center rounded-lg border border-transparent text-center transition-colors",
        docsSpace.pad,
        "hover:border-border hover:bg-muted/50"
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-md bg-muted">
        <Icon icon={LucideIcon} size="md" className="text-foreground" />
      </span>
      <span className={cn("line-clamp-2 w-full leading-tight", docsType.tokenMeta)}>
        {name}
      </span>
    </button>
  )
}

export function LucideIconGallery() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())

  const filteredCategories = useMemo(() => {
    return LUCIDE_ICON_CATALOG.map((category) => ({
      ...category,
      icons: category.icons.filter((name) => {
        const matchesQuery = !deferredQuery || name.toLowerCase().includes(deferredQuery)
        const matchesCategory =
          activeCategory === "all" || category.id === activeCategory
        return matchesQuery && matchesCategory && resolveLucideIcon(name)
      }),
    })).filter((category) => category.icons.length > 0)
  }, [activeCategory, deferredQuery])

  const visibleCount = useMemo(
    () => filteredCategories.reduce((sum, category) => sum + category.icons.length, 0),
    [filteredCategories]
  )

  return (
    <ShowcaseBlock name="Icon Set">
      <div className={docsSpace.stack}>
        <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between", docsSpace.gap)}>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="이름으로 필터 (예: Home, Check)"
            className={cn("h-10 w-full rounded-lg border border-input bg-transparent px-3 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:max-w-xs", docsType.body)}
            aria-label="아이콘 검색"
          />
          <a
            href="https://lucide.dev/icons/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn("shrink-0 underline-offset-4 hover:text-foreground hover:underline", docsType.bodyMuted)}
          >
            전체 아이콘 보기 (Lucide) ↗
          </a>
        </div>

        <div className={cn("flex flex-wrap", docsSpace.gap)}>
          <CategoryChip
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
            label={`전체 ${LUCIDE_ICON_COMMON_COUNT}`}
          />
          {LUCIDE_ICON_CATALOG.map((category) => (
            <CategoryChip
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              label={category.title}
            />
          ))}
        </div>

        {visibleCount === 0 ? (
          <p className={docsType.bodyMuted}>
            조건에 맞는 아이콘이 없습니다.
          </p>
        ) : (
          <div className={docsSpace.stack}>
            {filteredCategories.map((category) => (
              <div key={category.id}>
                {activeCategory === "all" ? (
                  <div className="mb-3">
                    <p className={docsType.groupTitle}>{category.title}</p>
                  </div>
                ) : null}
                <ul className={cn("grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10", docsSpace.gap)}>
                  {category.icons.map((name) => (
                    <li key={name}>
                      <IconTile name={name} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </ShowcaseBlock>
  )
}

function CategoryChip({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        docsType.body,
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:bg-muted"
      )}
    >
      {label}
    </button>
  )
}
