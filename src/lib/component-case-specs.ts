import {
  formatAvatarSizeOption,
  formatControlSizeOption,
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

export const COMPONENT_CASE_SPECS: Record<string, ComponentCaseSpec> = {
  button: {
    slug: "button",
    properties: [
      {
        name: "variant",
        values: ["default", "secondary", "outline", "ghost", "destructive", "link"],
        description: "시각적 위계 · primary( default ) / 보조 / 윤곽 / 최소 / 위험 / 링크",
      },
      {
        name: "size",
        values: ["xs", "sm", "default", "lg", "xl", "2xl", "icon", "icon-xs", "icon-sm", "icon-lg", "icon-xl", "icon-2xl"],
        description: "높이(h) · xs_h24 ~ 2xl_h48 · 아이콘 버튼은 정사각(s)",
        valueHints: controlHints(
          "xs",
          "sm",
          "default",
          "lg",
          "xl",
          "2xl",
          "icon-xs",
          "icon-sm",
          "icon",
          "icon-lg",
          "icon-xl",
          "icon-2xl"
        ),
      },
      {
        name: "disabled",
        values: ["true", "false"],
        description: "비활성 · 클릭 불가",
      },
      {
        name: "aria-invalid",
        values: ["true", "false"],
        description: "폼 검증 오류 상태",
      },
      {
        name: "aria-expanded",
        values: ["true", "false"],
        description: "팝오버·메뉴 트리거 열림 상태",
      },
    ],
  },
  "button-group": {
    slug: "button-group",
    properties: [
      {
        name: "orientation",
        values: ["horizontal", "vertical"],
        description: "가로 · 세로 배치",
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
        values: ["sm", "default", "lg", "xl", "2xl"],
        description: "터치 영역 · sm_h32 ~ 2xl_h48",
        valueHints: controlHints("sm", "default", "lg", "xl", "2xl"),
      },
      {
        name: "pressed",
        values: ["true", "false"],
        description: "눌림·선택 유지 ( data-state=on )",
      },
      { name: "disabled", values: ["true", "false"], description: "비활성" },
    ],
  },
  input: {
    slug: "input",
    properties: [
      {
        name: "size",
        values: ["sm", "default", "lg", "xl", "2xl"],
        description: "높이(h) · sm_h32 ~ 2xl_h48",
        valueHints: controlHints("sm", "default", "lg", "xl", "2xl"),
      },
      { name: "type", values: ["text", "email", "password", "number", "file", "…"], description: "HTML input type" },
      { name: "disabled", values: ["true", "false"], description: "비활성" },
      { name: "aria-invalid", values: ["true", "false"], description: "오류 상태" },
      { name: "placeholder", values: ["string"], description: "빈 값 안내" },
      {
        name: "hypertext",
        values: ["true", "false"],
        description: "InputHypertext 도움말 표시",
      },
    ],
  },
  label: {
    slug: "label",
    properties: [
      { name: "htmlFor", values: ["id"], description: "연결된 필드 id" },
    ],
  },
  textarea: {
    slug: "textarea",
    properties: [
      { name: "rows", values: ["number"], description: "기본 높이 (행)" },
      { name: "disabled", values: ["true", "false"], description: "비활성" },
      { name: "aria-invalid", values: ["true", "false"], description: "오류 상태" },
    ],
  },
  select: {
    slug: "select",
    properties: [
      {
        name: "size",
        values: ["sm", "default", "lg", "xl", "2xl"],
        description: "트리거 높이 · sm_h32 ~ 2xl_h48",
        valueHints: controlHints("sm", "default", "lg", "xl", "2xl"),
      },
      { name: "disabled", values: ["true", "false"], description: "비활성" },
      { name: "aria-invalid", values: ["true", "false"], description: "오류 상태" },
      { name: "placeholder", values: ["string"], description: "미선택 안내" },
    ],
  },
  checkbox: {
    slug: "checkbox",
    properties: [
      { name: "checked", values: ["true", "false", "indeterminate"], description: "선택 상태" },
      { name: "disabled", values: ["true", "false"], description: "비활성" },
      { name: "aria-invalid", values: ["true", "false"], description: "오류 상태" },
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
      { name: "checked", values: ["true", "false"], description: "켜짐/꺼짐" },
      { name: "disabled", values: ["true", "false"], description: "비활성" },
    ],
  },
  "radio-group": {
    slug: "radio-group",
    properties: [
      { name: "value", values: ["string"], description: "선택된 항목" },
      { name: "disabled", values: ["true", "false"], description: "그룹 비활성" },
      { name: "aria-invalid", values: ["true", "false"], description: "오류 상태" },
    ],
  },
  slider: {
    slug: "slider",
    properties: [
      { name: "value", values: ["number[]"], description: "현재 값" },
      { name: "min / max / step", values: ["number"], description: "범위·단계" },
      { name: "disabled", values: ["true", "false"], description: "비활성" },
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
        name: "height",
        values: ["h20"],
        description: "고정 높이 · h20",
      },
    ],
  },
  avatar: {
    slug: "avatar",
    properties: [
      {
        name: "size",
        values: ["sm", "default", "lg"],
        description: "data-size · sm_s24 / md_s32 / lg_s40",
        valueHints: avatarHints("sm", "default", "lg"),
      },
      { name: "image", values: ["있음", "없음"], description: "AvatarImage 유무 → Fallback" },
      {
        name: "fallback",
        values: ["initials", "icon"],
        description: "AvatarFallback variant · initials(기본) / icon",
      },
    ],
  },
  card: {
    slug: "card",
    properties: [
      { name: "구성", values: ["Header", "Title", "Description", "Content", "Footer"], description: "조합 가능한 서브 컴포넌트" },
    ],
  },
  tabs: {
    slug: "tabs",
    properties: [
      { name: "defaultValue", values: ["string"], description: "초기 활성 탭" },
      { name: "variant", values: ["default", "line"], description: "TabsList 스타일 ( data-variant )" },
      { name: "orientation", values: ["horizontal", "vertical"], description: "탭 배치" },
      {
        name: "list-height",
        values: ["md_h36"],
        description: "TabsList 높이 · md_h36",
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
      { name: "className", values: ["w-*", "h-*"], description: "로딩 영역 크기·형태 (px/rem)" },
    ],
  },
  "dropdown-menu": {
    slug: "dropdown-menu",
    properties: [
      { name: "align", values: ["start", "center", "end"], description: "트리거 정렬" },
      { name: "item variant", values: ["default", "destructive"], description: "메뉴 항목 스타일" },
      { name: "구성", values: ["Item", "Label", "Separator", "CheckboxItem", "…"], description: "서브 컴포넌트" },
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
      { name: "open", values: ["true", "false"], description: "표시 여부" },
      { name: "구성", values: ["Trigger", "Content", "Header", "Footer"], description: "모달 구조" },
    ],
  },
  popover: {
    slug: "popover",
    properties: [
      { name: "align", values: ["start", "center", "end"], description: "트리거 정렬" },
      { name: "open", values: ["true", "false"], description: "표시 여부" },
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
      { name: "defaultValue", values: ["string[]"], description: "초기 펼침 항목" },
    ],
  },
  alert: {
    slug: "alert",
    properties: [
      { name: "variant", values: ["default"], description: "아이콘·제목·본문 조합" },
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
  return prop.valueHints?.[value] ?? value
}
