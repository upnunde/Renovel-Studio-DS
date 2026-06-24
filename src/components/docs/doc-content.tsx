import Link from "next/link"
import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

export function DocSection({
  id,
  title,
  description,
  children,
  className,
}: {
  id?: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn(docsSpace.stack, className)}>
      <div className={docsSpace.stack}>
        <h2 className={docsType.sectionTitle}>{title}</h2>
        {description ? (
          <p className={cn("max-w-3xl", docsType.sectionDescription)}>{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export function DocProse({ children }: { children: ReactNode }) {
  return (
    <div className={cn("max-w-3xl", docsSpace.stack, docsType.body)}>
      {children}
    </div>
  )
}

export function DocBulletList({ items }: { items: string[] }) {
  return (
    <ul className={cn("max-w-3xl list-disc pl-5", docsSpace.stack, docsType.body)}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function DocGuidelines({
  whenToUse,
  whenNotToUse,
}: {
  whenToUse: string[]
  whenNotToUse?: string[]
}) {
  return (
    <div className={cn("grid lg:grid-cols-2", docsSpace.gap)}>
      <div className={cn("rounded-xl border border-border bg-card", docsSpace.pad)}>
        <p className={cn(docsSpace.headerBottom, docsType.groupLabel)}>When to use</p>
        <DocBulletList items={whenToUse} />
      </div>
      {whenNotToUse && whenNotToUse.length > 0 ? (
        <div className={cn("rounded-xl border border-border bg-card", docsSpace.pad)}>
          <p className={cn(docsSpace.headerBottom, docsType.groupLabel)}>When not to use</p>
          <DocBulletList items={whenNotToUse} />
        </div>
      ) : null}
    </div>
  )
}

export function DocCallout({
  title,
  children,
  variant = "note",
}: {
  title?: string
  children: ReactNode
  variant?: "note" | "tip"
}) {
  return (
    <aside
      className={cn(
        "max-w-3xl rounded-xl border",
        docsSpace.pad,
        docsType.body,
        variant === "tip"
          ? "border-brand-200 bg-brand-50 text-foreground/90 dark:border-brand-800 dark:bg-brand-950/40"
          : "border-border bg-muted/30 text-foreground/90"
      )}
    >
      {title ? <p className="mb-1 font-medium">{title}</p> : null}
      <div className="text-muted-foreground [&_strong]:text-foreground">{children}</div>
    </aside>
  )
}

export function DocCardGrid({
  items,
}: {
  items: { title: string; description: string; href: string }[]
}) {
  return (
    <div className={cn("grid sm:grid-cols-2 lg:grid-cols-3", docsSpace.gap)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn("group rounded-xl border border-border bg-card transition-colors hover:bg-accent/50", docsSpace.pad)}
        >
          <p className="font-medium group-hover:text-primary">{item.title}</p>
          <p className={cn("mt-1", docsType.bodyMuted)}>{item.description}</p>
        </Link>
      ))}
    </div>
  )
}

export function DocStatusBadge({ status }: { status: "stable" | "beta" }) {
  return (
    <Badge variant={status === "stable" ? "secondary" : "outline"} className="font-mono text-sm">
      {status}
    </Badge>
  )
}

export function DocRelatedLinks({
  items,
}: {
  items: { title: string; href: string }[]
}) {
  if (items.length === 0) return null

  return (
    <div className={cn("flex flex-wrap items-center", docsSpace.gap, docsType.bodyMuted)}>
      <span className="text-muted-foreground">관련 문서</span>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-md border border-border bg-muted/30 px-2 py-0.5 font-mono text-sm hover:bg-accent"
        >
          {item.title}
        </Link>
      ))}
    </div>
  )
}
