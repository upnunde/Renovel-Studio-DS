"use client"

import { Chip, ChipGroup } from "design-system/ui/chip"
import { cn } from "@/lib/utils"

export type DocsFilterChipOption = {
  value: string
  label: string
}

/** 단일 선택 필터 — 카테고리·탭 전환 등 */
export function DocsFilterChips({
  value,
  onValueChange,
  options,
  size = "default",
  className,
}: {
  value: string
  onValueChange: (value: string) => void
  options: readonly DocsFilterChipOption[]
  size?: "sm" | "default"
  className?: string
}) {
  return (
    <ChipGroup
      value={[value]}
      onValueChange={(values) => {
        const next = values[0]
        if (next) onValueChange(next)
      }}
      className={cn(className)}
    >
      {options.map((option) => (
        <Chip key={option.value} value={option.value} size={size} variant="outline">
          {option.label}
        </Chip>
      ))}
    </ChipGroup>
  )
}
