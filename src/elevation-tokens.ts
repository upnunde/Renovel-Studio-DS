export type ElevationToken = {
  /** 표시용 라벨 — elevation-10 */
  label: string
  /** 단계 — 10 | 20 | 30 | 40 | 50 | 60 */
  level: 10 | 20 | 30 | 40 | 50 | 60
  variable: `--shadow-elevation-${10 | 20 | 30 | 40 | 50 | 60}`
  /** Tailwind shadow 유틸 */
  className: `shadow-elevation-${10 | 20 | 30 | 40 | 50 | 60}`
  /** 라이트 모드 box-shadow 값 (정본은 tokens.css) */
  light: string
  /** 다크 모드 box-shadow 값 */
  dark: string
  description: string
}

/**
 * Elevation — Material 결 6단계 그림자.
 * CSS 정본: tokens.css · Tailwind: shadow-elevation-* (theme.css)
 */
export const ELEVATION_SCALE: ElevationToken[] = [
  {
    label: "elevation-10",
    level: 10,
    variable: "--shadow-elevation-10",
    className: "shadow-elevation-10",
    light: "0px 1px 2px 1px rgba(0, 0, 0, 0.06)",
    dark: "0px 1px 2px 1px rgba(0, 0, 0, 0.32)",
    description: "카드·인풋 호버",
  },
  {
    label: "elevation-20",
    level: 20,
    variable: "--shadow-elevation-20",
    className: "shadow-elevation-20",
    light: "0px 2px 4px 2px rgba(0, 0, 0, 0.06)",
    dark: "0px 2px 4px 2px rgba(0, 0, 0, 0.32)",
    description: "살짝 떠 있는 표면",
  },
  {
    label: "elevation-30",
    level: 30,
    variable: "--shadow-elevation-30",
    className: "shadow-elevation-30",
    light: "0px 4px 8px 3px rgba(0, 0, 0, 0.06)",
    dark: "0px 4px 8px 3px rgba(0, 0, 0, 0.32)",
    description: "드롭다운·팝오버",
  },
  {
    label: "elevation-40",
    level: 40,
    variable: "--shadow-elevation-40",
    className: "shadow-elevation-40",
    light: "0px 8px 12px 4px rgba(0, 0, 0, 0.06)",
    dark: "0px 8px 12px 4px rgba(0, 0, 0, 0.32)",
    description: "부유 패널 강조",
  },
  {
    label: "elevation-50",
    level: 50,
    variable: "--shadow-elevation-50",
    className: "shadow-elevation-50",
    light: "0px 8px 16px 6px rgba(0, 0, 0, 0.06)",
    dark: "0px 8px 16px 6px rgba(0, 0, 0, 0.32)",
    description: "모달·바텀시트",
  },
  {
    label: "elevation-60",
    level: 60,
    variable: "--shadow-elevation-60",
    className: "shadow-elevation-60",
    light: "0px 12px 24px 8px rgba(0, 0, 0, 0.06)",
    dark: "0px 12px 24px 8px rgba(0, 0, 0, 0.32)",
    description: "최상위 오버레이",
  },
]
