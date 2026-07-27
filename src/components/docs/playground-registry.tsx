"use client"

import { type ReactNode } from "react"

import { ICONS } from "@/components/icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "design-system/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "design-system/ui/alert"
import { Avatar, AvatarFallback, AvatarIcon, AvatarImage } from "design-system/ui/avatar"
import { Badge } from "design-system/ui/badge"
import { Button } from "design-system/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "design-system/ui/button-group"
import { Checkbox } from "design-system/ui/checkbox"
import { Chip } from "design-system/ui/chip"
import {
  buildDialogFooterActionsCode,
  DialogFooterActionsPreview,
  type DialogListStyle,
} from "@/components/docs/dialog-footer-actions"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "design-system/ui/dropdown-menu"
import { Icon } from "design-system/ui/icon"
import { Input, InputGroup, InputHypertext } from "design-system/ui/input"
import { EmailInput } from "design-system/ui/email-input"
import { FieldLabel } from "design-system/ui/field-label"
import { Label } from "design-system/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "design-system/ui/popover"
import { Progress, ProgressValue } from "design-system/ui/progress"
import { RadioGroup, RadioGroupItem } from "design-system/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "design-system/ui/select"
import { Skeleton } from "design-system/ui/skeleton"
import { Slider } from "design-system/ui/slider"
import { Switch } from "design-system/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "design-system/ui/tabs"
import { Textarea } from "design-system/ui/textarea"
import { Toggle } from "design-system/ui/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "design-system/ui/tooltip"
import { toast } from "sonner"
import { controlSizeToIconGlyph } from "design-system/icon-tokens"
import {
  BADGE_SHAPE_APIS,
  BADGE_SIZE_APIS,
  BUTTON_SHAPE_APIS,
  AVATAR_SIZE_APIS,
  CONTROL_FORM_SIZE_APIS,
  TABS_SIZE_APIS,
  CONTROL_TEXT_SIZE_APIS,
} from "design-system/component-size-tokens"
import {
  clampAvatarInitials,
  formatPlaygroundNumberValue,
  playgroundBool,
  playgroundPropAttr,
  playgroundPropAttrs,
} from "./playground-utils"
import type {
  PlaygroundNumberField,
  PlaygroundRenderContext,
  PlaygroundState,
} from "./playground-utils"

const FIELD_LABEL_PLAYGROUND_ID = "field-playground"
const FIELD_LABEL_DESCRIPTION_LINE = "필요 없는 보조문구는 삭제"

function fieldLabelPlaygroundDescription(
  state: PlaygroundState
): string[] | undefined {
  if (!bool(state, "description")) return undefined
  const count = Math.min(3, Math.max(1, Number(state.descriptionLines) || 1))
  return Array.from({ length: count }, () => FIELD_LABEL_DESCRIPTION_LINE)
}

function fieldLabelPlaygroundDescriptionCode(lines: string[]) {
  if (lines.length === 1) {
    return `description="${lines[0]}"`
  }
  const body = lines.map((line) => `"${line}"`).join(", ")
  return `description={[${body}]}`
}

function playgroundHypertextMetrics(state: PlaygroundState) {
  const max = Number(state.hypertextMax)
  const hasCounter = playgroundBool(state, "hypertext") && max > 0
  const count = hasCounter
    ? Math.min(max, Math.max(0, Number(state.hypertextCount) || 0))
    : 0
  return { max, count, hasCounter }
}

const PLAYGROUND_HYPERTEXT_DEMO_CHAR = "가"
/** InputHypertext count/max 플레이그라운드 슬라이더 상한 */
const PLAYGROUND_HYPERTEXT_COUNTER_MAX = 1000

function playgroundHypertextInputProps(state: PlaygroundState) {
  const { max, count, hasCounter } = playgroundHypertextMetrics(state)
  if (!hasCounter) return {}
  return {
    value: PLAYGROUND_HYPERTEXT_DEMO_CHAR.repeat(count),
    readOnly: true as const,
    maxLength: max,
  }
}

/** hypertext 카운터 on/off 전환 시 controlled↔uncontrolled 경고 방지 — Input을 재마운트 */
function playgroundHypertextInputKey(state: PlaygroundState) {
  return playgroundHypertextMetrics(state).hasCounter ? "counter" : "plain"
}

function playgroundHypertextPreview(
  state: PlaygroundState,
  helperId = "field-id-helper"
) {
  if (!playgroundBool(state, "hypertext")) return null
  const text = str(state, "hypertextText")
  const { max, count, hasCounter } = playgroundHypertextMetrics(state)
  if (hasCounter) {
    return (
      <InputHypertext id={helperId} count={count} max={max}>
        {text}
      </InputHypertext>
    )
  }
  return <InputHypertext id={helperId}>{text}</InputHypertext>
}

function playgroundHypertextCode(
  state: PlaygroundState,
  helperId = "field-id-helper"
) {
  if (!playgroundBool(state, "hypertext")) return ""
  const text = str(state, "hypertextText")
  const { max, count, hasCounter } = playgroundHypertextMetrics(state)
  if (hasCounter) {
    return `\n  <InputHypertext id="${helperId}" count={${count}} max={${max}}>${text}</InputHypertext>`
  }
  return `\n  <InputHypertext id="${helperId}">${text}</InputHypertext>`
}

function playgroundHypertextInputCodeProps(state: PlaygroundState) {
  const { max, count, hasCounter } = playgroundHypertextMetrics(state)
  if (!hasCounter) return []
  const demoValue = PLAYGROUND_HYPERTEXT_DEMO_CHAR.repeat(count)
  return [`maxLength={${max}}`, `value="${demoValue}"`, "readOnly"]
}

function fieldLabelPlaygroundHypertextPreview(state: PlaygroundState) {
  return playgroundHypertextPreview(
    state,
    `${FIELD_LABEL_PLAYGROUND_ID}-helper`
  )
}

function fieldLabelPlaygroundHypertextCode(state: PlaygroundState) {
  return playgroundHypertextCode(state, `${FIELD_LABEL_PLAYGROUND_ID}-helper`)
}

function fieldLabelPlaygroundDescribedBy(
  state: PlaygroundState,
  descriptionId: string,
  descriptionLines: string[] | undefined
) {
  return [
    descriptionLines ? descriptionId : null,
    bool(state, "hypertext") ? `${FIELD_LABEL_PLAYGROUND_ID}-helper` : null,
  ]
    .filter(Boolean)
    .join(" ")
}

const AVATAR_IMAGE =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face"

export type PlaygroundRegistryEntry = {
  description?: string
  initialState: PlaygroundState
  textKeys?: string[]
  numberKeys?: PlaygroundNumberField[]
  selectKeys?: Record<string, string[]>
  /** 플레이그라운드 컨트롤에서 제외 (Properties 표에는 유지) */
  skipControlKeys?: string[]
  /**
   * 조립형 컴포넌트에서 컨트롤을 명시 그룹으로 배치. 지정 시 primary/boolean 자동 분리 대신
   * 이 순서대로 렌더되고, 그룹 사이에 divider가 삽입됨. 그룹 내 개별 항목은 showWhen 필터가 그대로 적용.
   */
  controlGroups?: string[][]
  /** state 조건을 만족할 때만 컨트롤 노출 */
  showWhen?: Partial<Record<string, (state: PlaygroundState) => boolean>>
  /** select 옵션을 state에 따라 필터 (예: tabCount에 맞는 defaultValue) */
  filterSelectOptions?: (
    state: PlaygroundState,
    key: string,
    options: string[]
  ) => string[]
  renderPreview: (state: PlaygroundState, ctx: PlaygroundRenderContext) => ReactNode
  buildCode: (state: PlaygroundState) => string
  getPreviewClassName?: (state: PlaygroundState) => string | undefined
}

