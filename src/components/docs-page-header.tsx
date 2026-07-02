import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"

export function DocsPageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <header className={docsSpace.headerBottom}>
      {eyebrow ? <p className={docsType.eyebrow}>{eyebrow}</p> : null}
      <h1 className={docsType.pageTitle}>{title}</h1>
      {description ? (
        <p className={docsType.bodyMuted}>{description}</p>
      ) : null}
      {children}
    </header>
  )
}
