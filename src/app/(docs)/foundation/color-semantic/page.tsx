import { ColorSemanticPalette } from "@/components/color-semantic-palette"
import { DocsMain } from "@/components/docs/docs-main"
import { DocsPageHeader } from "@/components/docs-page-header"

export default function FoundationColorSemanticPage() {
  return (
    <DocsMain>
      <DocsPageHeader eyebrow="Foundation · Color" title="Semantic" />
      <ColorSemanticPalette />
    </DocsMain>
  )
}
