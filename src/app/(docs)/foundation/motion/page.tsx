import { FoundationMotionShowcase } from "@/components/docs/foundation-motion"
import { DocsMain } from "@/components/docs/docs-main"
import { DocsPageHeader } from "@/components/docs-page-header"

export default function FoundationMotionPage() {
  return (
    <DocsMain>
      <DocsPageHeader eyebrow="Foundation" title="Motion" />
      <FoundationMotionShowcase />
    </DocsMain>
  )
}
