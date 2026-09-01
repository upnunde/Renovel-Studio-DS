import type * as React from "react"

/**
 * Base UI는 `data-disabled` / `aria-disabled`를 쓰고,
 * 네이티브 컨트롤은 `:disabled`도 지원합니다.
 * 모든 변형을 함께 스타일해야 비활성 상태가 일관되게 보입니다.
 */
export const uiDisabledBlock =
  "disabled:pointer-events-none disabled:cursor-not-allowed data-disabled:pointer-events-none data-disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed"

export const uiDisabledColors =
  "disabled:bg-disabled disabled:text-disabled-foreground disabled:border-disabled-border data-disabled:bg-disabled data-disabled:text-disabled-foreground data-disabled:border-disabled-border aria-disabled:bg-disabled aria-disabled:text-disabled-foreground aria-disabled:border-disabled-border"

/** Input·Textarea — placeholder·file·다크 면이 disabled 토큰을 덮지 않도록 */
export const uiDisabledFieldMuted =
  "disabled:placeholder:text-disabled-foreground data-disabled:placeholder:text-disabled-foreground aria-disabled:placeholder:text-disabled-foreground disabled:file:text-disabled-foreground data-disabled:file:text-disabled-foreground aria-disabled:file:text-disabled-foreground dark:disabled:bg-disabled dark:data-disabled:bg-disabled dark:aria-disabled:bg-disabled"

/** disabled 글자만 — 면·보더 rest 유지 */
export const uiDisabledTextOnly =
  "disabled:text-disabled-foreground data-disabled:text-disabled-foreground aria-disabled:text-disabled-foreground"

/** 버튼·토글·탭·셀렉트 트리거 등 — rest에 윤곽 보더가 있는 컨트롤(Select 등) */
export const uiDisabledInteractive = `${uiDisabledBlock} ${uiDisabledColors}`

/**
 * 채움형 인터랙티브 — disabled 시 면·글자만. border는 rest처럼 transparent 유지.
 */
export const uiDisabledFilledInteractive = `${uiDisabledBlock} disabled:bg-disabled disabled:text-disabled-foreground disabled:border-transparent data-disabled:bg-disabled data-disabled:text-disabled-foreground data-disabled:border-transparent aria-disabled:bg-disabled aria-disabled:text-disabled-foreground aria-disabled:border-transparent`

/**
 * 윤곽(outline) variant — disabled 시 bg disabled 면 제거, border는 {disabled-border}(M3 Disabled Outline).
 * rest border 색(border-border · primary/40 등)은 건드리지 않음.
 */
export const uiDisabledOutline = `${uiDisabledBlock} ${uiDisabledTextOnly} disabled:bg-transparent disabled:border-disabled-border data-disabled:bg-transparent data-disabled:border-disabled-border aria-disabled:bg-transparent aria-disabled:border-disabled-border dark:disabled:bg-transparent dark:data-disabled:bg-transparent dark:aria-disabled:bg-transparent`

/**
 * rest에 채움·윤곽 모두 없음 — disabled 시 bg·border disabled 면을 새로 올리지 않음.
 *
 * 적용 대상:
 * - Button: ghost · link
 * - Toggle: default
 * - SidebarMenuButton
 */
export const uiDisabledNoSurface = `${uiDisabledBlock} ${uiDisabledTextOnly} disabled:bg-transparent disabled:border-transparent data-disabled:bg-transparent data-disabled:border-transparent aria-disabled:bg-transparent aria-disabled:border-transparent dark:disabled:bg-transparent dark:data-disabled:bg-transparent dark:aria-disabled:bg-transparent`

/** Input·Textarea 등 텍스트 필드 */
export const uiDisabledField = `${uiDisabledBlock} ${uiDisabledColors} ${uiDisabledFieldMuted}`

/** InputGroup — 라벨이 필드보다 앞에 올 때 peer 대신 has로 연동 */
export const uiDisabledFieldGroup =
  "has-[input:disabled]:[&_[data-slot=label]]:pointer-events-none has-[input:disabled]:[&_[data-slot=label]]:cursor-not-allowed has-[input:disabled]:[&_[data-slot=label]]:text-disabled-foreground has-[textarea:disabled]:[&_[data-slot=label]]:pointer-events-none has-[textarea:disabled]:[&_[data-slot=label]]:cursor-not-allowed has-[textarea:disabled]:[&_[data-slot=label]]:text-disabled-foreground has-[input[data-disabled]]:[&_[data-slot=label]]:text-disabled-foreground has-[input[aria-disabled=true]]:[&_[data-slot=label]]:text-disabled-foreground"

/** Checkbox·Radio 등 토글 컨트롤 */
export const uiDisabledControl = `${uiDisabledBlock} disabled:border-disabled-border disabled:bg-disabled data-disabled:border-disabled-border data-disabled:bg-disabled data-disabled:data-checked:border-primary/40 data-disabled:data-checked:bg-primary/40 disabled:data-checked:border-primary/40 disabled:data-checked:bg-primary/40`

/** Label — 연결된 컨트롤 비활성 시 (peer/input 는 필드가 라벨 뒤에 올 때) */
export const uiDisabledLabel =
  "group-data-disabled:pointer-events-none group-data-disabled:text-disabled-foreground peer-disabled/input:pointer-events-none peer-disabled/input:text-disabled-foreground peer-data-disabled/input:pointer-events-none peer-data-disabled/input:text-disabled-foreground peer-aria-disabled/input:pointer-events-none peer-aria-disabled/input:text-disabled-foreground peer-disabled:pointer-events-none peer-disabled:text-disabled-foreground peer-data-disabled:pointer-events-none peer-data-disabled:text-disabled-foreground peer-disabled:cursor-not-allowed peer-data-disabled:cursor-not-allowed peer-disabled/input:cursor-not-allowed peer-data-disabled/input:cursor-not-allowed"

/** 메뉴·리스트 아이템 */
export const uiDisabledItem = `${uiDisabledBlock} data-disabled:text-disabled-foreground`

/** Input·Textarea readOnly — 포커스·클릭 차단, ring 제거 */
export const uiReadOnlyField =
  "read-only:pointer-events-none read-only:cursor-default read-only:focus-visible:border-border-emphasis read-only:focus-visible:ring-0"

export function readOnlyFieldHandlers<T extends HTMLElement>(
  readOnly: boolean | undefined,
  handlers: {
    tabIndex?: number
    onFocus?: React.FocusEventHandler<T>
    onMouseDown?: React.MouseEventHandler<T>
  } = {}
) {
  if (!readOnly) return handlers

  const { tabIndex, onFocus, onMouseDown } = handlers
  return {
    tabIndex: -1,
    onFocus: (event: React.FocusEvent<T>) => {
      event.currentTarget.blur()
      onFocus?.(event)
    },
    onMouseDown: (event: React.MouseEvent<T>) => {
      event.preventDefault()
      onMouseDown?.(event)
    },
  }
}
