"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { Icon } from "./icon"
import { ICONS } from "../icons"

const alertVariants = cva(
  "group/alert relative w-full rounded-lg border p-(--space-4) text-left text-sm",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
      },
      /**
       * 의미론적 상태 톤 — 시각 위계(variant)와 직교하는 상태 축.
       * default 는 톤 없음. success·warning·destructive 는 각 상태 색으로 오버라이드.
       */
      status: {
        default: "",
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
        /** 1행 아이콘+제목 · 2행 설명 — 레이아웃은 alert.css (flex 유틸과 충돌 방지) */
        icon: "alert-layout-icon",
      },
    },
    defaultVariants: {
      variant: "default",
      status: "default",
      type: "default",
    },
  }
)

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
  removable = false,
  duration = 0,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  const [open, setOpen] = React.useState(true)

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
      data-removable={removable ? "" : undefined}
      role="alert"
      className={cn(alertVariants({ variant, status, type }), className)}
      {...props}
    >
      {type === "icon" ? <Icon icon={ICONS.info} size="md" /> : null}
      {children}
      {removable ? (
        <button
          type="button"
          data-slot="alert-dismiss"
          className="absolute top-2 right-2 inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-foreground-muted transition-colors hover:bg-muted hover:text-foreground"
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
        "font-medium [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_a[data-hovered=true]]:text-foreground",
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
        "text-sm text-balance text-foreground-muted md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_a[data-hovered=true]]:text-foreground [&_p:not(:last-child)]:mb-4",
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

export { Alert, AlertTitle, AlertDescription, AlertAction }
