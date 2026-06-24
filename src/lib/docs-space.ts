/**
 * Documentation **main content** spacing.
 * 20px (`p-5` / `space-y-5`) — page padding, section rhythm, table cells, card shells.
 * Tighter tokens — labels, chips, control fields (not 20px).
 * Do not use in sidebar or `src/components/ui/*`.
 */
export const docsSpace = {
  pageStack: "space-y-5",
  pagePad: "px-5 py-5",
  stack: "space-y-5",
  /** Color·토큰 그룹 섹션 간격 — 10_40 · 40px */
  groupStack: "space-y-10",
  gap: "gap-5",
  pad: "p-5",
  padX: "px-5",
  padY: "py-5",
  tableCell: "px-5 py-5",
  cardHeader: "px-5 py-5",
  headerBottom: "pb-5",

  /** Label → control, description → input */
  fieldStack: "space-y-2",
  /** Playground / form control list */
  controlStack: "space-y-4",
  /** Badges, chips, case meta row */
  inlineGap: "gap-2",
  /** ComponentCaseGrid — case 카드 그리드 간격 · 8px */
  caseGridGap: "gap-2",
  /** ComponentCaseGroup — 라벨 ↔ 케이스 · 8px */
  caseGroupStack: "space-y-2",
  /** ComponentCaseGroup — 그룹 하단 여백 · 20px */
  caseGroupBottom: "mb-5 last:mb-0",
  /** Preview hint, stacked demo pieces */
  previewGap: "gap-3",
} as const
