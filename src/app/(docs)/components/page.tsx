import { DocsMain } from "@/components/docs/docs-main"
import { ComponentsOverview } from "@/components/docs/components-overview"
import { DocsPageHeader } from "@/components/docs-page-header"

export default function ComponentsOverviewPage() {
  return (
    <DocsMain width="6xl" toc={false} className="gap-20">
      <DocsPageHeader
        eyebrow="Components"
        title="Overview"
        description="카테고리별 컴포넌트 미리보기 — 카드를 누르면 상세 문서로 이동합니다."
      />
      <ComponentsOverview />
    </DocsMain>
  )
}
