"use client"

import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import {
  Button,
  buttonVariants,
  type ButtonTone,
  type LegacyButtonStatus,
} from "./button"
import { Checkbox } from "./checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogDescriptionStatic,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTitleStatic,
} from "./dialog"
import { Input } from "./input"
import { Label } from "./label"

/** 입력 확인 패턴 기본 문구 */
export const DIALOG_ACKNOWLEDGE_PHRASE = "확인했습니다" as const

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>
type DialogPatternPresentation = "modal" | "inline"

function mapLegacyStatusToTone(
  status: LegacyButtonStatus | undefined
): ButtonTone | undefined {
  if (status == null) return undefined
  if (status === "default") return "neutral"
  return status
}

/**
 * 문서·쇼케이스용 — 포털 없이 다이얼로그 구조만 노출.
 * DialogContent의 정본 max-width (모바일 여백 · sm:max-w-(--dialog-max-width) = 440px) 동일 적용.
 * min-w: 문서 프리뷰가 그리드 셀 안에서 지나치게 좁아져 뭉개지지 않도록 안전지대.
 */
export function DialogInlineShell({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      data-slot="dialog-inline-shell"
      className={cn(
        "grid w-full min-w-[16rem] max-w-[calc(100%-2rem)] gap-4 rounded-xl bg-background px-5 pt-8 pb-5 text-sm text-foreground ring-1 ring-foreground/10 sm:max-w-(--dialog-max-width)",
        className
      )}
    >
      {children}
    </div>
  )
}

type DialogPatternBaseProps = {
  /** modal — 포털 오버레이 · inline — 문서 케이스 등 정적 노출 */
  presentation?: DialogPatternPresentation
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: React.ReactNode
  contentClassName?: string
  showCloseButton?: boolean
}

function DialogPatternHeader({
  presentation,
  title,
  description,
}: {
  presentation: DialogPatternPresentation
  title: React.ReactNode
  description?: React.ReactNode
}) {
  const Title = presentation === "inline" ? DialogTitleStatic : DialogTitle
  const Description =
    presentation === "inline" ? DialogDescriptionStatic : DialogDescription

  return (
    <DialogHeader>
      <Title>{title}</Title>
      {description ? <Description>{description}</Description> : null}
    </DialogHeader>
  )
}

