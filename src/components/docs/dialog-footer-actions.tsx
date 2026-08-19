"use client"

import { Button } from "design-system/ui/button"
import { Checkbox } from "design-system/ui/checkbox"
import {
  DialogDescriptionStatic,
  DialogFooter,
  DialogHeader,
  DialogTitleStatic,
} from "design-system/ui/dialog"
import { DialogInlineShell } from "design-system/ui/dialog-patterns"
import { Input } from "design-system/ui/input"
import { Label } from "design-system/ui/label"

import { cn } from "@/lib/utils"

export type DialogFooterActionsCount = "1" | "2" | "3"

/** 리스트 렌더 스타일 — 조립형 body의 리스트 부품 */
export type DialogListStyle = "muted" | "numbered"

/** 조립형 body 부품 설정 */
export type DialogBodyComposition = {
  showTargetName?: boolean
  targetName?: string
  showBodyText?: boolean
  bodyText?: string
  showList?: boolean
  listStyle?: DialogListStyle
  showConsent?: boolean
  consentText?: string
  showConfirmInput?: boolean
  confirmPhrase?: string
}

const LIST_PRESETS: Record<DialogListStyle, string[]> = {
  muted: [
    "운영정책 위반 시 계정이 제한될 수 있어요.",
    "저작권을 침해하지 않는 콘텐츠만 게시해요.",
    "타 사용자에게 불쾌감을 주지 않도록 주의해요.",
  ],
  numbered: [
    "공개 후에는 되돌릴 수 없어요.",
    "구매·다운로드 통계가 초기화돼요.",
    "공개 대상은 마이페이지에서 변경할 수 있어요.",
  ],
}

function DialogTargetName({ name }: { name: string }) {
  return (
    <p className="text-body4_400 text-foreground">
      <span className="font-medium text-foreground">「{name}」</span>을
      삭제할까요? 삭제 후에는 되돌릴 수 없어요.
    </p>
  )
}

function DialogBodyText({ text }: { text: string }) {
  return <p className="text-body4_400 text-foreground">{text}</p>
}

