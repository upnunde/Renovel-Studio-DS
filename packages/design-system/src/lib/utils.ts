import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/** typography.css @utility 와 동기화 — text-body4_400 등 커스텀 타이포 유틸 */
const TYPOGRAPHY_LEVELS = [
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "body1",
  "body2",
  "body3",
  "body4",
  "caption1",
  "caption2",
] as const

const TYPOGRAPHY_WEIGHTS = ["700", "500", "400"] as const

const typographyTextSizes = TYPOGRAPHY_LEVELS.flatMap((level) =>
  TYPOGRAPHY_WEIGHTS.map((weight) => `${level}_${weight}`)
)

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: typographyTextSizes }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
