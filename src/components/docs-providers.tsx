"use client"

import { TooltipProvider } from "design-system/ui/tooltip"

export function DocsProviders({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>
}
