"use client"

import { ICONS } from "@/components/icons"
import { Icon } from "@/components/ui/icon"
import { toast } from "sonner"
import { type ReactNode } from "react"

import {
  ComponentCase,
  ComponentCaseDocs,
  ComponentCaseGrid,
  ComponentCaseGroup,
} from "@/components/docs/component-case-docs"
import { ComponentPlayground } from "@/components/docs/component-playground"
import {
  CONTROL_ICON_SIZE_SCALE,
  CONTROL_SIZE_SCALE,
  controlCaseMeta,
  controlSizeToIconGlyph,
  iconButtonSizeToIconGlyph,
  avatarCaseMeta,
} from "design-system/component-size-tokens"
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
import { getComponentCaseSpec } from "@/lib/component-case-specs"

function Showcase({ slug, children }: { slug: string; children: ReactNode }) {
  const spec = getComponentCaseSpec(slug)
  if (!spec) return <>{children}</>
  return (
    <ComponentCaseDocs
      spec={spec}
      playground={<ComponentPlayground slug={slug} />}
      examples={children}
    />
  )
}

const SHOWCASES: Record<string, ReactNode> = {
  button: (
    <Showcase slug="button">
      <ComponentCaseGroup title="Variant">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="default" tags={["variant: default", "primary"]}>
            <Button>Label</Button>
          </ComponentCase>
          <ComponentCase label="secondary" tags={["variant: secondary"]}>
            <Button variant="secondary">Label</Button>
          </ComponentCase>
          <ComponentCase label="destructive" tags={["variant: destructive"]}>
            <Button variant="destructive">Label</Button>
          </ComponentCase>
          <ComponentCase label="outline" tags={["variant: outline"]}>
            <Button variant="outline">Label</Button>
          </ComponentCase>
          <ComponentCase label="ghost" tags={["variant: ghost"]}>
            <Button variant="ghost">Label</Button>
          </ComponentCase>
          <ComponentCase label="link" tags={["variant: link"]}>
            <Button variant="link">Label</Button>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Size">
        <ComponentCaseGrid columns={3}>
          {CONTROL_SIZE_SCALE.map((token) => {
            const meta = controlCaseMeta(token.api)
            return (
              <ComponentCase key={token.api} label={meta.label} tags={meta.tags}>
                <Button size={token.api as "default"}>Label</Button>
              </ComponentCase>
            )
          })}
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Icon only">
        <ComponentCaseGrid columns={3}>
          {CONTROL_ICON_SIZE_SCALE.map((token) => {
            const meta = controlCaseMeta(token.api)
            return (
              <ComponentCase key={token.api} label={meta.label} tags={meta.tags}>
                <Button
                  size={token.api as "icon"}
                  variant="outline"
                  aria-label="굵게"
                >
                  <Icon
                    icon={ICONS.formatBold}
                    size={iconButtonSizeToIconGlyph(token.api)}
                  />
                </Button>
              </ComponentCase>
            )
          })}
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="State">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="default" tags={["disabled: false"]}>
            <Button>활성</Button>
          </ComponentCase>
          <ComponentCase label="disabled" tags={["disabled: true"]}>
            <Button disabled>비활성</Button>
          </ComponentCase>
          <ComponentCase label="error" tags={["aria-invalid: true"]}>
            <Button aria-invalid>오류</Button>
          </ComponentCase>
          <ComponentCase label="expanded" tags={["aria-expanded: true"]}>
            <Button variant="outline" aria-expanded>
              열림
            </Button>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  "button-group": (
    <Showcase slug="button-group">
      <ComponentCaseGroup title="Orientation">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="horizontal" tags={["orientation: horizontal"]}>
            <ButtonGroup>
              <Button variant="outline">왼쪽</Button>
              <Button variant="outline">가운데</Button>
              <Button variant="outline">오른쪽</Button>
            </ButtonGroup>
          </ComponentCase>
          <ComponentCase label="vertical" tags={["orientation: vertical"]}>
            <ButtonGroup orientation="vertical">
              <Button variant="outline">위</Button>
              <Button variant="outline">중간</Button>
              <Button variant="outline">아래</Button>
            </ButtonGroup>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Composition">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="icon toolbar" tags={["variant: outline"]}>
            <ButtonGroup>
              <Button size="icon" variant="outline" aria-label="굵게">
                <Icon icon={ICONS.formatBold} size="md" />
              </Button>
              <Button size="icon" variant="outline" aria-label="기울임">
                <Icon icon={ICONS.formatItalic} size="md" />
              </Button>
              <Button size="icon" variant="outline" aria-label="밑줄">
                <Icon icon={ICONS.formatUnderlined} size="md" />
              </Button>
            </ButtonGroup>
          </ComponentCase>
          <ComponentCase label="with separator">
            <ButtonGroup>
              <Button variant="secondary">복사</Button>
              <ButtonGroupSeparator />
              <Button variant="secondary">붙여넣기</Button>
            </ButtonGroup>
          </ComponentCase>
          <ComponentCase label="with text label">
            <ButtonGroup>
              <ButtonGroupText>https://</ButtonGroupText>
              <Input className="w-40" placeholder="example.com" />
            </ButtonGroup>
          </ComponentCase>
          <ComponentCase label="primary + outline">
            <ButtonGroup>
              <Button>저장</Button>
              <Button variant="outline">취소</Button>
            </ButtonGroup>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Size">
        <ComponentCaseGrid columns={3}>
          {(["sm", "default", "lg"] as const).map((size) => {
            const meta = controlCaseMeta(size)
            return (
              <ComponentCase key={size} label={meta.label} tags={meta.tags}>
                <ButtonGroup>
                  <Button
                    size={size === "default" ? "default" : size}
                    variant="outline"
                  >
                    이전
                  </Button>
                  <Button
                    size={size === "default" ? "default" : size}
                    variant="outline"
                  >
                    다음
                  </Button>
                </ButtonGroup>
              </ComponentCase>
            )
          })}
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  toggle: (
    <Showcase slug="toggle">
      <ComponentCaseGroup title="Variant">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="default" tags={["variant: default"]}>
            <Toggle aria-label="굵게">
              <Icon icon={ICONS.formatBold} size="md" />
            </Toggle>
          </ComponentCase>
          <ComponentCase label="outline" tags={["variant: outline"]}>
            <Toggle variant="outline" aria-label="기울임">
              <Icon icon={ICONS.formatItalic} size="md" />
            </Toggle>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="Size">
        <ComponentCaseGrid columns={3}>
          {(["sm", "default", "lg", "xl", "2xl"] as const).map((size) => {
            const meta = controlCaseMeta(size)
            return (
              <ComponentCase key={size} label={meta.label} tags={meta.tags}>
                <Toggle
                  size={size}
                  variant="outline"
                  aria-label="굵게"
                >
                  <Icon icon={ICONS.formatBold} size={controlSizeToIconGlyph(size)} />
                </Toggle>
              </ComponentCase>
            )
          })}
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="State">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="off" tags={["pressed: false"]}>
            <Toggle variant="outline">꺼짐</Toggle>
          </ComponentCase>
          <ComponentCase label="on" tags={["pressed: true"]}>
            <Toggle defaultPressed variant="outline">
              켜짐
            </Toggle>
          </ComponentCase>
          <ComponentCase label="disabled" tags={["disabled: true"]}>
            <Toggle disabled variant="outline">
              비활성
            </Toggle>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  input: (
    <Showcase slug="input">
      <ComponentCaseGroup title="Size">
        <ComponentCaseGrid columns={3}>
          {(["sm", "default", "lg", "xl", "2xl"] as const).map((size) => {
            const meta = controlCaseMeta(size)
            return (
              <ComponentCase key={size} label={meta.label} tags={meta.tags}>
                <Input className="max-w-xs" size={size} placeholder="입력하세요" />
              </ComponentCase>
            )
          })}
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="Hypertext">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="없음" tags={["hypertext: false"]}>
            <InputGroup className="max-w-xs">
              <Input placeholder="입력하세요" />
            </InputGroup>
          </ComponentCase>
          <ComponentCase label="있음" tags={["hypertext: true"]}>
            <InputGroup className="max-w-xs">
              <Input placeholder="입력하세요" />
              <InputHypertext>8자 이상 입력해 주세요.</InputHypertext>
            </InputGroup>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="State">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="default" tags={["md_h36"]}>
            <Input className="max-w-xs" defaultValue="입력값" />
          </ComponentCase>
          <ComponentCase label="disabled" tags={["md_h36", "disabled"]}>
            <Input className="max-w-xs" disabled placeholder="비활성" />
          </ComponentCase>
          <ComponentCase label="error" tags={["md_h36", "aria-invalid"]}>
            <InputGroup className="max-w-xs">
              <Input aria-invalid placeholder="오류" />
              <InputHypertext>올바른 형식으로 입력해 주세요.</InputHypertext>
            </InputGroup>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  label: (
    <Showcase slug="label">
      <ComponentCaseGroup title="Usage">
        <ComponentCase label="sm_14_20" tags={["text-sm", "14/20px", "htmlFor: field-id"]}>
          <InputGroup className="max-w-xs">
            <Label htmlFor="field-id">이름</Label>
            <Input id="field-id" placeholder="입력" />
            <InputHypertext>실명을 입력해 주세요.</InputHypertext>
          </InputGroup>
        </ComponentCase>
      </ComponentCaseGroup>
    </Showcase>
  ),

  textarea: (
    <Showcase slug="textarea">
      <ComponentCaseGroup title="Default">
        <ComponentCase label="rows=3" tags={["rows: 3", "text-sm", "14/20px"]}>
          <Textarea className="max-w-md" placeholder="여러 줄 입력" rows={3} />
        </ComponentCase>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="State">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="disabled" tags={["disabled: true"]}>
            <Textarea className="max-w-md" disabled placeholder="비활성" rows={2} />
          </ComponentCase>
          <ComponentCase label="error" tags={["aria-invalid: true"]}>
            <Textarea className="max-w-md" aria-invalid placeholder="오류" rows={2} />
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  select: (
    <Showcase slug="select">
      <ComponentCaseGroup title="Size">
        <ComponentCaseGrid columns={3}>
          {(["sm", "default", "lg", "xl", "2xl"] as const).map((size) => {
            const meta = controlCaseMeta(size)
            return (
              <ComponentCase key={size} label={meta.label} tags={meta.tags}>
                <Select>
                  <SelectTrigger size={size} className="w-full max-w-xs">
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">옵션 A</SelectItem>
                    <SelectItem value="b">옵션 B</SelectItem>
                  </SelectContent>
                </Select>
              </ComponentCase>
            )
          })}
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="State">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="error" tags={["aria-invalid: true"]}>
            <Select>
              <SelectTrigger className="w-full max-w-xs" aria-invalid>
                <SelectValue placeholder="오류" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">옵션 A</SelectItem>
              </SelectContent>
            </Select>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  checkbox: (
    <Showcase slug="checkbox">
      <ComponentCaseGroup title="State">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="16px" tags={["size-4", "16px", "icon: sm_14"]}>
            <div className="flex items-center gap-2">
              <Checkbox id="c-off" />
              <Label htmlFor="c-off">미선택</Label>
            </div>
          </ComponentCase>
          <ComponentCase label="checked · 16px" tags={["checked: true", "16px"]}>
            <div className="flex items-center gap-2">
              <Checkbox id="c-on" defaultChecked />
              <Label htmlFor="c-on">선택</Label>
            </div>
          </ComponentCase>
          <ComponentCase label="disabled · 16px" tags={["disabled: true", "16px"]}>
            <div className="flex items-center gap-2">
              <Checkbox id="c-dis" disabled />
              <Label htmlFor="c-dis">비활성</Label>
            </div>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  switch: (
    <Showcase slug="switch">
      <ComponentCaseGroup title="State">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="off" tags={["checked: false"]}>
            <div className="flex max-w-xs items-center justify-between gap-4">
              <Label htmlFor="sw-off">꺼짐</Label>
              <Switch id="sw-off" />
            </div>
          </ComponentCase>
          <ComponentCase label="on" tags={["checked: true"]}>
            <div className="flex max-w-xs items-center justify-between gap-4">
              <Label htmlFor="sw-on">켜짐</Label>
              <Switch id="sw-on" defaultChecked />
            </div>
          </ComponentCase>
          <ComponentCase label="disabled" tags={["disabled: true"]}>
            <div className="flex max-w-xs items-center justify-between gap-4">
              <Label htmlFor="sw-dis">비활성</Label>
              <Switch id="sw-dis" disabled />
            </div>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  "radio-group": (
    <Showcase slug="radio-group">
      <ComponentCaseGroup title="Selection">
        <ComponentCase label="default" tags={["value: a"]}>
          <RadioGroup defaultValue="a">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="a" id="r-a" />
              <Label htmlFor="r-a">옵션 A</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="b" id="r-b" />
              <Label htmlFor="r-b">옵션 B</Label>
            </div>
          </RadioGroup>
        </ComponentCase>
      </ComponentCaseGroup>
    </Showcase>
  ),

  slider: (
    <Showcase slug="slider">
      <ComponentCaseGroup title="Value">
        <ComponentCase label="40%" tags={["value: [40]"]}>
          <Slider className="max-w-md" defaultValue={[40]} max={100} step={1} />
        </ComponentCase>
      </ComponentCaseGroup>
    </Showcase>
  ),

  badge: (
    <Showcase slug="badge">
      <ComponentCaseGroup title="Variant">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="default" tags={["variant: default", "20px", "xs_12_16"]}>
            <Badge>default</Badge>
          </ComponentCase>
          <ComponentCase label="secondary" tags={["variant: secondary", "20px"]}>
            <Badge variant="secondary">secondary</Badge>
          </ComponentCase>
          <ComponentCase label="outline" tags={["variant: outline", "20px"]}>
            <Badge variant="outline">outline</Badge>
          </ComponentCase>
          <ComponentCase label="destructive" tags={["variant: destructive", "20px"]}>
            <Badge variant="destructive">destructive</Badge>
          </ComponentCase>
          <ComponentCase label="ghost" tags={["variant: ghost", "20px"]}>
            <Badge variant="ghost">ghost</Badge>
          </ComponentCase>
          <ComponentCase label="link" tags={["variant: link", "20px"]}>
            <Badge variant="link">link</Badge>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  avatar: (
    <Showcase slug="avatar">
      <ComponentCaseGroup title="Image">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="with image" tags={["image: 있음"]}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
          </ComponentCase>
          <ComponentCase label="fallback" tags={["image: 없음"]}>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="Fallback">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="initials" tags={['variant: default']}>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </ComponentCase>
          <ComponentCase label="icon" tags={['variant: icon']}>
            <Avatar>
              <AvatarIcon icon={ICONS.user} />
            </Avatar>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="Size">
        <ComponentCaseGrid columns={3}>
          {(["sm", "default", "lg"] as const).map((size) => {
            const meta = avatarCaseMeta(size)
            return (
              <ComponentCase key={size} label={meta.label} tags={meta.tags}>
                <Avatar {...(size === "default" ? {} : { "data-size": size })}>
                  <AvatarFallback>{size === "sm" ? "S" : size === "lg" ? "L" : "M"}</AvatarFallback>
                </Avatar>
              </ComponentCase>
            )
          })}
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  card: (
    <Showcase slug="card">
      <ComponentCaseGroup title="Composition">
        <ComponentCase label="header + content">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>카드 제목</CardTitle>
              <CardDescription>카드 설명</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">본문</p>
            </CardContent>
          </Card>
        </ComponentCase>
      </ComponentCaseGroup>
    </Showcase>
  ),

  tabs: (
    <Showcase slug="tabs">
      <ComponentCaseGroup title="Default">
        <ComponentCase label="horizontal" tags={["orientation: horizontal"]}>
          <Tabs defaultValue="tab1" className="max-w-md">
            <TabsList>
              <TabsTrigger value="tab1">탭 1</TabsTrigger>
              <TabsTrigger value="tab2">탭 2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-3 text-sm text-muted-foreground">
              첫 번째 탭
            </TabsContent>
            <TabsContent value="tab2" className="mt-3 text-sm text-muted-foreground">
              두 번째 탭
            </TabsContent>
          </Tabs>
        </ComponentCase>
      </ComponentCaseGroup>
    </Showcase>
  ),

  progress: (
    <Showcase slug="progress">
      <ComponentCaseGroup title="Value">
        <ComponentCase label="60%" tags={["value: 60"]}>
          <Progress className="max-w-md" value={60} />
        </ComponentCase>
      </ComponentCaseGroup>
    </Showcase>
  ),

  skeleton: (
    <Showcase slug="skeleton">
      <ComponentCaseGroup title="Layout">
        <ComponentCase label="text block">
          <div className="max-w-md space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-20 w-full" />
          </div>
        </ComponentCase>
      </ComponentCaseGroup>
    </Showcase>
  ),

  "dropdown-menu": (
    <Showcase slug="dropdown-menu">
      <ComponentCaseGroup title="Default">
        <ComponentCase label="items + separator">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              메뉴
              <Icon icon={ICONS.chevronDown} size="sm" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>계정</DropdownMenuLabel>
                <DropdownMenuItem>프로필</DropdownMenuItem>
                <DropdownMenuItem>설정</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">로그아웃</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ComponentCase>
      </ComponentCaseGroup>
    </Showcase>
  ),

  dialog: (
    <Showcase slug="dialog">
      <ComponentCaseGroup title="Default">
        <ComponentCase label="modal">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              다이얼로그 열기
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>제목</DialogTitle>
                <DialogDescription>설명</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">취소</Button>
                <Button>확인</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ComponentCase>
      </ComponentCaseGroup>
    </Showcase>
  ),

  popover: (
    <Showcase slug="popover">
      <ComponentCaseGroup title="Default">
        <ComponentCase label="with header">
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              팝오버
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64">
              <PopoverHeader>
                <PopoverTitle>팝오버</PopoverTitle>
                <PopoverDescription>트리거 근처 패널</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </ComponentCase>
      </ComponentCaseGroup>
    </Showcase>
  ),

  tooltip: (
    <Showcase slug="tooltip">
      <ComponentCaseGroup title="Default">
        <ComponentCase label="hover">
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              툴팁
            </TooltipTrigger>
            <TooltipContent>짧은 설명</TooltipContent>
          </Tooltip>
        </ComponentCase>
      </ComponentCaseGroup>
    </Showcase>
  ),

  accordion: (
    <Showcase slug="accordion">
      <ComponentCaseGroup title="Multiple sections">
        <ComponentCase label="default open" tags={["defaultValue: item-1"]}>
          <Accordion defaultValue={["item-1"]} className="max-w-md">
            <AccordionItem value="item-1">
              <AccordionTrigger>섹션 1</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                펼침 콘텐츠
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>섹션 2</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                접힘 콘텐츠
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ComponentCase>
      </ComponentCaseGroup>
    </Showcase>
  ),

  alert: (
    <Showcase slug="alert">
      <ComponentCaseGroup title="Default">
        <ComponentCase label="with icon">
          <Alert>
            <Icon icon={ICONS.info} size="md" />
            <AlertTitle>알림</AlertTitle>
            <AlertDescription>인라인 피드백 메시지</AlertDescription>
          </Alert>
        </ComponentCase>
      </ComponentCaseGroup>
    </Showcase>
  ),

  sonner: (
    <Showcase slug="sonner">
      <ComponentCaseGroup title="Type">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="default" tags={["type: default"]}>
            <Button variant="outline" onClick={() => toast("기본 토스트")}>
              기본
            </Button>
          </ComponentCase>
          <ComponentCase label="success" tags={["type: success"]}>
            <Button variant="outline" onClick={() => toast.success("저장됨")}>
              success
            </Button>
          </ComponentCase>
          <ComponentCase label="error" tags={["type: error"]}>
            <Button variant="outline" onClick={() => toast.error("오류")}>
              error
            </Button>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  separator: (
    <Showcase slug="separator">
      <ComponentCaseGroup title="Orientation">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="horizontal" tags={["orientation: horizontal"]}>
            <div className="w-full max-w-xs space-y-3">
              <p className="text-sm">위</p>
              <Separator />
              <p className="text-sm">아래</p>
            </div>
          </ComponentCase>
          <ComponentCase label="vertical" tags={["orientation: vertical"]}>
            <div className="flex h-12 items-center gap-4">
              <span className="text-sm">왼쪽</span>
              <Separator orientation="vertical" />
              <span className="text-sm">오른쪽</span>
            </div>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),
}

export function ComponentShowcase({ slug }: { slug: string }) {
  const showcase = SHOWCASES[slug]
  if (!showcase) return null
  return showcase
}

export function componentShowcaseSlugs() {
  return Object.keys(SHOWCASES)
}
