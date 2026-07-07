/**
 * Documentation **main content** spacing.
 * 20px (`p-5` / `space-y-5`) — section rhythm, table body cells, card shells.
 * Table headers — `py-2` (8px vertical).
 * Page shell — `px-5` (20px) · `pt-10 pb-10` (40px vertical) · `gap-10` (40px stack).
 * Tighter tokens — labels, chips, control fields (not 20px).
 * Do not use in sidebar or `src/components/ui/*`.
 */
export const docsSpace = {
  pageStack: "flex flex-col gap-10",
  pagePad: "px-5 pt-10 pb-10",
  stack: "space-y-5",
  /** stack과 동일 20px — 자식 margin 대신 gap (제목·케이스 그룹 등) */
  stackGap: "flex flex-col gap-5",
  /** Color·토큰 그룹 섹션 간격 — 10_40 · 40px */
  groupStack: "space-y-10",
  gap: "gap-5",
  pad: "p-5",
  padX: "px-5",
  padY: "py-5",
  /** ComponentCase flush — 가변 프레임 안에 미리보기(모달 등) 중앙 배치 */
  caseFlushFrame: "flex w-full justify-center",
  /** Table body cell — 좌우 20px · 상하 20px */
  tableCell: "px-5 py-5",
  /** Table header cell — 좌우 20px · 상하 8px (token 2) */
  tableHeaderCell: "px-5 py-2",
  /** Showcase·카드 헤더 — 좌우 20px · 상하 12px (token 3) */
  cardHeader: "px-5 py-3",
  headerBottom: "pb-0",

  /** Label → control, description → input · 2px */
  fieldStack: "space-y-0.5",
  /** Playground / form control list */
  controlStack: "space-y-5",
  /** Badges, chips, case meta row */
  inlineGap: "gap-2",
  /** ComponentCaseGrid — case 카드 그리드 간격 · 12px */
  caseGridGap: "gap-3",
  /** ComponentCaseGroup — 라벨 ↔ 케이스 · 8px (그룹 간격은 부모 stack/gap) */
  caseGroupStack: "space-y-2",
  /** Preview hint, stacked demo pieces */
  previewGap: "gap-3",
} as const
