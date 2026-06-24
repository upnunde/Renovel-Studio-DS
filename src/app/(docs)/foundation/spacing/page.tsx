import { FoundationSpacingShowcase } from "@/components/docs/foundation-spacing"
import { DocsMain } from "@/components/docs/docs-main"
import { DocsPageHeader } from "@/components/docs-page-header"

export default function FoundationSpacingPage() {
  return (
    <DocsMain>
      <DocsPageHeader eyebrow="Foundation" title="Spacing" />
      <FoundationSpacingShowcase />
    </DocsMain>
  )
}
