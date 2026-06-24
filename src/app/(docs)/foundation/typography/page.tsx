import { FoundationTypographyShowcase } from "@/components/docs/foundation-typography"
import { DocsMain } from "@/components/docs/docs-main"
import { DocsPageHeader } from "@/components/docs-page-header"

export default function FoundationTypographyPage() {
  return (
    <DocsMain>
      <DocsPageHeader eyebrow="Foundation" title="Typography" />
      <FoundationTypographyShowcase />
    </DocsMain>
  )
}
