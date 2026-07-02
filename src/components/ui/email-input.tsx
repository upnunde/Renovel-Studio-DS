"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import type { VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { inputVariants } from "./input"

export const DEFAULT_EMAIL_DOMAINS = [
  "gmail.com",
  "naver.com",
  "daum.net",
  "kakao.com",
  "hanmail.net",
] as const

type EmailInputProps = Omit<React.ComponentProps<"input">, "size" | "type"> &
  VariantProps<typeof inputVariants> & {
    domains?: readonly string[]
  }

function EmailInput({
  className,
  size = "default",
  domains = DEFAULT_EMAIL_DOMAINS,
  value,
  defaultValue,
  onChange,
  onKeyDown,
  onBlur,
  ...props
}: EmailInputProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState(
    String(defaultValue ?? "")
  )
  const current = isControlled ? String(value ?? "") : internalValue

  const [activeIndex, setActiveIndex] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const inputId = React.useId()
  const listId = `${inputId}-suggestions`

  const { localPart, fragment, suggestions, isOpen } = React.useMemo(() => {
    const atIndex = current.indexOf("@")
    if (atIndex === -1) {
      return { localPart: "", fragment: "", suggestions: [], isOpen: false }
    }
    const localPart = current.slice(0, atIndex)
    const fragment = current.slice(atIndex + 1)
    if (!localPart) {
      return { localPart, fragment, suggestions: [], isOpen: false }
    }
    const filtered = fragment
      ? domains.filter((d) => d.startsWith(fragment) && d !== fragment)
      : [...domains]
    return {
      localPart,
      fragment,
      suggestions: filtered,
      isOpen: open && filtered.length > 0,
    }
  }, [current, domains, open])

  React.useEffect(() => {
    setActiveIndex(0)
  }, [suggestions.length])

  function commit(domain: string) {
    const next = `${localPart}@${domain}`
    if (!isControlled) setInternalValue(next)
    if (onChange) {
      const event = {
        target: { value: next, name: props.name ?? "" },
        currentTarget: { value: next, name: props.name ?? "" },
      } as React.ChangeEvent<HTMLInputElement>
      onChange(event)
    }
    setOpen(false)
  }

  return (
    <div className="relative w-full">
      <InputPrimitive
        type="email"
        data-slot="email-input"
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls={isOpen ? listId : undefined}
        aria-activedescendant={
          isOpen ? `${listId}-option-${activeIndex}` : undefined
        }
        className={cn(inputVariants({ size }), className)}
        value={current}
        onChange={(event) => {
          if (!isControlled) setInternalValue(event.target.value)
          setOpen(true)
          onChange?.(event)
        }}
        onFocus={() => setOpen(true)}
        onBlur={(event) => {
          window.setTimeout(() => setOpen(false), 120)
          onBlur?.(event)
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.defaultPrevented) return
          if (!isOpen) return
          if (event.key === "ArrowDown") {
            event.preventDefault()
            setActiveIndex((i) => (i + 1) % suggestions.length)
          } else if (event.key === "ArrowUp") {
            event.preventDefault()
            setActiveIndex(
              (i) => (i - 1 + suggestions.length) % suggestions.length
            )
          } else if (event.key === "Enter" || event.key === "Tab") {
            const domain = suggestions[activeIndex]
            if (!domain) return
            event.preventDefault()
            commit(domain)
          } else if (event.key === "Escape") {
            event.preventDefault()
            setOpen(false)
          }
        }}
        {...props}
      />
      {isOpen ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute top-full left-0 z-50 mt-1 max-h-(--available-height) w-full min-w-32 overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-none"
        >
          {suggestions.map((domain, index) => (
            <li
              key={domain}
              id={`${listId}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(event) => {
                event.preventDefault()
                commit(domain)
              }}
              onMouseEnter={() => setActiveIndex(index)}
              className={cn(
                "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none",
                index === activeIndex && "bg-accent text-accent-foreground"
              )}
            >
              <span className="text-foreground-muted">{localPart}@</span>
              <span>{domain}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export { EmailInput }
