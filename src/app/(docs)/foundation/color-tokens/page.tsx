import { ColorTokenPalette } from "@/components/color-token-palette"
import { DocsMain } from "@/components/docs/docs-main"
import { DocsPageHeader } from "@/components/docs-page-header"

export default function FoundationColorTokensPage() {
  return (
    <DocsMain>
      <DocsPageHeader eyebrow="Foundation · Color" title="Tokens" />
      <ColorTokenPalette />
    </DocsMain>
  )
}
