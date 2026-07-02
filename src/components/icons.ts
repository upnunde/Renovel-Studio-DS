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
