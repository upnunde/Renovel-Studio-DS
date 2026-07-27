import {
  FoundationOverviewPreview,
  type FoundationOverviewId,
} from "@/components/docs/foundation-overview-preview"
import { OverviewCardLink } from "@/components/docs/overview-card-link"
import { docsSpace } from "@/lib/docs-space"
import { cn } from "@/lib/utils"

type FoundationCard = {
  id: FoundationOverviewId
  title: string
  href: string
}

const FOUNDATION_CARDS: FoundationCard[] = [
  {
    id: "color-tokens",
    title: "Color Tokens",
    href: "/foundation/color-tokens",
  },
  {
    id: "color-semantic",
    title: "Color Semantic",
    href: "/foundation/color-semantic",
  },
  {
    id: "spacing",
    title: "Spacing Tokens",
    href: "/foundation/spacing",
  },
  {
    id: "spacing-semantic",
    title: "Spacing Semantic",
    href: "/foundation/spacing-semantic",
  },
  {
    id: "typography",
    title: "Typography",
    href: "/foundation/typography",
  },
  {
    id: "icons",
    title: "Icons",
    href: "/foundation/icons",
  },
  {
    id: "radius",
    title: "Radius",
    href: "/foundation/radius",
  },
  {
    id: "elevation",
    title: "Elevation",
    href: "/foundation/elevation",
  },
  {
    id: "motion",
    title: "Motion",
    href: "/foundation/motion",
  },
]

export function FoundationOverview() {
  return (
    <div
      className={cn(
        "grid w-full min-w-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        docsSpace.gap
      )}
    >
      {FOUNDATION_CARDS.map((card) => (
        <OverviewCardLink key={card.id} href={card.href} title={card.title}>
          <FoundationOverviewPreview id={card.id} />
        </OverviewCardLink>
      ))}
    </div>
  )
}
