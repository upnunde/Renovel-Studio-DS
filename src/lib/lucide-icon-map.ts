import * as LucideIcons from "lucide-react"
import type { LucideIcon } from "lucide-react"

export function resolveLucideIcon(name: string): LucideIcon | null {
  const icon = (LucideIcons as Record<string, unknown>)[name]
  return typeof icon === "function" ? (icon as LucideIcon) : null
}
