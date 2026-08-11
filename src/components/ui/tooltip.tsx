"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "../../lib/utils"
import { Icon } from "./icon"
import { ICONS } from "../icons"

const TooltipRemovableContext =
  React.createContext<React.RefObject<TooltipPrimitive.Root.Actions | null> | null>(
    null
  )

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

type TooltipProps = TooltipPrimitive.Root.Props & {
  /** 클릭으로 열고 닫기 전까지 유지 — 콘텐츠에 닫기(✕) 버튼 표시 */
  removable?: boolean
}

function Tooltip({
  removable = false,
  disableHoverablePopup,
  onOpenChange,
  actionsRef: actionsRefProp,
  ...props
}: TooltipProps) {
  const removableActionsRef = React.useRef<TooltipPrimitive.Root.Actions>(null)

  const handleOpenChange = React.useCallback(
    (
      open: boolean,
      eventDetails: TooltipPrimitive.Root.ChangeEventDetails
    ) => {
      if (removable) {
        if (
          eventDetails.reason === "trigger-hover" ||
          eventDetails.reason === "trigger-focus"
        ) {
          eventDetails.cancel()
          return
        }

        if (
          !open &&
          eventDetails.reason !== "escape-key" &&
          eventDetails.reason !== "outside-press" &&
          eventDetails.reason !== "imperative-action"
        ) {
          eventDetails.cancel()
          return
        }
      }

      onOpenChange?.(open, eventDetails)
    },
    [removable, onOpenChange]
  )

  return (
    <TooltipRemovableContext.Provider
      value={removable ? removableActionsRef : null}
    >
      <TooltipPrimitive.Root
        data-slot="tooltip"
        data-removable={removable ? "" : undefined}
        disableHoverablePopup={
          removable ? true : disableHoverablePopup
        }
        onOpenChange={removable ? handleOpenChange : onOpenChange}
        actionsRef={removable ? removableActionsRef : actionsRefProp}
        {...props}
      />
    </TooltipRemovableContext.Provider>
  )
}

function TooltipTrigger({
  closeOnClick,
  ...props
}: TooltipPrimitive.Trigger.Props) {
  const removableActionsRef = React.useContext(TooltipRemovableContext)
  const isRemovable = removableActionsRef !== null

  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      closeOnClick={isRemovable ? false : closeOnClick}
      {...props}
    />
  )
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  removable: removableProp,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    /** Root `removable`과 별도로 닫기 버튼만 표시할 때 */
    removable?: boolean
  }) {
  const removableActionsRef = React.useContext(TooltipRemovableContext)
  const showDismiss = removableProp ?? removableActionsRef !== null

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-inverse px-3 py-1.5 text-xs text-inverse-foreground has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-[state=delayed-open]:duration-medium data-[state=delayed-open]:ease-emphasized-decelerate data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-open:duration-medium data-open:ease-emphasized-decelerate data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:duration-short data-closed:ease-emphasized-accelerate",
            showDismiss && "pr-1.5",
            className
          )}
          {...props}
        >
          {children}
          {showDismiss ? (
            <button
              type="button"
              data-slot="tooltip-dismiss"
              className="inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-inverse-foreground/80 transition-colors hover:bg-inverse-foreground/10 hover:text-inverse-foreground"
              aria-label="닫기"
              onClick={() => removableActionsRef?.current?.close()}
            >
              <Icon icon={ICONS.close} size="md" />
            </button>
          ) : null}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
