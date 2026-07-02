import Link from "next/link"

import { ComponentOverviewPreview } from "@/components/docs/component-overview-preview"
import { Icon } from "design-system/ui/icon"
import { ICONS } from "@/components/icons"
import { componentDocsBySection } from "@/lib/component-docs"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

function sectionId(section: string) {
  return section.toLowerCase().replace(/\s+/g, "-")
}

export function ComponentOverviewGrid() {
  const sections = componentDocsBySection()

  return (
    <div className={docsSpace.stack}>
      <p className={cn(docsType.pageDescription, "max-w-3xl")}>
        카테고리별로 컴포넌트를 살펴보고, 미리보기에서 형태를 확인한 뒤 문서로
        이동할 수 있습니다.
      </p>

      <div className={cn("grid sm:grid-cols-2 xl:grid-cols-3", docsSpace.gap)}>
        {sections.map(({ section, items }) => (
          <Link
            key={section}
            href={`#${sectionId(section)}`}
            className="group block rounded-xl border border-border bg-card p-4 transition-colors hover:border-ring/40 hover:bg-accent/30 data-[hovered=true]:border-ring/40 data-[hovered=true]:bg-accent/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={docsType.groupTitle}>{section}</p>
                <p className="mt-1 text-sm text-foreground-muted">
                  {items.length}개 컴포넌트
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-0.5 text-sm font-medium text-primary">
                바로가기
                <Icon
                  icon={ICONS.chevronRight}
                  size="sm"
                  className="transition-transform group-hover:translate-x-0.5 group-data-[hovered=true]:translate-x-0.5"
                />
              </span>
            </div>
            <div className="mt-4 flex min-h-20 items-center justify-center rounded-lg bg-muted/50 px-3 py-4">
              <div className="flex flex-wrap items-center justify-center gap-2 opacity-90">
                {items.slice(0, 3).map((doc) => (
                  <span
                    key={doc.slug}
                    className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground"
                  >
                    {doc.title}
                  </span>
                ))}
                {items.length > 3 ? (
                  <span className="text-xs text-foreground-muted">
                    +{items.length - 3}
                  </span>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {sections.map(({ section, items }) => (
        <section
          key={section}
          className={cn(docsSpace.groupStack, "scroll-mt-6")}
        >
          <div className="space-y-1">
            <h2 id={sectionId(section)} className={cn(docsType.sectionTitle, "scroll-mt-10")}>
              {section}
            </h2>
            <p className={docsType.sectionDescription}>
              {items.map((doc) => doc.title).join(" · ")}
            </p>
          </div>

          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
              docsSpace.gap
            )}
          >
            {items.map((doc) => (
              <Link
                key={doc.slug}
                href={`/components/${doc.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-ring/40 hover:shadow-sm data-[hovered=true]:border-ring/40 data-[hovered=true]:shadow-sm"
              >
                <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                  <h3 className={docsType.groupTitle}>{doc.title}</h3>
                  <span className="inline-flex shrink-0 items-center gap-0.5 text-sm font-medium text-primary opacity-80 transition-opacity group-hover:opacity-100 group-data-[hovered=true]:opacity-100">
                    바로가기
                    <Icon
                      icon={ICONS.chevronRight}
                      size="sm"
                      className="transition-transform group-hover:translate-x-0.5 group-data-[hovered=true]:translate-x-0.5"
                    />
                  </span>
                </div>

                <div className="flex flex-1 items-center bg-muted/30 px-3 py-4">
                  <ComponentOverviewPreview slug={doc.slug} />
                </div>

                <p className="border-t border-border px-4 py-3 text-sm leading-5 text-foreground-muted">
                  {doc.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
