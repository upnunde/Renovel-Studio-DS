import {
  formatAvatarSizeOption,
  formatControlSizeOption,
  formatBadgeSizeOption,
  formatRadioSizeOption,
  formatCheckboxSizeOption,
  formatSwitchSizeOption,
  CONTROL_TEXT_SIZE_APIS,
  CONTROL_FORM_SIZE_APIS,
  TABS_SIZE_APIS,
  RADIO_SIZE_APIS,
  CHECKBOX_SIZE_APIS,
  SWITCH_SIZE_APIS,
  AVATAR_SIZE_APIS,
  BADGE_SIZE_APIS,
  BADGE_SHAPE_APIS,
  BUTTON_SHAPE_APIS,
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

function radioHints(...apis: string[]) {
  return Object.fromEntries(apis.map((api) => [api, formatRadioSizeOption(api)]))
}

function checkboxHints(...apis: string[]) {
  return Object.fromEntries(apis.map((api) => [api, formatCheckboxSizeOption(api)]))
}

function switchHints(...apis: string[]) {
  return Object.fromEntries(apis.map((api) => [api, formatSwitchSizeOption(api)]))
}

export const COMPONENT_CASE_SPECS: Record<string, ComponentCaseSpec> = {
  button: {
    slug: "button",
    properties: [
      {
        name: "variant",
        values: ["default", "secondary", "outline", "ghost", "link"],
        description:
          "표현 방식 · default(솔리드 CTA) / secondary(소프트) / outline / ghost / link — primary는 deprecated(default+tone=brand)",
      },
      {
        name: "tone",
        values: ["neutral", "brand", "success", "warning", "destructive"],
        description:
          "색 역할 · neutral(inverse-muted) / brand(primary) / success / warning / destructive — variant 위계 유지",
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
        name: "children",
        values: ["string"],
        description: "버튼 라벨 (type=icon일 때는 aria-label로 사용)",
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
        description: "그룹이 자식 Button 높이를 일괄 규정 · xs_h24 ~ 2xl_h48",
        valueHints: controlHints(...CONTROL_TEXT_SIZE_APIS),
      },
      {
        name: "shape",
        values: [...BUTTON_SHAPE_APIS],
        description: "그룹 양끝 모서리 · circle(rounded-full) / square(rounded-md)",
      },
      {
        name: "composition",
        values: ["ButtonGroupText", "ButtonGroupSeparator"],
        description:
          "부가 슬롯(그룹 API 아님) · Text·Separator는 버튼 묶음 옆에 쓰는 조합 패턴",
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
        name: "tone",
        values: ["neutral", "brand"],
        description: "선택 색 · neutral=muted-strong(Figma) / brand=accent",
      },
      {
        name: "size",
        values: [...CONTROL_FORM_SIZE_APIS],
        description: "터치 영역 · sm_h32 ~ 2xl_h48",
        valueHints: controlHints(...CONTROL_FORM_SIZE_APIS),
      },
      {
        name: "withText",
        values: ["false", "true"],
        description:
          "텍스트 라벨 표시 · Playground-only · 끄면 아이콘 전용(aria-label)",
      },
      {
        name: "children",
        values: ["string"],
        description: "라벨 텍스트 (withText일 때)",
      },
      {
        name: "pressed",
        values: ["false", "true"],
        description: "눌림·선택 유지 ( data-state=on )",
      },
      { name: "disabled", values: ["false", "true"], description: "비활성" },
    ],
  },
  "toggle-group": {
    slug: "toggle-group",
    properties: [
      {
        name: "size",
        values: [...CONTROL_FORM_SIZE_APIS],
        description: "그룹이 자식 Toggle 높이를 일괄 규정 · sm_h32 ~ 2xl_h48",
        valueHints: controlHints(...CONTROL_FORM_SIZE_APIS),
      },
      {
        name: "shape",
        values: [...BUTTON_SHAPE_APIS],
        description: "그룹 양끝 모서리 · circle(rounded-full) / square(rounded-md)",
      },
      {
        name: "multiple",
        values: ["false", "true"],
        description: "false=하나만 선택(Figma Resizing) · true=여러 개 동시(굵게+기울임)",
      },
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
      {
        name: "type",
        values: ["text", "email", "password", "number", "file"],
        description:
          "HTML input type · password=PasswordInput · file=FileInput(파일 아이콘)",
      },
      { name: "disabled", values: ["false", "true"], description: "비활성" },
      { name: "readOnly", values: ["false", "true"], description: "읽기 전용 · 값은 표시·복사 가능, 편집 불가" },
      { name: "aria-invalid", values: ["false", "true"], description: "오류 상태" },
      { name: "placeholder", values: ["string"], description: "빈 값 안내" },
      {
        name: "composition",
        values: ["clearable"],
        description:
          "값 있을 때 우측 ✕ 지우기 기본 제공 · clearable={false}로 비활성 (file은 FileInput ✕)",
      },
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
        values: ["sm", "default", "lg"],
        description:
          "제목 크기 · sm 14 + Input sm · default 16 + Input default · lg 18 + Input xl · 컨트롤 간격은 InputGroup gap-2(8px) 고정",
        valueHints: {
          sm: "14",
          default: "16",
          lg: "18",
        },
      },
      {
        name: "weight",
        values: ["500", "600", "700"],
        description: "제목 두께 · 500 medium · 600 semibold · 700 bold",
        valueHints: {
          "500": "500",
          "600": "600",
          "700": "700",
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
    ],
  },
  textarea: {
    slug: "textarea",
    properties: [
      { name: "rows", values: ["number"], description: "기본 높이 (행)" },
      { name: "placeholder", values: ["string"], description: "빈 값 안내" },
      { name: "disabled", values: ["false", "true"], description: "비활성" },
      { name: "readOnly", values: ["false", "true"], description: "읽기 전용 · 값은 표시·복사 가능, 편집 불가" },
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
        values: ["default", "withText"],
        valueHints: { withText: "with text" },
        description: "default=체크박스만 · withText=체크박스+텍스트",
      },
      {
        name: "size",
        values: [...CHECKBOX_SIZE_APIS],
        valueHints: checkboxHints(...CHECKBOX_SIZE_APIS),
        description: "컨트롤 높이 · default_h20 · md_h24",
      },
      {
        name: "checked",
        values: ["false", "true"],
        description: "선택(true) · 미선택(false)",
      },
      { name: "disabled", values: ["false", "true"], description: "비활성" },
      { name: "aria-invalid", values: ["false", "true"], description: "오류 상태" },
      {
        name: "composition",
        values: ["Label"],
        description:
          "문서·시안은 체크박스 1개 기준 · 라벨은 Label과 조합",
      },
    ],
  },
  switch: {
    slug: "switch",
    properties: [
      {
        name: "size",
        values: [...SWITCH_SIZE_APIS],
        valueHints: switchHints(...SWITCH_SIZE_APIS),
        description: "트랙 높이 · sm_h16 · default_h20 · md_h24",
      },
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
        values: ["default", "withText"],
        valueHints: { withText: "with text" },
        description: "default=라디오만 · withText=라디오+텍스트",
      },
      {
        name: "size",
        values: [...RADIO_SIZE_APIS],
        valueHints: radioHints(...RADIO_SIZE_APIS),
        description: "컨트롤 높이 · default_h20 · md_h24 (그룹 일괄)",
      },
      {
        name: "checked",
        values: ["false", "true"],
        description: "선택(true) · 미선택(false, 그룹에 선택값 없음)",
      },
      { name: "disabled", values: ["false", "true"], description: "그룹 비활성" },
      { name: "aria-invalid", values: ["false", "true"], description: "오류 상태" },
      {
        name: "composition",
        values: ["Label"],
        description:
          "문서·시안은 라디오 1개 기준 · 여러 개는 소비 측에서 RadioGroupItem을 나열·간격은 className",
      },
    ],
  },
  slider: {
    slug: "slider",
    properties: [
      {
        name: "type",
        values: ["default", "range"],
        description:
          "단일 값(default) · 구간(range ≈ Material Range Slider)",
      },
      { name: "value", values: ["number"], description: "현재 값 (range: 시작)" },
      { name: "valueEnd", values: ["number"], description: "range 종료 값" },
      {
        name: "min",
        values: ["number"],
        description: "최솟값 · Material valueRange 하한",
      },
      {
        name: "max",
        values: ["number"],
        description: "최댓값 · Material valueRange 상한",
      },
      {
        name: "step",
        values: ["number"],
        description:
          "증가폭(HTML step) · M3 steps(끝점 사이 눈금 개수)와 다름",
      },
      { name: "disabled", values: ["false", "true"], description: "비활성" },
    ],
  },
  chip: {
    slug: "chip",
    properties: [
      {
        name: "variant",
        values: ["fill", "outline"],
        description:
          "표현(직교) · fill(soft 솔리드) / outline — default는 deprecated(fill)",
      },
      {
        name: "size",
        values: ["sm", "default", "xl"],
        description: "높이(h) · sm_h32 / md_h36 / xl_h40 · Button과 동일 스케일 라벨",
        valueHints: controlHints("sm", "default", "xl"),
      },
      {
        name: "shape",
        values: [...BADGE_SHAPE_APIS],
        description: "circle(rounded-full) · square(rounded-md · md_8)",
      },
      {
        name: "pressed",
        values: ["false", "true"],
        description:
          "선택 on/off (aria-pressed) · variant와 직교 — 모든 표현에서 on=inverse-muted",
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
        values: ["default", "secondary", "outline", "ghost"],
        description:
          "표현 · default(솔리드) / secondary(소프트) / outline(윤곽) / ghost — status와 조합",
      },
      {
        name: "status",
        values: ["default", "success", "warning", "destructive"],
        description:
          "색 역할 · default면 브랜드·뉴트럴 · 그 외는 variant에 맞게 솔리드/소프트/윤곽/텍스트로 적용",
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
        description:
          "circle(rounded-full) · square(size별 · h16→xs_2 · h20/h24→sm_4 · h28→md_8)",
      },
      {
        name: "children",
        values: ["string"],
        description: "배지 텍스트",
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
        name: "showLabel",
        values: ["false", "true"],
        description: "그룹 타이틀(DropdownMenuLabel) 표시 · Playground-only",
      },
      {
        name: "showIcon",
        values: ["false", "true"],
        description: "항목 선행 아이콘 · 모든 itemType에 조합 · Playground-only",
      },
      {
        name: "itemType",
        values: [
          "default",
          "shortcut",
          "disabled",
          "RadioItem",
          "CheckboxItem",
          "Sub",
        ],
        description:
          "항목 유형 · 텍스트 / 단축키 / 비활성 / 단일·복수 선택 / 서브메뉴",
      },
      {
        name: "itemVariant",
        values: ["default", "destructive"],
        description: "메뉴 항목 스타일 (itemType이 default일 때)",
      },
    ],
  },
  dialog: {
    slug: "dialog",
    properties: [
      {
        name: "showHeader",
        values: ["false", "true"],
        description: "DialogHeader · Title · Description",
      },
      {
        name: "title",
        values: ["string"],
        description: "헤더 제목 (showHeader일 때)",
      },
      {
        name: "description",
        values: ["string"],
        description: "헤더 설명 (showHeader일 때)",
      },
      {
        name: "showContent",
        values: ["false", "true"],
        description: "본문 커스텀 슬롯 · 소비처가 자유롭게 채움",
      },
      {
        name: "footerActions",
        values: ["1", "2", "3"],
        description: "푸터 버튼 구성 — 1(확인) · 2(취소+확인) · 3(취소+저장 안 함+저장 후 나가기)",
      },
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
      { name: "side", values: ["top", "right", "bottom", "left"], description: "표시 위치" },
      { name: "open", values: ["false", "true"], description: "상시 노출 · false면 hover" },
      { name: "removable", values: ["false", "true"], description: "open일 때만 ✕ 표시 · ✕·Esc로 닫기 · 바깥 클릭으로 안 닫힘" },
    ],
  },
  alert: {
    slug: "alert",
    properties: [
      {
        name: "status",
        values: ["default", "primary", "success", "warning", "destructive"],
        description:
          "의미론적 상태 톤 · default(무톤) / primary(브랜드) / 성공 / 경고 / 위험",
      },
      {
        name: "size",
        values: ["sm", "md", "lg"],
        description:
          "배너 밀도 · 상하 8/12/16 · body4/3/2 · 한 줄≈36/46/56",
        valueHints: { sm: "py8_body4", md: "py12_body3", lg: "py16_body2" },
      },
      {
        name: "type",
        values: ["default", "icon"],
        description: "레이아웃 · default=제목·설명 세로 / icon=선행 아이콘",
      },
      {
        name: "showTitle",
        values: ["false", "true"],
        description:
          "AlertTitle 표시 · Playground-only · 끄고 type=icon이면 아이콘+설명 한 줄",
      },
      {
        name: "removable",
        values: ["false", "true"],
        description:
          "인라인 닫기(✕) — 페이지에 남는 안내 · 잠깐 뜨는 알림은 Toast(Sonner)",
      },
      {
        name: "duration",
        values: ["0", "3000", "5000"],
        description:
          "removable일 때 자동 닫힘(ms) · 0=수동만 · 토스트 UX면 Sonner 권장",
      },
    ],
  },
  sonner: {
    slug: "sonner",
    properties: [
      {
        name: "type",
        values: ["default", "success", "error", "info", "warning"],
        description:
          "토스트 상태 종류(sonner API) · 페이지 고정 안내는 Alert",
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

/** Playground 컨트롤 표시명 — `name`(camelCase·HTML 속성) → 읽기 쉬운 라벨 */
export function formatSpecPropertyName(name: string): string {
  const labels: Record<string, string> = {
    composition: "구성",
    itemType: "item type",
    itemVariant: "item variant",
    itemHeight: "item-height",
    withLabel: "with label",
    withText: "with text",
    readOnly: "read only",
    info: "info",
    infoText: "info text",
    hypertextMax: "hypertext max",
    hypertextCount: "hypertext count",
    hypertextText: "hypertext text",
    captionText: "caption text",
    descriptionLines: "description lines",
    showHeader: "show header",
    showTitle: "title",
    showLabel: "title",
    showIcon: "icon",
    showContent: "show content",
    showFooter: "show footer",
    showBodyText: "show body text",
    bodyText: "body text",
    showList: "show list",
    listStyle: "list style",
    showConsent: "show consent",
    consentText: "consent text",
    showConfirmInput: "show confirm input",
    confirmPhrase: "confirm phrase",
    title: "title",
    description: "description",
    footerActions: "footer actions",
    defaultValue: "default value",
    tabCount: "tab count",
    valueEnd: "value end",
  }
  return labels[name] ?? name
}
