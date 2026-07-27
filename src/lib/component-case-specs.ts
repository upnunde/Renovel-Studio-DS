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
        values: ["default", "primary", "secondary", "outline", "ghost", "link"],
        description: "시각적 위계 · 기본(foreground) / 브랜드 강조 / 보조 / 윤곽 / 최소 / 링크",
      },
      {
        name: "status",
        values: ["default", "success", "warning", "destructive"],
        description:
          "의미론적 상태 톤 (variant와 직교) · default(무톤) / 성공(성공 컨테이너) / 경고 / 위험",
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
        description: "정보 아이콘·툴팁 (타이틀2) · true면 info 문구 입력",
      },
      {
        name: "infoText",
        values: ["string"],
        description: "툴팁 문구 (info: true일 때 FieldLabel info prop)",
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
      {
        name: "type",
        values: ["icon", "default"],
        description: "icon=컨트롤만 · default=컨트롤+텍스트",
      },
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
      {
        name: "type",
        values: ["icon", "default"],
        description: "icon=컨트롤만 · default=컨트롤+텍스트",
      },
      { name: "value", values: ["a", "b"], description: "선택된 항목" },
      { name: "disabled", values: ["false", "true"], description: "그룹 비활성" },
      { name: "aria-invalid", values: ["false", "true"], description: "오류 상태" },
    ],
  },
  slider: {
    slug: "slider",
    properties: [
      {
        name: "type",
        values: ["default", "range"],
        description: "단일 값(default) · 구간(range, Material Range Slider)",
      },
      { name: "value", values: ["number"], description: "현재 값 (range: 시작)" },
      { name: "valueEnd", values: ["number"], description: "range 종료 값" },
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
        name: "shape",
        values: [...BADGE_SHAPE_APIS],
        description: "circle(rounded-full) · square(rounded-md · md_8)",
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
        values: ["default", "secondary", "outline", "ghost", "link"],
        description: "시각적 위계 · 강조 / 보조 / 윤곽 / 최소 / 링크",
      },
      {
        name: "status",
        values: ["default", "success", "warning", "destructive"],
        description:
          "의미론적 상태 톤 (variant와 직교) · default(무톤) / 성공 / 경고 / 위험",
      },
      {
        name: "size",
        values: [...BADGE_SIZE_APIS],
        description: "높이(h)·타이포 · sm_h16·caption2 / default_h20·caption2 / md_h24·caption1 / lg_h28·body3",
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
      {
        name: "type",
        values: ["image", "initials", "icon"],
        description: "image · AvatarImage / initials · 이니셜 / icon · 아이콘",
      },
      {
        name: "initials",
        values: ["string"],
        description: "이니셜 · 한글 최대 2자 · 영문 최대 3자",
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
        name: "open",
        values: ["false", "true"],
        description: "표시 여부 · DropdownMenuTrigger가 aria-expanded 자동 설정",
      },
      {
        name: "itemType",
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
      {
        name: "itemVariant",
        values: ["default", "destructive"],
        description: "메뉴 항목 스타일 (itemType이 default일 때)",
      },
      {
        name: "composition",
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
        name: "itemHeight",
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
        description: "푸터 버튼 구성 — 1(확인) · 2(취소+확인) · 3(취소+저장 안 함+저장 후 나가기)",
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
      {
        name: "mode",
        values: ["hover", "removable"],
        description:
          "hover · 호버 시에만 잠깐 표시 / removable · 클릭으로 열고 ✕로 닫기",
        valueHints: {
          hover: "호버",
          removable: "X로 닫기",
        },
      },
      { name: "side", values: ["top", "right", "bottom", "left"], description: "표시 위치" },
      { name: "open", values: ["false", "true"], description: "표시 여부 (미리보기 고정)" },
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
        values: ["default"],
        description: "시각적 위계 · 기본 카드 톤",
      },
      {
        name: "status",
        values: ["default", "success", "warning", "destructive"],
        description:
          "의미론적 상태 톤 · default(무톤) / 성공 / 경고 / 위험",
      },
      {
        name: "type",
        values: ["default", "icon"],
        description: "아이콘 유무",
      },
      {
        name: "removable",
        values: ["false", "true"],
        description: "닫기(✕) — 수동 또는 duration 자동 닫힘",
      },
      {
        name: "duration",
        values: ["0", "3000", "5000"],
        description: "자동 닫힘(ms) · 0=수동만 · removable일 때",
      },
    ],
  },
  sonner: {
    slug: "sonner",
    properties: [
      { name: "type", values: ["default", "success", "error", "info", "warning"], description: "토스트 팝업 종류" },
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

/** Playground 컨트롤 표시명 — `name`(camelCase·HTML 속성) → 읽기 쉬운 라벨 */
export function formatSpecPropertyName(name: string): string {
  const labels: Record<string, string> = {
    composition: "구성",
    itemType: "item type",
    itemVariant: "item variant",
    itemHeight: "item-height",
    htmlFor: "htmlFor",
    info: "info",
    infoText: "info text",
    hypertextMax: "hypertext max",
    hypertextCount: "hypertext count",
    hypertextText: "hypertext text",
    captionText: "caption text",
    descriptionLines: "description lines",
    footerActions: "footer actions",
    showHeader: "show header",
    showContent: "show content",
    showFooter: "show footer",
    showBodyText: "show body text",
    showList: "show list",
    listStyle: "list style",
    showConsent: "show consent",
    consentText: "consent text",
    showConfirmInput: "show confirm input",
    confirmPhrase: "confirm phrase",
    defaultValue: "default value",
    tabCount: "tab count",
    valueEnd: "value end",
    mode: "동작",
  }
  return labels[name] ?? name
}
