"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Icon } from "./icon"
import { ICONS } from "../icons"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-open:duration-medium data-open:ease-emphasized-decelerate data-closed:animate-out data-closed:fade-out-0 data-closed:duration-short data-closed:ease-emphasized-accelerate",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-background p-5 text-sm text-foreground ring-1 ring-foreground/10 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-open:duration-medium data-open:ease-emphasized-decelerate data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:duration-short data-closed:ease-emphasized-accelerate",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
              />
            }
          >
            <Icon icon={ICONS.close} size="md" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

const dialogTitleClass = "text-heading4_700"

const dialogDescriptionClass =
  "text-sm text-foreground-muted *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground *:[a[data-hovered=true]]:text-foreground"

/**
 * 가로 정렬된 버튼들의 합계 폭이 컨테이너를 넘치는지 감지한다.
 * 넘치면 세로 배치로 전환하라는 신호(true)를 돌려준다.
 * 측정은 항상 가로(flex-row) 기준으로 하여, 세로 전환 후에도
 * 다시 가로에 들어갈 수 있게 되면 가로로 복귀한다.
 */
function useFooterOverflow(
  ref: React.RefObject<HTMLDivElement | null>
) {
  const [stacked, setStacked] = React.useState(false)

  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === "undefined") return

    const measure = () => {
      // 가로 기준 실제 콘텐츠 폭 vs 사용 가능 폭.
      // 세로 상태에서는 세로로 쌓여 scrollWidth가 줄어드므로,
      // 자식들의 개별 폭 + gap 합으로 가로 필요 폭을 직접 계산한다.
      const styles = window.getComputedStyle(el)
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0
      const paddingX =
        parseFloat(styles.paddingLeft || "0") +
        parseFloat(styles.paddingRight || "0")
      const children = Array.from(el.children) as HTMLElement[]
      if (children.length === 0) return

      const contentWidth =
        children.reduce((sum, child) => sum + child.offsetWidth, 0) +
        gap * (children.length - 1)
      const available = el.clientWidth - paddingX

      setStacked(contentWidth > available)
    }

    const observer = new ResizeObserver(measure)
    observer.observe(el)
    // 자식 크기 변화(버튼 라벨 변경 등)도 반영
    Array.from(el.children).forEach((child) => observer.observe(child))
    measure()

    return () => observer.disconnect()
  }, [ref])

  return stacked
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const stacked = useFooterOverflow(ref)

  return (
    <div
      ref={ref}
      data-slot="dialog-footer"
      data-stacked={stacked ? "" : undefined}
      className={cn(
        "-mx-5 -mb-5 flex gap-2 rounded-b-xl p-5",
        // 넘치지 않으면 가로 우측 정렬, 넘치면 세로(역순: 3→2→1) + 전체폭
        stacked
          ? "flex-col-reverse [&>*]:w-full"
          : "flex-row justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(dialogTitleClass, className)}
      {...props}
    />
  )
}

/** Dialog Root 밖 — 문서·인라인 프리뷰용 */
function DialogTitleStatic({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="dialog-title" className={cn(dialogTitleClass, className)} {...props} />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(dialogDescriptionClass, className)}
      {...props}
    />
  )
}

/** Dialog Root 밖 — 문서·인라인 프리뷰용 */
function DialogDescriptionStatic({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="dialog-description"
      className={cn(dialogDescriptionClass, className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogDescriptionStatic,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTitleStatic,
  DialogTrigger,
}
