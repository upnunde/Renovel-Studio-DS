import {
  formatAvatarSizeOption,
  formatControlSizeOption,
  formatBadgeSizeOption,
  CONTROL_TEXT_SIZE_APIS,
  CONTROL_FORM_SIZE_APIS,
  TABS_SIZE_APIS,
  AVATAR_SIZE_APIS,
  BADGE_SIZE_APIS,
  BADGE_SHAPE_APIS,
} from "design-system/component-size-tokens"

export type ComponentPropSpec = {
  name: string
  values: string[]
  description: string
  /** 값별 문서 라벨 (미지정 시 values 그대로) */
  valueHints?: Record<string, string>
}

export type ComponentCaseSpec = {
  slug: string
  properties: ComponentPropSpec[]
}

function controlHints(...apis: string[]) {
  return Object.fromEntries(apis.map((api) => [api, formatControlSizeOption(api)]))
}

function avatarHints(...apis: string[]) {
  return Object.fromEntries(apis.map((api) => [api, formatAvatarSizeOption(api)]))
}

function badgeHints(...apis: string[]) {
  return Object.fromEntries(apis.map((api) => [api, formatBadgeSizeOption(api)]))
}

export const COMPONENT_CASE_SPECS: Record<string, ComponentCaseSpec> = {
  button: {
    slug: "button",
    properties: [
      {
        name: "variant",
        values: ["default", "primary", "secondary", "outline", "ghost", "destructive", "link"],
        description: "시각적 위계 · 기본(foreground) / 브랜드 강조 / 보조 / 윤곽 / 최소 / 위험 / 링크",
      },
      {
        name: "type",
        values: ["text", "leading-icon", "icon"],
        description: "버튼 형태 · 텍스트 / 좌측 아이콘+라벨 / 아이콘 전용",
        valueHints: {
          text: "text",
          "leading-icon": "leading-icon",
          icon: "icon",
        },
      },
      {
        name: "size",
        values: [...CONTROL_TEXT_SIZE_APIS],
        description: "높이(h) · xs_h24 ~ 2xl_h48 · type=icon 일 때 동일 높이의 정사각 버튼",
        valueHints: controlHints(...CONTROL_TEXT_SIZE_APIS),
      },
      {
        name: "shape",
        values: ["circle", "square"],
        description: "circle(rounded-full) · square(rounded-md · md_8)",
      },
      {
        name: "disabled",
        values: ["false", "true"],
        description: "비활성 · 클릭 불가",
      },
      {
        name: "aria-invalid",
        values: ["false", "true"],
        description: "폼 검증 오류 상태",
      },
      {
        name: "aria-expanded",
        values: ["false", "true"],
        description: "팝오버·메뉴 트리거 열림 상태",
      },
      {
        name: "chevron",
        values: ["false", "true"],
        description: "후행 ▼ · 켜면 DropdownMenu 트리거로 메뉴 활성화",
      },
    ],
  },
  "button-group": {
    slug: "button-group",
    properties: [
      {
        name: "size",
        values: [...CONTROL_TEXT_SIZE_APIS],
        description:
          "그룹 내 모든 자식 컨트롤(Button·Input·Select)에 일괄 적용되는 높이 · 세그먼트 모서리 md_8",
        valueHints: controlHints(...CONTROL_TEXT_SIZE_APIS),
      },
      {
        name: "children",
        values: ["Button", "ButtonGroupText", "ButtonGroupSeparator", "Input", "Select"],
        description: "그룹에 묶는 컨트롤 조합",
      },
    ],
  },
  toggle: {
    slug: "toggle",
    properties: [
      {
        name: "variant",
        values: ["default", "outline"],
        description: "배경 없음 / 윤곽",
      },
      {
        name: "size",
        values: [...CONTROL_FORM_SIZE_APIS],
        description: "터치 영역 · sm_h32 ~ 2xl_h48",
        valueHints: controlHints(...CONTROL_FORM_SIZE_APIS),
      },
      {
        name: "pressed",
        values: ["false", "true"],
        description: "눌림·선택 유지 ( data-state=on )",
      },
      { name: "disabled", values: ["false", "true"], description: "비활성" },
    ],
  },
  input: {
    slug: "input",
    properties: [
      {
        name: "size",
        values: [...CONTROL_FORM_SIZE_APIS],
        description: "높이(h) · sm_h32 ~ 2xl_h48",
        valueHints: controlHints(...CONTROL_FORM_SIZE_APIS),
      },
      { name: "type", values: ["text", "email", "password", "number", "file"], description: "HTML input type" },
      { name: "disabled", values: ["false", "true"], description: "비활성" },
      { name: "aria-invalid", values: ["false", "true"], description: "오류 상태" },
      { name: "placeholder", values: ["string"], description: "빈 값 안내" },
      {
        name: "hypertext",
        values: ["false", "true"],
        description: "InputHypertext 도움말 표시",
      },
      {
        name: "hypertextMax",
        values: ["number"],
        description: "InputHypertext max — 0이면 글자수 미표시",
      },
      {
        name: "hypertextCount",
        values: ["number"],
        description: "InputHypertext count — max와 함께 0/30 형식",
      },
    ],
  },
  label: {
    slug: "label",
    properties: [
      {
        name: "size",
        values: ["default", "lg"],
        description: "제목 타이포 · default body2_700 · lg heading5_700",
        valueHints: {
          default: "15_700",
          lg: "18_700",
        },
      },
      {
        name: "children",
        values: ["string"],
        description: "FieldLabel 제목 텍스트",
      },
      { name: "htmlFor", values: ["id"], description: "연결된 필드 id" },
      { name: "required", values: ["false", "true"], description: "필수 표시 (*)" },
      {
        name: "description",
        values: ["false", "true"],
        description: "서브 타이틀(보조문구) 표시 · text-body4_400",
      },
      {
        name: "descriptionLines",
        values: ["1", "2", "3"],
        description: "서브 타이틀 줄 수 (description: true일 때, 최대 3줄)",
      },
      {
        name: "info",
        values: ["false", "true"],
        description: "정보 아이콘·툴팁 (타이틀2)",
      },
      {
        name: "hypertext",
        values: ["false", "true"],
        description: "InputHypertext 도움말 표시 (필드 아래)",
      },
      {
        name: "hypertextMax",
        values: ["number"],
        description: "InputHypertext max — 0이면 글자수 미표시",
      },
      {
        name: "hypertextCount",
        values: ["number"],
        description: "InputHypertext count — max와 함께 0/30 형식",
      },
    ],
  },
  textarea: {
    slug: "textarea",
    properties: [
      { name: "rows", values: ["number"], description: "기본 높이 (행)" },
      { name: "placeholder", values: ["string"], description: "빈 값 안내" },
      { name: "disabled", values: ["false", "true"], description: "비활성" },
      { name: "aria-invalid", values: ["false", "true"], description: "오류 상태" },
      {
        name: "hypertext",
        values: ["false", "true"],
        description: "InputHypertext 도움말 표시",
      },
      {
        name: "hypertextMax",
        values: ["number"],
        description: "InputHypertext max — 0이면 글자수 미표시",
      },
      {
        name: "hypertextCount",
        values: ["number"],
        description: "InputHypertext count — max와 함께 0/30 형식",
      },
    ],
  },
  select: {
    slug: "select",
    properties: [
      {
        name: "size",
        values: [...CONTROL_FORM_SIZE_APIS],
        description: "트리거 높이 · sm_h32 ~ 2xl_h48",
        valueHints: controlHints(...CONTROL_FORM_SIZE_APIS),
      },
      { name: "disabled", values: ["false", "true"], description: "비활성" },
      { name: "aria-invalid", values: ["false", "true"], description: "오류 상태" },
      { name: "placeholder", values: ["string"], description: "미선택 안내" },
    ],
  },
  checkbox: {
    slug: "checkbox",
    properties: [
      { name: "checked", values: ["false", "true", "indeterminate"], description: "선택 상태" },
      { name: "disabled", values: ["false", "true"], description: "비활성" },
      { name: "aria-invalid", values: ["false", "true"], description: "오류 상태" },
      {
        name: "box",
        values: ["s16"],
        description: "체크박스 · 정사각 16px",
      },
    ],
  },
  switch: {
    slug: "switch",
    properties: [
      { name: "checked", values: ["false", "true"], description: "켜짐/꺼짐" },
      { name: "disabled", values: ["false", "true"], description: "비활성" },
      { name: "caption", values: ["false", "true"], description: "라벨 표시" },
    ],
  },
  "radio-group": {
    slug: "radio-group",
    properties: [
      { name: "value", values: ["a", "b"], description: "선택된 항목" },
      { name: "disabled", values: ["false", "true"], description: "그룹 비활성" },
      { name: "aria-invalid", values: ["false", "true"], description: "오류 상태" },
    ],
  },
  slider: {
    slug: "slider",
    properties: [
      { name: "value", values: ["number"], description: "현재 값" },
      { name: "min", values: ["number"], description: "최솟값" },
      { name: "max", values: ["number"], description: "최댓값" },
      { name: "step", values: ["number"], description: "단계" },
      { name: "disabled", values: ["false", "true"], description: "비활성" },
    ],
  },
  chip: {
    slug: "chip",
    properties: [
      {
        name: "variant",
        values: ["outline", "subtle", "default"],
        description: "윤곽 / 보조 표면 / Default Button 동일 (아이콘 없음)",
      },
      {
        name: "size",
        values: ["sm", "default"],
        description: "높이 · sm_h32 / default_h36 (정본 스케일)",
      },
      {
        name: "selected",
        values: ["false", "true"],
        description: "선택 상태 유지 ( aria-pressed ) · outline·subtle은 체크 표시",
      },
      {
        name: "removable",
        values: ["false", "true"],
        description: "끝에 삭제(✕) 버튼 표시 — 인풋 칩",
      },
      { name: "disabled", values: ["false", "true"], description: "비활성" },
    ],
  },
  badge: {
    slug: "badge",
    properties: [
      {
        name: "variant",
        values: ["default", "secondary", "destructive", "outline", "ghost", "link"],
        description: "강조·보조·위험·윤곽·최소·링크",
      },
      {
        name: "size",
        values: [...BADGE_SIZE_APIS],
        description: "높이(h) · default_h20 / md_h24 / lg_h28",
        valueHints: badgeHints(...BADGE_SIZE_APIS),
      },
      {
        name: "shape",
        values: [...BADGE_SHAPE_APIS],
        description: "circle(rounded-full) · square(rounded-md · md_8)",
      },
    ],
  },
  avatar: {
    slug: "avatar",
    properties: [
      {
        name: "size",
        values: [...AVATAR_SIZE_APIS],
        description: "size · xs_s20 ~ 5xl_s128 · 인라인 ~ 프로필 히어로",
        valueHints: avatarHints(...AVATAR_SIZE_APIS),
      },
      { name: "image", values: ["false", "true"], description: "AvatarImage 유무 (false면 Fallback 표시)" },
      {
        name: "fallback",
        values: ["initials", "icon"],
        description: "AvatarFallback variant · initials / icon (image=false일 때만 적용)",
      },
    ],
  },
  card: {
    slug: "card",
    properties: [
      {
        name: "showHeader",
        values: ["false", "true"],
        description: "CardHeader · Title · Description",
      },
      {
        name: "showContent",
        values: ["false", "true"],
        description: "CardContent 본문 영역",
      },
      {
        name: "showFooter",
        values: ["false", "true"],
        description: "CardFooter 액션 영역",
      },
    ],
  },
  tabs: {
    slug: "tabs",
    properties: [
      { name: "tabCount", values: ["2", "3", "4"], description: "표시할 탭 개수 (플레이그라운드)" },
      { name: "defaultValue", values: ["tab-1", "tab-2", "tab-3", "tab-4"], description: "초기 활성 탭" },
      { name: "variant", values: ["default", "line", "text"], description: "default · 분리형 square · line · 밑줄 · text · size별 타이포·gap(2xl→16px)" },
      {
        name: "size",
        values: [...TABS_SIZE_APIS],
        description: "TabsList 높이(h) · sm_h32 ~ 2xl_h48",
        valueHints: controlHints(...TABS_SIZE_APIS),
      },
    ],
  },
  progress: {
    slug: "progress",
    properties: [
      { name: "value", values: ["0–100"], description: "진행률 (%)" },
    ],
  },
  skeleton: {
    slug: "skeleton",
    properties: [
      {
        name: "shape",
        values: ["line", "circle", "block"],
        description: "로딩 영역 형태 · 한 줄 / 원형 / 사각 블록",
      },
    ],
  },
  "dropdown-menu": {
    slug: "dropdown-menu",
    properties: [
      { name: "align", values: ["start", "center", "end"], description: "트리거 정렬" },
      {
        name: "item type",
        values: [
          "default",
          "leading-icon",
          "shortcut",
          "disabled",
          "RadioItem",
          "CheckboxItem",
          "Sub",
        ],
        description:
          "항목 유형 · 텍스트 / 리드 아이콘 / 단축키 / 비활성 / 단일·복수 선택 / 서브메뉴",
      },
      { name: "item variant", values: ["default", "destructive"], description: "메뉴 항목 스타일 (item type이 default일 때)" },
      {
        name: "구성",
        values: [
          "Item",
          "Label",
          "Separator",
          "CheckboxItem",
          "RadioGroup",
          "Sub",
          "Shortcut",
        ],
        description: "서브 컴포넌트",
      },
      {
        name: "item-height",
        values: ["md_h32"],
        description: "메뉴 항목 행 높이 · md_h32",
      },
    ],
  },
  dialog: {
    slug: "dialog",
    properties: [
      {
        name: "footerActions",
        values: ["1", "2", "3"],
        description: "Footer 액션 수 — 1(주액션) · 2(취소+주액션) · 3(취소+보조+주액션)",
      },
      {
        name: "showHeader",
        values: ["false", "true"],
        description: "DialogHeader · Title · Description",
      },
      {
        name: "showContent",
        values: ["false", "true"],
        description: "Header ↔ Footer 사이 본문 영역 토글",
      },
      {
        name: "showBodyText",
        values: ["false", "true"],
        description: "본문 텍스트 한 줄",
      },
      {
        name: "showList",
        values: ["false", "true"],
        description: "목록 블록 노출",
      },
      {
        name: "listStyle",
        values: ["muted", "numbered"],
        description: "목록 스타일 — muted(박스·번호 없음) · numbered(박스+1·2·3)",
      },
      {
        name: "showConsent",
        values: ["false", "true"],
        description: "동의 체크박스",
      },
      {
        name: "showConfirmInput",
        values: ["false", "true"],
        description: "확인 문구 입력 필드",
      },
      {
        name: "showFooter",
        values: ["false", "true"],
        description: "DialogFooter 액션 영역",
      },
      {
        name: "pattern",
        values: ["basic", "checklist", "acknowledge", "save-choice"],
        description:
          "역할 패턴 — basic · checklist(동의) · acknowledge(입력 확인) · save-choice(미저장 3-way)",
      },
      { name: "open", values: ["false", "true"], description: "modal 표시 여부 (앱 연동)" },
    ],
  },
  popover: {
    slug: "popover",
    properties: [
      { name: "align", values: ["start", "center", "end"], description: "트리거 정렬" },
      { name: "open", values: ["false", "true"], description: "표시 여부" },
    ],
  },
  tooltip: {
    slug: "tooltip",
    properties: [
      { name: "delay", values: ["0ms", "700ms"], description: "Provider delayDuration" },
      { name: "side", values: ["top", "right", "bottom", "left"], description: "표시 위치" },
      {
        name: "text",
        values: ["xs_g12"],
        description: "툴팁 글리프 · xs_g12",
      },
    ],
  },
  accordion: {
    slug: "accordion",
    properties: [
      { name: "type", values: ["single", "multiple"], description: "단일 / 복수 펼침" },
      { name: "defaultValue", values: ["item-1", "item-2"], description: "초기 펼침 항목" },
    ],
  },
  alert: {
    slug: "alert",
    properties: [
      {
        name: "variant",
        values: ["default", "destructive"],
        description: "아이콘·제목·본문 조합",
      },
    ],
  },
  sonner: {
    slug: "sonner",
    properties: [
      { name: "type", values: ["default", "success", "error", "info", "warning"], description: "토스트 종류" },
    ],
  },
  separator: {
    slug: "separator",
    properties: [
      { name: "orientation", values: ["horizontal", "vertical"], description: "구분 방향" },
      {
        name: "thickness",
        values: ["t1"],
        description: "선 두께 · t1",
      },
    ],
  },
}

export function getComponentCaseSpec(slug: string): ComponentCaseSpec | undefined {
  return COMPONENT_CASE_SPECS[slug]
}

export function formatPropValue(prop: ComponentPropSpec, value: string): string {
  const raw = prop.valueHints?.[value] ?? value
  return raw.endsWith("[]") ? raw.slice(0, -2) : raw
}
