"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { uiDisabledInteractive } from "../../lib/ui-disabled"
import { Icon } from "./icon"
import { ICONS } from "../icons"

const chipVariants = cva(
  `group/chip inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border text-sm font-medium whitespace-nowrap bg-clip-padding transition-all duration-short ease-standard outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${uiDisabledInteractive} aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-pressed:border-transparent aria-pressed:bg-inverse aria-pressed:text-inverse-foreground aria-pressed:hover:bg-inverse/80",
        subtle:
          "border-transparent bg-muted text-foreground-muted hover:bg-muted hover:text-foreground aria-pressed:bg-inverse aria-pressed:text-inverse-foreground aria-pressed:hover:bg-inverse/80",
        default:
          "border-transparent bg-background text-foreground hover:bg-muted hover:text-foreground aria-pressed:bg-inverse aria-pressed:text-inverse-foreground aria-pressed:hover:bg-inverse/80",
      },
      size: {
        default: "h-9 min-w-9 px-3 [&_svg:not([class*='size-'])]:size-4",
        sm: "h-8 min-w-8 gap-1 px-2.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        size: "default",
        class: "gap-1.5 px-2.5",
      },
      {
        variant: "default",
        size: "sm",
        class: "px-2",
      },
    ],
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
)

type ChipBaseProps = VariantProps<typeof chipVariants> & {
  /** 선택 시 앞쪽에 체크 표시 — 필터 칩 동작 (기본: removable이 아니면 true) */
  showCheck?: boolean
  /** 지정 시 끝에 삭제(✕) 버튼을 렌더 — 인풋 칩 */
  onRemove?: () => void
  removeLabel?: string
}

function Chip({
  className,
  variant = "outline",
  size = "default",
  showCheck,
  onRemove,
  removeLabel = "삭제",
  children,
  ...props
}: TogglePrimitive.Props & ChipBaseProps) {
  const withCheck = showCheck ?? false
  const checkSize = size === "sm" ? "sm" : "md"

  const inner = (
    <>
      {withCheck ? (
        <Icon
          icon={ICONS.check}
          size={checkSize}
          className="hidden -ml-0.5 group-aria-pressed/chip:block"
        />
      ) : null}
      {children}
    </>
  )

  if (!onRemove) {
    return (
      <TogglePrimitive
        data-slot="chip"
        className={cn(chipVariants({ variant, size }), className)}
        {...props}
      >
        {inner}
      </TogglePrimitive>
    )
  }

  return (
    <span
      data-slot="chip"
      className={cn(
        chipVariants({ variant, size }),
        "group/chip-shell gap-0 overflow-hidden p-0 has-[[aria-pressed=true]]:bg-inverse has-[[aria-pressed=true]]:text-inverse-foreground",
        className
      )}
    >
      <TogglePrimitive
        className={cn(
          "group/chip inline-flex h-full items-center gap-1.5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          size === "sm" ? "pr-1 pl-2.5" : "pr-1.5 pl-3",
          "[&_svg:not([class*='size-'])]:size-4"
        )}
        {...props}
      >
        {inner}
      </TogglePrimitive>
      <button
        type="button"
        aria-label={removeLabel}
        disabled={props.disabled}
        onClick={onRemove}
        className={cn(
          "inline-flex h-full items-center text-foreground-muted outline-none transition-colors duration-short ease-standard hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none",
          "group-has-[[aria-pressed=true]]/chip-shell:text-inverse-foreground/80 group-has-[[aria-pressed=true]]/chip-shell:hover:text-inverse-foreground",
          size === "sm" ? "pr-2 pl-0.5" : "pr-2.5 pl-1"
        )}
      >
        <Icon icon={ICONS.close} size={size === "sm" ? "sm" : "md"} />
      </button>
    </span>
  )
}

function ChipGroup({ className, ...props }: ToggleGroupPrimitive.Props) {
  return (
    <ToggleGroupPrimitive
      data-slot="chip-group"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
}

export { Chip, ChipGroup, chipVariants }
