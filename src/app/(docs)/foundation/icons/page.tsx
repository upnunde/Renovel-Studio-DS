import { FoundationIconsShowcase } from "@/components/docs/foundation-icons"
import { DocsMain } from "@/components/docs/docs-main"
import { DocsPageHeader } from "@/components/docs-page-header"

export default function FoundationIconsPage() {
  return (
    <DocsMain>
      <DocsPageHeader eyebrow="Foundation" title="Icons" />
      <FoundationIconsShowcase />
    </DocsMain>
  )
}
