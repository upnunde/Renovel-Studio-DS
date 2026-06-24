import { type ReactNode, type TdHTMLAttributes, type ThHTMLAttributes } from "react"

import { docsType } from "@/lib/docs-type"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

export const DOCS_TABLE_MIN_WIDTH = "min-w-[40rem]"

const tableClass = cn(
  "w-full table-fixed border-collapse text-left",
  docsType.table,
  DOCS_TABLE_MIN_WIDTH
)

const thClass = cn(docsSpace.tableCell, docsType.tableHeader)
const tdClass = cn(docsSpace.tableCell, "align-top")

export function DocsTable({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <table className={cn(tableClass, className)}>{children}</table>
}

export function DocsTableColGroup({ columns }: { columns: number }) {
  const width = `${100 / columns}%`

  return (
    <colgroup>
      {Array.from({ length: columns }, (_, index) => (
        <col key={index} style={{ width }} />
      ))}
    </colgroup>
  )
}

export function DocsTableHead({ children }: { children: ReactNode }) {
  return <thead>{children}</thead>
}

export function DocsTableHeaderRow({ children }: { children: ReactNode }) {
  return <tr className="border-b bg-muted/40">{children}</tr>
}

export function DocsTableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>
}

export function DocsTableRow({ children }: { children: ReactNode }) {
  return <tr className="border-b border-border/60 last:border-0">{children}</tr>
}

export function DocsTableTh({
  children,
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn(thClass, className)} {...props}>
      {children}
    </th>
  )
}

export function DocsTableTd({
  children,
  className,
  mono,
  muted,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & {
  mono?: boolean
  muted?: boolean
}) {
  return (
    <td
      className={cn(
        tdClass,
        mono && docsType.tableMono,
        muted && "text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
}

export function DocsColorSwatch({
  children,
  className,
  style,
}: {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={cn("h-10 w-16 shrink-0 rounded-md ring-1 ring-border", className)}
      style={style}
    >
      {children}
    </div>
  )
}
