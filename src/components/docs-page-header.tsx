import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

export function DocsPageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <header className={docsSpace.headerBottom}>
      {eyebrow ? <p className={docsType.eyebrow}>{eyebrow}</p> : null}
      <h1 className={docsType.pageTitle}>{title}</h1>
      {description ? (
        <p className={cn(docsType.pageDescription, "mt-2")}>{description}</p>
      ) : null}
    </header>
  )
}
