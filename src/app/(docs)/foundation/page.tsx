import { DocsMain } from "@/components/docs/docs-main"
import { FoundationOverview } from "@/components/docs/foundation-overview"
import { DocsPageHeader } from "@/components/docs-page-header"

export default function FoundationOverviewPage() {
  return (
    <DocsMain width="6xl" toc={false} className="gap-20">
      <DocsPageHeader
        eyebrow="Foundation"
        title="Overview"
        description="토큰·타이포·아이콘 등 기반 레이어 문서로 이동합니다."
      />
      <FoundationOverview />
    </DocsMain>
  )
}
