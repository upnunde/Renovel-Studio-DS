"use client"

import { ICONS } from "@/components/icons"
import { Icon } from "design-system/ui/icon"
import { toast } from "sonner"
import { type ReactNode, useState } from "react"

import {
  DropdownMenuLeadingIconDemo,
  DropdownMenuLeadingIconSelectDemo,
  DropdownMenuMultiSelectDemo,
  DropdownMenuShortcutDemo,
  DropdownMenuSingleSelectDemo,
  DropdownMenuSubmenuDemo,
} from "@/components/docs/dropdown-menu-showcases"

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
  CONTROL_FORM_SIZE_APIS,
  TABS_SIZE_APIS,
  controlCaseMeta,
  controlSizeToIconGlyph,
  iconButtonSizeToIconGlyph,
  avatarCaseMeta,
  AVATAR_SIZE_APIS,
  badgeCaseMeta,
  BADGE_SIZE_APIS,
} from "design-system/component-size-tokens"
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
  CardHeader,
  CardTitle,
} from "design-system/ui/card"
import { Checkbox } from "design-system/ui/checkbox"
import { Chip, ChipGroup } from "design-system/ui/chip"
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
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "design-system/ui/dropdown-menu"
import { Input, InputGroup, InputHypertext } from "design-system/ui/input"
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
import { Tabs, TabsList, TabsTrigger } from "design-system/ui/tabs"
import { Textarea } from "design-system/ui/textarea"
import { Toggle } from "design-system/ui/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "design-system/ui/tooltip"
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

const INPUT_HYPERTEXT_COUNT_MAX = 30

