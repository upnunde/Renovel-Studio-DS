"use client"

import { useState } from "react"

import { ICONS } from "@/components/icons"
import { Button } from "design-system/ui/button"
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
import { controlSizeToIconGlyph } from "design-system/component-size-tokens"

function MenuTrigger({ label = "메뉴" }: { label?: string }) {
  return (
    <DropdownMenuTrigger render={<Button variant="outline" />}>
      {label}
      <Icon
        icon={ICONS.chevronDown}
        size={controlSizeToIconGlyph("default")}
        position="inline-end"
      />
    </DropdownMenuTrigger>
  )
}

/** MD: 리드 아이콘 + 구분선 + destructive */
export function DropdownMenuLeadingIconDemo() {
  return (
    <DropdownMenu>
      <MenuTrigger label="계정" />
      <DropdownMenuContent align="start">
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** MD: 단일 선택 — 우측 체크 표시 (RadioItem) */
export function DropdownMenuSingleSelectDemo() {
  const [view, setView] = useState("list")

  return (
    <DropdownMenu>
      <MenuTrigger label="보기" />
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup value={view} onValueChange={setView}>
          <DropdownMenuLabel>보기 방식</DropdownMenuLabel>
          <DropdownMenuRadioItem value="list">목록</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="grid">격자</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="kanban">칸반</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** MD: 복수 선택 — 체크박스 항목 */
export function DropdownMenuMultiSelectDemo() {
  const [showStatus, setShowStatus] = useState(true)
  const [showLabels, setShowLabels] = useState(false)

  return (
    <DropdownMenu>
      <MenuTrigger label="열 표시" />
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>표시할 열</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showStatus}
            onCheckedChange={(checked) => setShowStatus(checked === true)}
          >
            상태
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showLabels}
            onCheckedChange={(checked) => setShowLabels(checked === true)}
          >
            라벨
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** MD: 서브메뉴 — 우측 chevron + 중첩 패널 */
export function DropdownMenuSubmenuDemo() {
  return (
    <DropdownMenu>
      <MenuTrigger label="파일" />
      <DropdownMenuContent align="start">
        <DropdownMenuItem>새 파일</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>보내기</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>PDF로 보내기</DropdownMenuItem>
            <DropdownMenuItem>CSV로 보내기</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">삭제</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** MD: 키보드 단축키 — trailing shortcut */
export function DropdownMenuShortcutDemo() {
  return (
    <DropdownMenu>
      <MenuTrigger label="편집" />
      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          복사
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          붙여넣기
          <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>실행 취소</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** MD: 리드 아이콘 + 단일 선택 조합 */
export function DropdownMenuLeadingIconSelectDemo() {
  const [sort, setSort] = useState("recent")

  return (
    <DropdownMenu>
      <MenuTrigger label="정렬" />
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuLabel>정렬 기준</DropdownMenuLabel>
          <DropdownMenuRadioItem value="recent">
            <Icon icon={ICONS.info} size="md" />
            최신순
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name">
            <Icon icon={ICONS.user} size="md" />
            이름순
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
