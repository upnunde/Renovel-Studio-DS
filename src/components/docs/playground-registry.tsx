"use client"

import type { ReactNode } from "react"

import { ICONS } from "@/components/icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarIcon, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"
import { Input, InputGroup, InputHypertext } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"
import { controlSizeToIconGlyph } from "design-system/icon-tokens"

import type { PlaygroundNumberField, PlaygroundRenderContext, PlaygroundState } from "./playground-utils"
import { playgroundBool } from "./playground-utils"

const ICON_SIZES = {
  "icon-xs": "xs",
  "icon-sm": "sm",
  icon: "md",
  "icon-lg": "lg",
  "icon-xl": "lg",
  "icon-2xl": "xl",
} as const

const AVATAR_IMAGE =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face"

export type PlaygroundRegistryEntry = {
  description?: string
  initialState: PlaygroundState
  textKeys?: string[]
  numberKeys?: PlaygroundNumberField[]
  selectKeys?: Record<string, string[]>
  /** state 조건을 만족할 때만 컨트롤 노출 */
  showWhen?: Partial<Record<string, (state: PlaygroundState) => boolean>>
  renderPreview: (state: PlaygroundState, ctx: PlaygroundRenderContext) => ReactNode
  buildCode: (state: PlaygroundState) => string
  getPreviewClassName?: (state: PlaygroundState) => string | undefined
}