function DialogPatternFrame({
  presentation = "modal",
  open = false,
  onOpenChange,
  showCloseButton = false,
  contentClassName,
  maxWidthClass,
  children,
}: {
  presentation?: DialogPatternPresentation
  open?: boolean
  onOpenChange?: (open: boolean) => void
  showCloseButton?: boolean
  contentClassName?: string
  maxWidthClass?: string
  children: React.ReactNode
}) {
  if (presentation === "inline") {
    return (
      <DialogInlineShell className={contentClassName}>{children}</DialogInlineShell>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={cn(maxWidthClass, contentClassName)}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

function DialogPatternCancelButton({
  presentation = "modal",
  label,
  onClick,
}: {
  presentation?: DialogPatternPresentation
  label: string
  onClick?: () => void
}) {
  if (presentation === "inline") {
    return (
      <Button type="button" variant="outline" onClick={onClick}>
        {label}
      </Button>
    )
  }

  return (
    <DialogClose render={<Button variant="outline" onClick={onClick} />}>
      {label}
    </DialogClose>
  )
}

export function DialogNoticeList({
  items,
  className,
}: {
  items: React.ReactNode[]
  className?: string
}) {
  return (
    <ul
      className={cn(
        "list-disc space-y-1 pl-5 text-body4_400 text-foreground-muted",
        className
      )}
    >
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

export type DialogAcknowledgeProps = DialogPatternBaseProps & {
  description?: React.ReactNode
  /** 본문과 입력 사이 커스텀 블록 */
  children?: React.ReactNode
  noticeItems?: React.ReactNode[]
  confirmPhrase?: string
  confirmHint?: React.ReactNode
  cancelLabel?: string
  confirmLabel: string
  confirmVariant?: ButtonVariant
  /** 확인 버튼 tone — Acknowledge 패턴은 위험 액션 확인 용도라 destructive가 기본 */
  confirmTone?: ButtonTone
  /** @deprecated `confirmTone` 사용 */
  confirmStatus?: LegacyButtonStatus
  onConfirm: () => void
  onCancel?: () => void
}

/**
 * **Acknowledge** — 위험·비가역 액션 전 입력 확인.
 * 사용자가 지정 문구(기본 「확인했습니다」)를 정확히 입력해야 주 액션이 활성화된다.
 */
export function DialogAcknowledge({
  presentation = "modal",
  open = false,
  onOpenChange,
  title,
  description,
  children,
  noticeItems,
  confirmPhrase = DIALOG_ACKNOWLEDGE_PHRASE,
  confirmHint = "아래 내용을 숙지한 후, 입력창에 확인했습니다를 입력해 주세요.",
  cancelLabel = "취소",
  confirmLabel,
  confirmVariant = "default",
  confirmTone,
  confirmStatus,
  onConfirm,
  onCancel,
  contentClassName,
  showCloseButton = false,
}: DialogAcknowledgeProps) {
  const [phrase, setPhrase] = React.useState("")
  const ready = phrase.trim() === confirmPhrase
  const isModal = presentation === "modal"
  const resolvedConfirmTone =
    confirmTone ?? mapLegacyStatusToTone(confirmStatus) ?? "destructive"

  React.useEffect(() => {
    if (isModal && !open) setPhrase("")
  }, [isModal, open])

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setPhrase("")
      onCancel?.()
    }
    onOpenChange?.(next)
  }

  const handleCancel = () => {
    setPhrase("")
    onCancel?.()
    if (isModal) onOpenChange?.(false)
  }

  const handleConfirm = () => {
    if (!ready) return
    onConfirm()
    if (isModal) onOpenChange?.(false)
  }

  return (
    <DialogPatternFrame
      presentation={presentation}
      open={open}
      onOpenChange={handleOpenChange}
      showCloseButton={showCloseButton}
      contentClassName={contentClassName}
    >
        <DialogPatternHeader
          presentation={presentation}
          title={title}
          description={description}
        />

        <div className="grid gap-4">
          {children}
          {noticeItems?.length ? <DialogNoticeList items={noticeItems} /> : null}
          <p className="text-body4_400 text-foreground-muted">{confirmHint}</p>
        <Input
          value={phrase}
          onChange={(event) => setPhrase(event.target.value)}
          placeholder={confirmPhrase}
          aria-label={`확인 문구 입력: ${confirmPhrase}`}
          autoComplete="off"
        />
      </div>

      <DialogFooter>
        <DialogPatternCancelButton
          presentation={presentation}
          label={cancelLabel}
          onClick={handleCancel}
        />
        <Button
          variant={confirmVariant}
          tone={resolvedConfirmTone}
          disabled={!ready}
          onClick={handleConfirm}
        >
          {confirmLabel}
        </Button>
      </DialogFooter>
    </DialogPatternFrame>
  )
}

export type DialogChecklistConsentLink = {
  label: string
  href?: string
  onClick?: () => void
}

export type DialogChecklistProps = DialogPatternBaseProps & {
  description?: React.ReactNode
  checklistItems: React.ReactNode[]
  consentLabel: React.ReactNode
  consentLink?: DialogChecklistConsentLink
  cancelLabel?: string
  confirmLabel: string
  onConfirm: () => void
  onCancel?: () => void
}

/**
 * **Checklist** — 작업 시작 전 필수 동의·체크리스트.
 * 운영정책 등 체크박스 동의 후에만 주 액션이 활성화된다.
 */
export function DialogChecklist({
  presentation = "modal",
  open = false,
  onOpenChange,
  title,
  description,
  checklistItems,
  consentLabel,
  consentLink,
  cancelLabel = "취소",
  confirmLabel,
  onConfirm,
  onCancel,
  contentClassName,
  showCloseButton = false,
}: DialogChecklistProps) {
  const [agreed, setAgreed] = React.useState(false)
  const consentId = React.useId()
  const isModal = presentation === "modal"

  React.useEffect(() => {
    if (isModal && !open) setAgreed(false)
  }, [isModal, open])

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setAgreed(false)
      onCancel?.()
    }
    onOpenChange?.(next)
  }

  const handleCancel = () => {
    setAgreed(false)
    onCancel?.()
    if (isModal) onOpenChange?.(false)
  }

  const handleConfirm = () => {
    if (!agreed) return
    onConfirm()
    if (isModal) onOpenChange?.(false)
  }

  return (
    <DialogPatternFrame
      presentation={presentation}
      open={open}
      onOpenChange={handleOpenChange}
      showCloseButton={showCloseButton}
      contentClassName={contentClassName}
    >
        <DialogPatternHeader
          presentation={presentation}
          title={title}
          description={description}
        />

        <div className="grid max-h-60 gap-4 overflow-y-auto pr-1">
        <DialogNoticeList items={checklistItems} />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id={consentId}
          checked={agreed}
          onCheckedChange={(checked) => setAgreed(checked === true)}
        />
        <Label htmlFor={consentId} className="text-body4_400 font-normal leading-5">
          <span>{consentLabel}</span>
          {consentLink ? (
            <>
              {" "}
              {consentLink.href ? (
                <a
                  href={consentLink.href}
                  className="text-primary underline underline-offset-3"
                  target="_blank"
                  rel="noreferrer"
                >
                  {consentLink.label}
                </a>
              ) : (
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-body4_400"
                  onClick={consentLink.onClick}
                >
                  {consentLink.label}
                </Button>
              )}
            </>
          ) : null}
        </Label>
      </div>

      <DialogFooter>
        <DialogPatternCancelButton
          presentation={presentation}
          label={cancelLabel}
          onClick={handleCancel}
        />
        <Button disabled={!agreed} onClick={handleConfirm}>
          {confirmLabel}
        </Button>
      </DialogFooter>
    </DialogPatternFrame>
  )
}

export type DialogSaveChoiceProps = DialogPatternBaseProps & {
  description?: React.ReactNode
  cancelLabel?: string
  /** 저장 없이 진행 (불러오기 · 저장 안 함 · 나가기 등) */
  proceedLabel: string
  /** 저장 후 진행 (저장 후 불러오기 · 저장 후 나가기) */
  saveProceedLabel: string
  proceedVariant?: ButtonVariant
  saveProceedVariant?: ButtonVariant
  onProceed: () => void
  onSaveProceed: () => void
  onCancel?: () => void
}

/**
 * **Save choice** — 미저장 변경이 있을 때 3-way 선택.
 * 취소 · 저장 없이 진행 · 저장 후 진행.
 */
export function DialogSaveChoice({
  presentation = "modal",
  open = false,
  onOpenChange,
  title,
  description,
  cancelLabel = "취소",
  proceedLabel,
  saveProceedLabel,
  proceedVariant = "outline",
  saveProceedVariant = "default",
  onProceed,
  onSaveProceed,
  onCancel,
  contentClassName,
  showCloseButton = false,
}: DialogSaveChoiceProps) {
  const isModal = presentation === "modal"

  const handleOpenChange = (next: boolean) => {
    if (!next) onCancel?.()
    onOpenChange?.(next)
  }

  const handleCancel = () => {
    onCancel?.()
    if (isModal) onOpenChange?.(false)
  }

  const handleProceed = () => {
    onProceed()
    if (isModal) onOpenChange?.(false)
  }

  const handleSaveProceed = () => {
    onSaveProceed()
    if (isModal) onOpenChange?.(false)
  }

  return (
    <DialogPatternFrame
      presentation={presentation}
      open={open}
      onOpenChange={handleOpenChange}
      showCloseButton={showCloseButton}
      contentClassName={contentClassName}
    >
        <DialogPatternHeader
          presentation={presentation}
          title={title}
          description={description}
        />

        <DialogFooter className="sm:flex-wrap sm:justify-end">
        <DialogPatternCancelButton
          presentation={presentation}
          label={cancelLabel}
          onClick={handleCancel}
        />
        <Button variant={proceedVariant} onClick={handleProceed}>
          {proceedLabel}
        </Button>
        <Button variant={saveProceedVariant} onClick={handleSaveProceed}>
          {saveProceedLabel}
        </Button>
      </DialogFooter>
    </DialogPatternFrame>
  )
}
