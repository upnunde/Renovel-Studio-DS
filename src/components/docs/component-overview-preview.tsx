"use client"

import type { ReactNode } from "react"

import { ICONS } from "@/components/icons"
import { Icon } from "design-system/ui/icon"
import { Alert, AlertDescription, AlertTitle } from "design-system/ui/alert"
import { Avatar, AvatarFallback, AvatarIcon, AvatarImage } from "design-system/ui/avatar"
import { Badge } from "design-system/ui/badge"
import { Button } from "design-system/ui/button"
import { ButtonGroup } from "design-system/ui/button-group"
import { Chip } from "design-system/ui/chip"
import { Checkbox } from "design-system/ui/checkbox"
import { FieldLabel } from "design-system/ui/field-label"
import { Input, InputGroup, InputHypertext } from "design-system/ui/input"
import { Label } from "design-system/ui/label"
import { Progress } from "design-system/ui/progress"
import { RadioGroup, RadioGroupItem } from "design-system/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "design-system/ui/select"
import { Skeleton } from "design-system/ui/skeleton"
import { Slider } from "design-system/ui/slider"
import { Switch } from "design-system/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "design-system/ui/tabs"
import { Textarea } from "design-system/ui/textarea"
import { Toggle } from "design-system/ui/toggle"
import { ToggleGroup } from "design-system/ui/toggle-group"
import type { ComponentDoc } from "@/lib/component-docs"
import { cn } from "@/lib/utils"

const previewShell =
  "pointer-events-none flex w-full max-w-full min-w-0 items-center justify-center select-none"

function PreviewButton() {
  return (
    <div className={cn(previewShell, "gap-2")}>
      <Button size="sm">Primary</Button>
      <Button size="sm" variant="outline">
        Outline
      </Button>
    </div>
  )
}

function PreviewButtonGroup() {
  return (
    <div className={previewShell}>
      <ButtonGroup size="sm">
        <Button size="sm" variant="outline">
          Left
        </Button>
        <Button size="sm" variant="outline">
          Mid
        </Button>
        <Button size="sm" variant="outline">
          Right
        </Button>
      </ButtonGroup>
    </div>
  )
}

function PreviewToggle() {
  return (
    <div className={cn(previewShell, "gap-2")}>
      <Toggle size="sm" variant="outline" aria-pressed={false}>
        Off
      </Toggle>
      <Toggle size="sm" variant="outline" aria-pressed>
        On
      </Toggle>
    </div>
  )
}

function PreviewToggleGroup() {
  return (
    <div className={previewShell}>
      <ToggleGroup size="sm" defaultValue={["fill"]}>
        <Toggle size="sm" variant="outline" value="hug">
          A
        </Toggle>
        <Toggle size="sm" variant="outline" value="fill">
          B
        </Toggle>
        <Toggle size="sm" variant="outline" value="fixed">
          C
        </Toggle>
      </ToggleGroup>
    </div>
  )
}

function PreviewChip() {
  return (
    <div className={cn(previewShell, "gap-2")}>
      <Chip size="sm" variant="outline">
        Filter
      </Chip>
      <Chip size="sm" variant="fill" aria-pressed>
        Selected
      </Chip>
    </div>
  )
}

function PreviewInput() {
  return (
    <div className={cn(previewShell, "flex-col items-stretch gap-1.5 px-2")}>
      <Label className="text-xs text-foreground-muted">라벨</Label>
      <Input defaultValue="입력 값" readOnly className="h-8 text-sm" />
      <InputHypertext>8자 이상 입력</InputHypertext>
    </div>
  )
}

function PreviewLabel() {
  return (
    <div className={cn(previewShell, "px-2")}>
      <FieldLabel
        htmlFor="preview-field-label"
        required
        description="필드 위 보조문구"
      >
        타이틀 입력
      </FieldLabel>
    </div>
  )
}

function PreviewTextarea() {
  return (
    <div className={cn(previewShell, "px-2")}>
      <Textarea
        readOnly
        defaultValue="여러 줄 텍스트"
        className="min-h-16 resize-none text-sm"
        rows={2}
      />
    </div>
  )
}

