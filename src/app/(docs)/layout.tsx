import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsProviders } from "@/components/docs-providers"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DocsProviders>
      <div className="fixed inset-0 flex overflow-hidden bg-canvas">
        <DocsSidebar />
        <div className="min-h-0 min-w-0 flex-1 overflow-x-clip overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </DocsProviders>
  )
}
