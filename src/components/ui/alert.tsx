"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { ICONS } from "../icons"
import { Icon, type IconSize } from "./icon"

const alertVariants = cva(
  "group/alert relative w-full rounded-lg border text-left",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
      },
      /**
       * 의미론적 상태 톤 — 시각 위계(variant)와 직교하는 상태 축.
       * default 는 톤 없음. primary·success·warning·destructive 는 각 상태 색으로 오버라이드.
       */
      status: {
        default: "",
        primary:
          "bg-primary/10 text-primary border-primary/20 *:data-[slot=alert-description]:text-primary/90 *:[svg]:text-current dark:bg-primary/20 dark:border-primary/30",
        success:
          "bg-success/10 text-success border-success/20 *:data-[slot=alert-description]:text-success/90 *:[svg]:text-current dark:bg-success/20 dark:border-success/30",
        warning:
          "bg-warning/15 text-warning border-warning/25 *:data-[slot=alert-description]:text-warning/90 *:[svg]:text-current dark:bg-warning/20 dark:border-warning/30",
        destructive:
          "bg-destructive/10 text-destructive border-destructive/20 *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current dark:bg-destructive/20 dark:border-destructive/30",
      },
      type: {
        /** 제목 → 설명 (flex-col) */
        default: "flex flex-col gap-0.5",
        /** 아이콘 선행 — 제목 있으면 2행, 없으면 아이콘+설명 한 줄. 레이아웃은 alert.css */
        icon: "alert-layout-icon",
      },
      /** 배너 밀도 — 폼 컨트롤 h32/h36과 별개. 한 줄(icon·무제목) 기준 sm≈36 md≈46 lg≈56 */
      size: {
        sm: "px-(--space-3) py-(--space-2)",
        md: "px-(--space-4) py-(--space-3)",
        lg: "px-(--space-5) py-(--space-4)",
      },
    },
    compoundVariants: [
      { type: "default", size: "lg", class: "gap-1" },
    ],
    defaultVariants: {
      variant: "default",
      status: "default",
      type: "default",
      size: "md",
    },
  }
)

const ALERT_ICON_SIZE: Record<
  NonNullable<VariantProps<typeof alertVariants>["size"]>,
  IconSize
> = {
  sm: "md",
  md: "md",
  lg: "lg",
}

type AlertProps = React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    /** `icon`이면 앞에 info 아이콘 표시 */
    type?: "default" | "icon"
    /** 닫기(✕) — 유저가 직접 닫거나 `duration`으로 자동 닫힘 */
    removable?: boolean
    /**
     * 자동 닫힘 시간(ms). `0`이면 수동만.
     * `removable`일 때만 적용.
     * @default 0
     */
    duration?: number
    onDismiss?: () => void
  }

function Alert({
  className,
  variant,
  status = "default",
  type = "default",
  size = "md",
  removable = false,
  duration = 0,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  const [open, setOpen] = React.useState(true)
  const resolvedSize = size ?? "md"

  const dismiss = React.useCallback(() => {
    setOpen(false)
    onDismiss?.()
  }, [onDismiss])

  React.useEffect(() => {
    if (!removable || !open || duration <= 0) return
    const id = window.setTimeout(dismiss, duration)
    return () => window.clearTimeout(id)
  }, [removable, open, duration, dismiss])

  if (!open) return null

  return (
    <div
      data-slot="alert"
      data-type={type}
      data-status={status}
      data-size={resolvedSize}
      data-removable={removable ? "" : undefined}
      role="alert"
      className={cn(
        alertVariants({ variant, status, type, size: resolvedSize }),
        className
      )}
      {...props}
    >
      {type === "icon" ? (
        <Icon icon={ICONS.info} size={ALERT_ICON_SIZE[resolvedSize]} />
      ) : null}
      {children}
      {removable ? (
        <button
          type="button"
          data-slot="alert-dismiss"
          className="absolute top-2 right-2 inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-foreground-muted transition-colors hover:bg-muted hover:text-foreground group-data-[size=sm]/alert:top-1.5 group-data-[size=sm]/alert:right-1.5 group-data-[size=lg]/alert:top-2.5 group-data-[size=lg]/alert:right-2.5"
          aria-label="닫기"
          onClick={dismiss}
        >
          <Icon icon={ICONS.close} size="md" />
        </button>
      ) : null}
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "group-data-[size=sm]/alert:text-body4_500 group-data-[size=md]/alert:text-body3_500 group-data-[size=lg]/alert:text-body2_500 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_a[data-hovered=true]]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-balance text-foreground-muted md:text-pretty group-data-[size=sm]/alert:text-body4_400 group-data-[size=md]/alert:text-body3_400 group-data-[size=lg]/alert:text-body2_400 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_a[data-hovered=true]]:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
export type { AlertProps }
