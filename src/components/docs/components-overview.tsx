import { ComponentOverviewPreview } from "@/components/docs/component-overview-preview"
import { OverviewCardLink } from "@/components/docs/overview-card-link"
import { componentDocsBySection } from "@/lib/component-docs"
import { docsSpace } from "@/lib/docs-space"
import { docsType } from "@/lib/docs-type"
import { cn } from "@/lib/utils"

function sectionId(section: string) {
  return section.toLowerCase().replace(/\s+/g, "-")
}

export function ComponentsOverview() {
  const componentSections = componentDocsBySection()

  return (
    <div className={docsSpace.groupStack}>
      {componentSections.map(({ section, items }) => (
        <div key={section} className={cn(docsSpace.stackGap, "scroll-mt-6")}>
          <h2
            id={sectionId(section)}
            className={cn(docsType.sectionTitle, "scroll-mt-10")}
          >
            {section}
          </h2>

          <div
            className={cn(
              "grid w-full min-w-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
              docsSpace.gap
            )}
          >
            {items.map((doc) => (
              <OverviewCardLink
                key={doc.slug}
                href={`/components/${doc.slug}`}
                title={doc.title}
              >
                <ComponentOverviewPreview slug={doc.slug} />
              </OverviewCardLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