/** 텍스트 size + 아이콘 타입 → 실제 Button size prop */
function toButtonSize(size: string, isIcon: boolean) {
  if (!isIcon) return size
  return size === "default" ? "icon" : `icon-${size}`
}

function indentCodeBlock(code: string, spaces: number) {
  const pad = " ".repeat(spaces)
  return code
    .split("\n")
    .map((line) => pad + line)
    .join("\n")
}

function dropdownMenuPlaygroundTrigger() {
  return (
    <DropdownMenuTrigger render={<Button variant="outline" />}>
      메뉴 열기
      <Icon
        icon={ICONS.chevronDown}
        size={controlSizeToIconGlyph("default")}
        position="inline-end"
      />
    </DropdownMenuTrigger>
  )
}

function dropdownMenuPlaygroundItems(state: PlaygroundState) {
  const itemType = str(state, "itemType")
  const itemVariant = str(state, "itemVariant")

  if (itemType === "leading-icon") {
    return (
      <>
        <DropdownMenuGroup>
          <DropdownMenuLabel>계정</DropdownMenuLabel>
          <DropdownMenuItem>
            <Icon icon={ICONS.user} size="md" />
            프로필
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon icon={ICONS.sun} size="md" />
            테마
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Icon icon={ICONS.close} size="md" />
          로그아웃
        </DropdownMenuItem>
      </>
    )
  }

  if (itemType === "shortcut") {
    return (
      <>
        <DropdownMenuItem>
          복사
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          붙여넣기
          <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
        </DropdownMenuItem>
      </>
    )
  }

  if (itemType === "disabled") {
    return (
      <>
        <DropdownMenuItem>활성 항목</DropdownMenuItem>
        <DropdownMenuItem disabled>비활성 항목</DropdownMenuItem>
      </>
    )
  }

  if (itemType === "RadioItem") {
    return (
      <DropdownMenuRadioGroup defaultValue="list">
        <DropdownMenuLabel>보기</DropdownMenuLabel>
        <DropdownMenuRadioItem value="list">목록</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="grid">격자</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    )
  }

  if (itemType === "CheckboxItem") {
    return (
      <DropdownMenuGroup>
        <DropdownMenuLabel>열 표시</DropdownMenuLabel>
        <DropdownMenuCheckboxItem defaultChecked>상태</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>라벨</DropdownMenuCheckboxItem>
      </DropdownMenuGroup>
    )
  }

  if (itemType === "Sub") {
    return (
      <>
        <DropdownMenuItem>새 파일</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>보내기</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>PDF</DropdownMenuItem>
            <DropdownMenuItem>CSV</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </>
    )
  }

  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>계정</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>프로필</DropdownMenuItem>
      <DropdownMenuItem variant={itemVariant as "default"}>
        {itemVariant === "destructive" ? "삭제" : "설정"}
      </DropdownMenuItem>
    </DropdownMenuGroup>
  )
}

function dropdownMenuPlaygroundCode(state: PlaygroundState) {
  const itemType = str(state, "itemType")
  const align = ` align="${str(state, "align")}"`
  const open = bool(state, "open") ? " open" : ""
  const glyph = controlSizeToIconGlyph("default")
  const trigger = `<Button variant="outline">\n      메뉴 열기\n      <Icon icon={ICONS.chevronDown} size="${glyph}" position="inline-end" />\n    </Button>`

  let body = ""
  if (itemType === "leading-icon") {
    body = `    <DropdownMenuGroup>\n      <DropdownMenuLabel>계정</DropdownMenuLabel>\n      <DropdownMenuItem>\n        <Icon icon={ICONS.user} size="md" />\n        프로필\n      </DropdownMenuItem>\n    </DropdownMenuGroup>`
  } else if (itemType === "shortcut") {
    body = `    <DropdownMenuItem>\n      복사\n      <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>\n    </DropdownMenuItem>`
  } else if (itemType === "disabled") {
    body = `    <DropdownMenuItem>활성 항목</DropdownMenuItem>\n    <DropdownMenuItem disabled>비활성 항목</DropdownMenuItem>`
  } else if (itemType === "RadioItem") {
    body = `    <DropdownMenuRadioGroup defaultValue="list">\n      <DropdownMenuLabel>보기</DropdownMenuLabel>\n      <DropdownMenuRadioItem value="list">목록</DropdownMenuRadioItem>\n    </DropdownMenuRadioGroup>`
  } else if (itemType === "CheckboxItem") {
    body = `    <DropdownMenuGroup>\n      <DropdownMenuLabel>열 표시</DropdownMenuLabel>\n      <DropdownMenuCheckboxItem defaultChecked>상태</DropdownMenuCheckboxItem>\n    </DropdownMenuGroup>`
  } else if (itemType === "Sub") {
    body = `    <DropdownMenuSub>\n      <DropdownMenuSubTrigger>보내기</DropdownMenuSubTrigger>\n      <DropdownMenuSubContent>...</DropdownMenuSubContent>\n    </DropdownMenuSub>`
  } else {
    const itemVariant = ` variant="${str(state, "itemVariant")}"`
    body = `    <DropdownMenuGroup>\n      <DropdownMenuLabel>계정</DropdownMenuLabel>\n      <DropdownMenuItem>프로필</DropdownMenuItem>\n      <DropdownMenuItem${itemVariant}>설정</DropdownMenuItem>\n    </DropdownMenuGroup>`
  }

  return `<DropdownMenu${open}>\n  <DropdownMenuTrigger asChild>\n    ${trigger}\n  </DropdownMenuTrigger>\n  <DropdownMenuContent${align}>\n${body}\n  </DropdownMenuContent>\n</DropdownMenu>`
}

function bool(state: PlaygroundState, key: string) {
  return playgroundBool(state, key)
}

function str(state: PlaygroundState, key: string) {
  return String(state[key] ?? "")
}

function num(state: PlaygroundState, key: string) {
  return Number(state[key] ?? 0)
}

