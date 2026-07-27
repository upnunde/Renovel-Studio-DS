"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * next-themes 는 FOUC 방지용 inline <script> 를 Client Component 안에서 렌더한다.
 * React 19 / Next 16 는 이를 console.error 로 경고하지만, SSR 시점 스크립트는
 * 정상 동작한다 (false positive). 개발 콘솔만 조용히 한다.
 * @see https://github.com/shadcn-ui/ui/issues/10104
 * @see https://github.com/pacocoursey/next-themes/issues/385
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalConsoleError = console.error
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag while rendering React component")
    ) {
      return
    }
    originalConsoleError.apply(console, args)
  }
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
