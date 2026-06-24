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
    description: "클릭·제출 등 화면의 주요 액션을 실행하는 컨트롤",
    section: "Actions",
  },
  {
    slug: "button-group",
    title: "Button Group",
    description:
      "액션 버튼·입력을 세그먼트처럼 붙여 하나의 컨트롤로 묶는 그룹",
    section: "Actions",
  },
  {
    slug: "toggle",
    title: "Toggle",
    description:
      "눌림·선택 상태를 유지하는 토글 버튼 — 서식 툴바·필터 선택 등",
    section: "Actions",
  },
  {
    slug: "input",
    title: "Input",
    description: "한 줄 텍스트·숫자·이메일 등을 입력하는 필드",
    section: "Inputs",
  },
  {
    slug: "label",
    title: "Label",
    description:
      "폼 필드 이름을 표시하고 컨트롤과 접근성(htmlFor)으로 연결하는 라벨",
    section: "Inputs",
  },
  {
    slug: "textarea",
    title: "Textarea",
    description: "여러 줄의 긴 텍스트를 입력하는 필드",
    section: "Inputs",
  },
  {
    slug: "select",
    title: "Select",
    description: "드롭다운 목록에서 하나의 옵션을 선택",
    section: "Inputs",
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    description: "체크로 on/off 또는 복수 항목을 선택",
    section: "Inputs",
  },
  {
    slug: "switch",
    title: "Switch",
    description: "설정·기능의 켜짐/꺼짐 상태를 전환",
    section: "Inputs",
  },
  {
    slug: "radio-group",
    title: "Radio Group",
    description: "여러 옵션 중 하나만 선택하는 라디오 그룹",
    section: "Inputs",
  },
  {
    slug: "slider",
    title: "Slider",
    description: "최솟값~최댓값 사이에서 값을 드래그해 선택",
    section: "Inputs",
  },
  {
    slug: "badge",
    title: "Badge",
    description: "상태·카테고리·카운트 등을 작은 라벨로 표시",
    section: "Display",
  },
  {
    slug: "avatar",
    title: "Avatar",
    description: "사용자·팀 등을 나타내는 프로필 이미지 또는 이니셜",
    section: "Display",
  },
  {
    slug: "card",
    title: "Card",
    description: "제목·본문·액션을 담는 콘텐츠 카드 표면",
    section: "Display",
  },
  {
    slug: "tabs",
    title: "Tabs",
    description: "같은 화면 안에서 패널·뷰를 전환",
    section: "Display",
  },
  {
    slug: "progress",
    title: "Progress",
    description: "작업·로딩의 진행 비율을 막대로 표시",
    section: "Display",
  },
  {
    slug: "skeleton",
    title: "Skeleton",
    description:
      "콘텐츠가 로드되기 전 레이아웃을 흉내 내는 플레이스홀더",
    section: "Display",
  },
  {
    slug: "dropdown-menu",
    title: "Dropdown Menu",
    description: "버튼·아이콘 클릭 시 나타나는 메뉴·액션 목록",
    section: "Overlays",
  },
  {
    slug: "dialog",
    title: "Dialog",
    description: "배경을 덮고 사용자 확인·입력을 받는 모달",
    section: "Overlays",
  },
  {
    slug: "popover",
    title: "Popover",
    description: "트리거 옆에 뜨는 보조 패널·폼",
    section: "Overlays",
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    description: "호버·포커스 시 잠깐 보이는 짧은 설명",
    section: "Overlays",
  },
  {
    slug: "accordion",
    title: "Accordion",
    description: "제목을 눌러 내용을 펼치거나 접는 섹션",
    section: "Overlays",
  },
  {
    slug: "alert",
    title: "Alert",
    description: "페이지 안에 고정되는 인라인 안내·경고·오류 메시지",
    section: "Feedback",
  },
  {
    slug: "sonner",
    title: "Sonner",
    description: "화면 모서리에 잠깐 뜨는 토스트 알림",
    section: "Feedback",
  },
  {
    slug: "separator",
    title: "Separator",
    description: "콘텐츠·도구 모음 사이를 나누는 구분선",
    section: "Layout",
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
