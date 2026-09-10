"use client"

import { useDeferredValue, useMemo, useState } from "react"
import { toast } from "sonner"

import { ShowcaseBlock } from "@/components/docs/showcase-block"
import { DocsFilterChips } from "@/components/docs/docs-filter-chips"
import { Icon } from "design-system/ui/icon"
import { ICONS } from "design-system/icons"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "design-system/ui/tooltip"
import {
  LUCIDE_ICON_CATALOG,
  LUCIDE_ICON_COMMON_COUNT,
} from "@/lib/lucide-icon-catalog"
import { resolveLucideIcon } from "@/lib/lucide-icon-map"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

/** Lucide PascalCase → DS ICONS camelCase 키 (레지스트리에 있을 때만) */
function dsIconsKey(lucideName: string): string | null {
  const camel = lucideName.charAt(0).toLowerCase() + lucideName.slice(1)
  if (Object.prototype.hasOwnProperty.call(ICONS, camel)) return camel
  // Lucide X → ICONS.close 등 별칭
  const aliases: Record<string, string> = {
    X: "close",
    Bold: "formatBold",
    Italic: "formatItalic",
    Underline: "formatUnderlined",
  }
  const alias = aliases[lucideName]
  if (alias && Object.prototype.hasOwnProperty.call(ICONS, alias)) return alias
  return null
}

/**
 * 붙여넣기·스튜디오 지시용 스니펫.
 * - DS 레지스트리에 있으면 ICONS.* 경로
 * - 없으면 lucide-react 직접 import
 */
export function buildIconCopySnippet(lucideName: string): string {
  const key = dsIconsKey(lucideName)
  if (key) {
    return [
      `// icon: ${lucideName} · ICONS.${key}`,
      `import { ICONS } from "design-system/icons"`,
      `import { Icon } from "design-system/ui/icon"`,
      ``,
      `<Icon icon={ICONS.${key}} />`,
    ].join("\n")
  }
  return [
    `// icon: ${lucideName} · lucide-react`,
    `import { ${lucideName} } from "lucide-react"`,
    `import { Icon } from "design-system/ui/icon"`,
    ``,
    `<Icon icon={${lucideName}} />`,
  ].join("\n")
}

function IconTile({ name }: { name: string }) {
  const LucideIcon = resolveLucideIcon(name)
  if (!LucideIcon) return null

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(buildIconCopySnippet(name))
      toast.success(`${name} 코드가 복사되었습니다`)
    } catch {
      toast.error("복사에 실패했습니다")
    }
  }

  return (
    <TooltipProvider delay={0}>
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                "flex aspect-square w-full items-center justify-center rounded-lg border border-transparent transition-colors",
                "hover:border-border hover:bg-muted/50 data-[hovered=true]:border-border data-[hovered=true]:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            />
          }
          aria-label={`${name} — 클릭하여 적용 코드 복사`}
        >
          <Icon icon={LucideIcon} size="2xl" className="text-foreground" />
        </TooltipTrigger>
        <TooltipContent side="top">{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
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
        <p className={docsType.bodyMuted}>
          아이콘을 클릭하면 적용 코드가 복사됩니다. 스튜디오·이슈에 붙여 넣어 아이콘을
          지정하세요.
        </p>
        <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between", docsSpace.gap)}>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="이름으로 필터 (예: Home, Check)"
            className={cn("h-10 w-full rounded-lg border border-border-emphasis bg-transparent px-3 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:max-w-xs", docsType.body)}
            aria-label="아이콘 검색"
          />
          <a
            href="https://lucide.dev/icons/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "shrink-0 underline-offset-4 hover:text-foreground hover:underline data-[hovered=true]:text-foreground data-[hovered=true]:underline",
              docsType.bodyMuted
            )}
          >
            전체 아이콘 보기 (Lucide) ↗
          </a>
        </div>

        <DocsFilterChips
          value={activeCategory}
          onValueChange={setActiveCategory}
          options={[
            { value: "all", label: `전체 ${LUCIDE_ICON_COMMON_COUNT}` },
            ...LUCIDE_ICON_CATALOG.map((category) => ({
              value: category.id,
              label: category.title,
            })),
          ]}
        />

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
