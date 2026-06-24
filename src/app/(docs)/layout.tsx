import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsProviders } from "@/components/docs-providers"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DocsProviders>
      <div className="flex h-svh overflow-hidden bg-canvas">
        <DocsSidebar />
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </DocsProviders>
  )
}
