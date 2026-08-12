"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

/** SSR·hydration과 next-themes resolvedTheme 불일치 방지 — mount 전에는 light 고정 */
export function useDocsTheme() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const theme = resolvedTheme === "dark" ? ("dark" as const) : ("light" as const)

  return {
    mounted,
    theme: mounted ? theme : ("light" as const),
    isDark: mounted && theme === "dark",
    label: mounted && theme === "dark" ? "Dark" : "Light",
  }
}
