import { FoundationRadiusShowcase } from "@/components/docs/foundation-radius"
import { DocsMain } from "@/components/docs/docs-main"
import { DocsPageHeader } from "@/components/docs-page-header"

export default function FoundationRadiusPage() {
  return (
    <DocsMain>
      <DocsPageHeader eyebrow="Foundation" title="Radius" />
      <FoundationRadiusShowcase />
    </DocsMain>
  )
}
