/**
 * Base UI는 `data-disabled` / `aria-disabled`를 쓰고,
 * 네이티브 컨트롤은 `:disabled`도 지원합니다.
 * 모든 변형을 함께 스타일해야 비활성 상태가 일관되게 보입니다.
 */
export const uiDisabledBlock =
  "disabled:pointer-events-none disabled:cursor-not-allowed data-disabled:pointer-events-none data-disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed"

export const uiDisabledColors =
  "disabled:bg-disabled disabled:text-disabled-foreground disabled:border-disabled-border data-disabled:bg-disabled data-disabled:text-disabled-foreground data-disabled:border-disabled-border aria-disabled:bg-disabled aria-disabled:text-disabled-foreground aria-disabled:border-disabled-border"

/** 버튼·토글·탭·셀렉트 트리거 등 */
export const uiDisabledInteractive = `${uiDisabledBlock} ${uiDisabledColors}`

/** Input·Textarea 등 텍스트 필드 */
export const uiDisabledField = `${uiDisabledBlock} ${uiDisabledColors}`

/** Checkbox·Radio 등 토글 컨트롤 */
export const uiDisabledControl = `${uiDisabledBlock} disabled:border-disabled-border disabled:bg-disabled data-disabled:border-disabled-border data-disabled:bg-disabled data-disabled:data-checked:border-primary/40 data-disabled:data-checked:bg-primary/40 disabled:data-checked:border-primary/40 disabled:data-checked:bg-primary/40`

/** Label — 연결된 컨트롤 비활성 시 */
export const uiDisabledLabel =
  "group-data-disabled:pointer-events-none group-data-disabled:text-foreground-disabled peer-disabled:pointer-events-none peer-disabled:text-foreground-disabled peer-data-disabled:pointer-events-none peer-data-disabled:text-foreground-disabled peer-disabled:cursor-not-allowed peer-data-disabled:cursor-not-allowed"

/** 메뉴·리스트 아이템 */
export const uiDisabledItem = `${uiDisabledBlock} data-disabled:text-foreground-disabled`