function PreviewSelect() {
  return (
    <div className={previewShell}>
      <Select defaultValue="a">
        <SelectTrigger size="sm" className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">옵션 A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function PreviewCheckbox() {
  return (
    <div className={previewShell}>
      <Checkbox size="default" defaultChecked aria-label="옵션" />
    </div>
  )
}

function PreviewSwitch() {
  return (
    <div className={cn(previewShell, "gap-4")}>
      <div className="flex items-center gap-2">
        <Switch defaultChecked id="preview-sw1" />
        <Label htmlFor="preview-sw1">켜짐</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="preview-sw2" />
        <Label htmlFor="preview-sw2">꺼짐</Label>
      </div>
    </div>
  )
}

function PreviewRadioGroup() {
  return (
    <div className={previewShell}>
      <RadioGroup defaultValue="on" size="default">
        <RadioGroupItem value="on" aria-label="옵션" />
      </RadioGroup>
    </div>
  )
}

function PreviewSlider() {
  return (
    <div className={cn(previewShell, "px-4")}>
      <Slider type="default" defaultValue={[42]} max={100} step={1} className="w-full max-w-48" />
    </div>
  )
}

function PreviewBadge() {
  return (
    <div className={cn(previewShell, "flex-wrap gap-2")}>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}

function PreviewAvatar() {
  return (
    <div className={cn(previewShell, "gap-2")}>
      <Avatar>
        <AvatarImage src="https://api.dicebear.com/9.x/notionists/svg?seed=ds" alt="" />
        <AvatarFallback>DS</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarIcon icon={ICONS.user} />
      </Avatar>
    </div>
  )
}

function PreviewTabs() {
  return (
    <div className={previewShell}>
      <Tabs defaultValue="tab1" className="w-full max-w-[220px]">
        <TabsList className="w-full">
          <TabsTrigger value="tab1">탭 1</TabsTrigger>
          <TabsTrigger value="tab2">탭 2</TabsTrigger>
          <TabsTrigger value="tab3">탭 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="sr-only" />
      </Tabs>
    </div>
  )
}

function PreviewProgress() {
  return (
    <div className={cn(previewShell, "px-4")}>
      <Progress value={62} className="w-full max-w-48" />
    </div>
  )
}

function PreviewSkeleton() {
  return (
    <div className={cn(previewShell, "flex-col gap-2 px-4")}>
      <Skeleton className="h-3 w-40" />
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-3 w-36" />
    </div>
  )
}

function PreviewDropdownMenu() {
  return (
    <div className={previewShell}>
      <div className="flex min-w-40 flex-col overflow-hidden rounded-lg border border-border bg-background p-1 text-sm shadow-md">
        <div className="px-2 py-1 text-xs font-medium text-foreground-muted">보기</div>
        <div className="flex items-center gap-2 rounded-md bg-accent px-2 py-1.5 text-accent-foreground">
          <span className="size-4 shrink-0 rounded-sm bg-primary/20" />
          목록
          <Icon icon={ICONS.check} size="md" className="ml-auto" />
        </div>
        <div className="flex items-center gap-2 px-2 py-1.5 text-foreground-muted">
          <span className="size-4 shrink-0 rounded-sm bg-background-muted" />
          격자
        </div>
      </div>
    </div>
  )
}

function PreviewDialog() {
  return (
    <div className={previewShell}>
      <div className="w-full max-w-[200px] rounded-xl border border-border bg-background p-4 shadow-md">
        <p className="text-sm font-medium">다이얼로그</p>
        <p className="mt-1 text-xs text-foreground-muted">모달 콘텐츠 영역</p>
        <div className="mt-3 flex justify-end gap-2">
          <Button size="xs" variant="outline">
            취소
          </Button>
          <Button size="xs">확인</Button>
        </div>
      </div>
    </div>
  )
}

function PreviewPopover() {
  return (
    <div className={cn(previewShell, "flex-col gap-2")}>
      <Button size="sm" variant="outline">
        팝오버 열기
      </Button>
      <div className="flex w-full max-w-[200px] flex-col gap-2.5 rounded-lg bg-background p-2.5 text-sm text-foreground shadow-md ring-1 ring-foreground/10">
        <div className="flex flex-col gap-0.5">
          <p className="font-medium">팝오버</p>
          <p className="text-foreground-muted text-xs">트리거 근처 패널</p>
        </div>
      </div>
    </div>
  )
}

function PreviewTooltip() {
  return (
    <div className={cn(previewShell, "relative overflow-visible py-6")}>
      <Button size="sm" variant="link" className="underline decoration-dotted">
        호버 대상
      </Button>
      <div className="absolute top-1 left-1/2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs text-background">
        툴팁
      </div>
    </div>
  )
}

function PreviewAlert() {
  return (
    <div className={cn(previewShell, "px-2")}>
      <Alert type="icon" size="sm" className="w-full max-w-[220px]">
        <AlertTitle>알림</AlertTitle>
        <AlertDescription>상태 메시지</AlertDescription>
      </Alert>
    </div>
  )
}

function PreviewSonner() {
  return (
    <div className={previewShell}>
      <div className="flex w-full max-w-[220px] items-center gap-2 rounded-lg border border-border bg-foreground px-3 py-2.5 text-background shadow-md">
        <Icon icon={ICONS.info} size="md" />
        <span className="flex-1 text-xs">토스트</span>
        <Icon icon={ICONS.close} size="md" className="opacity-70" />
      </div>
    </div>
  )
}

const previewBySlug: Record<ComponentDoc["slug"], () => ReactNode> = {
  button: PreviewButton,
  "button-group": PreviewButtonGroup,
  toggle: PreviewToggle,
  "toggle-group": PreviewToggleGroup,
  chip: PreviewChip,
  input: PreviewInput,
  label: PreviewLabel,
  textarea: PreviewTextarea,
  select: PreviewSelect,
  checkbox: PreviewCheckbox,
  switch: PreviewSwitch,
  "radio-group": PreviewRadioGroup,
  slider: PreviewSlider,
  badge: PreviewBadge,
  avatar: PreviewAvatar,
  tabs: PreviewTabs,
  progress: PreviewProgress,
  skeleton: PreviewSkeleton,
  "dropdown-menu": PreviewDropdownMenu,
  dialog: PreviewDialog,
  popover: PreviewPopover,
  tooltip: PreviewTooltip,
  alert: PreviewAlert,
  sonner: PreviewSonner,
}

export function ComponentOverviewPreview({ slug }: { slug: ComponentDoc["slug"] }) {
  const Preview = previewBySlug[slug]
  return (
    <div className="flex min-h-36 w-full min-w-0 max-w-full items-center justify-center overflow-hidden">
      {Preview ? <Preview /> : null}
    </div>
  )
}
