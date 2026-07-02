"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

type TocEntry = { id: string; text: string; level: 2 | 3 }

/**
 * shadcn·Material 스타일 우측 sticky TOC.
 * 페이지 내 `h2[id]`·`h3[id]` 를 자동 수집하고 IntersectionObserver 로
 * 활성 항목을 하이라이트한다.
 */
export function DocsToc({ containerId }: { containerId?: string }) {
  const [entries, setEntries] = useState<TocEntry[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const root = containerId
      ? document.getElementById(containerId)
      : document.querySelector<HTMLElement>("main")
    if (!root) return

    const collect = () => {
      const nodes = Array.from(
        root.querySelectorAll<HTMLElement>("h2[id], h3[id]")
      )
      return nodes.map<TocEntry>((node) => ({
        id: node.id,
        text: node.textContent?.trim() ?? "",
        level: node.tagName === "H2" ? 2 : 3,
      }))
    }

    setEntries(collect())

    const observer = new MutationObserver(() => setEntries(collect()))
    observer.observe(root, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [containerId])

  useEffect(() => {
    if (entries.length === 0) return

    const nodes = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((node): node is HTMLElement => node !== null)

    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: [0, 1],
      }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [entries])

  if (entries.length === 0) return null

  return (
    <nav
      aria-label="이 페이지 내용"
      className="sticky top-10 hidden max-h-[calc(100svh-5rem)] w-56 shrink-0 self-start overflow-y-auto xl:block"
    >
      <p className="mb-3 text-sm font-medium text-foreground">On this page</p>
      <ul className="space-y-1.5 border-l border-border">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              onClick={(event) => {
                event.preventDefault()
                const target = document.getElementById(entry.id)
                if (!target) return
                target.scrollIntoView({ behavior: "smooth", block: "start" })
                history.replaceState(null, "", `#${entry.id}`)
                setActiveId(entry.id)
              }}
              className={cn(
                "-ml-px block border-l text-sm leading-5 transition-colors duration-short ease-standard",
                entry.level === 2 ? "pl-3" : "pl-6",
                activeId === entry.id
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-foreground-muted hover:text-foreground"
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
