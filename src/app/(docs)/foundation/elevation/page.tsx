import { FoundationElevationShowcase } from "@/components/docs/foundation-elevation"
import { DocsMain } from "@/components/docs/docs-main"
import { DocsPageHeader } from "@/components/docs-page-header"

export default function FoundationElevationPage() {
  return (
    <DocsMain>
      <DocsPageHeader eyebrow="Foundation" title="Elevation" />
      <FoundationElevationShowcase />
    </DocsMain>
  )
}
