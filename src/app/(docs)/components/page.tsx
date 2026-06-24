import { DocsMain } from "@/components/docs/docs-main"
import { ComponentOverviewGrid } from "@/components/docs/component-overview-grid"
import { DocsPageHeader } from "@/components/docs-page-header"

export default function ComponentsIndexPage() {
  return (
    <DocsMain width="6xl">
      <DocsPageHeader
        eyebrow="Components"
        title="Overview"
        description="디자인 시스템 컴포넌트 카탈로그 — 카테고리별 미리보기와 문서 바로가기"
      />
      <ComponentOverviewGrid />
    </DocsMain>
  )
}
