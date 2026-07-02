import {
  Bold,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  Home,
  Info,
  Italic,
  Loader2,
  Moon,
  Sun,
  User,
  TriangleAlert,
  Underline,
  X,
  type LucideIcon,
} from "lucide-react"

/** Lucide React — shadcn 기본 아이콘셋 */
export const ICONS = {
  check: Check,
  close: X,
  home: Home,
  formatBold: Bold,
  formatItalic: Italic,
  formatUnderlined: Underline,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronRight: ChevronRight,
  info: Info,
  checkCircle: CircleCheck,
  warning: TriangleAlert,
  error: CircleAlert,
  loader: Loader2,
  sun: Sun,
  moon: Moon,
  user: User,
} as const satisfies Record<string, LucideIcon>

export type IconKey = keyof typeof ICONS

export type IconRegistryItem = {
  name: string
  icon: LucideIcon
  usage: string
}

export type IconRegistryGroup = {
  id: string
  title: string
  description: string
  icons: IconRegistryItem[]
}

export const ICON_REGISTRY: IconRegistryGroup[] = [
  {
    id: "text-format",
    title: "텍스트 서식",
    description: "에디터·토글·서식 버튼",
    icons: [
      { name: "Bold", icon: ICONS.formatBold, usage: "Toggle · 서식 툴바" },
      { name: "Italic", icon: ICONS.formatItalic, usage: "Button · Toggle" },
      { name: "Underline", icon: ICONS.formatUnderlined, usage: "Button · Toggle" },
    ],
  },
  {
    id: "navigation",
    title: "네비게이션",
    description: "펼침·이동·계층",
    icons: [
      { name: "Home", icon: ICONS.home, usage: "Button · 리드 아이콘 데모" },
      { name: "ChevronDown", icon: ICONS.chevronDown, usage: "Select · Accordion · Dropdown" },
      { name: "ChevronRight", icon: ICONS.chevronRight, usage: "Dropdown submenu" },
    ],
  },
  {
    id: "feedback",
    title: "상태 · 피드백",
    description: "확인·알림·오류·로딩",
    icons: [
      { name: "Check", icon: ICONS.check, usage: "Checkbox · Select · Menu" },
      { name: "Info", icon: ICONS.info, usage: "Alert · Badge" },
      { name: "CircleCheck", icon: ICONS.checkCircle, usage: "Toast success" },
      { name: "TriangleAlert", icon: ICONS.warning, usage: "Toast warning" },
      { name: "CircleAlert", icon: ICONS.error, usage: "Toast error" },
      { name: "Loader2", icon: ICONS.loader, usage: "Toast loading" },
      { name: "X", icon: ICONS.close, usage: "Dialog close" },
    ],
  },
  {
    id: "interface",
    title: "인터페이스",
    description: "테마·전역 UI",
    icons: [
      { name: "User", icon: ICONS.user, usage: "Avatar · AvatarIcon" },
      { name: "Sun", icon: ICONS.sun, usage: "Theme toggle" },
      { name: "Moon", icon: ICONS.moon, usage: "Theme toggle" },
    ],
  },
]

export const ICON_REGISTRY_FLAT = ICON_REGISTRY.flatMap((group) => group.icons)
