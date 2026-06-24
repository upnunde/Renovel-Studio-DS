/**
 * 절대색 primitive — grayscale 스케일 밖 기준색
 * tokens.css · color-tokens.ts 와 동기화
 */
export const WHITE = "#FFFFFF" as const
export const BLACK = "#000000" as const

export type AbsoluteColorStep = {
  name: string
  variable: string
  css: string
  label: string
  role: string
}

function whiteOpacity(step: number, percent: number, role: string): AbsoluteColorStep {
  return {
    name: `white-opacity-${step}`,
    variable: `--white-opacity-${step}`,
    css: `rgb(255 255 255 / ${percent}%)`,
    label: `${percent}%`,
    role,
  }
}

function blackOpacity(step: number, percent: number, role: string): AbsoluteColorStep {
  return {
    name: `black-opacity-${step}`,
    variable: `--black-opacity-${step}`,
    css: `rgb(0 0 0 / ${percent}%)`,
    label: `${percent}%`,
    role,
  }
}

export const ABSOLUTE_BASE: AbsoluteColorStep[] = [
  {
    name: "white",
    variable: "--white",
    css: WHITE,
    label: WHITE,
    role: "background · card · CTA 전경",
  },
  {
    name: "black",
    variable: "--black",
    css: BLACK,
    label: BLACK,
    role: "오버레이 기준 · 최대 대비",
  },
]

/** Figma white opacity 스케일 */
export const WHITE_OPACITY_SCALE: AbsoluteColorStep[] = [
  whiteOpacity(10, 7, "은은한 하이라이트"),
  whiteOpacity(20, 11, "글래스 틴트"),
  whiteOpacity(30, 17, "오버레이 약"),
  whiteOpacity(40, 21, "오버레이"),
  whiteOpacity(50, 33, "스크림 약"),
  whiteOpacity(60, 42, "스크림"),
  whiteOpacity(70, 60, "강한 오버레이"),
  whiteOpacity(80, 72, "모달 배경 보조"),
  whiteOpacity(90, 78, "모달 배경"),
  whiteOpacity(100, 82, "거의 불투명"),
  whiteOpacity(110, 91, "거의 white"),
  whiteOpacity(120, 93, "거의 white"),
  whiteOpacity(130, 98, "거의 white"),
]

/** Figma black opacity 스케일 */
export const BLACK_OPACITY_SCALE: AbsoluteColorStep[] = [
  blackOpacity(10, 2, "스크림 최약"),
  blackOpacity(20, 7, "호버 딤"),
  blackOpacity(30, 9, "딤 약"),
  blackOpacity(40, 13, "딤"),
  blackOpacity(50, 22, "스크림"),
  blackOpacity(60, 28, "스크림 강"),
  blackOpacity(70, 42, "모달 배경"),
  blackOpacity(80, 55, "모달 배경 강"),
  blackOpacity(90, 67, "강한 딤"),
  blackOpacity(100, 75, "거의 불투명"),
  blackOpacity(110, 82, "거의 black"),
  blackOpacity(120, 88, "거의 black"),
  blackOpacity(130, 93, "거의 black"),
]

export const ABSOLUTE_COLOR_STEPS: AbsoluteColorStep[] = [
  ...ABSOLUTE_BASE,
  ...WHITE_OPACITY_SCALE,
  ...BLACK_OPACITY_SCALE,
]
