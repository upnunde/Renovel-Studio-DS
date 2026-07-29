export type ComponentDoc = {
  slug: string
  title: string
  description: string
  /** 사이드바 그룹 라벨 */
  section: string
}

export const componentDocs: ComponentDoc[] = [
  {
    slug: "button",
    title: "Button",
    description: "주요 액션 버튼",
    section: "Actions",
  },
  {
    slug: "button-group",
    title: "Button Group",
    description: "Button을 나란히 묶어 높이·양끝 모서리를 일괄 규정",
    section: "Actions",
  },
  {
    slug: "toggle",
    title: "Toggle",
    description: "툴바·아이콘 눌림 상태 (필터·태그는 Chip)",
    section: "Actions",
  },
  {
    slug: "chip",
    title: "Chip",
    description: "필터·태그·입력 칩 (툴바 눌림은 Toggle)",
    section: "Actions",
  },
  {
    slug: "input",
    title: "Input",
    description: "한 줄 입력 필드",
    section: "Inputs",
  },
  {
    slug: "label",
    title: "Label",
    description: "필드 라벨 · FieldLabel (도움말은 InputHypertext 조합)",
    section: "Inputs",
  },
  {
    slug: "textarea",
    title: "Textarea",
    description: "여러 줄 입력",
    section: "Inputs",
  },
  {
    slug: "select",
    title: "Select",
    description: "단일 선택 드롭다운",
    section: "Inputs",
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    description: "체크박스 컨트롤 · 시안은 1개 기준, 라벨은 Label과 조합",
    section: "Inputs",
  },
  {
    slug: "switch",
    title: "Switch",
    description: "켜짐/꺼짐 전환 · 캡션은 Label과 조합",
    section: "Inputs",
  },
  {
    slug: "radio-group",
    title: "Radio",
    description: "라디오 컨트롤 · 시안은 1개 기준, 여러 개는 소비 측 조합",
    section: "Inputs",
  },
  {
    slug: "slider",
    title: "Slider",
    description: "범위 값 선택",
    section: "Inputs",
  },
  {
    slug: "badge",
    title: "Badge",
    description: "상태·카운트 라벨",
    section: "Display",
  },
  {
    slug: "avatar",
    title: "Avatar",
    description: "프로필 · Image / Fallback / Icon 슬롯 조합",
    section: "Display",
  },
  {
    slug: "tabs",
    title: "Tabs",
    description: "패널 전환",
    section: "Display",
  },
  {
    slug: "progress",
    title: "Progress",
    description: "진행 막대",
    section: "Display",
  },
  {
    slug: "skeleton",
    title: "Skeleton",
    description: "로딩 플레이스홀더",
    section: "Display",
  },
  {
    slug: "dropdown-menu",
    title: "Dropdown Menu",
    description: "액션 메뉴 셸 · 항목은 Item 등 슬롯 조합",
    section: "Overlays",
  },
  {
    slug: "dialog",
    title: "Dialog",
    description: "모달 셸 · Header / Content(커스텀) / Footer",
    section: "Overlays",
  },
  {
    slug: "popover",
    title: "Popover",
    description: "보조 패널",
    section: "Overlays",
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    description: "짧은 힌트",
    section: "Overlays",
  },
  {
    slug: "alert",
    title: "Alert",
    description: "페이지에 남는 인라인 안내 (잠깐 뜨는 알림은 Toast)",
    section: "Feedback",
  },
  {
    slug: "sonner",
    title: "Toast",
    description: "잠깐 뜨는 토스트 (고정 안내는 Alert)",
    section: "Feedback",
  },
]

export function getComponentDoc(slug: string) {
  return componentDocs.find((c) => c.slug === slug)
}

export function componentDocsBySection() {
  const sections = new Map<string, ComponentDoc[]>()

  for (const doc of componentDocs) {
    const items = sections.get(doc.section) ?? []
    items.push(doc)
    sections.set(doc.section, items)
  }

  return [...sections.entries()].map(([section, items]) => ({
    section,
    items: [...items].sort((a, b) => a.title.localeCompare(b.title, "en")),
  }))
}
