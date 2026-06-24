export type LucideIconCategory = {
  id: string
  title: string
  icons: readonly string[]
}

/** UI·앱에서 자주 쓰는 Lucide 아이콘 (shadcn 기본) */
export const LUCIDE_ICON_CATALOG: LucideIconCategory[] = [
  {
    "id": "navigation",
    "title": "네비게이션",
    "icons": [
      "Home",
      "Menu",
      "X",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "ChevronLeft",
      "ChevronRight",
      "ChevronDown",
      "ChevronUp",
      "ChevronsUpDown",
      "ChevronsDownUp",
      "Ellipsis",
      "EllipsisVertical",
      "ExternalLink",
      "Maximize",
      "Minimize",
      "LayoutDashboard",
      "Grip",
      "LayoutGrid",
      "List",
      "GripVertical"
    ]
  },
  {
    "id": "actions",
    "title": "액션",
    "icons": [
      "Edit",
      "Trash2",
      "Save",
      "Search",
      "ListFilter",
      "Download",
      "Upload",
      "Share",
      "Copy",
      "Scissors",
      "ClipboardPaste",
      "Undo",
      "Redo",
      "Eye",
      "EyeOff",
      "Lock",
      "LockOpen",
      "Link",
      "Paperclip",
      "ZoomIn",
      "ZoomOut",
      "QrCode"
    ]
  },
  {
    "id": "status",
    "title": "상태 · 피드백",
    "icons": [
      "Check",
      "CircleCheck",
      "CheckCheck",
      "CircleX",
      "Info",
      "CircleHelp",
      "AlertTriangle",
      "Sparkles",
      "Loader2",
      "Hourglass",
      "Ban",
      "Flag"
    ]
  },
  {
    "id": "communication",
    "title": "커뮤니케이션",
    "icons": [
      "Mail",
      "MessageCircle",
      "MessagesSquare",
      "MessageSquare",
      "Send",
      "Reply",
      "Forward",
      "Phone",
      "Video",
      "Bell",
      "BellRing",
      "Megaphone"
    ]
  },
  {
    "id": "user",
    "title": "사용자 · 계정",
    "icons": [
      "User",
      "Users",
      "CircleUser",
      "UserCog",
      "Badge",
      "LogIn",
      "LogOut",
      "Key",
      "Fingerprint",
      "BadgeCheck",
      "Shield"
    ]
  },
  {
    "id": "editor",
    "title": "에디터 · 서식",
    "icons": [
      "Bold",
      "Italic",
      "Underline",
      "Strikethrough",
      "AlignLeft",
      "AlignCenter",
      "AlignRight",
      "AlignJustify",
      "List",
      "ListOrdered",
      "Quote",
      "IndentIncrease",
      "IndentDecrease",
      "Heading",
      "StickyNote"
    ]
  },
  {
    "id": "media",
    "title": "미디어",
    "icons": [
      "Play",
      "Pause",
      "SkipForward",
      "SkipBack",
      "FastForward",
      "Rewind",
      "Volume2",
      "Volume1",
      "VolumeOff",
      "VolumeX",
      "Mic",
      "MicOff",
      "Image",
      "Camera",
      "Film",
      "Music"
    ]
  },
  {
    "id": "files",
    "title": "파일 · 데이터",
    "icons": [
      "Folder",
      "FolderOpen",
      "FolderPlus",
      "FileText",
      "File",
      "Cloud",
      "CloudUpload",
      "CloudDownload",
      "CloudCheck",
      "DatabaseBackup",
      "Package2",
      "Table",
      "BarChart3",
      "PieChart"
    ]
  },
  {
    "id": "commerce",
    "title": "커머스",
    "icons": [
      "ShoppingCart",
      "ShoppingBag",
      "Store",
      "BadgePercent",
      "Tag",
      "Banknote",
      "CreditCard",
      "Receipt"
    ]
  },
  {
    "id": "time-location",
    "title": "시간 · 위치",
    "icons": [
      "Calendar",
      "CalendarDays",
      "Clock",
      "AlarmClock",
      "Timer",
      "History",
      "RefreshCw",
      "MapPin",
      "MapPinOff",
      "Map",
      "Navigation",
      "LocateFixed"
    ]
  },
  {
    "id": "settings-theme",
    "title": "설정 · 테마",
    "icons": [
      "Settings",
      "SlidersHorizontal",
      "Wrench",
      "HardHat",
      "Sun",
      "Moon",
      "Contrast",
      "Palette",
      "Languages"
    ]
  },
  {
    "id": "social-favorite",
    "title": "소셜 · 즐겨찾기",
    "icons": [
      "Heart",
      "Bookmark",
      "Star",
      "StarHalf",
      "ThumbsUp",
      "Share"
    ]
  }
]

export const LUCIDE_ICON_COMMON = [
  ...new Set(LUCIDE_ICON_CATALOG.flatMap((category) => category.icons)),
] as const

export const LUCIDE_ICON_COMMON_COUNT = LUCIDE_ICON_COMMON.length