export const PLAYGROUND_REGISTRY: Record<string, PlaygroundRegistryEntry> = {
  button: {
    description:
      "타입(텍스트·리드 아이콘·아이콘 전용)과 사이즈를 따로 선택합니다. 아이콘 전용은 size에 따라 icon · icon-sm … 으로 출력됩니다.",
    initialState: {
      variant: "default",
      status: "default",
      type: "text",
      size: "default",
      shape: "square",
      label: "Label",
      disabled: false,
      "aria-invalid": false,
    },
    textKeys: ["label"],
    selectKeys: {
      type: ["text", "leading-icon", "icon"],
      size: [...CONTROL_TEXT_SIZE_APIS],
      shape: [...BUTTON_SHAPE_APIS],
      status: ["default", "success", "warning", "destructive"],
    },
    renderPreview: (state, _ctx) => {
      const size = str(state, "size")
      const label = str(state, "label")
      const buttonType = str(state, "type")
      const isIcon = buttonType === "icon"
      const isLeadingIcon = buttonType === "leading-icon"
      const glyph = controlSizeToIconGlyph(size)

      return (
        <Button
          variant={str(state, "variant") as "default"}
          status={str(state, "status") as "default"}
          shape={str(state, "shape") as "square"}
          size={toButtonSize(size, isIcon) as "default"}
          disabled={bool(state, "disabled")}
          aria-invalid={bool(state, "aria-invalid") || undefined}
          aria-label={isIcon ? label || "버튼" : undefined}
        >
          {isIcon ? (
            <Icon icon={ICONS.home} size={glyph} />
          ) : isLeadingIcon ? (
            <>
              <Icon icon={ICONS.home} size={glyph} position="inline-start" />
              {label || "Label"}
            </>
          ) : (
            label || "Label"
          )}
        </Button>
      )
    },
    buildCode: (state) => {
      const size = str(state, "size")
      const label = str(state, "label")
      const buttonType = str(state, "type")
      const isIcon = buttonType === "icon"
      const isLeadingIcon = buttonType === "leading-icon"
      const realSize = toButtonSize(size, isIcon)
      const glyph = controlSizeToIconGlyph(size)
      const status = str(state, "status")
      const props = [
        playgroundPropAttr("variant", str(state, "variant")),
        playgroundPropAttr("shape", str(state, "shape")),
        playgroundPropAttr("size", realSize),
      ]
      if (status !== "default") props.push(playgroundPropAttr("status", status))
      if (bool(state, "disabled")) props.push("disabled")
      if (bool(state, "aria-invalid")) props.push("aria-invalid")
      if (isIcon) props.push(`aria-label="${label || "버튼"}"`)
      const open = props.length ? ` ${props.join(" ")}` : ""
      const leadingIconLine = `\n  <Icon icon={ICONS.home} size="${glyph}" position="inline-start" />`
      const iconOnlyLine = `\n  <Icon icon={ICONS.home} size="${glyph}" />`

      if (isIcon) {
        return `<Button${open}>${iconOnlyLine}\n</Button>`
      }
      if (isLeadingIcon) {
        return `<Button${open}>${leadingIconLine}\n  ${label || "Label"}\n</Button>`
      }
      return `<Button${open}>${label || "Label"}</Button>`
    },
    getPreviewClassName: (state) =>
      bool(state, "aria-invalid") ? "bg-destructive/5" : undefined,
  },

  "button-group": {
    initialState: { size: "default", children: "ButtonGroupText" },
    selectKeys: {
      size: [...CONTROL_TEXT_SIZE_APIS],
      children: ["Button", "ButtonGroupText", "Input", "Select"],
    },
    renderPreview: (state, _ctx) => {
      const size = str(state, "size") as "default"
      const children = str(state, "children")

      if (children === "Button") {
        return (
          <ButtonGroup size={size}>
            <Button variant="outline">왼쪽</Button>
            <Button variant="outline">오른쪽</Button>
          </ButtonGroup>
        )
      }

      if (children === "Input") {
        return (
          <ButtonGroup size={size} className="max-w-sm">
            <ButtonGroupText>https://</ButtonGroupText>
            <Input placeholder="example.com" />
          </ButtonGroup>
        )
      }

      if (children === "Select") {
        return (
          <ButtonGroup size={size} className="max-w-xs">
            <Select defaultValue="recent">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">최신순</SelectItem>
                <SelectItem value="name">이름순</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">적용</Button>
          </ButtonGroup>
        )
      }

      return (
        <ButtonGroup size={size} className="max-w-xs">
          <Button variant="outline">이전</Button>
          <ButtonGroupSeparator />
          <ButtonGroupText>1 / 3</ButtonGroupText>
          <ButtonGroupSeparator />
          <Button variant="outline">다음</Button>
        </ButtonGroup>
      )
    },
    buildCode: (state) => {
      const size = str(state, "size")
      const sizeAttr = playgroundPropAttrs([playgroundPropAttr("size", size)])
      const children = str(state, "children")

      if (children === "Button") {
        return `<ButtonGroup${sizeAttr}>\n  <Button variant="outline">왼쪽</Button>\n  <Button variant="outline">오른쪽</Button>\n</ButtonGroup>`
      }
      if (children === "Input") {
        return `<ButtonGroup${sizeAttr}>\n  <ButtonGroupText>https://</ButtonGroupText>\n  <Input placeholder="example.com" />\n</ButtonGroup>`
      }
      if (children === "Select") {
        return `<ButtonGroup${sizeAttr}>\n  <Select defaultValue="recent">\n    <SelectTrigger><SelectValue /></SelectTrigger>\n    <SelectContent>...</SelectContent>\n  </Select>\n  <Button variant="outline">적용</Button>\n</ButtonGroup>`
      }
      return `<ButtonGroup${sizeAttr}>\n  <Button variant="outline">이전</Button>\n  <ButtonGroupSeparator />\n  <ButtonGroupText>1 / 3</ButtonGroupText>\n  <ButtonGroupSeparator />\n  <Button variant="outline">다음</Button>\n</ButtonGroup>`
    },
  },

  toggle: {
    description: "size · sm_h32 ~ 2xl_h48",
    initialState: {
      variant: "outline",
      size: "default",
      label: "굵게",
      pressed: false,
      disabled: false,
    },
    textKeys: ["label"],
    renderPreview: (state, ctx) => {
      const size = str(state, "size")
      return (
        <Toggle
          variant={str(state, "variant") as "outline"}
          size={size as "default"}
          {...ctx.bindPressed("pressed")}
          disabled={bool(state, "disabled")}
          aria-label={str(state, "label")}
        >
          <Icon icon={ICONS.formatBold} size={controlSizeToIconGlyph(size)} />
        </Toggle>
      )
    },
    buildCode: (state) => {
      const props = [
        playgroundPropAttr("variant", str(state, "variant")),
        playgroundPropAttr("size", str(state, "size")),
        bool(state, "pressed") ? "pressed" : "",
        bool(state, "disabled") ? "disabled" : "",
        `aria-label="${str(state, "label")}"`,
      ].filter(Boolean)
      return `<Toggle ${props.join(" ")}>\n  <Icon icon={ICONS.formatBold} size="md" />\n</Toggle>`
    },
  },

  chip: {
    description: "size · sm_h28 / default_h32 · 선택 시 체크 표시",
    initialState: {
      variant: "outline",
      size: "default",
      shape: "circle",
      label: "전자제품",
      selected: false,
      removable: false,
      disabled: false,
    },
    textKeys: ["label"],
    selectKeys: {
      shape: ["circle", "square"],
    },
    renderPreview: (state, ctx) => (
      <Chip
        variant={str(state, "variant") as "outline"}
        size={str(state, "size") as "default"}
        shape={str(state, "shape") as "circle"}
        {...ctx.bindPressed("selected")}
        disabled={bool(state, "disabled")}
        onRemove={bool(state, "removable") ? () => {} : undefined}
      >
        {str(state, "label")}
      </Chip>
    ),
    buildCode: (state) => {
      const props = [
        playgroundPropAttr("variant", str(state, "variant")),
        playgroundPropAttr("size", str(state, "size")),
        playgroundPropAttr("shape", str(state, "shape")),
        bool(state, "selected") ? "pressed" : "",
        bool(state, "disabled") ? "disabled" : "",
        bool(state, "removable") ? "onRemove={() => {}}" : "",
      ].filter(Boolean)
      const attrs = props.length ? ` ${props.join(" ")}` : ""
      return `<Chip${attrs}>${str(state, "label")}</Chip>`
    },
  },

  input: {
    initialState: {
      size: "default",
      type: "text",
      placeholder: "입력하세요",
      disabled: false,
      "aria-invalid": false,
      hypertext: false,
      hypertextText: "8자 이상 입력해 주세요.",
      hypertextMax: 1000,
      hypertextCount: 0,
    },
    textKeys: ["placeholder", "hypertextText"],
    numberKeys: [
      { key: "hypertextMax", min: 0, max: PLAYGROUND_HYPERTEXT_COUNTER_MAX, step: 1 },
      { key: "hypertextCount", min: 0, max: PLAYGROUND_HYPERTEXT_COUNTER_MAX, step: 1 },
    ],
    selectKeys: {
      type: ["text", "email", "password", "number", "file"],
    },
    showWhen: {
      hypertextText: (state) => playgroundBool(state, "hypertext"),
      hypertextMax: (state) => playgroundBool(state, "hypertext"),
      hypertextCount: (state) =>
        playgroundBool(state, "hypertext") && Number(state.hypertextMax) > 0,
    },
    renderPreview: (state, _ctx) => {
      const type = str(state, "type")
      const commonProps = {
        id: "playground-input",
        size: str(state, "size") as "default",
        placeholder: str(state, "placeholder"),
        disabled: bool(state, "disabled"),
        "aria-invalid": bool(state, "aria-invalid") || undefined,
        ...playgroundHypertextInputProps(state),
      }
      const inputKey = `${type}-${playgroundHypertextInputKey(state)}`
      return (
        <InputGroup className="max-w-xs">
          <Label htmlFor="playground-input">라벨</Label>
          {type === "email" ? (
            <EmailInput key={inputKey} {...commonProps} />
          ) : (
            <Input key={inputKey} {...commonProps} type={type} />
          )}
          {playgroundHypertextPreview(state)}
        </InputGroup>
      )
    },
    buildCode: (state) => {
      const type = str(state, "type")
      const isEmail = type === "email"
      const tag = isEmail ? "EmailInput" : "Input"
      const inputProps = [
        playgroundPropAttr("size", str(state, "size")),
        playgroundPropAttr("type", type),
        `placeholder="${str(state, "placeholder")}"`,
        bool(state, "disabled") ? "disabled" : "",
        bool(state, "aria-invalid") ? "aria-invalid" : "",
        ...playgroundHypertextInputCodeProps(state),
      ].filter(Boolean)
      const hypertext = playgroundHypertextCode(state)
      return `<InputGroup className="max-w-xs">\n  <Label htmlFor="field-id">라벨</Label>\n  <${tag} id="field-id" ${inputProps.join(" ")} />${hypertext}\n</InputGroup>`
    },
    getPreviewClassName: (state) =>
      bool(state, "aria-invalid") ? "bg-destructive/5" : undefined,
  },

  label: {
    initialState: {
      size: "default",
      children: "타이틀 입력",
      required: false,
      description: false,
      descriptionLines: "1",
      info: false,
      infoText: "필드에 대한 추가 설명입니다.",
      hypertext: false,
      hypertextText: "8자 이상 입력해 주세요.",
      hypertextMax: 1000,
      hypertextCount: 0,
    },
    textKeys: ["children", "infoText", "hypertextText"],
    numberKeys: [
      { key: "hypertextMax", min: 0, max: PLAYGROUND_HYPERTEXT_COUNTER_MAX, step: 1 },
      { key: "hypertextCount", min: 0, max: PLAYGROUND_HYPERTEXT_COUNTER_MAX, step: 1 },
    ],
    selectKeys: {
      size: ["default", "lg"],
      descriptionLines: ["1", "2", "3"],
    },
    skipControlKeys: ["htmlFor"],
    showWhen: {
      descriptionLines: (state) => bool(state, "description"),
      infoText: (state) => playgroundBool(state, "info"),
      hypertextText: (state) => playgroundBool(state, "hypertext"),
      hypertextMax: (state) => playgroundBool(state, "hypertext"),
      hypertextCount: (state) =>
        playgroundBool(state, "hypertext") && Number(state.hypertextMax) > 0,
    },
    renderPreview: (state, _ctx) => {
      const descriptionLines = fieldLabelPlaygroundDescription(state)
      const descriptionId = `${FIELD_LABEL_PLAYGROUND_ID}-desc`
      const describedBy = fieldLabelPlaygroundDescribedBy(
        state,
        descriptionId,
        descriptionLines
      )
      const infoText = str(state, "infoText").trim()

      return (
        <InputGroup className="max-w-xs">
          <FieldLabel
            htmlFor={FIELD_LABEL_PLAYGROUND_ID}
            size={str(state, "size") as "default"}
            required={bool(state, "required")}
            description={descriptionLines}
            info={bool(state, "info") && infoText ? infoText : undefined}
            descriptionId={descriptionLines ? descriptionId : undefined}
          >
            {str(state, "children")}
          </FieldLabel>
          <Input
            key={playgroundHypertextInputKey(state)}
            id={FIELD_LABEL_PLAYGROUND_ID}
            placeholder="입력"
            aria-describedby={describedBy || undefined}
            aria-required={bool(state, "required") || undefined}
            {...playgroundHypertextInputProps(state)}
          />
          {fieldLabelPlaygroundHypertextPreview(state)}
        </InputGroup>
      )
    },
    buildCode: (state) => {
      const descriptionLines = fieldLabelPlaygroundDescription(state)
      const descriptionId = `${FIELD_LABEL_PLAYGROUND_ID}-desc`
      const describedBy = fieldLabelPlaygroundDescribedBy(
        state,
        descriptionId,
        descriptionLines
      )
      const infoText = str(state, "infoText").trim()
      const fieldLabelAttrs = playgroundPropAttrs([
        playgroundPropAttr("size", str(state, "size")),
        playgroundPropAttr("htmlFor", FIELD_LABEL_PLAYGROUND_ID),
        bool(state, "required") ? "required" : "",
        descriptionLines
          ? playgroundPropAttr("descriptionId", descriptionId)
          : "",
        descriptionLines
          ? fieldLabelPlaygroundDescriptionCode(descriptionLines)
          : "",
        bool(state, "info") && infoText
          ? playgroundPropAttr("info", infoText)
          : "",
      ])
      const inputAttrs = playgroundPropAttrs([
        playgroundPropAttr("id", FIELD_LABEL_PLAYGROUND_ID),
        `placeholder="입력"`,
        describedBy ? `aria-describedby="${describedBy}"` : "",
        bool(state, "required") ? "aria-required" : "",
        ...playgroundHypertextInputCodeProps(state),
      ])
      const hypertext = fieldLabelPlaygroundHypertextCode(state)
      return `<InputGroup className="max-w-xs">\n  <FieldLabel${fieldLabelAttrs}>${str(state, "children")}</FieldLabel>\n  <Input${inputAttrs} />${hypertext}\n</InputGroup>`
    },
  },

  textarea: {
    initialState: {
      rows: 4,
      placeholder: "여러 줄 입력",
      disabled: false,
      "aria-invalid": false,
      hypertext: false,
      hypertextText: "8자 이상 입력해 주세요.",
      hypertextMax: 1000,
      hypertextCount: 0,
    },
    textKeys: ["placeholder", "hypertextText"],
    numberKeys: [
      { key: "rows", min: 4, max: 8, step: 1 },
      { key: "hypertextMax", min: 0, max: PLAYGROUND_HYPERTEXT_COUNTER_MAX, step: 1 },
      { key: "hypertextCount", min: 0, max: PLAYGROUND_HYPERTEXT_COUNTER_MAX, step: 1 },
    ],
    showWhen: {
      hypertextText: (state) => playgroundBool(state, "hypertext"),
      hypertextMax: (state) => playgroundBool(state, "hypertext"),
      hypertextCount: (state) =>
        playgroundBool(state, "hypertext") && Number(state.hypertextMax) > 0,
    },
    renderPreview: (state, _ctx) => {
      const rows = Math.min(8, Math.max(4, num(state, "rows")))
      return (
      <InputGroup className="max-w-md">
        <Textarea
          key={playgroundHypertextInputKey(state)}
          id="playground-textarea"
          rows={rows}
          placeholder={str(state, "placeholder")}
          disabled={bool(state, "disabled")}
          aria-invalid={bool(state, "aria-invalid") || undefined}
          aria-describedby={
            playgroundBool(state, "hypertext")
              ? "playground-textarea-helper"
              : undefined
          }
          {...playgroundHypertextInputProps(state)}
        />
        {playgroundHypertextPreview(state, "playground-textarea-helper")}
      </InputGroup>
      )
    },
    buildCode: (state) => {
      const rows = Math.min(8, Math.max(4, num(state, "rows")))
      const props = [
        `id="field-id"`,
        `rows={${rows}}`,
        `placeholder="${str(state, "placeholder")}"`,
        bool(state, "disabled") ? "disabled" : "",
        bool(state, "aria-invalid") ? "aria-invalid" : "",
        playgroundBool(state, "hypertext")
          ? `aria-describedby="field-id-helper"`
          : "",
        ...playgroundHypertextInputCodeProps(state),
        'className="max-w-md"',
      ].filter(Boolean)
      const hypertext = playgroundHypertextCode(state, "field-id-helper")
      return `<InputGroup className="max-w-md">\n  <Textarea ${props.join(" ")} />${hypertext}\n</InputGroup>`
    },
    getPreviewClassName: (state) =>
      bool(state, "aria-invalid") ? "bg-destructive/5" : undefined,
  },

  select: {
    description: "트리거 높이 · sm_h32 / md_h36",
    initialState: {
      size: "default",
      placeholder: "선택",
      disabled: false,
      "aria-invalid": false,
    },
    textKeys: ["placeholder"],
    renderPreview: (state, _ctx) => (
      <Select disabled={bool(state, "disabled")}>
        <SelectTrigger
          size={str(state, "size") as "default"}
          className="w-full max-w-xs"
          aria-invalid={bool(state, "aria-invalid") || undefined}
        >
          <SelectValue placeholder={str(state, "placeholder")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">옵션 A</SelectItem>
          <SelectItem value="b">옵션 B</SelectItem>
        </SelectContent>
      </Select>
    ),
    buildCode: (state) => {
      const triggerProps = [
        playgroundPropAttr("size", str(state, "size")),
        'className="w-full max-w-xs"',
        bool(state, "aria-invalid") ? "aria-invalid" : "",
      ].filter(Boolean)
      const rootDisabled = bool(state, "disabled") ? " disabled" : ""
      return `<Select${rootDisabled}>\n  <SelectTrigger ${triggerProps.join(" ")}>\n    <SelectValue placeholder="${str(state, "placeholder")}" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="a">옵션 A</SelectItem>\n    <SelectItem value="b">옵션 B</SelectItem>\n  </SelectContent>\n</Select>`
    },
  },

  checkbox: {
    initialState: {
      type: "default",
      checked: "false",
      disabled: false,
      "aria-invalid": false,
      caption: "동의합니다",
    },
    textKeys: ["caption"],
    selectKeys: {
      type: ["icon", "default"],
      checked: ["false", "true"],
    },
    showWhen: {
      caption: (state) => str(state, "type") !== "icon",
    },
    renderPreview: (state, ctx) => {
      const checked = str(state, "checked")
      const checkbox = (
        <Checkbox
          id="playground-checkbox"
          checked={checked === "true"}
          onCheckedChange={(next) =>
            ctx.set("checked", next ? "true" : "false")
          }
          disabled={bool(state, "disabled")}
          aria-invalid={bool(state, "aria-invalid") || undefined}
          aria-label={
            str(state, "type") === "icon" ? str(state, "caption") : undefined
          }
        />
      )

      if (str(state, "type") === "icon") {
        return checkbox
      }

      return (
        <div className="flex items-center gap-2">
          {checkbox}
          <Label htmlFor="playground-checkbox">{str(state, "caption")}</Label>
        </div>
      )
    },
    buildCode: (state) => {
      const checked = str(state, "checked")
      const props = [
        checked === "true" ? "checked" : "",
        bool(state, "disabled") ? "disabled" : "",
        bool(state, "aria-invalid") ? "aria-invalid" : "",
        str(state, "type") === "icon"
          ? `aria-label="${str(state, "caption")}"`
          : 'id="terms"',
      ].filter(Boolean)
      if (str(state, "type") === "icon") {
        return `<Checkbox ${props.join(" ")} />`
      }
      return `<div className="flex items-center gap-2">\n  <Checkbox ${props.join(" ")} />\n  <Label htmlFor="terms">${str(state, "caption")}</Label>\n</div>`
    },
    getPreviewClassName: (state) =>
      bool(state, "aria-invalid") ? "bg-destructive/5" : undefined,
  },

  switch: {
    initialState: {
      checked: false,
      disabled: false,
      caption: true,
      captionText: "알림",
    },
    textKeys: ["captionText"],
    showWhen: {
      captionText: (state) => playgroundBool(state, "caption"),
    },
    renderPreview: (state, ctx) => {
      const switchControl = (
        <Switch
          id="playground-switch"
          {...ctx.bindSwitch("checked")}
          disabled={bool(state, "disabled")}
        />
      )

      if (!bool(state, "caption")) {
        return switchControl
      }

      return (
        <div className="flex w-full max-w-xs items-center justify-between gap-4">
          <Label htmlFor="playground-switch">{str(state, "captionText")}</Label>
          {switchControl}
        </div>
      )
    },
    buildCode: (state) => {
      const props = [
        'id="notifications"',
        bool(state, "checked") ? "checked" : "",
        bool(state, "disabled") ? "disabled" : "",
      ].filter(Boolean)
      if (bool(state, "caption")) {
        return `<div className="flex items-center justify-between gap-4">\n  <Label htmlFor="notifications">${str(state, "captionText")}</Label>\n  <Switch ${props.join(" ")} />\n</div>`
      }
      return `<Switch ${props.join(" ")} />`
    },
  },

  "radio-group": {
    initialState: {
      type: "default",
      value: "a",
      disabled: false,
      "aria-invalid": false,
      captionA: "옵션 A",
      captionB: "옵션 B",
    },
    textKeys: ["captionA", "captionB"],
    selectKeys: {
      type: ["icon", "default"],
      value: ["a", "b"],
    },
    showWhen: {
      captionA: (state) => str(state, "type") !== "icon",
      captionB: (state) => str(state, "type") !== "icon",
    },
    renderPreview: (state, ctx) => {
      const iconOnly = str(state, "type") === "icon"
      return (
        <RadioGroup
          {...ctx.bindValue("value")}
          disabled={bool(state, "disabled")}
          aria-invalid={bool(state, "aria-invalid") || undefined}
          className={iconOnly ? "flex max-w-xs flex-row gap-3" : "max-w-xs"}
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="a"
              id="rg-a"
              aria-label={iconOnly ? str(state, "captionA") : undefined}
            />
            {iconOnly ? null : (
              <Label htmlFor="rg-a">{str(state, "captionA")}</Label>
            )}
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              value="b"
              id="rg-b"
              aria-label={iconOnly ? str(state, "captionB") : undefined}
            />
            {iconOnly ? null : (
              <Label htmlFor="rg-b">{str(state, "captionB")}</Label>
            )}
          </div>
        </RadioGroup>
      )
    },
    buildCode: (state) => {
      const props = [
        `defaultValue="${str(state, "value")}"`,
        bool(state, "disabled") ? "disabled" : "",
        bool(state, "aria-invalid") ? "aria-invalid" : "",
      ].filter(Boolean)
      if (str(state, "type") === "icon") {
        return `<RadioGroup ${props.join(" ")} className="flex gap-3">\n  <RadioGroupItem value="a" aria-label="${str(state, "captionA")}" />\n  <RadioGroupItem value="b" aria-label="${str(state, "captionB")}" />\n</RadioGroup>`
      }
      return `<RadioGroup ${props.join(" ")}>\n  <div className="flex items-center gap-2">\n    <RadioGroupItem value="a" id="a" />\n    <Label htmlFor="a">${str(state, "captionA")}</Label>\n  </div>\n  <div className="flex items-center gap-2">\n    <RadioGroupItem value="b" id="b" />\n    <Label htmlFor="b">${str(state, "captionB")}</Label>\n  </div>\n</RadioGroup>`
    },
    getPreviewClassName: (state) =>
      bool(state, "aria-invalid") ? "bg-destructive/5" : undefined,
  },

  slider: {
    initialState: {
      type: "default",
      value: 50,
      valueEnd: 80,
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
    },
    skipControlKeys: ["min", "max"],
    selectKeys: {
      type: ["default", "range"],
    },
    numberKeys: [
      { key: "value", min: 0, max: 100, step: 1, label: "value" },
      { key: "valueEnd", min: 0, max: 100, step: 1, label: "valueEnd" },
      { key: "step", min: 1, max: 10, step: 1, label: "step" },
    ],
    showWhen: {
      valueEnd: (state) => str(state, "type") === "range",
    },
    renderPreview: (state, ctx) => {
      const min = num(state, "min")
      const max = Math.max(min + num(state, "step"), num(state, "max"))
      const step = num(state, "step")
      const isRange = str(state, "type") === "range"
      const start = Math.min(max, Math.max(min, num(state, "value")))
      const end = Math.min(max, Math.max(min + step, num(state, "valueEnd")))
      const rangeStart = Math.min(start, end)
      const rangeEnd = Math.max(start, end)

      return (
        <div className="w-full max-w-xs space-y-2">
          <Slider
            type={isRange ? "range" : "default"}
            value={isRange ? [rangeStart, rangeEnd] : [start]}
            onValueChange={(values) => {
              const next = Array.isArray(values) ? values : [values]
              if (isRange) {
                ctx.set("value", next[0] ?? rangeStart)
                ctx.set("valueEnd", next[1] ?? rangeEnd)
                return
              }
              ctx.set("value", next[0] ?? start)
            }}
            min={min}
            max={max}
            step={step}
            disabled={bool(state, "disabled")}
          />
          <p className="text-right font-mono text-sm text-foreground-muted tabular-nums">
            {isRange
              ? `${formatPlaygroundNumberValue(rangeStart, min, max)} – ${formatPlaygroundNumberValue(rangeEnd, min, max)}`
              : formatPlaygroundNumberValue(start, min, max)}
          </p>
        </div>
      )
    },
    buildCode: (state) => {
      const isRange = str(state, "type") === "range"
      const min = num(state, "min")
      const max = num(state, "max")
      const start = num(state, "value")
      const end = num(state, "valueEnd")
      const props = [
        `type="${str(state, "type")}"`,
        isRange
          ? `defaultValue={[${start}, ${end}]}`
          : `defaultValue={[${start}]}`,
        `min={${min}}`,
        `max={${max}}`,
        `step={${num(state, "step")}}`,
        bool(state, "disabled") ? "disabled" : "",
        'className="max-w-xs"',
      ].filter(Boolean)
      return `<Slider ${props.join(" ")} />`
    },
  },

  badge: {
    description: "size · sm_h16·caption2 / default_h20·caption2 / md_h24·caption1 / lg_h28·body3 · shape · circle / square",
    initialState: {
      variant: "default",
      status: "default",
      size: "default",
      shape: "circle",
      label: "Badge",
    },
    textKeys: ["label"],
    selectKeys: {
      size: [...BADGE_SIZE_APIS],
      shape: [...BADGE_SHAPE_APIS],
      status: ["default", "success", "warning", "destructive"],
    },
    renderPreview: (state, _ctx) => (
      <Badge
        variant={str(state, "variant") as "default"}
        status={str(state, "status") as "default"}
        size={str(state, "size") as "default"}
        shape={str(state, "shape") as "circle"}
      >
        {str(state, "label")}
      </Badge>
    ),
    buildCode: (state) => {
      const status = str(state, "status")
      const attrs = playgroundPropAttrs([
        playgroundPropAttr("variant", str(state, "variant")),
        status !== "default" ? playgroundPropAttr("status", status) : null,
        playgroundPropAttr("size", str(state, "size")),
        playgroundPropAttr("shape", str(state, "shape")),
      ])
      return `<Badge${attrs}>${str(state, "label")}</Badge>`
    },
  },

  avatar: {
    description: "size · xs_s20 ~ 5xl_s128 (md_s36)",
    initialState: {
      size: "default",
      type: "image",
      initials: "JD",
    },
    textKeys: ["initials"],
    selectKeys: {
      size: [...AVATAR_SIZE_APIS],
      type: ["image", "initials", "icon"],
    },
    showWhen: {
      initials: (state) => str(state, "type") === "initials",
    },
    renderPreview: (state, _ctx) => {
      const type = str(state, "type")
      return (
        <Avatar size={str(state, "size") as "default"}>
          {type === "image" ? (
            <AvatarImage src={AVATAR_IMAGE} alt="사용자" />
          ) : null}
          {type === "icon" ? (
            <AvatarIcon icon={ICONS.user} />
          ) : (
            <AvatarFallback>
              {clampAvatarInitials(str(state, "initials"))}
            </AvatarFallback>
          )}
        </Avatar>
      )
    },
    buildCode: (state) => {
      const size = playgroundPropAttrs([playgroundPropAttr("size", str(state, "size"))])
      const type = str(state, "type")
      const image =
        type === "image" ? `\n  <AvatarImage src="…" alt="사용자" />` : ""
      const fallback =
        type === "icon"
          ? `\n  <AvatarIcon icon={ICONS.user} />`
          : `\n  <AvatarFallback>${clampAvatarInitials(str(state, "initials"))}</AvatarFallback>`
      return `<Avatar${size}>${image}${fallback}\n</Avatar>`
    },
  },

  tabs: {
    initialState: {
      tabCount: "2",
      variant: "default",
      size: "default",
      defaultValue: "tab-1",
    },
    selectKeys: {
      tabCount: ["2", "3", "4"],
      defaultValue: ["tab-1", "tab-2", "tab-3", "tab-4"],
      variant: ["default", "line", "text"],
      size: [...TABS_SIZE_APIS],
    },
    filterSelectOptions: (state, key, options) => {
      if (key !== "defaultValue") return options
      const count = Math.min(4, Math.max(2, Number(state.tabCount) || 2))
      return options.slice(0, count)
    },
    renderPreview: (state, ctx) => {
      const count = Math.min(4, Math.max(2, Number(state.tabCount) || 2))
      const tabValues = ["tab-1", "tab-2", "tab-3", "tab-4"].slice(0, count)
      const tabLabels = ["탭 1", "탭 2", "탭 3", "탭 4"]
      const active = tabValues.includes(str(state, "defaultValue"))
        ? str(state, "defaultValue")
        : tabValues[0]

      return (
        <Tabs
          value={active}
          onValueChange={(value) => {
            if (value) ctx.set("defaultValue", value)
          }}
          className="w-fit max-w-md"
        >
          <TabsList
            variant={str(state, "variant") as "default"}
            size={str(state, "size") as "default"}
          >
            {tabValues.map((value, index) => (
              <TabsTrigger key={value} value={value}>
                {tabLabels[index]}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabValues.map((value) => (
            <TabsContent key={value} value={value} className="sr-only" />
          ))}
        </Tabs>
      )
    },
    buildCode: (state) => {
      const count = Math.min(4, Math.max(2, Number(state.tabCount) || 2))
      const tabValues = ["tab-1", "tab-2", "tab-3", "tab-4"].slice(0, count)
      const tabLabels = ["탭 1", "탭 2", "탭 3", "탭 4"]
      const active = tabValues.includes(str(state, "defaultValue"))
        ? str(state, "defaultValue")
        : tabValues[0]

      const props = [`defaultValue="${active}"`]
      const listAttrs = playgroundPropAttrs([
        playgroundPropAttr("variant", str(state, "variant")),
        playgroundPropAttr("size", str(state, "size")),
      ])
      const triggers = tabValues
        .map((value, index) => `    <TabsTrigger value="${value}">${tabLabels[index]}</TabsTrigger>`)
        .join("\n")

      return `<Tabs ${props.join(" ")}>\n  <TabsList${listAttrs}>\n${triggers}\n  </TabsList>\n</Tabs>`
    },
  },

  progress: {
    initialState: { value: 60 },
    numberKeys: [{ key: "value", min: 0, max: 100, step: 1 }],
    renderPreview: (state, _ctx) => (
      <Progress value={num(state, "value")} className="w-full max-w-xs">
        <ProgressValue />
      </Progress>
    ),
    buildCode: (state) =>
      `<Progress value={${num(state, "value")}} className="max-w-xs">\n  <ProgressValue />\n</Progress>`,
  },

  skeleton: {
    initialState: { shape: "line" },
    selectKeys: {
      shape: ["line", "circle", "block"],
    },
    renderPreview: (state, _ctx) => {
      const shape = str(state, "shape")
      if (shape === "circle") {
        return <Skeleton className="size-12 rounded-full" />
      }
      if (shape === "block") {
        return <Skeleton className="h-32 w-full max-w-xs rounded-lg" />
      }
      return <Skeleton className="h-4 w-full max-w-xs" />
    },
    buildCode: (state) => {
      const shape = str(state, "shape")
      if (shape === "circle") return `<Skeleton className="size-12 rounded-full" />`
      if (shape === "block")
        return `<Skeleton className="h-32 w-full rounded-lg" />`
      return `<Skeleton className="h-4 w-full" />`
    },
  },

  "dropdown-menu": {
    initialState: {
      align: "start",
      itemType: "default",
      itemVariant: "default",
      open: false,
    },
    selectKeys: {
      itemType: [
        "default",
        "leading-icon",
        "shortcut",
        "disabled",
        "RadioItem",
        "CheckboxItem",
        "Sub",
      ],
    },
    showWhen: {
      itemVariant: (state) => str(state, "itemType") === "default",
    },
    renderPreview: (state, ctx) => (
      <DropdownMenu modal={false} {...ctx.bindOpen("open", { pin: true })}>
        {dropdownMenuPlaygroundTrigger()}
        <DropdownMenuContent align={str(state, "align") as "start"}>
          {dropdownMenuPlaygroundItems(state)}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    buildCode: dropdownMenuPlaygroundCode,
  },

  dialog: {
    initialState: {
      title: "제목",
      description: "설명 텍스트입니다.",
      showHeader: true,
      showContent: true,
      footerActions: "2",
      showBodyText: true,
      bodyText: "본문 영역",
      showList: false,
      listStyle: "muted",
      showConsent: false,
      consentText: "운영정책에 동의합니다.",
      showConfirmInput: false,
      confirmPhrase: "확인했습니다",
    },
    textKeys: [
      "title",
      "description",
      "bodyText",
      "consentText",
      "confirmPhrase",
    ],
    selectKeys: {
      footerActions: ["1", "2", "3"],
      listStyle: ["muted", "numbered"],
    },
    skipControlKeys: ["open", "pattern"],
    controlGroups: [
      ["showHeader", "title", "description"],
      [
        "showContent",
        "showBodyText",
        "bodyText",
        "showList",
        "listStyle",
        "showConsent",
        "consentText",
        "showConfirmInput",
        "confirmPhrase",
      ],
      ["footerActions"],
    ],
    showWhen: {
      title: (state) => playgroundBool(state, "showHeader"),
      description: (state) => playgroundBool(state, "showHeader"),
      showBodyText: (state) => playgroundBool(state, "showContent"),
      bodyText: (state) =>
        playgroundBool(state, "showContent") &&
        playgroundBool(state, "showBodyText"),
      showList: (state) => playgroundBool(state, "showContent"),
      listStyle: (state) =>
        playgroundBool(state, "showContent") &&
        playgroundBool(state, "showList"),
      showConsent: (state) => playgroundBool(state, "showContent"),
      consentText: (state) =>
        playgroundBool(state, "showContent") &&
        playgroundBool(state, "showConsent"),
      showConfirmInput: (state) => playgroundBool(state, "showContent"),
      confirmPhrase: (state) =>
        playgroundBool(state, "showContent") &&
        playgroundBool(state, "showConfirmInput"),
    },
    renderPreview: (state) => (
      <DialogFooterActionsPreview
        className="w-full max-w-sm"
        footerActions={str(state, "footerActions") as "1" | "2" | "3"}
        title={str(state, "title")}
        description={str(state, "description")}
        showHeader={bool(state, "showHeader")}
        showContent={bool(state, "showContent")}
        showBodyText={bool(state, "showBodyText")}
        bodyText={str(state, "bodyText")}
        showList={bool(state, "showList")}
        listStyle={str(state, "listStyle") as DialogListStyle}
        showConsent={bool(state, "showConsent")}
        consentText={str(state, "consentText")}
        showConfirmInput={bool(state, "showConfirmInput")}
        confirmPhrase={str(state, "confirmPhrase")}
      />
    ),
    buildCode: (state) =>
      buildDialogFooterActionsCode({
        footerActions: str(state, "footerActions") as "1" | "2" | "3",
        title: str(state, "title"),
        description: str(state, "description"),
        showHeader: bool(state, "showHeader"),
        showContent: bool(state, "showContent"),
        showBodyText: bool(state, "showBodyText"),
        bodyText: str(state, "bodyText"),
        showList: bool(state, "showList"),
        listStyle: str(state, "listStyle") as DialogListStyle,
        showConsent: bool(state, "showConsent"),
        consentText: str(state, "consentText"),
        showConfirmInput: bool(state, "showConfirmInput"),
        confirmPhrase: str(state, "confirmPhrase"),
      }),
  },

  popover: {
    initialState: { align: "center", open: false },
    renderPreview: (state, ctx) => (
      <Popover {...ctx.bindOpen()}>
        <PopoverTrigger render={<Button variant="outline" />}>
          팝오버 열기
        </PopoverTrigger>
        <PopoverContent align={str(state, "align") as "center"}>
          <PopoverHeader>
            <PopoverTitle>제목</PopoverTitle>
            <PopoverDescription>짧은 설명</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    ),
    buildCode: (state) => {
      const open = bool(state, "open") ? " open" : ""
      const align = ` align="${str(state, "align")}"`
      return `<Popover${open}>\n  <PopoverTrigger asChild>\n    <Button variant="outline">팝오버 열기</Button>\n  </PopoverTrigger>\n  <PopoverContent${align}>\n    <PopoverHeader>\n      <PopoverTitle>제목</PopoverTitle>\n      <PopoverDescription>짧은 설명</PopoverDescription>\n    </PopoverHeader>\n  </PopoverContent>\n</Popover>`
    },
  },

  tooltip: {
    initialState: {
      mode: "hover",
      side: "top",
      tip: "도움말 텍스트",
      open: false,
    },
    textKeys: ["tip"],
    selectKeys: {
      mode: ["hover", "removable"],
      side: ["top", "right", "bottom", "left"],
    },
    renderPreview: (state, ctx) => {
      const mode = str(state, "mode")
      const removable = mode === "removable"
      const forcedOpen = bool(state, "open")
      // hover(비고정)는 uncontrolled, 그 외는 controlled — 전환 시 key로 리마운트
      const controlled = removable || forcedOpen

      return (
        <TooltipProvider delay={0}>
          <Tooltip
            // mode를 key에 넣지 않음 — 호버↔X로 닫기 전환 시 리마운트로 open이 꺼지는 것 방지
            key={controlled ? "controlled" : "uncontrolled"}
            removable={removable}
            {...(controlled
              ? {
                  open: forcedOpen,
                  onOpenChange: (open, details) => {
                    // open 고정 중에는 side/tip/mode 변경으로 닫히지 않게 유지
                    // removable 은 ✕·Esc·바깥 클릭으로만 닫기 허용
                    if (forcedOpen && !open) {
                      if (
                        removable &&
                        (details.reason === "imperative-action" ||
                          details.reason === "escape-key" ||
                          details.reason === "outside-press")
                      ) {
                        ctx.set("open", false)
                      }
                      return
                    }
                    ctx.set("open", open)
                  },
                }
              : {})}
          >
            <TooltipTrigger render={<Button variant="outline" />}>
              툴팁
            </TooltipTrigger>
            <TooltipContent side={str(state, "side") as "top"}>
              {str(state, "tip")}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
    buildCode: (state) => {
      const side = ` side="${str(state, "side")}"`
      const removable = str(state, "mode") === "removable"
      const removableAttr = removable ? " removable" : ""
      return `<Tooltip${removableAttr}>\n  <TooltipTrigger asChild>\n    <Button variant="outline">툴팁</Button>\n  </TooltipTrigger>\n  <TooltipContent${side}>\n    ${str(state, "tip")}\n  </TooltipContent>\n</Tooltip>`
    },
  },

  accordion: {
    initialState: { type: "single", defaultValue: "item-1" },
    selectKeys: {
      type: ["single", "multiple"],
      defaultValue: ["item-1", "item-2"],
    },
    renderPreview: (state, _ctx) => {
      const type = str(state, "type")
      const defaultValue = str(state, "defaultValue")

      if (type === "multiple") {
        return (
          <Accordion
            key={`multiple-${defaultValue}`}
            multiple
            className="w-full max-w-md"
            defaultValue={[defaultValue]}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>첫 번째</AccordionTrigger>
              <AccordionContent>첫 번째 내용</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>두 번째</AccordionTrigger>
              <AccordionContent>두 번째 내용</AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      }

      return (
        <Accordion
          key={`single-${defaultValue}`}
          className="w-full max-w-md"
          defaultValue={[defaultValue]}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>첫 번째</AccordionTrigger>
            <AccordionContent>첫 번째 내용</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>두 번째</AccordionTrigger>
            <AccordionContent>두 번째 내용</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    },
    buildCode: (state) => {
      const type = str(state, "type")
      const defaultValue = str(state, "defaultValue")
      const multiple = type === "multiple" ? " multiple" : ""
      const defaultAttr =
        type === "multiple"
          ? ` defaultValue={["${defaultValue}"]}`
          : ` defaultValue="${defaultValue}"`
      return `<Accordion${multiple}${defaultAttr} className="w-full">\n  <AccordionItem value="item-1">...</AccordionItem>\n  <AccordionItem value="item-2">...</AccordionItem>\n</Accordion>`
    },
  },

  alert: {
    initialState: {
      variant: "default",
      status: "default",
      type: "default",
      removable: false,
      duration: "0",
      title: "알림",
      description: "추가 설명이 여기에 표시됩니다.",
    },
    textKeys: ["title", "description"],
    selectKeys: {
      variant: ["default"],
      status: ["default", "success", "warning", "destructive"],
      type: ["default", "icon"],
      duration: ["0", "3000", "5000"],
    },
    showWhen: {
      duration: (state) => playgroundBool(state, "removable"),
    },
    renderPreview: (state, _ctx) => {
      const removable = bool(state, "removable")
      const duration = Number(str(state, "duration") || 0)
      return (
        <Alert
          key={`${str(state, "type")}-${removable}-${duration}`}
          variant={str(state, "variant") as "default"}
          status={str(state, "status") as "default"}
          type={str(state, "type") as "default"}
          removable={removable}
          duration={removable ? duration : 0}
          className="w-full max-w-md"
        >
          <AlertTitle>{str(state, "title")}</AlertTitle>
          <AlertDescription>{str(state, "description")}</AlertDescription>
        </Alert>
      )
    },
    buildCode: (state) => {
      const removable = bool(state, "removable")
      const duration = Number(str(state, "duration") || 0)
      const status = str(state, "status")
      const props = [
        `variant="${str(state, "variant")}"`,
        status !== "default" ? `status="${status}"` : "",
        `type="${str(state, "type")}"`,
        removable ? "removable" : "",
        removable && duration > 0 ? `duration={${duration}}` : "",
      ].filter(Boolean)
      return `<Alert ${props.join(" ")}>\n  <AlertTitle>${str(state, "title")}</AlertTitle>\n  <AlertDescription>${str(state, "description")}</AlertDescription>\n</Alert>`
    },
  },

  sonner: {
    initialState: { type: "default" },
    selectKeys: { type: ["default", "success", "error", "info", "warning"] },
    renderPreview: (state, _ctx) => (
      <Button
        variant="outline"
        onClick={() => {
          const type = str(state, "type")
          if (type === "default") toast("알림 메시지")
          else if (type === "success") toast.success("성공했습니다")
          else if (type === "error") toast.error("오류가 발생했습니다")
          else if (type === "info") toast.info("안내 메시지")
          else toast.warning("주의가 필요합니다")
        }}
      >
        토스트 표시
      </Button>
    ),
    buildCode: (state) => {
      const type = str(state, "type")
      if (type === "default") return `toast("알림 메시지")`
      return `toast.${type}("메시지")`
    },
  },

}

export function getPlaygroundEntry(slug: string) {
  return PLAYGROUND_REGISTRY[slug]
}
