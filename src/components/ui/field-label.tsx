"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { ICONS } from "../icons"
import { Icon } from "./icon"
import { Label } from "./label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

const fieldLabelTitleVariants = cva("", {
  variants: {
    size: {
      sm: "",
      default: "",
      lg: "",
    },
    /** 합본 타이포 두께 · 500 medium · 600 semibold · 700 bold */
    weight: {
      "500": "",
      "600": "",
      "700": "",
    },
  },
  compoundVariants: [
    { size: "sm", weight: "500", class: "text-body2_500" },
    { size: "sm", weight: "600", class: "text-body2_600" },
    { size: "sm", weight: "700", class: "text-body2_700" },
    { size: "default", weight: "500", class: "text-body1_500" },
    { size: "default", weight: "600", class: "text-body1_600" },
    { size: "default", weight: "700", class: "text-body1_700" },
    { size: "lg", weight: "500", class: "text-heading5_500" },
    { size: "lg", weight: "600", class: "text-heading5_600" },
    { size: "lg", weight: "700", class: "text-heading5_700" },
  ],
  defaultVariants: {
    size: "default",
    weight: "700",
  },
})

/** FieldLabel ↔ Control 간격 · 전 size 공통 8px. InputGroup(L2)이 소유. */
export const FIELD_LABEL_CONTROL_GAP_PX = 8
export const FIELD_LABEL_CONTROL_GAP = {
  sm: { px: 8, className: "mt-2" },
  default: { px: 8, className: "mt-2" },
  lg: { px: 8, className: "mt-2" },
} as const

/** InputGroup 스택 간격 — FieldLabel↔Input · Input↔Hypertext */
export const FIELD_LABEL_CONTROL_GAP_GROUP_CLASS = "gap-2"

const fieldLabelDescriptionClassName =
  "text-body4_400 text-foreground-muted"

function normalizeFieldLabelDescription(
  description: FieldLabelProps["description"]
): string[] | null {
  if (
    description == null ||
    description === "" ||
    (typeof description === "boolean" && !description)
  ) {
    return null
  }

  if (Array.isArray(description)) {
    const lines = description
      .map((line) => String(line).trim())
      .filter((line) => line.length > 0)
      .slice(0, 3)
    return lines.length > 0 ? lines : null
  }

  return [String(description)]
}

type FieldLabelProps = Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof fieldLabelTitleVariants> & {
    children: React.ReactNode
    htmlFor?: string
    /** 필수 필드 표시 (`*`) */
    required?: boolean
    /** 라벨 아래 보조문구 (최대 3줄) — Input `aria-describedby`에 연결 권장 */
    description?: React.ReactNode | readonly string[]
    /** 정보 아이콘 툴팁 (타이틀2) */
    info?: React.ReactNode
    /** 설명 id — 미지정 시 자동 생성 */
    descriptionId?: string
  }

function FieldLabel({
  className,
  children,
  htmlFor,
  size = "default",
  weight = "700",
  required = false,
  description,
  info,
  descriptionId: descriptionIdProp,
  ...props
}: FieldLabelProps) {
  const autoId = React.useId()
  const titleClassName = fieldLabelTitleVariants({ size, weight })
  const descriptionLines = normalizeFieldLabelDescription(description)
  const hasDescription = descriptionLines != null && descriptionLines.length > 0
  const hasInfo =
    info != null && info !== "" && !(typeof info === "boolean" && !info)
  const descriptionId = hasDescription
    ? (descriptionIdProp ?? `${autoId}-description`)
    : undefined

  return (
    <div
      data-slot="field-label"
      data-size={size}
      className={cn("inline-flex flex-col items-start gap-0.5", className)}
      {...props}
    >
      <div
        data-slot="field-label-row"
        className="inline-flex items-center gap-1"
      >
        <Label htmlFor={htmlFor} className={titleClassName}>
          {children}
        </Label>
        {required ? (
          <span
            data-slot="field-label-required"
            className={cn(titleClassName, "text-destructive")}
            aria-hidden
          >
            *
          </span>
        ) : null}
        {hasInfo ? (
          <TooltipProvider delay={0}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    className="inline-flex shrink-0 rounded-full text-foreground-muted transition-colors hover:text-foreground data-[hovered=true]:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                }
                aria-label="추가 정보"
              >
                <Icon
                  icon={ICONS.info}
                  size="md"
                  className="pointer-events-none"
                />
              </TooltipTrigger>
              <TooltipContent side="top">
                {typeof info === "string" ? (
                  <span className="whitespace-pre-line">{info}</span>
                ) : (
                  info
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
      </div>
      {hasDescription ? (
        <div
          id={descriptionId}
          data-slot="field-label-description"
          className="flex flex-col"
        >
          {descriptionLines.map((line, index) => (
            <p key={index} className={fieldLabelDescriptionClassName}>
              {line}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export {
  FieldLabel,
  fieldLabelTitleVariants,
  FIELD_LABEL_CONTROL_GAP,
  FIELD_LABEL_CONTROL_GAP_GROUP_CLASS,
  FIELD_LABEL_CONTROL_GAP_PX,
  type FieldLabelProps,
}
