/**
 * Playground 코드 → 스튜디오 붙여넣기용 스니펫.
 * JSX 태그를 스캔해 design-system 정본 import를 앞에 붙인다.
 */

const DS_COMPONENT_IMPORTS: Record<string, string> = {
  Alert: "design-system/ui/alert",
  AlertAction: "design-system/ui/alert",
  AlertDescription: "design-system/ui/alert",
  AlertTitle: "design-system/ui/alert",
  Avatar: "design-system/ui/avatar",
  AvatarBadge: "design-system/ui/avatar",
  AvatarFallback: "design-system/ui/avatar",
  AvatarGroup: "design-system/ui/avatar",
  AvatarGroupCount: "design-system/ui/avatar",
  AvatarIcon: "design-system/ui/avatar",
  AvatarImage: "design-system/ui/avatar",
  Badge: "design-system/ui/badge",
  Button: "design-system/ui/button",
  ButtonGroup: "design-system/ui/button-group",
  ButtonGroupSeparator: "design-system/ui/button-group",
  ButtonGroupText: "design-system/ui/button-group",
  Checkbox: "design-system/ui/checkbox",
  Chip: "design-system/ui/chip",
  ChipGroup: "design-system/ui/chip",
  Dialog: "design-system/ui/dialog",
  DialogClose: "design-system/ui/dialog",
  DialogContent: "design-system/ui/dialog",
  DialogDescription: "design-system/ui/dialog",
  DialogDescriptionStatic: "design-system/ui/dialog",
  DialogFooter: "design-system/ui/dialog",
  DialogHeader: "design-system/ui/dialog",
  DialogOverlay: "design-system/ui/dialog",
  DialogPortal: "design-system/ui/dialog",
  DialogTitle: "design-system/ui/dialog",
  DialogTitleStatic: "design-system/ui/dialog",
  DialogTrigger: "design-system/ui/dialog",
  DropdownMenu: "design-system/ui/dropdown-menu",
  DropdownMenuCheckboxItem: "design-system/ui/dropdown-menu",
  DropdownMenuContent: "design-system/ui/dropdown-menu",
  DropdownMenuGroup: "design-system/ui/dropdown-menu",
  DropdownMenuItem: "design-system/ui/dropdown-menu",
  DropdownMenuLabel: "design-system/ui/dropdown-menu",
  DropdownMenuPortal: "design-system/ui/dropdown-menu",
  DropdownMenuRadioGroup: "design-system/ui/dropdown-menu",
  DropdownMenuRadioItem: "design-system/ui/dropdown-menu",
  DropdownMenuSeparator: "design-system/ui/dropdown-menu",
  DropdownMenuShortcut: "design-system/ui/dropdown-menu",
  DropdownMenuSub: "design-system/ui/dropdown-menu",
  DropdownMenuSubContent: "design-system/ui/dropdown-menu",
  DropdownMenuSubTrigger: "design-system/ui/dropdown-menu",
  DropdownMenuTrigger: "design-system/ui/dropdown-menu",
  EmailInput: "design-system/ui/email-input",
  FieldLabel: "design-system/ui/field-label",
  FileInput: "design-system/ui/file-input",
  Icon: "design-system/ui/icon",
  Input: "design-system/ui/input",
  InputGroup: "design-system/ui/input",
  InputHypertext: "design-system/ui/input",
  Label: "design-system/ui/label",
  PasswordInput: "design-system/ui/password-input",
  Popover: "design-system/ui/popover",
  PopoverContent: "design-system/ui/popover",
  PopoverDescription: "design-system/ui/popover",
  PopoverHeader: "design-system/ui/popover",
  PopoverTitle: "design-system/ui/popover",
  PopoverTrigger: "design-system/ui/popover",
  Progress: "design-system/ui/progress",
  ProgressIndicator: "design-system/ui/progress",
  ProgressLabel: "design-system/ui/progress",
  ProgressTrack: "design-system/ui/progress",
  ProgressValue: "design-system/ui/progress",
  RadioGroup: "design-system/ui/radio-group",
  RadioGroupItem: "design-system/ui/radio-group",
  Select: "design-system/ui/select",
  SelectContent: "design-system/ui/select",
  SelectGroup: "design-system/ui/select",
  SelectItem: "design-system/ui/select",
  SelectLabel: "design-system/ui/select",
  SelectScrollDownButton: "design-system/ui/select",
  SelectScrollUpButton: "design-system/ui/select",
  SelectSeparator: "design-system/ui/select",
  SelectTrigger: "design-system/ui/select",
  SelectValue: "design-system/ui/select",
  Separator: "design-system/ui/separator",
  Skeleton: "design-system/ui/skeleton",
  Slider: "design-system/ui/slider",
  Toaster: "design-system/ui/sonner",
  Switch: "design-system/ui/switch",
  Tabs: "design-system/ui/tabs",
  TabsContent: "design-system/ui/tabs",
  TabsList: "design-system/ui/tabs",
  TabsTrigger: "design-system/ui/tabs",
  Textarea: "design-system/ui/textarea",
  Toggle: "design-system/ui/toggle",
  ToggleGroup: "design-system/ui/toggle-group",
  Tooltip: "design-system/ui/tooltip",
  TooltipContent: "design-system/ui/tooltip",
  TooltipProvider: "design-system/ui/tooltip",
  TooltipTrigger: "design-system/ui/tooltip",
}

function collectJsxNames(code: string): string[] {
  const names = new Set<string>()
  for (const match of code.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)) {
    names.add(match[1])
  }
  return [...names]
}

function formatNamedImport(modulePath: string, names: string[]): string {
  const sorted = [...names].sort((a, b) => a.localeCompare(b))
  if (sorted.length === 1) {
    return `import { ${sorted[0]} } from "${modulePath}"`
  }
  return `import {\n  ${sorted.join(",\n  ")},\n} from "${modulePath}"`
}

/** JSX 스니펫에 design-system 정본 import를 붙여 스튜디오가 패키지 컴포넌트를 쓰게 한다. */
export function formatPlaygroundSnippet(code: string): string {
  const trimmed = code.trim()
  if (!trimmed) return ""

  const byModule = new Map<string, Set<string>>()

  for (const name of collectJsxNames(trimmed)) {
    const modulePath = DS_COMPONENT_IMPORTS[name]
    if (!modulePath) continue
    const bucket = byModule.get(modulePath) ?? new Set<string>()
    bucket.add(name)
    byModule.set(modulePath, bucket)
  }

  if (/\bICONS\./.test(trimmed)) {
    const bucket = byModule.get("design-system/icons") ?? new Set<string>()
    bucket.add("ICONS")
    byModule.set("design-system/icons", bucket)
  }

  if (/\btoast(?:\.\w+)?\(/.test(trimmed)) {
    const bucket = byModule.get("sonner") ?? new Set<string>()
    bucket.add("toast")
    byModule.set("sonner", bucket)
  }

  if (byModule.size === 0) return trimmed

  const moduleOrder = [...byModule.keys()].sort((a, b) => {
    const aDs = a.startsWith("design-system/")
    const bDs = b.startsWith("design-system/")
    if (aDs !== bDs) return aDs ? -1 : 1
    return a.localeCompare(b)
  })

  const imports = moduleOrder
    .map((modulePath) =>
      formatNamedImport(modulePath, [...(byModule.get(modulePath) ?? [])])
    )
    .join("\n")

  return `${imports}\n\n${trimmed}`
}
