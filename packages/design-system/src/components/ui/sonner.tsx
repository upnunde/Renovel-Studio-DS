"use client"

import { ICONS } from "../icons"
import { Icon } from "./icon"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <Icon icon={ICONS.checkCircle} size="md" />,
        info: <Icon icon={ICONS.info} size="md" />,
        warning: <Icon icon={ICONS.warning} size="md" />,
        error: <Icon icon={ICONS.error} size="md" />,
        loading: <Icon icon={ICONS.loader} size="md" className="animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
