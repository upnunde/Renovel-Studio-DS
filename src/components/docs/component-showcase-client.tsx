"use client"

import dynamic from "next/dynamic"

function ComponentShowcaseSkeleton() {
  return (
    <div className="space-y-5">
      <div className="h-56 animate-pulse rounded-xl border border-border bg-background-muted/20" />
      <div className="h-72 animate-pulse rounded-xl border border-border bg-background-muted/20" />
    </div>
  )
}

/** Cursor 브라우저 미리보기 등이 DOM에 속성을 주입해 SSR 하이드레이션이 깨지는 것을 방지 */
export const ComponentShowcase = dynamic(
  () =>
    import("@/components/docs/component-showcases").then(
      (mod) => mod.ComponentShowcase
    ),
  {
    ssr: false,
    loading: ComponentShowcaseSkeleton,
  }
)
