/**
 * 상태·피드백 컬러 스케일 정본 — success · warning · info · error
 * Alert · Badge · Toast · 폼 검증 등에 사용
 * tokens.css · color-tokens.ts 와 동기화
 */

export type StateColorScaleStep = {
  name: string
  variable: string
  hex: string
  role: string
}

export type StateColorFamily = {
  id: "success" | "warning" | "info" | "error"
  title: string
  description: string
  base: string
  scale: StateColorScaleStep[]
}

export const SUCCESS_BASE = "#10B981" as const

export const SUCCESS_SCALE: StateColorScaleStep[] = [
  { name: "success-950", variable: "--success-950", hex: "#022C22", role: "다크 틴트 · 강조 배경" },
  { name: "success-800", variable: "--success-800", hex: "#065F46", role: "다크 모드 본색" },
  { name: "success-600", variable: "--success-600", hex: "#059669", role: "hover · pressed" },
  { name: "success-500", variable: "--success-500", hex: SUCCESS_BASE, role: "성공 · 완료 · 확인" },
  { name: "success-400", variable: "--success-400", hex: "#34D399", role: "다크 모드 강조" },
  { name: "success-200", variable: "--success-200", hex: "#A7F3D0", role: "보더 · 아이콘 틴트" },
  { name: "success-100", variable: "--success-100", hex: "#D1FAE5", role: "서피스 틴트" },
  { name: "success-50", variable: "--success-50", hex: "#ECFDF5", role: "배경 · Alert" },
]

export const WARNING_BASE = "#F59E0B" as const

export const WARNING_SCALE: StateColorScaleStep[] = [
  { name: "warning-950", variable: "--warning-950", hex: "#451A03", role: "다크 틴트" },
  { name: "warning-800", variable: "--warning-800", hex: "#92400E", role: "다크 모드 본색" },
  { name: "warning-600", variable: "--warning-600", hex: "#D97706", role: "hover · pressed" },
  { name: "warning-500", variable: "--warning-500", hex: WARNING_BASE, role: "경고 · 주의" },
  { name: "warning-400", variable: "--warning-400", hex: "#FBBF24", role: "다크 모드 강조" },
  { name: "warning-200", variable: "--warning-200", hex: "#FDE68A", role: "보더 · 아이콘 틴트" },
  { name: "warning-100", variable: "--warning-100", hex: "#FEF3C7", role: "서피스 틴트" },
  { name: "warning-50", variable: "--warning-50", hex: "#FFFBEB", role: "배경 · Alert" },
]

export const INFO_BASE = "#0EA5E9" as const

export const INFO_SCALE: StateColorScaleStep[] = [
  { name: "info-950", variable: "--info-950", hex: "#082F49", role: "다크 틴트" },
  { name: "info-800", variable: "--info-800", hex: "#075985", role: "다크 모드 본색" },
  { name: "info-600", variable: "--info-600", hex: "#0284C7", role: "hover · pressed" },
  { name: "info-500", variable: "--info-500", hex: INFO_BASE, role: "안내 · 정보" },
  { name: "info-400", variable: "--info-400", hex: "#38BDF8", role: "다크 모드 강조" },
  { name: "info-200", variable: "--info-200", hex: "#BAE6FD", role: "보더 · 아이콘 틴트" },
  { name: "info-100", variable: "--info-100", hex: "#E0F2FE", role: "서피스 틴트" },
  { name: "info-50", variable: "--info-50", hex: "#F0F9FF", role: "배경 · Alert" },
]

export const ERROR_BASE = "#EF4444" as const

export const ERROR_SCALE: StateColorScaleStep[] = [
  { name: "error-950", variable: "--error-950", hex: "#450A0A", role: "다크 틴트" },
  { name: "error-800", variable: "--error-800", hex: "#991B1B", role: "다크 모드 본색" },
  { name: "error-600", variable: "--error-600", hex: "#DC2626", role: "hover · pressed" },
  { name: "error-500", variable: "--error-500", hex: ERROR_BASE, role: "오류 · 삭제 · destructive" },
  { name: "error-400", variable: "--error-400", hex: "#F87171", role: "다크 모드 강조" },
  { name: "error-200", variable: "--error-200", hex: "#FECACA", role: "보더 · 아이콘 틴트" },
  { name: "error-100", variable: "--error-100", hex: "#FEE2E2", role: "서피스 틴트" },
  { name: "error-50", variable: "--error-50", hex: "#FEF2F2", role: "배경 · Alert" },
]

export const STATE_COLOR_FAMILIES: StateColorFamily[] = [
  {
    id: "success",
    title: "Success",
    description: "완료 · 저장 · 검증 통과 · Toast success",
    base: SUCCESS_BASE,
    scale: SUCCESS_SCALE,
  },
  {
    id: "warning",
    title: "Warning",
    description: "주의 · 제한 · 되돌릴 수 없음 · Toast warning",
    base: WARNING_BASE,
    scale: WARNING_SCALE,
  },
  {
    id: "info",
    title: "Info",
    description: "안내 · 도움말 · 중립 알림 · Toast info",
    base: INFO_BASE,
    scale: INFO_SCALE,
  },
  {
    id: "error",
    title: "Error",
    description: "오류 · 삭제 · 폼 검증 실패 · destructive",
    base: ERROR_BASE,
    scale: ERROR_SCALE,
  },
]

export function stateColorGradientCss(scale: StateColorScaleStep[]): string {
  const steps = scale.map((s, i) => {
    const pct = (i / (scale.length - 1)) * 100
    return `${s.hex} ${pct}%`
  })
  return `linear-gradient(to right, ${steps.join(", ")})`
}
