"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type TocEntry = {
  /** React list key — 항상 index 기반으로 유일 */
  tocKey: string
  id: string
  text: string
  level: 2 | 3
}

/**
 * shadcn·Material 스타일 우측 sticky TOC.
 * 페이지 내 `h2[id]`·`h3[id]` 를 자동 수집하고 IntersectionObserver 로
 * 활성 항목을 하이라이트한다.
 */
export function DocsToc({ containerId }: { containerId?: string }) {
  const [entries, setEntries] = useState<TocEntry[]>([])
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const nodesRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const root = containerId
      ? document.getElementById(containerId)
      : document.querySelector<HTMLElement>("main")
    if (!root) return

    const collect = () => {
      const nodes = Array.from(
        root.querySelectorAll<HTMLElement>("h2[id], h3[id]")
      )
      nodesRef.current = nodes

      const idCount = new Map<string, number>()
      const nextEntries = nodes.map<TocEntry>((node, index) => {
        const occurrence = idCount.get(node.id) ?? 0
        idCount.set(node.id, occurrence + 1)
        if (process.env.NODE_ENV === "development" && occurrence > 0) {
          console.warn(
            `[DocsToc] 중복 heading id "${node.id}" — 고유 headingId를 지정하세요.`,
            node
          )
        }
        return {
          tocKey: `toc-${index}`,
          id: node.id,
          text: node.textContent?.trim() ?? "",
          level: node.tagName === "H2" ? 2 : 3,
        }
      })
      setEntries(nextEntries)
    }

    collect()

    const observer = new MutationObserver(() => collect())
    observer.observe(root, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [containerId])

  useEffect(() => {
    const nodes = nodesRef.current
    if (entries.length === 0 || nodes.length === 0) return

    const keyByNode = new Map(
      entries.map((entry, index) => [nodes[index], entry.tocKey] as const)
    )

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top
          )
        if (visible.length > 0) {
          const key = keyByNode.get(visible[0].target as HTMLElement)
          if (key) setActiveKey(key)
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
        {entries.map((entry, index) => (
          <li key={index}>
            <a
              href={`#${entry.id}`}
              onClick={(event) => {
                event.preventDefault()
                const target = nodesRef.current[index]
                if (!target) return
                const scroller = target.closest(
                  ".overflow-y-auto, .overflow-x-clip"
                ) as HTMLElement | null
                if (scroller) {
                  const scrollerTop = scroller.getBoundingClientRect().top
                  const targetTop = target.getBoundingClientRect().top
                  scroller.scrollTo({
                    top: scroller.scrollTop + (targetTop - scrollerTop) - 40,
                    behavior: "smooth",
                  })
                } else {
                  target.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                history.replaceState(null, "", `#${entry.id}`)
                setActiveKey(entry.tocKey)
              }}
              className={cn(
                "-ml-px block border-l text-sm leading-5 transition-colors duration-short ease-standard",
                entry.level === 2 ? "pl-3" : "pl-6",
                activeKey === entry.tocKey
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-foreground-muted hover:text-foreground data-[hovered=true]:text-foreground"
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
