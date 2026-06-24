/**
 * Documentation **main content** typography only.
 * Do not use in sidebar, ModeToggle, or `src/components/ui/*` (design system).
 *
 * @see https://m3.material.io/styles/typography/type-scale-tokens
 */
export const docsType = {
  pageTitle:
    "font-heading text-[2rem] leading-10 font-semibold tracking-tight text-foreground",
  eyebrow:
    "mb-1 text-sm font-medium uppercase tracking-widest text-muted-foreground/70",
  pageDescription: "max-w-2xl text-base leading-6 text-muted-foreground",

  panelTitle:
    "font-heading text-2xl leading-8 font-semibold tracking-tight text-foreground",
  sectionTitle:
    "font-heading text-[1.375rem] leading-7 font-semibold tracking-tight text-foreground",
  sectionDescription: "text-sm leading-5 text-muted-foreground",

  groupTitle: "text-base leading-6 font-semibold text-foreground",
  groupLabel:
    "text-sm font-semibold uppercase tracking-wide text-muted-foreground",

  body: "text-base leading-6 text-foreground",
  bodyMuted: "text-sm leading-5 text-muted-foreground",

  /** M3 bodyMedium — 테이블·토큰 데이터 기본 14px */
  table: "text-sm leading-5",
  tableHeader: "text-sm leading-5 font-medium text-muted-foreground",
  tableMono: "font-mono text-sm leading-5",

  code: "font-mono text-sm leading-5",
  codeLabel: "font-mono text-sm font-medium uppercase tracking-wide text-muted-foreground",

  /** bodyMedium · medium_500 — 토큰·라벨 이름 (14px / font-medium) */
  tokenName: "font-mono text-sm leading-5 font-medium text-foreground/85",
  tokenMeta: "font-mono text-sm leading-5 text-muted-foreground/60",
} as const
