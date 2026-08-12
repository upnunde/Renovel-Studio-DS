import * as LucideIcons from "lucide-react"
import type { LucideIcon } from "lucide-react"

export function resolveLucideIcon(name: string): LucideIcon | null {
  const icon = (LucideIcons as Record<string, unknown>)[name]
  // lucide-react는 아이콘을 함수(구버전) 또는 forwardRef 객체(신버전)로 export.
  // 둘 다 유효한 렌더 컴포넌트이므로 함께 통과시킨다.
  if (typeof icon === "function") return icon as LucideIcon
  if (
    typeof icon === "object" &&
    icon !== null &&
    "$$typeof" in icon
  ) {
    return icon as unknown as LucideIcon
  }
  return null
}
