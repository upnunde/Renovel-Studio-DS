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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "design-system/ui/card"
import { Checkbox } from "design-system/ui/checkbox"
import { Chip } from "design-system/ui/chip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "design-system/ui/dialog"
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
import { Progress } from "design-system/ui/progress"
import { RadioGroup, RadioGroupItem } from "design-system/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "design-system/ui/select"
import { Separator } from "design-system/ui/separator"
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
  iconChevronButtonClass,
} from "design-system/component-size-tokens"

import type { PlaygroundNumberField, PlaygroundRenderContext, PlaygroundState } from "./playground-utils"
import { playgroundBool, playgroundPropAttr, playgroundPropAttrs } from "./playground-utils"

const FIELD_LABEL_PLAYGROUND_ID = "field-playground"
const FIELD_LABEL_DESCRIPTION_LINE = "필요 없는 보조문구는 삭제"
const FIELD_LABEL_INFO_TEXT = "필드에 대한 추가 설명입니다."

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

const PLAYGROUND_MENU_ITEMS = ["항목 1", "항목 2"] as const

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
  const itemType = str(state, "item type")
  const itemVariant = str(state, "item variant")

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
  const itemType = str(state, "item type")
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
    const itemVariant = ` variant="${str(state, "item variant")}"`
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
      "타입(텍스트·리드 아이콘·아이콘 전용)과 사이즈를 따로 선택합니다. 아이콘 전용은 size에 따라 icon · icon-sm … 으로 출력됩니다. chevron을 켜면 DropdownMenu 트리거로 메뉴가 활성화됩니다.",
    initialState: {
      variant: "default",
      type: "text",
      size: "default",
      shape: "square",
      label: "Label",
      chevron: false,
      disabled: false,
      "aria-invalid": false,
      "aria-expanded": false,
    },
    textKeys: ["label"],
    selectKeys: {
      type: ["text", "leading-icon", "icon"],
      size: [...CONTROL_TEXT_SIZE_APIS],
      shape: [...BUTTON_SHAPE_APIS],
    },
    showWhen: {
      "aria-expanded": (state) => playgroundBool(state, "chevron"),
    },
    renderPreview: (state, ctx) => {
      const size = str(state, "size")
      const label = str(state, "label")
      const buttonType = str(state, "type")
      const isIcon = buttonType === "icon"
      const isLeadingIcon = buttonType === "leading-icon"
      const chevron = bool(state, "chevron")
      const iconChevron = isIcon && chevron
      const glyph = controlSizeToIconGlyph(size)

      const triggerChildren = (
        <>
          {isIcon ? (
            <Icon
              icon={ICONS.home}
              size={glyph}
              position={chevron ? "inline-start" : undefined}
            />
          ) : isLeadingIcon ? (
            <>
              <Icon icon={ICONS.home} size={glyph} position="inline-start" />
              {label || "Label"}
            </>
          ) : (
            label || "Label"
          )}
          {chevron ? (
            <Icon icon={ICONS.chevronDown} size={glyph} position="inline-end" />
          ) : null}
        </>
      )

      const triggerButton = (
        <Button
          variant={str(state, "variant") as "default"}
          shape={str(state, "shape") as "square"}
          size={toButtonSize(size, isIcon) as "default"}
          disabled={bool(state, "disabled")}
          aria-invalid={bool(state, "aria-invalid") || undefined}
          aria-label={isIcon ? label || "버튼" : undefined}
          className={iconChevron ? iconChevronButtonClass(size) : undefined}
        />
      )

      if (!chevron) {
        return (
          <Button
            variant={str(state, "variant") as "default"}
            shape={str(state, "shape") as "square"}
            size={toButtonSize(size, isIcon) as "default"}
            disabled={bool(state, "disabled")}
            aria-invalid={bool(state, "aria-invalid") || undefined}
            aria-label={isIcon ? label || "버튼" : undefined}
            className={iconChevron ? iconChevronButtonClass(size) : undefined}
          >
            {triggerChildren}
          </Button>
        )
      }

      return (
        <DropdownMenu {...ctx.bindOpen("aria-expanded")}>
          <DropdownMenuTrigger render={triggerButton}>
            {triggerChildren}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {PLAYGROUND_MENU_ITEMS.map((item) => (
              <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    buildCode: (state) => {
      const size = str(state, "size")
      const label = str(state, "label")
      const buttonType = str(state, "type")
      const isIcon = buttonType === "icon"
      const isLeadingIcon = buttonType === "leading-icon"
      const chevron = bool(state, "chevron")
      const iconChevron = isIcon && chevron
      const realSize = toButtonSize(size, isIcon)
      const glyph = controlSizeToIconGlyph(size)
      const props = [
        playgroundPropAttr("variant", str(state, "variant")),
        playgroundPropAttr("shape", str(state, "shape")),
        playgroundPropAttr("size", realSize),
      ]
      if (bool(state, "disabled")) props.push("disabled")
      if (bool(state, "aria-invalid")) props.push("aria-invalid")
      if (isIcon) props.push(`aria-label="${label || "버튼"}"`)
      if (iconChevron) props.push(`className="${iconChevronButtonClass(size)}"`)
      const open = props.length ? ` ${props.join(" ")}` : ""
      const chevronLine = `\n  <Icon icon={ICONS.chevronDown} size="${glyph}" position="inline-end" />`
      const leadingIconLine = `\n  <Icon icon={ICONS.home} size="${glyph}" position="inline-start" />`
      const iconOnlyLine = chevron
        ? `\n  <Icon icon={ICONS.home} size="${glyph}" position="inline-start" />`
        : `\n  <Icon icon={ICONS.home} size="${glyph}" />`

      let buttonCode: string
      if (isIcon) {
        buttonCode = `<Button${open}>${iconOnlyLine}${chevron ? chevronLine : ""}\n</Button>`
      } else if (isLeadingIcon) {
        buttonCode = `<Button${open}>${leadingIconLine}\n  ${label || "Label"}${chevron ? chevronLine : ""}\n</Button>`
      } else if (chevron) {
        buttonCode = `<Button${open}>\n  ${label || "Label"}${chevronLine}\n</Button>`
      } else {
        buttonCode = `<Button${open}>${label || "Label"}</Button>`
      }

      if (!chevron) {
        return buttonCode
      }

      const menuOpen = bool(state, "aria-expanded") ? " open" : ""
      const menuItems = PLAYGROUND_MENU_ITEMS.map(
        (item) => `    <DropdownMenuItem>${item}</DropdownMenuItem>`
      ).join("\n")
      return `<DropdownMenu${menuOpen}>\n  <DropdownMenuTrigger asChild>\n${indentCodeBlock(buttonCode, 4)}\n  </DropdownMenuTrigger>\n  <DropdownMenuContent align="start">\n${menuItems}\n  </DropdownMenuContent>\n</DropdownMenu>`
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
      label: "전자제품",
      selected: false,
      removable: false,
      disabled: false,
    },
    textKeys: ["label"],
    renderPreview: (state, ctx) => (
      <Chip
        variant={str(state, "variant") as "outline"}
        size={str(state, "size") as "default"}
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
      hypertext: false,
      hypertextText: "8자 이상 입력해 주세요.",
      hypertextMax: 1000,
      hypertextCount: 0,
    },
    textKeys: ["children", "hypertextText"],
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

      return (
        <InputGroup className="max-w-xs">
          <FieldLabel
            htmlFor={FIELD_LABEL_PLAYGROUND_ID}
            size={str(state, "size") as "default"}
            required={bool(state, "required")}
            description={descriptionLines}
            info={bool(state, "info") ? FIELD_LABEL_INFO_TEXT : undefined}
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
        bool(state, "info") ? `info="${FIELD_LABEL_INFO_TEXT}"` : "",
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
      rows: 3,
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
      { key: "rows", min: 2, max: 8, step: 1 },
      { key: "hypertextMax", min: 0, max: PLAYGROUND_HYPERTEXT_COUNTER_MAX, step: 1 },
      { key: "hypertextCount", min: 0, max: PLAYGROUND_HYPERTEXT_COUNTER_MAX, step: 1 },
    ],
    showWhen: {
      hypertextText: (state) => playgroundBool(state, "hypertext"),
      hypertextMax: (state) => playgroundBool(state, "hypertext"),
      hypertextCount: (state) =>
        playgroundBool(state, "hypertext") && Number(state.hypertextMax) > 0,
    },
    renderPreview: (state, _ctx) => (
      <InputGroup className="max-w-md">
        <Textarea
          key={playgroundHypertextInputKey(state)}
          id="playground-textarea"
          rows={num(state, "rows")}
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
    ),
    buildCode: (state) => {
      const props = [
        `id="field-id"`,
        `rows={${num(state, "rows")}}`,
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
      checked: "false",
      disabled: false,
      "aria-invalid": false,
      caption: "동의합니다",
    },
    textKeys: ["caption"],
    selectKeys: {
      checked: ["false", "true", "indeterminate"],
    },
    renderPreview: (state, ctx) => {
      const checked = str(state, "checked")
      return (
        <div className="flex items-center gap-2">
          <Checkbox
            id="playground-checkbox"
            checked={checked === "true"}
            indeterminate={checked === "indeterminate"}
            onCheckedChange={(next) =>
              ctx.set("checked", next ? "true" : "false")
            }
            disabled={bool(state, "disabled")}
            aria-invalid={bool(state, "aria-invalid") || undefined}
          />
          <Label htmlFor="playground-checkbox">{str(state, "caption")}</Label>
        </div>
      )
    },
    buildCode: (state) => {
      const checked = str(state, "checked")
      const props = [
        checked === "true" ? "checked" : "",
        checked === "indeterminate" ? "indeterminate" : "",
        bool(state, "disabled") ? "disabled" : "",
        bool(state, "aria-invalid") ? "aria-invalid" : "",
        'id="terms"',
      ].filter(Boolean)
      return `<div className="flex items-center gap-2">\n  <Checkbox ${props.join(" ")} />\n  <Label htmlFor="terms">${str(state, "caption")}</Label>\n</div>`
    },
    getPreviewClassName: (state) =>
      bool(state, "aria-invalid") ? "bg-destructive/5" : undefined,
  },

  switch: {
    initialState: { checked: false, disabled: false, caption: true },
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
          <Label htmlFor="playground-switch">알림</Label>
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
        return `<div className="flex items-center justify-between gap-4">\n  <Label htmlFor="notifications">알림</Label>\n  <Switch ${props.join(" ")} />\n</div>`
      }
      return `<Switch ${props.join(" ")} />`
    },
  },

  "radio-group": {
    initialState: {
      value: "a",
      disabled: false,
      "aria-invalid": false,
    },
    selectKeys: { value: ["a", "b"] },
    renderPreview: (state, ctx) => (
      <RadioGroup
        {...ctx.bindValue("value")}
        disabled={bool(state, "disabled")}
        aria-invalid={bool(state, "aria-invalid") || undefined}
        className="max-w-xs"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="a" id="rg-a" />
          <Label htmlFor="rg-a">옵션 A</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="b" id="rg-b" />
          <Label htmlFor="rg-b">옵션 B</Label>
        </div>
      </RadioGroup>
    ),
    buildCode: (state) => {
      const props = [
        `defaultValue="${str(state, "value")}"`,
        bool(state, "disabled") ? "disabled" : "",
        bool(state, "aria-invalid") ? "aria-invalid" : "",
      ].filter(Boolean)
      return `<RadioGroup ${props.join(" ")}>\n  <div className="flex items-center gap-2">\n    <RadioGroupItem value="a" id="a" />\n    <Label htmlFor="a">옵션 A</Label>\n  </div>\n  <div className="flex items-center gap-2">\n    <RadioGroupItem value="b" id="b" />\n    <Label htmlFor="b">옵션 B</Label>\n  </div>\n</RadioGroup>`
    },
    getPreviewClassName: (state) =>
      bool(state, "aria-invalid") ? "bg-destructive/5" : undefined,
  },

  slider: {
    initialState: { value: 50, min: 0, max: 100, step: 1, disabled: false },
    numberKeys: [
      { key: "value", min: 0, max: 100, step: 1 },
      { key: "min", min: 0, max: 90, step: 5, label: "min" },
      { key: "max", min: 10, max: 100, step: 5, label: "max" },
      { key: "step", min: 1, max: 10, step: 1, label: "step" },
    ],
    renderPreview: (state, ctx) => {
      const min = num(state, "min")
      const max = Math.max(min + num(state, "step"), num(state, "max"))
      const step = num(state, "step")
      const value = Math.min(max, Math.max(min, num(state, "value")))

      return (
        <div className="w-full max-w-xs space-y-2">
          <Slider
            {...ctx.bindSlider("value")}
            min={min}
            max={max}
            step={step}
            disabled={bool(state, "disabled")}
          />
          <p className="text-center font-mono text-sm text-foreground-muted">
            {value} ({min}–{max}, step {step})
          </p>
        </div>
      )
    },
    buildCode: (state) => {
      const props = [
        `defaultValue={[${num(state, "value")}]}`,
        `min={${num(state, "min")}}`,
        `max={${num(state, "max")}}`,
        `step={${num(state, "step")}}`,
        bool(state, "disabled") ? "disabled" : "",
        'className="max-w-xs"',
      ].filter(Boolean)
      return `<Slider ${props.join(" ")} />`
    },
  },

  badge: {
    description: "size · default_h20 / md_h24 / lg_h28 · shape · circle / square",
    initialState: {
      variant: "default",
      size: "default",
      shape: "circle",
      label: "Badge",
    },
    textKeys: ["label"],
    selectKeys: {
      size: [...BADGE_SIZE_APIS],
      shape: [...BADGE_SHAPE_APIS],
    },
    renderPreview: (state, _ctx) => (
      <Badge
        variant={str(state, "variant") as "default"}
        size={str(state, "size") as "default"}
        shape={str(state, "shape") as "circle"}
      >
        {str(state, "label")}
      </Badge>
    ),
    buildCode: (state) => {
      const attrs = playgroundPropAttrs([
        playgroundPropAttr("variant", str(state, "variant")),
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
      image: true,
      fallback: "initials",
      initials: "JD",
    },
    textKeys: ["initials"],
    selectKeys: {
      size: [...AVATAR_SIZE_APIS],
      fallback: ["initials", "icon"],
    },
    showWhen: {
      fallback: (state) => !playgroundBool(state, "image"),
      initials: (state) =>
        !playgroundBool(state, "image") && str(state, "fallback") === "initials",
    },
    renderPreview: (state, _ctx) => (
      <Avatar size={str(state, "size") as "default"}>
        {bool(state, "image") ? (
          <AvatarImage src={AVATAR_IMAGE} alt="사용자" />
        ) : null}
        {str(state, "fallback") === "icon" ? (
          <AvatarIcon icon={ICONS.user} />
        ) : (
          <AvatarFallback>{str(state, "initials")}</AvatarFallback>
        )}
      </Avatar>
    ),
    buildCode: (state) => {
      const size = playgroundPropAttrs([playgroundPropAttr("size", str(state, "size"))])
      const image = bool(state, "image")
        ? `\n  <AvatarImage src="…" alt="사용자" />`
        : ""
      const fallback =
        str(state, "fallback") === "icon"
          ? `\n  <AvatarIcon icon={ICONS.user} />`
          : `\n  <AvatarFallback>${str(state, "initials")}</AvatarFallback>`
      return `<Avatar${size}>${image}${fallback}\n</Avatar>`
    },
  },

  card: {
    initialState: {
      title: "카드 제목",
      description: "부가 설명 텍스트",
      showHeader: true,
      showContent: true,
      showFooter: true,
    },
    textKeys: ["title", "description"],
    showWhen: {
      title: (state) => playgroundBool(state, "showHeader"),
      description: (state) => playgroundBool(state, "showHeader"),
    },
    renderPreview: (state, _ctx) => (
      <Card className="w-full max-w-sm">
        {bool(state, "showHeader") ? (
          <CardHeader>
            <CardTitle>{str(state, "title")}</CardTitle>
            <CardDescription>{str(state, "description")}</CardDescription>
          </CardHeader>
        ) : null}
        {bool(state, "showContent") ? (
          <CardContent>
            <p className="text-sm text-foreground-muted">본문 영역</p>
          </CardContent>
        ) : null}
        {bool(state, "showFooter") ? (
          <CardFooter>
            <Button size="sm">확인</Button>
          </CardFooter>
        ) : null}
      </Card>
    ),
    buildCode: (state) => {
      const header = bool(state, "showHeader")
        ? `\n  <CardHeader>\n    <CardTitle>${str(state, "title")}</CardTitle>\n    <CardDescription>${str(state, "description")}</CardDescription>\n  </CardHeader>`
        : ""
      const content = bool(state, "showContent")
        ? '\n  <CardContent>\n    <p className="text-sm text-foreground-muted">본문 영역</p>\n  </CardContent>'
        : ""
      const footer = bool(state, "showFooter")
        ? '\n  <CardFooter>\n    <Button size="sm">확인</Button>\n  </CardFooter>'
        : ""
      return `<Card>${header}${content}${footer}\n</Card>`
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
          className="w-full max-w-md"
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
      <div className="w-full max-w-xs space-y-2">
        <Progress value={num(state, "value")} />
        <p className="text-center font-mono text-sm text-foreground-muted">
          {num(state, "value")}%
        </p>
      </div>
    ),
    buildCode: (state) =>
      `<Progress value={${num(state, "value")}} className="max-w-xs" />`,
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
      "item type": "default",
      "item variant": "default",
      open: false,
    },
    selectKeys: {
      "item type": [
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
      "item variant": (state) => str(state, "item type") === "default",
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
    initialState: { open: false },
    renderPreview: (state, ctx) => (
      <Dialog {...ctx.bindOpen()}>
        <DialogTrigger render={<Button variant="outline" />}>
          다이얼로그 열기
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>제목</DialogTitle>
            <DialogDescription>설명 텍스트입니다.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">취소</Button>
            <Button>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    buildCode: (state) => {
      const open = bool(state, "open") ? " open" : ""
      return `<Dialog${open}>\n  <DialogTrigger asChild>\n    <Button variant="outline">다이얼로그 열기</Button>\n  </DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>제목</DialogTitle>\n      <DialogDescription>설명 텍스트입니다.</DialogDescription>\n    </DialogHeader>\n    <DialogFooter>\n      <Button variant="outline">취소</Button>\n      <Button>확인</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`
    },
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
    initialState: { side: "top", tip: "도움말 텍스트", open: false, delay: "0ms" },
    textKeys: ["tip"],
    selectKeys: {
      delay: ["0ms", "700ms"],
      side: ["top", "right", "bottom", "left"],
    },
    renderPreview: (state, ctx) => {
      const delayMs = str(state, "delay") === "700ms" ? 700 : 0

      return (
        <TooltipProvider delay={delayMs}>
          <Tooltip {...ctx.bindOpen()}>
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
      const body = `<Tooltip>\n  <TooltipTrigger asChild>\n    <Button variant="outline">툴팁</Button>\n  </TooltipTrigger>\n  <TooltipContent${side}>\n    ${str(state, "tip")}\n  </TooltipContent>\n</Tooltip>`
      if (str(state, "delay") === "700ms") {
        return `<TooltipProvider delay={700}>\n  ${body.replace(/\n/g, "\n  ")}\n</TooltipProvider>`
      }
      return body
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
      title: "알림",
      description: "추가 설명이 여기에 표시됩니다.",
    },
    textKeys: ["title", "description"],
    selectKeys: { variant: ["default", "destructive"] },
    renderPreview: (state, _ctx) => (
      <Alert
        variant={str(state, "variant") as "default"}
        className="w-full max-w-md"
      >
        <AlertTitle>{str(state, "title")}</AlertTitle>
        <AlertDescription>{str(state, "description")}</AlertDescription>
      </Alert>
    ),
    buildCode: (state) => {
      const variant = ` variant="${str(state, "variant")}"`
      return `<Alert${variant}>\n  <AlertTitle>${str(state, "title")}</AlertTitle>\n  <AlertDescription>${str(state, "description")}</AlertDescription>\n</Alert>`
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

  separator: {
    initialState: { orientation: "horizontal" },
    selectKeys: { orientation: ["horizontal", "vertical"] },
    renderPreview: (state, _ctx) => {
      if (str(state, "orientation") === "vertical") {
        return (
          <div className="flex h-16 items-center gap-4">
            <span className="text-sm">왼쪽</span>
            <Separator orientation="vertical" />
            <span className="text-sm">오른쪽</span>
          </div>
        )
      }
      return (
        <div className="w-full max-w-xs space-y-4">
          <p className="text-sm">위 섹션</p>
          <Separator />
          <p className="text-sm">아래 섹션</p>
        </div>
      )
    },
    buildCode: (state) => {
      if (str(state, "orientation") === "vertical") {
        return `<div className="flex h-16 items-center gap-4">\n  <span>왼쪽</span>\n  <Separator orientation="vertical" />\n  <span>오른쪽</span>\n</div>`
      }
      return `<Separator orientation="${str(state, "orientation")}" />`
    },
  },
}

export function getPlaygroundEntry(slug: string) {
  return PLAYGROUND_REGISTRY[slug]
}
