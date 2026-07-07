import { FoundationSpacingSemanticShowcase } from "@/components/docs/foundation-spacing-semantic"
import { DocsMain } from "@/components/docs/docs-main"
import { DocsPageHeader } from "@/components/docs-page-header"

export default function FoundationSpacingSemanticPage() {
  return (
    <DocsMain>
      <DocsPageHeader eyebrow="Foundation · Spacing" title="Semantic" />
      <FoundationSpacingSemanticShowcase />
    </DocsMain>
  )
}
