import {
  AlertCircle,
  ArrowUp,
  BarChart3,
  Bell,
  Bold,
  BookOpen,
  Calendar,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  CircleAlert,
  CircleCheck,
  Clapperboard,
  Download,
  Eye,
  EyeOff,
  FileText,
  Film,
  GripVertical,
  Heading,
  Heart,
  History,
  Home,
  Image,
  ImagePlus,
  Info,
  Italic,
  Layers,
  LibraryBig,
  ListChecks,
  Loader2,
  Mail,
  Menu,
  MessageCircle,
  MessageSquareText,
  Minus,
  Moon,
  MoreVertical,
  Music,
  Pause,
  Pencil,
  Play,
  Plus,
  Receipt,
  RefreshCw,
  RotateCcw,
  Search,
  Settings2,
  Sliders,
  Smartphone,
  Sparkles,
  Square,
  Sun,
  Trash2,
  TriangleAlert,
  Type,
  Underline,
  User,
  UserRoundCog,
  X,
  type LucideIcon,
} from "lucide-react"

import {
  AppleBrandIcon,
  GoogleBrandIcon,
  LineBrandIcon,
  XBrandIcon,
} from "./brand-icons"

/**
 * Lucide React + 브랜드 아이콘 — DS 정본.
 * 앱·패키지 내부에서는 이 레지스트리만 참조한다.
 */
export const ICONS = {
  // 네비·액션
  check: Check,
  close: X,
  plus: Plus,
  minus: Minus,
  search: Search,
  download: Download,
  refreshCw: RefreshCw,
  rotateCcw: RotateCcw,
  menu: Menu,
  home: Home,
  history: History,

  // 화살표·쉐브론
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  arrowUp: ArrowUp,

  // 편집·포맷
  pencil: Pencil,
  trash2: Trash2,
  formatBold: Bold,
  formatItalic: Italic,
  formatUnderlined: Underline,
  gripVertical: GripVertical,

  // 미디어·리소스
  image: Image,
  imagePlus: ImagePlus,
  film: Film,
  music: Music,
  clapperboard: Clapperboard,
  play: Play,
  pause: Pause,
  square: Square,

  // 에디터 블록
  user: User,
  sliders: Sliders,
  listChecks: ListChecks,
  type: Type,
  heading: Heading,
  sparkles: Sparkles,
  messageSquareText: MessageSquareText,
  fileText: FileText,

  // 상태·피드백
  info: Info,
  checkCircle: CircleCheck,
  warning: TriangleAlert,
  error: CircleAlert,
  alertCircle: AlertCircle,
  circle: Circle,

  // 가시성·소셜
  eye: Eye,
  eyeOff: EyeOff,
  heart: Heart,
  messageCircle: MessageCircle,
  mail: Mail,

  // 날짜·레이어
  calendar: Calendar,
  calendarDays: CalendarDays,
  layers: Layers,
  settings2: Settings2,
  moreVertical: MoreVertical,

  // 사이드바·분석
  barChart3: BarChart3,
  bell: Bell,
  bookOpen: BookOpen,
  libraryBig: LibraryBig,
  receipt: Receipt,
  userRoundCog: UserRoundCog,

  // 디바이스·테마
  smartphone: Smartphone,
  sun: Sun,
  moon: Moon,
  loader: Loader2,

  // 소셜 로그인 브랜드
  googleBrand: GoogleBrandIcon,
  appleBrand: AppleBrandIcon,
  xBrand: XBrandIcon,
  lineBrand: LineBrandIcon,
} as const satisfies Record<string, LucideIcon>

export type IconKey = keyof typeof ICONS
export type { LucideIcon }

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

/** 문서 Foundation Icons — 프로젝트에서 실제 사용 중인 아이콘 그룹 */
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
      { name: "ChevronDown", icon: ICONS.chevronDown, usage: "Select · Dropdown" },
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
