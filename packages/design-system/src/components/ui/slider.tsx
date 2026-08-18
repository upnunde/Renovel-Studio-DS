import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "../../lib/utils"
import { uiDisabledBlock } from "../../lib/ui-disabled"

const sliderThumbClass = `relative block size-4 shrink-0 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] duration-short ease-standard select-none after:absolute after:-inset-2 hover:ring-3 data-[hovered=true]:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 group-data-disabled:border-disabled-border group-data-disabled:bg-disabled ${uiDisabledBlock}`

const sliderControlClass = `group relative flex w-full touch-none items-center select-none data-horizontal:h-4 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-4 data-vertical:flex-col ${uiDisabledBlock} data-disabled:opacity-60`

type SliderType = "default" | "range"

type SliderProps = Omit<
  SliderPrimitive.Root.Props,
  "defaultValue" | "value" | "minStepsBetweenValues"
> & {
  /** `default` 단일 값 · `range` 구간(두 thumb, Material Range Slider) */
  type?: SliderType
  defaultValue?: number | readonly number[]
  value?: number | readonly number[]
}

function getSliderDefaultValues(
  type: SliderType,
  min: number,
  max: number
): readonly [number] | readonly [number, number] {
  const span = max - min
  if (type === "range") {
    return [
      Math.round(min + span * 0.25),
      Math.round(min + span * 0.75),
    ] as const
  }
  return [Math.round((min + max) / 2)] as const
}

function normalizeSliderValues(
  type: SliderType,
  min: number,
  max: number,
  input?: number | readonly number[]
): readonly number[] {
  const fallback = getSliderDefaultValues(type, min, max)

  if (input == null) {
    return fallback
  }

  if (type === "range") {
    const raw = Array.isArray(input) ? input : [input]
    const fallbackStart = fallback[0] ?? min
    const fallbackEnd = fallback[1] ?? max
    const start = Number.isFinite(Number(raw[0])) ? Number(raw[0]) : fallbackStart
    const end = Number.isFinite(Number(raw[1])) ? Number(raw[1]) : fallbackEnd
    return start <= end ? [start, end] : [end, start]
  }

  const single = Array.isArray(input) ? input[0] : input
  return [Number(single)]
}

function Slider({
  className,
  type = "default",
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  ...props
}: SliderProps) {
  const thumbCount = type === "range" ? 2 : 1
  const normalizedValue =
    value !== undefined
      ? normalizeSliderValues(type, min, max, value)
      : undefined
  const normalizedDefaultValue =
    defaultValue !== undefined
      ? normalizeSliderValues(type, min, max, defaultValue)
      : getSliderDefaultValues(type, min, max)

  return (
    <SliderPrimitive.Root
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      data-slot="slider"
      data-type={type}
      defaultValue={normalizedValue == null ? normalizedDefaultValue : undefined}
      value={normalizedValue}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      thumbAlignment="edge"
      minStepsBetweenValues={type === "range" ? 1 : 0}
      {...props}
    >
      <SliderPrimitive.Control className={sliderControlClass}>
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-full bg-background-muted select-none data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-primary select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className={sliderThumbClass}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider, type SliderProps, type SliderType }
