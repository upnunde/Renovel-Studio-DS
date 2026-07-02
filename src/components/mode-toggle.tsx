"use client"

import { ICONS } from "@/components/icons"
import { Icon } from "design-system/ui/icon"
import { useTheme } from "next-themes"
import { Button } from "design-system/ui/button"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="테마 전환"
    >
      <Icon
        icon={ICONS.sun}
        size="md"
        className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
      />
      <Icon
        icon={ICONS.moon}
        size="md"
        className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
      />
    </Button>
  )
}
