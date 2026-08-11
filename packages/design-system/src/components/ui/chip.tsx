"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { uiDisabledInteractive } from "../../lib/ui-disabled"
import { Icon } from "./icon"
import { ICONS } from "../icons"

const chipSelected =
  "aria-pressed:border-transparent aria-pressed:bg-inverse-muted aria-pressed:text-inverse-muted-foreground aria-pressed:hover:bg-inverse-muted/80 aria-pressed:data-[hovered=true]:bg-inverse-muted/80"

/** soft 솔리드 — 미선택. 선택은 chipSelected(inverse-muted) */
const chipFillResting =
  "border-transparent bg-secondary text-secondary-foreground hover:bg-muted hover:text-foreground data-[hovered=true]:bg-muted data-[hovered=true]:text-foreground"

const chipVariants = cva(
  `group/chip inline-flex min-w-12 shrink-0 items-center justify-center gap-1.5 border text-sm font-medium whitespace-nowrap bg-clip-padding transition-all duration-short ease-standard outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${uiDisabledInteractive} aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        /** 솔리드 표현 — off=secondary, on=inverse-muted */
        fill: `${chipFillResting} ${chipSelected}`,
        outline: `border-border bg-background hover:bg-muted hover:text-foreground data-[hovered=true]:bg-muted data-[hovered=true]:text-foreground ${chipSelected}`,
        /** @deprecated variant="fill" 사용 */
        default: `${chipFillResting} ${chipSelected}`,
      },
      size: {
        sm: "h-8 gap-1 px-2.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-4",
        default: "h-9 px-3 [&_svg:not([class*='size-'])]:size-4",
        xl: "h-10 gap-1.5 px-3.5 [&_svg:not([class*='size-'])]:size-4",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "fill",
      size: "default",
      shape: "circle",
    },
  }
)

type ChipVariant = NonNullable<VariantProps<typeof chipVariants>["variant"]>

/** @deprecated "default" → "fill" */
function resolveChipVariant(variant: ChipVariant | null | undefined): ChipVariant {
  if (variant == null || variant === "default") return "fill"
  return variant
}

type ChipBaseProps = Omit<VariantProps<typeof chipVariants>, "variant"> & {
  variant?: ChipVariant | null
  /** 선택 시 앞쪽에 체크 표시 — 필터 칩 동작 */
  showCheck?: boolean
  /** 지정 시 끝에 삭제(✕) 버튼을 렌더 — 인풋 칩 */
  onRemove?: () => void
  removeLabel?: string
}

function Chip({
  className,
  variant = "fill",
  size = "default",
  shape = "circle",
  showCheck,
  onRemove,
  removeLabel = "삭제",
  children,
  ...props
}: TogglePrimitive.Props & ChipBaseProps) {
  const resolvedVariant = resolveChipVariant(variant)
  const withCheck = showCheck ?? false
  const isDisabled = Boolean(props.disabled)

  const inner = (
    <>
      {withCheck ? (
        <Icon
          icon={ICONS.check}
          size="md"
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
        className={cn(
          chipVariants({ variant: resolvedVariant, size, shape }),
          className
        )}
        {...props}
      >
        {inner}
      </TogglePrimitive>
    )
  }

  return (
    <span
      data-slot="chip"
      data-disabled={isDisabled ? "" : undefined}
      aria-disabled={isDisabled || undefined}
      className={cn(
        chipVariants({ variant: resolvedVariant, size, shape }),
        "group/chip-shell gap-0 overflow-hidden p-0 has-[[aria-pressed=true]]:bg-inverse-muted has-[[aria-pressed=true]]:text-inverse-muted-foreground",
        "data-disabled:has-[[aria-pressed=true]]:bg-disabled data-disabled:has-[[aria-pressed=true]]:text-disabled-foreground",
        className
      )}
    >
      <TogglePrimitive
        className={cn(
          "group/chip inline-flex h-full items-center gap-1.5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          size === "sm" ? "pr-1 pl-2.5" : size === "xl" ? "pr-2 pl-3.5" : "pr-1.5 pl-3",
          size === "sm"
            ? "[&_svg:not([class*='size-'])]:size-4"
            : "[&_svg:not([class*='size-'])]:size-4"
        )}
        {...props}
      >
        {inner}
      </TogglePrimitive>
      <button
        type="button"
        aria-label={removeLabel}
        disabled={isDisabled}
        onClick={onRemove}
        className={cn(
          "inline-flex h-full items-center text-current outline-none transition-opacity duration-short ease-standard opacity-80 hover:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-100 data-[hovered=true]:opacity-100",
          size === "sm" ? "pr-2 pl-0.5" : size === "xl" ? "pr-3 pl-1" : "pr-2.5 pl-1"
        )}
      >
        <Icon icon={ICONS.close} size="md" />
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
export type { ChipVariant }