function isIconOnlyButtonSize(size: string) {
  return size === "icon" || size.startsWith("icon-")
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
      "속성을 선택하면 미리보기와 코드가 함께 갱신됩니다. size 토큰은 xs_h24 ~ 2xl_h48 체계입니다.",
    initialState: {
      variant: "default",
      size: "default",
      label: "Label",
      disabled: false,
      "aria-invalid": false,
      "aria-expanded": false,
    },
    textKeys: ["label"],
    renderPreview: (state, _ctx) => {
      const size = str(state, "size")
      const label = str(state, "label")
      const iconOnly = isIconOnlyButtonSize(size)
      const iconSize = iconOnly
        ? ICON_SIZES[size as keyof typeof ICON_SIZES]
        : "md"

      return (
        <Button
          variant={str(state, "variant") as "default"}
          size={size as "default"}
          disabled={bool(state, "disabled")}
          aria-invalid={bool(state, "aria-invalid") || undefined}
          aria-expanded={bool(state, "aria-expanded") || undefined}
          aria-label={iconOnly ? label || "버튼" : undefined}
        >
          {iconOnly ? (
            <Icon icon={ICONS.formatBold} size={iconSize} />
          ) : (
            label || "Label"
          )}
        </Button>
      )
    },
    buildCode: (state) => {
      const size = str(state, "size")
      const label = str(state, "label")
      const iconOnly = isIconOnlyButtonSize(size)
      const props: string[] = []
      if (str(state, "variant") !== "default") props.push(`variant="${str(state, "variant")}"`)
      if (size !== "default") props.push(`size="${size}"`)
      if (bool(state, "disabled")) props.push("disabled")
      if (bool(state, "aria-invalid")) props.push("aria-invalid")
      if (bool(state, "aria-expanded")) props.push("aria-expanded")
      if (iconOnly) props.push(`aria-label="${label || "버튼"}"`)
      const open = props.length ? ` ${props.join(" ")}` : ""
      if (iconOnly) {
        return `<Button${open}>\n  <Icon icon={ICONS.formatBold} size="${ICON_SIZES[size as keyof typeof ICON_SIZES]}" />\n</Button>`
      }
      return `<Button${open}>${label || "Label"}</Button>`
    },
    getPreviewClassName: (state) =>
      bool(state, "aria-invalid") ? "bg-destructive/5" : undefined,
  },

  "button-group": {
    initialState: { orientation: "horizontal" },
    renderPreview: (state, _ctx) => (
      <ButtonGroup
        orientation={str(state, "orientation") as "horizontal"}
        className="max-w-xs"
      >
        <Button variant="outline" size="sm">
          이전
        </Button>
        <ButtonGroupSeparator />
        <ButtonGroupText>1 / 3</ButtonGroupText>
        <ButtonGroupSeparator />
        <Button variant="outline" size="sm">
          다음
        </Button>
      </ButtonGroup>
    ),
    buildCode: (state) => {
      const orient =
        str(state, "orientation") === "horizontal"
          ? ""
          : ' orientation="vertical"'
      return `<ButtonGroup${orient}>\n  <Button variant="outline" size="sm">이전</Button>\n  <ButtonGroupSeparator />\n  <ButtonGroupText>1 / 3</ButtonGroupText>\n  <ButtonGroupSeparator />\n  <Button variant="outline" size="sm">다음</Button>\n</ButtonGroup>`
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
        str(state, "variant") !== "default"
          ? `variant="${str(state, "variant")}"`
          : "",
        str(state, "size") !== "default" ? `size="${str(state, "size")}"` : "",
        bool(state, "pressed") ? "pressed" : "",
        bool(state, "disabled") ? "disabled" : "",
        `aria-label="${str(state, "label")}"`,
      ].filter(Boolean)
      return `<Toggle ${props.join(" ")}>\n  <Icon icon={ICONS.formatBold} size="md" />\n</Toggle>`
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
    },
    textKeys: ["placeholder", "hypertextText"],
    selectKeys: {
      type: ["text", "email", "password", "number", "file"],
    },
    showWhen: {
      hypertextText: (state) => playgroundBool(state, "hypertext"),
    },
    renderPreview: (state, _ctx) => (
      <InputGroup className="max-w-xs">
        <Label htmlFor="playground-input">라벨</Label>
        <Input
          id="playground-input"
          size={str(state, "size") as "default"}
          type={str(state, "type")}
          placeholder={str(state, "placeholder")}
          disabled={bool(state, "disabled")}
          aria-invalid={bool(state, "aria-invalid") || undefined}
        />
        {bool(state, "hypertext") ? (
          <InputHypertext>{str(state, "hypertextText")}</InputHypertext>
        ) : null}
      </InputGroup>
    ),
    buildCode: (state) => {
      const inputProps = [
        str(state, "size") !== "default" ? `size="${str(state, "size")}"` : "",
        str(state, "type") !== "text" ? `type="${str(state, "type")}"` : "",
        `placeholder="${str(state, "placeholder")}"`,
        bool(state, "disabled") ? "disabled" : "",
        bool(state, "aria-invalid") ? "aria-invalid" : "",
      ].filter(Boolean)
      const hypertext = bool(state, "hypertext")
        ? `\n  <InputHypertext>${str(state, "hypertextText")}</InputHypertext>`
        : ""
      return `<InputGroup className="max-w-xs">\n  <Label htmlFor="field-id">라벨</Label>\n  <Input id="field-id" ${inputProps.join(" ")} />${hypertext}\n</InputGroup>`
    },
    getPreviewClassName: (state) =>
      bool(state, "aria-invalid") ? "bg-destructive/5" : undefined,
  },

  label: {
    initialState: { label: "이름", placeholder: "입력" },
    textKeys: ["label", "placeholder"],
    renderPreview: (state, _ctx) => (
      <div className="grid w-full max-w-xs gap-2">
        <Label htmlFor="playground-label">{str(state, "label")}</Label>
        <Input id="playground-label" placeholder={str(state, "placeholder")} />
      </div>
    ),
    buildCode: (state) =>
      `<div className="grid gap-2">\n  <Label htmlFor="field-id">${str(state, "label")}</Label>\n  <Input id="field-id" placeholder="${str(state, "placeholder")}" />\n</div>`,
  },

  textarea: {
    initialState: {
      rows: 3,
      placeholder: "여러 줄 입력",
      disabled: false,
      "aria-invalid": false,
    },
    textKeys: ["placeholder"],
    numberKeys: [{ key: "rows", min: 2, max: 8, step: 1 }],
    renderPreview: (state, _ctx) => (
      <Textarea
        className="max-w-md"
        rows={num(state, "rows")}
        placeholder={str(state, "placeholder")}
        disabled={bool(state, "disabled")}
        aria-invalid={bool(state, "aria-invalid") || undefined}
      />
    ),
    buildCode: (state) => {
      const props = [
        `rows={${num(state, "rows")}}`,
        `placeholder="${str(state, "placeholder")}"`,
        bool(state, "disabled") ? "disabled" : "",
        bool(state, "aria-invalid") ? "aria-invalid" : "",
        'className="max-w-md"',
      ].filter(Boolean)
      return `<Textarea ${props.join(" ")} />`
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
        str(state, "size") !== "default" ? `size="${str(state, "size")}"` : "",
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
    initialState: { checked: false, disabled: false, caption: "알림" },
    textKeys: ["caption"],
    renderPreview: (state, ctx) => (
      <div className="flex w-full max-w-xs items-center justify-between gap-4">
        <Label htmlFor="playground-switch">{str(state, "caption")}</Label>
        <Switch
          id="playground-switch"
          {...ctx.bindSwitch("checked")}
          disabled={bool(state, "disabled")}
        />
      </div>
    ),
    buildCode: (state) => {
      const props = [
        'id="notifications"',
        bool(state, "checked") ? "checked" : "",
        bool(state, "disabled") ? "disabled" : "",
      ].filter(Boolean)
      return `<div className="flex items-center justify-between gap-4">\n  <Label htmlFor="notifications">${str(state, "caption")}</Label>\n  <Switch ${props.join(" ")} />\n</div>`
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
    initialState: { value: 50, disabled: false },
    numberKeys: [{ key: "value", min: 0, max: 100, step: 1 }],
    renderPreview: (state, ctx) => (
      <div className="w-full max-w-xs space-y-2">
        <Slider
          {...ctx.bindSlider("value")}
          disabled={bool(state, "disabled")}
          max={100}
          step={1}
        />
        <p className="text-center font-mono text-sm text-muted-foreground">
          {num(state, "value")}
        </p>
      </div>
    ),
    buildCode: (state) => {
      const props = [
        `defaultValue={[${num(state, "value")}]}`,
        "max={100}",
        bool(state, "disabled") ? "disabled" : "",
        'className="max-w-xs"',
      ].filter(Boolean)
      return `<Slider ${props.join(" ")} />`
    },
  },

  badge: {
    initialState: { variant: "default", label: "Badge" },
    textKeys: ["label"],
    renderPreview: (state, _ctx) => (
      <Badge variant={str(state, "variant") as "default"}>
        {str(state, "label")}
      </Badge>
    ),
    buildCode: (state) => {
      const variant =
        str(state, "variant") !== "default"
          ? ` variant="${str(state, "variant")}"`
          : ""
      return `<Badge${variant}>${str(state, "label")}</Badge>`
    },
  },

  avatar: {
    description: "data-size · sm_s24 / md_s32 / lg_s40",
    initialState: {
      size: "default",
      image: "있음",
      fallback: "initials",
      initials: "JD",
    },
    textKeys: ["initials"],
    renderPreview: (state, _ctx) => (
      <Avatar size={str(state, "size") as "default"}>
        {str(state, "image") === "있음" ? (
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
      const size =
        str(state, "size") !== "default" ? ` size="${str(state, "size")}"` : ""
      const image =
        str(state, "image") === "있음"
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
      showFooter: true,
    },
    textKeys: ["title", "description"],
    renderPreview: (state, _ctx) => (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{str(state, "title")}</CardTitle>
          <CardDescription>{str(state, "description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">본문 영역</p>
        </CardContent>
        {bool(state, "showFooter") ? (
          <CardFooter>
            <Button size="sm">확인</Button>
          </CardFooter>
        ) : null}
      </Card>
    ),
    buildCode: (state) => {
      const footer = bool(state, "showFooter")
        ? '\n  <CardFooter>\n    <Button size="sm">확인</Button>\n  </CardFooter>'
        : ""
      return `<Card>\n  <CardHeader>\n    <CardTitle>${str(state, "title")}</CardTitle>\n    <CardDescription>${str(state, "description")}</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p className="text-sm text-muted-foreground">본문 영역</p>\n  </CardContent>${footer}\n</Card>`
    },
  },

  tabs: {
    initialState: {
      variant: "default",
      orientation: "horizontal",
      activeTab: "tab-1",
    },
    selectKeys: { activeTab: ["tab-1", "tab-2"] },
    renderPreview: (state, ctx) => (
      <Tabs
        {...ctx.bindValue("activeTab")}
        orientation={str(state, "orientation") as "horizontal"}
        className="w-full max-w-md"
      >
        <TabsList variant={str(state, "variant") as "default"}>
          <TabsTrigger value="tab-1">탭 1</TabsTrigger>
          <TabsTrigger value="tab-2">탭 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">첫 번째 패널</TabsContent>
        <TabsContent value="tab-2">두 번째 패널</TabsContent>
      </Tabs>
    ),
    buildCode: (state) => {
      const props = [
        `defaultValue="${str(state, "activeTab")}"`,
        str(state, "orientation") !== "horizontal"
          ? `orientation="${str(state, "orientation")}"`
          : "",
      ].filter(Boolean)
      const listVariant =
        str(state, "variant") !== "default"
          ? ` variant="${str(state, "variant")}"`
          : ""
      return `<Tabs ${props.join(" ")}>\n  <TabsList${listVariant}>\n    <TabsTrigger value="tab-1">탭 1</TabsTrigger>\n    <TabsTrigger value="tab-2">탭 2</TabsTrigger>\n  </TabsList>\n  <TabsContent value="tab-1">첫 번째 패널</TabsContent>\n  <TabsContent value="tab-2">두 번째 패널</TabsContent>\n</Tabs>`
    },
  },

  progress: {
    initialState: { value: 60 },
    numberKeys: [{ key: "value", min: 0, max: 100, step: 1 }],
    renderPreview: (state, _ctx) => (
      <div className="w-full max-w-xs space-y-2">
        <Progress value={num(state, "value")} />
        <p className="text-center font-mono text-sm text-muted-foreground">
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
    initialState: { align: "start", "item variant": "default", open: false },
    renderPreview: (state, ctx) => (
      <DropdownMenu {...ctx.bindOpen()}>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          메뉴 열기
        </DropdownMenuTrigger>
        <DropdownMenuContent align={str(state, "align") as "start"}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>계정</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>프로필</DropdownMenuItem>
            <DropdownMenuItem variant={str(state, "item variant") as "default"}>
              {str(state, "item variant") === "destructive" ? "삭제" : "설정"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    buildCode: (state) => {
      const align =
        str(state, "align") !== "start" ? ` align="${str(state, "align")}"` : ""
      const itemVariant =
        str(state, "item variant") === "destructive"
          ? ' variant="destructive"'
          : ""
      return `<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button variant="outline">메뉴 열기</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent${align}>\n    <DropdownMenuGroup>\n      <DropdownMenuLabel>계정</DropdownMenuLabel>\n      <DropdownMenuSeparator />\n      <DropdownMenuItem>프로필</DropdownMenuItem>\n      <DropdownMenuItem${itemVariant}>설정</DropdownMenuItem>\n    </DropdownMenuGroup>\n  </DropdownMenuContent>\n</DropdownMenu>`
    },
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
      const align =
        str(state, "align") !== "center" ? ` align="${str(state, "align")}"` : ""
      return `<Popover${open}>\n  <PopoverTrigger asChild>\n    <Button variant="outline">팝오버 열기</Button>\n  </PopoverTrigger>\n  <PopoverContent${align}>\n    <PopoverHeader>\n      <PopoverTitle>제목</PopoverTitle>\n      <PopoverDescription>짧은 설명</PopoverDescription>\n    </PopoverHeader>\n  </PopoverContent>\n</Popover>`
    },
  },

  tooltip: {
    initialState: { side: "top", tip: "도움말 텍스트", open: false },
    textKeys: ["tip"],
    renderPreview: (state, ctx) => {
      const forceOpen = bool(state, "open")
      return (
        <Tooltip
          {...(forceOpen
            ? { open: true, onOpenChange: (open) => ctx.set("open", open) }
            : {})}
        >
          <TooltipTrigger render={<Button variant="outline" />}>
            툴팁
          </TooltipTrigger>
          <TooltipContent side={str(state, "side") as "top"}>
            {str(state, "tip")}
          </TooltipContent>
        </Tooltip>
      )
    },
    buildCode: (state) => {
      const side = str(state, "side") !== "top" ? ` side="${str(state, "side")}"` : ""
      return `<Tooltip>\n  <TooltipTrigger asChild>\n    <Button variant="outline">툴팁</Button>\n  </TooltipTrigger>\n  <TooltipContent${side}>\n    ${str(state, "tip")}\n  </TooltipContent>\n</Tooltip>`
    },
  },

  accordion: {
    initialState: { multiple: false },
    renderPreview: (state, _ctx) => (
      <Accordion
        key={bool(state, "multiple") ? "multiple" : "single"}
        multiple={bool(state, "multiple")}
        className="w-full max-w-md"
        defaultValue={["item-1"]}
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
    ),
    buildCode: (state) => {
      const multiple = bool(state, "multiple") ? " multiple" : ""
      return `<Accordion${multiple} defaultValue={["item-1"]} className="w-full">\n  <AccordionItem value="item-1">\n    <AccordionTrigger>첫 번째</AccordionTrigger>\n    <AccordionContent>첫 번째 내용</AccordionContent>\n  </AccordionItem>\n  <AccordionItem value="item-2">\n    <AccordionTrigger>두 번째</AccordionTrigger>\n    <AccordionContent>두 번째 내용</AccordionContent>\n  </AccordionItem>\n</Accordion>`
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
      const variant =
        str(state, "variant") !== "default"
          ? ` variant="${str(state, "variant")}"`
          : ""
      return `<Alert${variant}>\n  <AlertTitle>${str(state, "title")}</AlertTitle>\n  <AlertDescription>${str(state, "description")}</AlertDescription>\n</Alert>`
    },
  },

  sonner: {
    initialState: { type: "default" },
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
      return `<Separator />`
    },
  },
}

export function getPlaygroundEntry(slug: string) {
  return PLAYGROUND_REGISTRY[slug]
}
