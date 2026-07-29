"use client"

import { ICONS } from "@/components/icons"
import { Icon } from "design-system/ui/icon"
import { toast } from "sonner"
import { type ReactNode, useState } from "react"

import { DialogFooterActionsPreview } from "@/components/docs/dialog-footer-actions"

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
import { Checkbox } from "design-system/ui/checkbox"
import { Chip, ChipGroup } from "design-system/ui/chip"
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
import { EmailInput } from "design-system/ui/email-input"
import { PasswordInput } from "design-system/ui/password-input"
import { FileInput } from "design-system/ui/file-input"
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
          <ComponentCase label="default · neutral" tags={["solid", "tone: neutral"]}>
            <Button>Label</Button>
          </ComponentCase>
          <ComponentCase label="default · brand" tags={["solid", "tone: brand"]}>
            <Button tone="brand">Label</Button>
          </ComponentCase>
          <ComponentCase label="secondary" tags={["variant: secondary"]}>
            <Button variant="secondary">Label</Button>
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

      <ComponentCaseGroup title="Tone × Variant">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="default · success" tags={["solid"]}>
            <Button tone="success">Label</Button>
          </ComponentCase>
          <ComponentCase label="secondary · brand" tags={["soft"]}>
            <Button variant="secondary" tone="brand">
              Label
            </Button>
          </ComponentCase>
          <ComponentCase label="outline · success" tags={["outline"]}>
            <Button variant="outline" tone="success">
              Label
            </Button>
          </ComponentCase>
          <ComponentCase label="outline · warning" tags={["outline"]}>
            <Button variant="outline" tone="warning">
              Label
            </Button>
          </ComponentCase>
          <ComponentCase label="ghost · destructive" tags={["ghost"]}>
            <Button variant="ghost" tone="destructive">
              Label
            </Button>
          </ComponentCase>
          <ComponentCase label="link · success" tags={["link"]}>
            <Button variant="link" tone="success">
              Label
            </Button>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Hover (snapshot)">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="outline → accent" tags={["hover", "accent"]}>
            <Button variant="outline" data-hovered>
              Label
            </Button>
          </ComponentCase>
          <ComponentCase label="secondary → accent" tags={["hover", "accent"]}>
            <Button variant="secondary" data-hovered>
              Label
            </Button>
          </ComponentCase>
          <ComponentCase label="default → inverse-muted/80" tags={["hover", "inverse-muted/80"]}>
            <Button variant="default" data-hovered>
              Label
            </Button>
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

      <ComponentCaseGroup title="Shape">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="square" tags={["shape: square"]}>
            <ButtonGroup shape="square">
              <Button variant="outline">왼쪽</Button>
              <Button variant="outline">가운데</Button>
              <Button variant="outline">오른쪽</Button>
            </ButtonGroup>
          </ComponentCase>
          <ComponentCase label="circle" tags={["shape: circle"]}>
            <ButtonGroup shape="circle">
              <Button variant="outline">왼쪽</Button>
              <Button variant="outline">가운데</Button>
              <Button variant="outline">오른쪽</Button>
            </ButtonGroup>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Grouping">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="icon toolbar" tags={["Buttons"]}>
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
          <ComponentCase label="tone mix" tags={["Buttons"]}>
            <ButtonGroup>
              <Button tone="brand">저장</Button>
              <Button variant="outline">취소</Button>
            </ButtonGroup>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Composition (부가 슬롯)">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="with separator" tags={["composition"]}>
            <ButtonGroup>
              <Button variant="secondary">복사</Button>
              <ButtonGroupSeparator />
              <Button variant="secondary">붙여넣기</Button>
            </ButtonGroup>
          </ComponentCase>
          <ComponentCase label="with text label" tags={["composition"]}>
            <ButtonGroup>
              <Button variant="outline">이전</Button>
              <ButtonGroupSeparator />
              <ButtonGroupText>1 / 3</ButtonGroupText>
              <ButtonGroupSeparator />
              <Button variant="outline">다음</Button>
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
      <ComponentCaseGroup title="Hover (snapshot)">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="default → accent" tags={["hover", "accent"]}>
            <Toggle data-hovered aria-label="굵게">
              <Icon icon={ICONS.formatBold} size="md" />
            </Toggle>
          </ComponentCase>
          <ComponentCase label="outline → accent" tags={["hover", "accent"]}>
            <Toggle variant="outline" data-hovered aria-label="기울임">
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
      <ComponentCaseGroup title="Variant × Pressed">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="fill" tags={["variant: fill", "표현"]}>
            <Chip variant="fill">미선택</Chip>
            <Chip variant="fill" defaultPressed>
              선택
            </Chip>
          </ComponentCase>
          <ComponentCase label="outline" tags={["variant: outline"]}>
            <Chip variant="outline">미선택</Chip>
            <Chip variant="outline" defaultPressed>
              선택
            </Chip>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="Hover (snapshot · off)">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="fill → muted" tags={["hover", "muted"]}>
            <Chip variant="fill" data-hovered>
              미선택
            </Chip>
          </ComponentCase>
          <ComponentCase label="outline → muted" tags={["hover", "muted"]}>
            <Chip variant="outline" data-hovered>
              미선택
            </Chip>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Size">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="sm_h32" tags={["size: sm"]}>
            <Chip variant="fill" size="sm">
              작게
            </Chip>
            <Chip variant="fill" size="sm" defaultPressed>
              선택
            </Chip>
          </ComponentCase>
          <ComponentCase label="md_h36" tags={["size: default"]}>
            <Chip variant="fill">기본</Chip>
            <Chip variant="fill" defaultPressed>
              선택
            </Chip>
          </ComponentCase>
          <ComponentCase label="xl_h40" tags={["size: xl"]}>
            <Chip variant="fill" size="xl">
              크게
            </Chip>
            <Chip variant="fill" size="xl" defaultPressed>
              선택
            </Chip>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Shape">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="circle" tags={["shape: circle", "rounded-full"]}>
            <Chip variant="outline" shape="circle">
              전자제품
            </Chip>
            <Chip variant="outline" shape="circle" defaultPressed>
              선택
            </Chip>
          </ComponentCase>
          <ComponentCase label="square" tags={["shape: square", "rounded-md"]}>
            <Chip variant="outline" shape="square">
              전자제품
            </Chip>
            <Chip variant="outline" shape="square" defaultPressed>
              선택
            </Chip>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="State">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="off" tags={["pressed: false"]}>
            <Chip variant="outline">미선택</Chip>
          </ComponentCase>
          <ComponentCase label="on" tags={["pressed: true", "variant: outline"]}>
            <Chip variant="outline" defaultPressed>
              선택
            </Chip>
          </ComponentCase>
          <ComponentCase label="disabled" tags={["disabled: true"]}>
            <Chip variant="outline" disabled>
              비활성
            </Chip>
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
              <Chip variant="outline" value="전자제품">
                전자제품
              </Chip>
              <Chip variant="outline" value="의류">
                의류
              </Chip>
              <Chip variant="outline" value="식품">
                식품
              </Chip>
            </ChipGroup>
          </ComponentCase>
          <ComponentCase label="single" tags={["multiple: false", "choice chip"]}>
            <ChipGroup defaultValue={["최신순"]}>
              <Chip variant="outline" value="최신순">
                최신순
              </Chip>
              <Chip variant="outline" value="인기순">
                인기순
              </Chip>
              <Chip variant="outline" value="가격순">
                가격순
              </Chip>
            </ChipGroup>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Removable (Input chip)">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="leading icon + remove">
            <Chip variant="outline" onRemove={() => toast("삭제: 디자인")}>
              <Icon icon={ICONS.user} />
              디자인
            </Chip>
            <Chip variant="outline" onRemove={() => toast("삭제: 개발")}>
              개발
            </Chip>
          </ComponentCase>
          <ComponentCase label="fill + remove">
            <Chip variant="fill" size="sm" onRemove={() => toast("삭제: 태그")}>
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
      <ComponentCaseGroup title="Type">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="email" tags={["type: email", "EmailInput"]}>
            <EmailInput className="max-w-xs" placeholder="name@example.com" />
          </ComponentCase>
          <ComponentCase label="password" tags={["type: password", "PasswordInput"]}>
            <PasswordInput className="max-w-xs" placeholder="비밀번호" defaultValue="password" />
          </ComponentCase>
          <ComponentCase label="file" tags={["type: file", "FileInput"]}>
            <FileInput className="max-w-xs" />
          </ComponentCase>
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
      <ComponentCaseGroup title="Label">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="기본" tags={["Label", "text-sm", "font-medium"]}>
            <Label>라벨</Label>
          </ComponentCase>
          <ComponentCase label="htmlFor" tags={["Label", "Input", "htmlFor"]}>
            <div className="flex w-full max-w-xs flex-col gap-2">
              <Label htmlFor="label-demo-input">이메일</Label>
              <Input id="label-demo-input" placeholder="name@example.com" />
            </div>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

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
          <div className="grid w-full max-w-md grid-cols-[auto,1fr] items-start gap-4">
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
          <InputGroup className="max-w-xs gap-4">
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
      <ComponentCaseGroup title="Hover (snapshot)">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="trigger → accent" tags={["hover", "accent"]}>
            <Select>
              <SelectTrigger className="w-full max-w-xs" data-hovered>
                <SelectValue placeholder="선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">옵션 A</SelectItem>
              </SelectContent>
            </Select>
          </ComponentCase>
          <ComponentCase label="item focus → accent" tags={["focus", "accent"]}>
            <Select>
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="항목 포커스 확인" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a" data-hovered>
                  옵션 A
                </SelectItem>
              </SelectContent>
            </Select>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
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
      <ComponentCaseGroup title="Size">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="default_h20" tags={["size: default"]}>
            <Checkbox size="default" defaultChecked aria-label="옵션" />
          </ComponentCase>
          <ComponentCase label="md_h24" tags={["size: md"]}>
            <Checkbox size="md" defaultChecked aria-label="옵션" />
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="State">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="unchecked" tags={["checked: false"]}>
            <Checkbox aria-label="옵션" />
          </ComponentCase>
          <ComponentCase label="checked" tags={["checked: true"]}>
            <Checkbox defaultChecked aria-label="옵션" />
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="Composition">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="default" tags={["type: default", "aria-label"]}>
            <Checkbox defaultChecked aria-label="옵션" />
          </ComponentCase>
          <ComponentCase label="with text" tags={["type: withText", "Label"]}>
            <Label className="flex cursor-pointer items-center gap-2">
              <Checkbox defaultChecked />
              옵션
            </Label>
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
      <ComponentCaseGroup title="Composition (Label)">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="control only" tags={["composition"]}>
            <Switch aria-label="알림" />
          </ComponentCase>
          <ComponentCase label="with Label" tags={["composition", "Label"]}>
            <div className="flex max-w-xs items-center justify-between gap-4">
              <Label htmlFor="sw-label">알림</Label>
              <Switch id="sw-label" />
            </div>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  "radio-group": (
    <Showcase slug="radio-group">
      <ComponentCaseGroup title="Size">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="default_h20" tags={["size: default"]}>
            <RadioGroup defaultValue="on" size="default">
              <RadioGroupItem value="on" aria-label="옵션" />
            </RadioGroup>
          </ComponentCase>
          <ComponentCase label="md_h24" tags={["size: md"]}>
            <RadioGroup defaultValue="on" size="md">
              <RadioGroupItem value="on" aria-label="옵션" />
            </RadioGroup>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="State">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="unchecked" tags={["checked: false"]}>
            <RadioGroup value={null}>
              <RadioGroupItem value="on" aria-label="옵션" />
            </RadioGroup>
          </ComponentCase>
          <ComponentCase label="checked" tags={["checked: true"]}>
            <RadioGroup defaultValue="on">
              <RadioGroupItem value="on" aria-label="옵션" />
            </RadioGroup>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="Composition">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="default" tags={["type: default", "aria-label"]}>
            <RadioGroup defaultValue="on">
              <RadioGroupItem value="on" aria-label="옵션" />
            </RadioGroup>
          </ComponentCase>
          <ComponentCase label="with text" tags={["type: withText", "Label"]}>
            <RadioGroup defaultValue="on">
              <Label className="flex cursor-pointer items-center gap-2">
                <RadioGroupItem value="on" />
                옵션
              </Label>
            </RadioGroup>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  slider: (
    <Showcase slug="slider">
      <ComponentCaseGroup title="Type">
        <ComponentCase label="default" tags={["type: default", "value: 40"]}>
          <Slider className="max-w-md" type="default" defaultValue={[40]} max={100} step={1} />
        </ComponentCase>
        <ComponentCase label="range" tags={["type: range", "value: [25, 75]"]}>
          <Slider className="max-w-md" type="range" defaultValue={[25, 75]} max={100} step={1} />
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
          <ComponentCase label="ghost" tags={["variant: ghost", "h20"]}>
            <Badge variant="ghost">ghost</Badge>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Status">
        <ComponentCaseGrid columns={4}>
          <ComponentCase label="default" tags={["status: default", "무톤"]}>
            <Badge>default</Badge>
          </ComponentCase>
          <ComponentCase label="success" tags={["status: success"]}>
            <Badge status="success">success</Badge>
          </ComponentCase>
          <ComponentCase label="warning" tags={["status: warning"]}>
            <Badge status="warning">warning</Badge>
          </ComponentCase>
          <ComponentCase label="destructive" tags={["status: destructive"]}>
            <Badge status="destructive">destructive</Badge>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="Hover (snapshot)">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="ghost → accent" tags={["hover", "accent"]}>
            <Badge variant="ghost" data-hovered>
              ghost
            </Badge>
          </ComponentCase>
          <ComponentCase label="outline link → accent" tags={["hover", "accent"]}>
            <Badge
              variant="outline"
              render={<a href="#" data-hovered onClick={(event) => event.preventDefault()} />}
            >
              outline-link
            </Badge>
          </ComponentCase>
          <ComponentCase label="secondary link → secondary/80" tags={["hover", "secondary/80"]}>
            <Badge
              variant="secondary"
              render={<a href="#" data-hovered onClick={(event) => event.preventDefault()} />}
            >
              secondary-link
            </Badge>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Size">
        <ComponentCaseGrid columns={4}>
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
      <ComponentCaseGroup title="Composition (슬롯)">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="AvatarImage" tags={["composition"]}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
          </ComponentCase>
          <ComponentCase label="AvatarFallback" tags={["composition"]}>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </ComponentCase>
          <ComponentCase label="AvatarIcon" tags={["composition"]}>
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
      <ComponentCaseGroup title="Hover (snapshot)">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="default variant → muted" tags={["hover", "muted"]}>
            <Tabs defaultValue="series" className="max-w-md">
              <TabsList>
                <TabsTrigger value="series">시리즈</TabsTrigger>
                <TabsTrigger value="character" data-hovered>
                  캐릭터
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentCase>
          <ComponentCase label="line variant → muted" tags={["hover", "muted"]}>
            <Tabs defaultValue="tab1" className="max-w-md">
              <TabsList variant="line">
                <TabsTrigger value="tab1">탭 1</TabsTrigger>
                <TabsTrigger value="tab2" data-hovered>
                  탭 2
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </ComponentCase>
          <ComponentCase label="text variant → muted" tags={["hover", "muted"]}>
            <Tabs defaultValue="users" className="max-w-md">
              <TabsList variant="text">
                <TabsTrigger value="content">콘텐츠</TabsTrigger>
                <TabsTrigger value="users" data-hovered>
                  이용자
                </TabsTrigger>
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
      <ComponentCaseGroup title="Trigger">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="label + chevron" tags={["Button · outline"]}>
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
            tags={["Button · outline"]}
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
      <ComponentCaseGroup title="Composition — Item 슬롯">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="leading icon" tags={["composition", "Icon"]}>
            <DropdownMenuLeadingIconDemo />
          </ComponentCase>
          <ComponentCase label="shortcut" tags={["composition", "Shortcut"]}>
            <DropdownMenuShortcutDemo />
          </ComponentCase>
          <ComponentCase label="submenu" tags={["composition", "Sub"]}>
            <DropdownMenuSubmenuDemo />
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Composition — Selection">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="single-select" tags={["composition", "RadioItem"]}>
            <DropdownMenuSingleSelectDemo />
          </ComponentCase>
          <ComponentCase label="multi-select" tags={["composition", "CheckboxItem"]}>
            <DropdownMenuMultiSelectDemo />
          </ComponentCase>
          <ComponentCase label="icon + select" tags={["leading-icon · RadioItem"]}>
            <DropdownMenuLeadingIconSelectDemo />
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="Hover (snapshot)">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="default item → accent" tags={["hover", "accent"]}>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                메뉴
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem data-hovered>프로필</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentCase>
          <ComponentCase label="destructive item → destructive/10" tags={["hover", "destructive"]}>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                메뉴
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem variant="destructive" data-hovered>
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  dialog: (
    <Showcase slug="dialog">
      <ComponentCaseGroup title="Shell">
        <ComponentCaseGrid columns={2}>
          <ComponentCase
            label="default"
            tags={["Header", "Content 슬롯", "Footer"]}
            flush
          >
            <DialogFooterActionsPreview
              showHeader
              showContent
              customContent
              showBodyText={false}
              footerActions="2"
            />
          </ComponentCase>
          <ComponentCase
            label="header 없음"
            tags={["Content 슬롯", "Footer"]}
            flush
          >
            <DialogFooterActionsPreview
              showHeader={false}
              showContent
              customContent
              showBodyText={false}
              footerActions="2"
            />
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Content 패턴">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="본문" tags={["텍스트"]} flush>
            <DialogFooterActionsPreview
              showContent
              showBodyText
              bodyText="이 작업을 진행할까요? 실행 후에는 되돌릴 수 없어요."
              footerActions="2"
            />
          </ComponentCase>
          <ComponentCase label="목록" tags={["안내 리스트"]} flush>
            <DialogFooterActionsPreview
              showContent
              showBodyText={false}
              showList
              listStyle="muted"
              footerActions="2"
            />
          </ComponentCase>
          <ComponentCase label="동의" tags={["체크박스"]} flush>
            <DialogFooterActionsPreview
              showContent
              showBodyText={false}
              showConsent
              consentText="운영정책에 동의합니다."
              footerActions="2"
            />
          </ComponentCase>
          <ComponentCase label="확인 입력" tags={["문구 입력"]} flush>
            <DialogFooterActionsPreview
              showContent
              showBodyText={false}
              showConfirmInput
              confirmPhrase="확인했습니다"
              footerActions="2"
            />
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>

      <ComponentCaseGroup title="Footer">
        <ComponentCaseGrid columns={3}>
          <ComponentCase label="확인" tags={["1"]} flush>
            <DialogFooterActionsPreview
              footerActions="1"
              customContent
              showBodyText={false}
            />
          </ComponentCase>
          <ComponentCase label="취소 + 확인" tags={["2"]} flush>
            <DialogFooterActionsPreview
              footerActions="2"
              customContent
              showBodyText={false}
            />
          </ComponentCase>
          <ComponentCase label="3-way" tags={["3"]} flush>
            <DialogFooterActionsPreview
              footerActions="3"
              customContent
              showBodyText={false}
              footerStack
            />
          </ComponentCase>
        </ComponentCaseGrid>
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
        <ComponentCase label="removable" tags={["removable: true"]}>
          <Tooltip removable>
            <TooltipTrigger render={<Button variant="outline" />}>
              툴팁
            </TooltipTrigger>
            <TooltipContent>닫기 전까지 유지되는 도움말</TooltipContent>
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
      <ComponentCaseGroup title="Layout">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="default" tags={["type: default", "세로 스택"]}>
            <Alert type="default">
              <AlertTitle>알림</AlertTitle>
              <AlertDescription>아이콘 없는 인라인 메시지</AlertDescription>
            </Alert>
          </ComponentCase>
          <ComponentCase label="icon" tags={["type: icon", "선행 아이콘"]}>
            <Alert type="icon">
              <AlertTitle>알림</AlertTitle>
              <AlertDescription>아이콘이 포함된 메시지</AlertDescription>
            </Alert>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="Status">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="default" tags={["status: default"]}>
            <Alert type="icon">
              <AlertTitle>알림</AlertTitle>
              <AlertDescription>기본 카드 톤</AlertDescription>
            </Alert>
          </ComponentCase>
          <ComponentCase label="success" tags={["status: success"]}>
            <Alert status="success" type="icon">
              <AlertTitle>완료</AlertTitle>
              <AlertDescription>작업이 성공했어요</AlertDescription>
            </Alert>
          </ComponentCase>
          <ComponentCase label="warning" tags={["status: warning"]}>
            <Alert status="warning" type="icon">
              <AlertTitle>주의</AlertTitle>
              <AlertDescription>확인이 필요해요</AlertDescription>
            </Alert>
          </ComponentCase>
          <ComponentCase label="destructive" tags={["status: destructive"]}>
            <Alert status="destructive" type="icon">
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>문제가 발생했어요</AlertDescription>
            </Alert>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
      <ComponentCaseGroup title="Removable">
        <ComponentCaseGrid columns={2}>
          <ComponentCase label="manual" tags={["removable: true"]}>
            <Alert type="icon" removable>
              <AlertTitle>닫을 수 있는 알림</AlertTitle>
              <AlertDescription>✕ 버튼으로 닫습니다</AlertDescription>
            </Alert>
          </ComponentCase>
          <ComponentCase
            label="auto"
            tags={["removable: true", "duration: 5000"]}
          >
            <Alert type="icon" removable duration={5000}>
              <AlertTitle>자동 닫힘</AlertTitle>
              <AlertDescription>5초 후 또는 ✕로 닫힙니다</AlertDescription>
            </Alert>
          </ComponentCase>
        </ComponentCaseGrid>
      </ComponentCaseGroup>
    </Showcase>
  ),

  sonner: (
    <Showcase slug="sonner">
      <ComponentCaseGroup title="Status (toast.type)">
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

}

export function ComponentShowcase({ slug }: { slug: string }) {
  const showcase = SHOWCASES[slug]
  if (!showcase) return null
  return showcase
}

export function getComponentShowcaseSlugs() {
  return Object.keys(SHOWCASES)
}
