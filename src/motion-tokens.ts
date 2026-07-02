export type MotionDurationToken = {
  label: string
  api: "short" | "medium" | "long"
  ms: number
  variable: string
  tailwind: string
  description: string
}

export type MotionEasingToken = {
  label: string
  api: "standard" | "emphasized-decelerate" | "emphasized-accelerate"
  value: string
  variable: string
  tailwind: string
  description: string
}

/** Duration — 안무 규칙은 ../motion-tokens.ts 상단 + 정책 문서 참고 */
export const MOTION_DURATION_SCALE: MotionDurationToken[] = [
  {
    label: "short_100",
    api: "short",
    ms: 100,
    variable: "--motion-duration-short",
    tailwind: "duration-short",
    description: "인터랙티브 상태 전환 · 컴포넌트 내부 이동 · 퇴장",
  },
  {
    label: "medium_200",
    api: "medium",
    ms: 200,
    variable: "--motion-duration-medium",
    tailwind: "duration-medium",
    description: "등장 · 토글된 영역 변경",
  },
  {
    label: "long_400",
    api: "long",
    ms: 400,
    variable: "--motion-duration-long",
    tailwind: "duration-long",
    description: "큰 표면 전환 · 페이지 트랜지션",
  },
]

/** Easing — Material standard·emphasized 곡선 차용 */
export const MOTION_EASING_SCALE: MotionEasingToken[] = [
  {
    label: "standard",
    api: "standard",
    value: "cubic-bezier(0.2, 0, 0, 1)",
    variable: "--motion-easing-standard",
    tailwind: "ease-standard",
    description: "일반 상태 전환 · 내부 이동",
  },
  {
    label: "emphasized-decelerate",
    api: "emphasized-decelerate",
    value: "cubic-bezier(0.05, 0.7, 0.1, 1)",
    variable: "--motion-easing-emphasized-decelerate",
    tailwind: "ease-emphasized-decelerate",
    description: "등장 — 처음 빠르게 들어와 천천히 안착",
  },
  {
    label: "emphasized-accelerate",
    api: "emphasized-accelerate",
    value: "cubic-bezier(0.3, 0, 0.8, 0.15)",
    variable: "--motion-easing-emphasized-accelerate",
    tailwind: "ease-emphasized-accelerate",
    description: "퇴장 — 천천히 시작해 빠르게 사라짐",
  },
]

/** 안무 규칙 — 사용처별 권장 duration·easing 조합
 *  컴포넌트 작성 시 이 매핑을 참고. tailwind 유틸은 단순 토큰명으로 사용.
 */
export type MotionChoreography = {
  scenario: string
  duration: MotionDurationToken["api"]
  easing: MotionEasingToken["api"]
  example: string
}

export const MOTION_CHOREOGRAPHY: MotionChoreography[] = [
  {
    scenario: "interactive-state",
    duration: "short",
    easing: "standard",
    example: "hover/focus/pressed · border·ring·bg 색상 전환",
  },
  {
    scenario: "internal-move",
    duration: "short",
    easing: "standard",
    example: "Switch thumb · Slider thumb · Accordion icon 회전",
  },
  {
    scenario: "exit",
    duration: "short",
    easing: "emphasized-accelerate",
    example: "Dialog/Popover/Tooltip/Dropdown 닫힘",
  },
  {
    scenario: "enter",
    duration: "medium",
    easing: "emphasized-decelerate",
    example: "Dialog/Popover/Tooltip/Dropdown 열림",
  },
  {
    scenario: "surface-transition",
    duration: "long",
    easing: "standard",
    example: "페이지 전환 · 큰 표면 변경",
  },
]

export function getMotionDuration(
  api: MotionDurationToken["api"]
): MotionDurationToken | undefined {
  return MOTION_DURATION_SCALE.find((t) => t.api === api)
}

export function getMotionEasing(
  api: MotionEasingToken["api"]
): MotionEasingToken | undefined {
  return MOTION_EASING_SCALE.find((t) => t.api === api)
}