function InputHypertextCountDemo() {
  const [value, setValue] = useState("")

  return (
    <InputGroup className="max-w-xs">
      <Input
        value={value}
        maxLength={INPUT_HYPERTEXT_COUNT_MAX}
        onChange={(event) => setValue(event.target.value)}
        placeholder="입력하세요"
      />
      <InputHypertext count={value.length} max={INPUT_HYPERTEXT_COUNT_MAX}>
        8자 이상 입력해 주세요.
      </InputHypertext>
    </InputGroup>
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

      <ComponentCaseGroup title="Shape">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="square" tags={["shape: square", "rounded-md", "md_8"]}>
            <Button shape="square">Label</Button>
          </ComponentCase>
          <ComponentCase label="circle" tags={["shape: circle", "rounded-full"]}>
            <Button shape="circle">Label</Button>
          </ComponentCase>
        </ComponentCaseGrid>
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="icon · circle" tags={["type: icon", "shape: circle"]}>
            <Button shape="circle" size="icon" variant="outline" aria-label="홈">
              <Icon icon={ICONS.home} size={controlSizeToIconGlyph("default")} />
            </Button>
          </ComponentCase>
          <ComponentCase label="icon · square" tags={["type: icon", "shape: square"]}>
            <Button shape="square" size="icon" variant="outline" aria-label="홈">
              <Icon icon={ICONS.home} size={controlSizeToIconGlyph("default")} />
            </Button>
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

      <ComponentCaseGroup title="Leading icon">
        <ComponentCaseGrid columns={3}>
          {(["sm", "default", "lg"] as const).map((size) => {
            const meta = controlCaseMeta(size)
            return (
              <ComponentCase key={size} label={meta.label} tags={meta.tags}>
                <Button size={size === "default" ? "default" : size}>
                  <Icon
                    icon={ICONS.home}
                    size={controlSizeToIconGlyph(size)}
                    position="inline-start"
                  />
                  Label
                </Button>
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
                  aria-label="홈"
                >
                  <Icon
                    icon={ICONS.home}
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
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Menu trigger">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="label + chevron" tags={["variant: outline"]}>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                메뉴
                <Icon
                  icon={ICONS.chevronDown}
                  size={controlSizeToIconGlyph("default")}
                  position="inline-end"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>프로필</DropdownMenuItem>
                <DropdownMenuItem>설정</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentCase>
          <ComponentCase
            label="icon + label + chevron"
            tags={["variant: outline"]}
          >
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                <Icon
                  icon={ICONS.user}
                  size={controlSizeToIconGlyph("default")}
                  position="inline-start"
                />
                계정
                <Icon
                  icon={ICONS.chevronDown}
                  size={controlSizeToIconGlyph("default")}
                  position="inline-end"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>프로필</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">로그아웃</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentCase>
          <ComponentCase label="icon + chevron" tags={["size: sm", "ghost"]}>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="sm" aria-label="홈" />}
              >
                <Icon
                  icon={ICONS.home}
                  size={controlSizeToIconGlyph("sm")}
                  position="inline-start"
                />
                <Icon
                  icon={ICONS.chevronDown}
                  size={controlSizeToIconGlyph("sm")}
                  position="inline-end"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>굵게</DropdownMenuItem>
                <DropdownMenuItem>기울임</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  "button-group": (
    <Showcase slug="button-group">
      <ComponentCaseGroup title="Size">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="default (h36)" tags={["size: default"]}>
            <ButtonGroup>
              <Button variant="outline">왼쪽</Button>
              <Button variant="outline">가운데</Button>
              <Button variant="outline">오른쪽</Button>
            </ButtonGroup>
          </ComponentCase>
          <ComponentCase label="sm (h32)" tags={["size: sm"]}>
            <ButtonGroup size="sm">
              <Button variant="outline">왼쪽</Button>
              <Button variant="outline">가운데</Button>
              <Button variant="outline">오른쪽</Button>
            </ButtonGroup>
          </ComponentCase>
          <ComponentCase label="lg (h42)" tags={["size: lg"]}>
            <ButtonGroup size="lg">
              <Button variant="outline">왼쪽</Button>
              <Button variant="outline">가운데</Button>
              <Button variant="outline">오른쪽</Button>
            </ButtonGroup>
          </ComponentCase>
          <ComponentCase label="2xl (h48)" tags={["size: 2xl"]}>
            <ButtonGroup size="2xl">
              <Button variant="outline">왼쪽</Button>
              <Button variant="outline">가운데</Button>
              <Button variant="outline">오른쪽</Button>
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

      <ComponentCaseGroup title="Button size (개별)">
        <ComponentCaseGrid columns={3}>
          {(["sm", "default", "lg"] as const).map((size) => {
            const meta = controlCaseMeta(size)
            return (
              <ComponentCase key={size} label={meta.label} tags={meta.tags}>
                <ButtonGroup size={size === "default" ? "default" : size}>
                  <Button variant="outline">이전</Button>
                  <Button variant="outline">다음</Button>
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
          {CONTROL_FORM_SIZE_APIS.map((size) => {
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

  chip: (
    <Showcase slug="chip">
      <ComponentCaseGroup title="Variant">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="outline" tags={["variant: outline"]}>
            <Chip>전자제품</Chip>
            <Chip defaultPressed>의류</Chip>
          </ComponentCase>
          <ComponentCase label="subtle" tags={["variant: subtle"]}>
            <Chip variant="subtle">전자제품</Chip>
            <Chip variant="subtle" defaultPressed>
              의류
            </Chip>
          </ComponentCase>
          <ComponentCase label="default" tags={["variant: default", "no icon"]}>
            <Chip variant="default">기본</Chip>
            <Chip variant="default" defaultPressed>
              선택됨
            </Chip>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Size">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="sm" tags={["size: sm", "h28"]}>
            <Chip variant="default" size="sm">
              작게
            </Chip>
            <Chip variant="default" size="sm" defaultPressed>
              선택됨
            </Chip>
          </ComponentCase>
          <ComponentCase label="default" tags={["size: default", "h32"]}>
            <Chip variant="default">기본</Chip>
            <Chip variant="default" defaultPressed>
              선택됨
            </Chip>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="State">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="off" tags={["pressed: false"]}>
            <Chip variant="default">미선택</Chip>
          </ComponentCase>
          <ComponentCase label="on" tags={["pressed: true", "variant: default"]}>
            <Chip variant="default" defaultPressed>
              선택됨
            </Chip>
          </ComponentCase>
          <ComponentCase label="disabled" tags={["disabled: true"]}>
            <Chip disabled>비활성</Chip>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Filter (ChipGroup)">
        <ComponentCaseGrid columns={2}>
          <ComponentCase
            label="multiple"
            tags={["multiple: true", "filter chip"]}
          >
            <ChipGroup multiple defaultValue={["전자제품"]}>
              <Chip value="전자제품">전자제품</Chip>
              <Chip value="의류">의류</Chip>
              <Chip value="식품">식품</Chip>
            </ChipGroup>
          </ComponentCase>
          <ComponentCase label="single" tags={["multiple: false", "choice chip"]}>
            <ChipGroup defaultValue={["최신순"]}>
              <Chip value="최신순">최신순</Chip>
              <Chip value="인기순">인기순</Chip>
              <Chip value="가격순">가격순</Chip>
            </ChipGroup>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Removable (Input chip)">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="leading icon + remove">
            <Chip onRemove={() => toast("삭제: 디자인")}>
              <Icon icon={ICONS.user} />
              디자인
            </Chip>
            <Chip onRemove={() => toast("삭제: 개발")}>개발</Chip>
          </ComponentCase>
          <ComponentCase label="subtle + remove">
            <Chip variant="subtle" size="sm" onRemove={() => toast("삭제: 태그")}>
              태그
            </Chip>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  input: (
    <Showcase slug="input">
      <ComponentCaseGroup title="Size">
        <ComponentCaseGrid columns={3}>
          {CONTROL_FORM_SIZE_APIS.map((size) => {
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
        <ComponentCaseGrid columns={3}>
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
          <ComponentCase label="글자수" tags={["hypertext: true", "count", "max: 30"]}>
            <InputHypertextCountDemo />
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
      <ComponentCaseGroup title="FieldLabel · Size">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="15_700" tags={["size: default", "text-body2_700"]}>
            <FieldLabel htmlFor="field-size-15" size="default">
              타이틀 입력
            </FieldLabel>
          </ComponentCase>
          <ComponentCase label="18_700" tags={["size: lg", "text-heading5_700"]}>
            <FieldLabel htmlFor="field-size-18" size="lg">
              타이틀2 입력
            </FieldLabel>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="FieldLabel · 타이틀">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="기본" tags={["size: default", "text-body2_700", "15/22px", "700"]}>
            <FieldLabel htmlFor="field-title-basic">타이틀 입력</FieldLabel>
          </ComponentCase>
          <ComponentCase label="필수" tags={["size: default", "text-body2_700", "required: true"]}>
            <FieldLabel htmlFor="field-title-required" required>
              타이틀 입력
            </FieldLabel>
          </ComponentCase>
          <ComponentCase label="보조문구" tags={["text-body4_400", "description: 3 lines"]}>
            <FieldLabel
              htmlFor="field-title-desc"
              required
              description={[
                "필요 없는 보조문구는 삭제",
                "필요 없는 보조문구는 삭제",
                "필요 없는 보조문구는 삭제",
              ]}
            >
              타이틀 입력
            </FieldLabel>
          </ComponentCase>
          <ComponentCase
            label="정보 (타이틀2)"
            tags={["size: lg", "text-heading5_700", "text-body4_400", "required: true", "description", "info"]}
          >
            <FieldLabel
              htmlFor="field-title-info"
              size="lg"
              required
              info="필드에 대한 추가 설명입니다."
              description={[
                "필요 없는 보조문구는 삭제",
                "필요 없는 보조문구는 삭제",
                "필요 없는 보조문구는 삭제",
              ]}
            >
              타이틀2 입력
            </FieldLabel>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="FieldLabel · Usage">
        <ComponentCase
          label="settings row"
          tags={["grid-cols-[auto,1fr]", "FieldLabel + Input"]}
        >
          <div className="grid w-full max-w-md grid-cols-[auto,1fr] items-start gap-8">
            <FieldLabel
              htmlFor="field-expression"
              required
              description="다양한 감정을 표현할 수 있는 표정을 여러 장까지 등록해 둘 수 있어요. (최대 10개)"
            >
              표정
            </FieldLabel>
            <Input id="field-expression" placeholder="입력" />
          </div>
        </ComponentCase>
        <ComponentCase label="InputGroup" tags={["FieldLabel", "Input", "InputHypertext"]}>
          <InputGroup className="max-w-xs">
            <FieldLabel
              htmlFor="field-id"
              required
              descriptionId="field-id-label-desc"
              description="필드 위 보조문구"
            >
              이름
            </FieldLabel>
            <Input
              id="field-id"
              placeholder="입력"
              aria-describedby="field-id-label-desc field-id-helper"
              aria-required
            />
            <InputHypertext id="field-id-helper">
              입력 후 아래 도움말과 구분됩니다.
            </InputHypertext>
          </InputGroup>
        </ComponentCase>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Label · primitive">
        <ComponentCase label="inline" tags={["text-sm", "14/20px", "htmlFor"]}>
          <div className="flex items-center gap-2">
            <Checkbox id="field-inline" />
            <Label htmlFor="field-inline">동의합니다</Label>
          </div>
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
          {CONTROL_FORM_SIZE_APIS.map((size) => {
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
          <ComponentCase label="default" tags={["variant: default", "h20"]}>
            <Badge>default</Badge>
          </ComponentCase>
          <ComponentCase label="secondary" tags={["variant: secondary", "h20"]}>
            <Badge variant="secondary">secondary</Badge>
          </ComponentCase>
          <ComponentCase label="outline" tags={["variant: outline", "h20"]}>
            <Badge variant="outline">outline</Badge>
          </ComponentCase>
          <ComponentCase label="destructive" tags={["variant: destructive", "h20"]}>
            <Badge variant="destructive">destructive</Badge>
          </ComponentCase>
          <ComponentCase label="ghost" tags={["variant: ghost", "h20"]}>
            <Badge variant="ghost">ghost</Badge>
          </ComponentCase>
          <ComponentCase label="link" tags={["variant: link", "h20"]}>
            <Badge variant="link">link</Badge>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Size">
        <ComponentCaseGrid columns={3}>
          {BADGE_SIZE_APIS.map((size) => {
            const meta = badgeCaseMeta(size)
            return (
              <ComponentCase key={size} label={meta.label} tags={meta.tags}>
                <Badge {...(size === "default" ? {} : { size })}>Badge</Badge>
              </ComponentCase>
            )
          })}
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Shape">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="circle" tags={["shape: circle", "rounded-full"]}>
            <Badge shape="circle">circle</Badge>
          </ComponentCase>
          <ComponentCase label="square" tags={["shape: square", "rounded-md", "md_8"]}>
            <Badge shape="square">square</Badge>
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
          {AVATAR_SIZE_APIS.map((size) => {
            const meta = avatarCaseMeta(size)
            return (
              <ComponentCase key={size} label={meta.label} tags={meta.tags}>
                <Avatar size={size}>
                  <AvatarFallback>
                    {size === "xs" || size === "sm"
                      ? "S"
                      : size === "5xl" || size === "4xl"
                        ? "XL"
                        : "M"}
                  </AvatarFallback>
                </Avatar>
              </ComponentCase>
            )
          })}
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Profile scale">
        <ComponentCaseGrid columns={3}>
          {(["2xl", "3xl", "4xl", "5xl"] as const).map((size) => {
            const meta = avatarCaseMeta(size)
            return (
              <ComponentCase
                key={size}
                label={meta.label}
                tags={[...meta.tags, "프로필"]}
              >
                <Avatar size={size}>
                  <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                  <AvatarFallback>JD</AvatarFallback>
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
              <p className="text-sm text-foreground-muted">본문</p>
            </CardContent>
          </Card>
        </ComponentCase>
      </ComponentCaseGroup>
    </Showcase>
  ),

  tabs: (
    <Showcase slug="tabs">
      <ComponentCaseGroup title="Default">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="square" tags={["variant: default", "분리형", "rounded-md", "md_8"]}>
            <Tabs defaultValue="series" className="max-w-md">
              <TabsList>
                <TabsTrigger value="series">시리즈</TabsTrigger>
                <TabsTrigger value="character">캐릭터</TabsTrigger>
                <TabsTrigger value="guide">상황공략</TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentCase>
          <ComponentCase label="line" tags={["variant: line"]}>
            <Tabs defaultValue="tab1" className="max-w-md">
              <TabsList variant="line">
                <TabsTrigger value="tab1">탭 1</TabsTrigger>
                <TabsTrigger value="tab2">탭 2</TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentCase>
          <ComponentCase label="text" tags={["variant: text"]}>
            <Tabs defaultValue="users" className="max-w-md">
              <TabsList variant="text">
                <TabsTrigger value="content">콘텐츠</TabsTrigger>
                <TabsTrigger value="users">이용자</TabsTrigger>
                <TabsTrigger value="revenue">수익</TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="Size">
        <ComponentCaseGrid columns={3}>
          {TABS_SIZE_APIS.map((size) => {
            const meta = controlCaseMeta(size)
            return (
              <ComponentCase key={size} label={meta.label} tags={meta.tags}>
                <Tabs defaultValue="tab1" className="max-w-xs">
                  <TabsList size={size}>
                    <TabsTrigger value="tab1">탭 1</TabsTrigger>
                    <TabsTrigger value="tab2">탭 2</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ComponentCase>
            )
          })}
        </ComponentCaseGrid>
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
      <ComponentCaseGroup title="Item">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="leading icon" tags={["Icon · inline-start"]}>
            <DropdownMenuLeadingIconDemo />
          </ComponentCase>
          <ComponentCase label="shortcut" tags={["DropdownMenuShortcut"]}>
            <DropdownMenuShortcutDemo />
          </ComponentCase>
          <ComponentCase label="submenu" tags={["Sub · SubTrigger"]}>
            <DropdownMenuSubmenuDemo />
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Selection">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="single-select" tags={["RadioGroup · RadioItem"]}>
            <DropdownMenuSingleSelectDemo />
          </ComponentCase>
          <ComponentCase label="multi-select" tags={["CheckboxItem"]}>
            <DropdownMenuMultiSelectDemo />
          </ComponentCase>
          <ComponentCase label="icon + select" tags={["leading-icon · RadioItem"]}>
            <DropdownMenuLeadingIconSelectDemo />
          </ComponentCase>
        </ComponentCaseGrid>
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
              <AccordionContent className="text-sm text-foreground-muted">
                펼침 콘텐츠
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>섹션 2</AccordionTrigger>
              <AccordionContent className="text-sm text-foreground-muted">
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
