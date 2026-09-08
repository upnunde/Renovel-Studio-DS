import { notFound } from "next/navigation"

import { ComponentShowcase } from "@/components/docs/component-showcase-client"
import { DocsMain } from "@/components/docs/docs-main"
import { DocsPageHeader } from "@/components/docs-page-header"
import { getComponentDoc, getVisibleComponentDocs } from "@/lib/component-docs"

export function generateStaticParams() {
  return getVisibleComponentDocs().map((doc) => ({ slug: doc.slug }))
}

export default async function ComponentDocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const doc = getComponentDoc(slug)

  if (!doc || doc.hidden) {
    notFound()
  }

  return (
    <DocsMain width="5xl">
      <DocsPageHeader
        eyebrow="Components"
        title={doc.title}
        description={doc.description}
      />
      <ComponentShowcase slug={slug} />
    </DocsMain>
  )
}