function DialogListBlock({ style }: { style: DialogListStyle }) {
  const items = LIST_PRESETS[style]

  if (style === "muted") {
    return (
      <div className="w-full rounded-lg bg-background-muted p-3 text-left">
        <ul className="space-y-1.5 text-body4_400 text-foreground-muted">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="w-full rounded-lg bg-background-muted p-3 text-left">
      <ul className="space-y-1.5 text-body4_400 text-foreground-muted">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2">
            <span className="shrink-0 tabular-nums text-foreground">
              {index + 1}.
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DialogConsent({ text }: { text: string }) {
  return (
    <div className="flex w-full items-center justify-start gap-2 self-start">
      <Checkbox id="dialog-consent" />
      <Label htmlFor="dialog-consent" className="text-body4_400 font-normal leading-5">
        {text}
      </Label>
    </div>
  )
}

function DialogConfirmInput({ phrase }: { phrase: string }) {
  return (
    <div className="mt-2 grid w-full gap-2">
      <p className="text-left text-body4_400 text-foreground-muted">
        아래 내용을 숙지한 후, 입력창에{" "}
        <span className="font-medium text-foreground">{phrase}</span>를 입력해
        주세요.
      </p>
      <Input placeholder={phrase} autoComplete="off" />
    </div>
  )
}

export function DialogFooterActionsPreview({
  footerActions = "2",
  title = "제목",
  description = "설명",
  showHeader = true,
  showContent = true,
  showFooter = true,
  /** true면 본문 레시피 대신 빈 커스텀 슬롯 표시 */
  customContent = false,
  showTargetName = false,
  targetName = "이름 없는 컬렉션",
  showBodyText = true,
  bodyText = "본문 영역",
  showList = false,
  listStyle = "muted",
  showConsent = false,
  consentText = "운영정책에 동의합니다.",
  showConfirmInput = false,
  confirmPhrase = "확인했습니다",
  footerStack = false,
  className,
}: {
  footerActions?: DialogFooterActionsCount
  title?: string
  description?: string
  showHeader?: boolean
  showContent?: boolean
  showFooter?: boolean
  customContent?: boolean
  /**
   * @deprecated DialogFooter가 버튼 합계 폭 > 컨테이너일 때 자동으로
   * 세로(역순) 스택으로 전환한다. 이 prop은 호환용으로만 남으며 동작 없음.
   */
  footerStack?: boolean
  className?: string
} & DialogBodyComposition) {
  const hasRecipeBody =
    showTargetName ||
    showBodyText ||
    showList ||
    showConsent ||
    showConfirmInput

  const hasContent = showContent && (customContent || hasRecipeBody)
  const contentPad = "w-full px-5 py-2"

  return (
    <DialogInlineShell
      className={cn(
        "flex min-h-[200px] w-full max-w-(--dialog-max-width) flex-col gap-0 p-0",
        className
      )}
    >
      {showHeader ? (
        <DialogHeader
          className={cn(
            "w-full px-5 pt-5 pb-2",
            "text-center",
            "rounded-t-xl",
            !hasContent && !showFooter && "rounded-b-xl"
          )}
        >
          <DialogTitleStatic>{title}</DialogTitleStatic>
          <DialogDescriptionStatic>{description}</DialogDescriptionStatic>
        </DialogHeader>
      ) : null}
      {hasContent ? (
        <div
          className={cn(
            contentPad,
            "flex min-h-20 w-full flex-1 flex-col items-center justify-center gap-3 text-center",
            !showHeader && "rounded-t-xl",
            !showFooter && "rounded-b-xl"
          )}
        >
          {customContent ? (
            <div className="flex min-h-24 w-full items-center justify-center rounded-lg border border-dashed border-border bg-background-muted/30 px-4 py-6">
              <p className="text-caption1_400 text-foreground-muted">
                Custom content
              </p>
            </div>
          ) : (
            <>
              {showTargetName ? <DialogTargetName name={targetName} /> : null}
              {showBodyText ? <DialogBodyText text={bodyText} /> : null}
              {showList ? <DialogListBlock style={listStyle} /> : null}
              {showConsent ? <DialogConsent text={consentText} /> : null}
              {showConfirmInput ? (
                <DialogConfirmInput phrase={confirmPhrase} />
              ) : null}
            </>
          )}
        </div>
      ) : null}
      {showFooter ? (
        <DialogFooter
          className={cn(
            "mx-0 mb-0 mt-auto w-full rounded-b-xl px-5 pt-2 pb-5",
            !showHeader && !hasContent && "rounded-t-xl"
          )}
        >
          {footerActions !== "1" ? <Button variant="outline">취소</Button> : null}
          {footerActions === "3" ? (
            <>
              <Button variant="outline">저장 안 함</Button>
              <Button>저장 후 나가기</Button>
            </>
          ) : (
            <Button>확인</Button>
          )}
        </DialogFooter>
      ) : null}
    </DialogInlineShell>
  )
}

function targetNameCode(name: string) {
  return `  <p className="text-body4_400 text-foreground">\n    <span className="font-medium text-foreground">「${name}」</span>을 삭제할까요? 삭제 후에는 되돌릴 수 없어요.\n  </p>`
}

function bodyTextCode(text: string) {
  return `  <p className="text-body4_400 text-foreground">${text}</p>`
}

function listCode(style: DialogListStyle) {
  const items = LIST_PRESETS[style]

  if (style === "muted") {
    const rows = items.map((item) => `      <li>${item}</li>`).join("\n")
    return `  <div className="rounded-lg bg-background-muted p-3">\n    <ul className="space-y-1.5 text-body4_400 text-foreground-muted">\n${rows}\n    </ul>\n  </div>`
  }

  const rows = items
    .map(
      (item, index) =>
        `      <li className="flex gap-2">\n        <span className="shrink-0 tabular-nums text-foreground">${index + 1}.</span>\n        <span>${item}</span>\n      </li>`
    )
    .join("\n")
  return `  <div className="rounded-lg bg-background-muted p-3">\n    <ul className="space-y-1.5 text-body4_400 text-foreground-muted">\n${rows}\n    </ul>\n  </div>`
}

function consentCode(text: string) {
  return `  <div className="flex items-center gap-2">\n    <Checkbox id="consent" />\n    <Label htmlFor="consent">${text}</Label>\n  </div>`
}

function confirmInputCode(phrase: string) {
  return `  <div className="grid gap-2">\n    <p className="text-body4_400 text-foreground-muted">아래 내용을 숙지한 후, 입력창에 <span className="font-medium text-foreground">${phrase}</span>를 입력해 주세요.</p>\n    <Input placeholder="${phrase}" autoComplete="off" />\n  </div>`
}

function dialogDescriptionCode(description: string) {
  if (!description.includes("\n")) {
    return `<DialogDescription>${description}</DialogDescription>`
  }
  const body = description.replace(/\\/g, "\\\\").replace(/`/g, "\\`")
  return `<DialogDescription>\n    {\`${body}\`}\n  </DialogDescription>`
}

export function buildDialogFooterActionsCode({
  footerActions,
  title,
  description,
  showHeader,
  showContent,
  showFooter = true,
  customContent = false,
  showTargetName = false,
  targetName = "이름 없는 컬렉션",
  showBodyText = true,
  bodyText = "본문 영역",
  showList = false,
  listStyle = "muted",
  showConsent = false,
  consentText = "운영정책에 동의합니다.",
  showConfirmInput = false,
  confirmPhrase = "확인했습니다",
}: {
  footerActions: DialogFooterActionsCount
  title: string
  description: string
  showHeader: boolean
  showContent: boolean
  showFooter?: boolean
  customContent?: boolean
} & DialogBodyComposition) {
  const header = showHeader
    ? `\n  <DialogHeader>\n    <DialogTitle>${title}</DialogTitle>\n    ${dialogDescriptionCode(description)}\n  </DialogHeader>`
    : ""

  let content = ""
  if (showContent && customContent) {
    content =
      "\n  {/* Content — 소비처 커스텀 영역 */}\n  <div className=\"grid gap-3\">\n    {/* … */}\n  </div>"
  } else if (showContent) {
    const bodyParts: string[] = []
    if (showTargetName) bodyParts.push(targetNameCode(targetName))
    if (showBodyText) bodyParts.push(bodyTextCode(bodyText))
    if (showList) bodyParts.push(listCode(listStyle))
    if (showConsent) bodyParts.push(consentCode(consentText))
    if (showConfirmInput) bodyParts.push(confirmInputCode(confirmPhrase))
    content = bodyParts.length
      ? `\n  <div className="grid gap-3">\n${bodyParts.join("\n")}\n  </div>`
      : ""
  }

  const footer =
    showFooter && footerActions === "1"
      ? '\n  <DialogFooter>\n    <Button>확인</Button>\n  </DialogFooter>'
      : showFooter && footerActions === "3"
        ? '\n  <DialogFooter>\n    <Button variant="outline">취소</Button>\n    <Button variant="outline">저장 안 함</Button>\n    <Button>저장 후 나가기</Button>\n  </DialogFooter>'
        : showFooter
          ? '\n  <DialogFooter>\n    <Button variant="outline">취소</Button>\n    <Button>확인</Button>\n  </DialogFooter>'
          : ""

  return `<Dialog open>\n  <DialogContent>${header}${content}${footer}\n  </DialogContent>\n</Dialog>`
}
