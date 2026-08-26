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
    description: "사용자가 탭하거나 클릭해 주요 액션을 실행할 때 쓰는 버튼입니다.",
    section: "Actions",
  },
  {
    slug: "button-group",
    title: "Button Group",
    description: "여러 Button을 한 줄로 붙여 높이와 양끝 모서리를 하나로 맞출 때 씁니다.",
    section: "Actions",
  },
  {
    slug: "toggle",
    title: "Toggle",
    description: "툴바나 아이콘처럼 눌림/해제 상태를 나타내는 토글입니다. 필터·태그는 Chip을 씁니다.",
    section: "Actions",
  },
  {
    slug: "toggle-group",
    title: "Toggle Group",
    description: "Toggle을 세그먼트로 묶어 하나 또는 여러 개를 선택할 때 씁니다.",
    section: "Actions",
  },
  {
    slug: "chip",
    title: "Chip",
    description: "필터·태그·입력 칩처럼 선택·해제할 수 있는 작은 선택 단위입니다.",
    section: "Actions",
  },
  {
    slug: "input",
    title: "Input",
    description: "한 줄 텍스트를 입력받는 필드입니다.",
    section: "Inputs",
  },
  {
    slug: "label",
    title: "Label",
    description: "입력 필드 위에 붙는 라벨입니다. FieldLabel과 조합해 제목·보조 설명을 구성합니다.",
    section: "Inputs",
  },
  {
    slug: "textarea",
    title: "Textarea",
    description: "여러 줄 텍스트를 입력받는 필드입니다.",
    section: "Inputs",
  },
  {
    slug: "select",
    title: "Select",
    description: "목록에서 하나의 값을 고르는 드롭다운입니다.",
    section: "Inputs",
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    description: "여러 옵션 중 하나 이상을 선택할 때 쓰는 체크박스입니다. 라벨은 Label과 함께 씁니다.",
    section: "Inputs",
  },
  {
    slug: "switch",
    title: "Switch",
    description: "설정을 켜거나 끄는 즉시 전환 스위치입니다. 캡션은 Label과 함께 씁니다.",
    section: "Inputs",
  },
  {
    slug: "radio-group",
    title: "Radio",
    description: "서로 배타적인 옵션 중 하나만 고를 때 쓰는 라디오입니다.",
    section: "Inputs",
  },
  {
    slug: "slider",
    title: "Slider",
    description: "연속 범위에서 값을 드래그해 고를 때 쓰는 슬라이더입니다.",
    section: "Inputs",
  },
  {
    slug: "badge",
    title: "Badge",
    description: "상태나 개수처럼 짧은 정보를 강조해 보여주는 작은 라벨입니다.",
    section: "Display",
  },
  {
    slug: "avatar",
    title: "Avatar",
    description: "사용자나 엔티티를 이미지·이니셜·아이콘으로 나타내는 프로필 표시입니다.",
    section: "Display",
  },
  {
    slug: "tabs",
    title: "Tabs",
    description: "같은 영역에서 관련 패널을 탭으로 전환할 때 씁니다.",
    section: "Display",
  },
  {
    slug: "progress",
    title: "Progress",
    description: "작업이나 로딩의 진행 정도를 막대로 보여 줍니다.",
    section: "Display",
  },
  {
    slug: "skeleton",
    title: "Skeleton",
    description: "콘텐츠가 로드되기 전 자리만 잡아 주는 로딩 플레이스홀더입니다.",
    section: "Display",
  },
  {
    slug: "bubble",
    title: "Bubble",
    description: "채팅·대화 UI에서 메시지 본문을 담는 말풍선 표면입니다. 아바타·시간은 Message 등 상위에서 둡니다.",
    section: "Display",
  },
  {
    slug: "sidebar-menu-button",
    title: "Sidebar Menu Button",
    description: "데스크톱 좌측 사이드바에서 메뉴 항목을 선택·이동할 때 쓰는 내비 버튼입니다. 그룹 제목은 SidebarGroupLabel로 선택합니다.",
    section: "Navigation",
  },
  {
    slug: "dropdown-menu",
    title: "Dropdown Menu",
    description: "트리거 옆에 액션 목록을 펼치는 메뉴 셸입니다.",
    section: "Overlays",
  },
  {
    slug: "dialog",
    title: "Dialog",
    description: "화면 위에 띄워 확인·입력 등 집중이 필요한 작업을 처리하는 모달입니다.",
    section: "Overlays",
  },
  {
    slug: "popover",
    title: "Popover",
    description: "트리거 근처에 짧은 보조 내용이나 컨트롤을 띄우는 패널입니다.",
    section: "Overlays",
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    description: "호버·포커스 시 짧은 힌트 문구를 보여 줍니다.",
    section: "Overlays",
  },
  {
    slug: "alert",
    title: "Alert",
    description: "페이지에 남기는 인라인 안내·경고입니다. 잠깐 뜨는 알림은 Toast를 씁니다.",
    section: "Feedback",
  },
  {
    slug: "sonner",
    title: "Toast",
    description: "잠시 나타났다 사라지는 토스트 알림입니다. 고정 안내는 Alert을 씁니다.",
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
