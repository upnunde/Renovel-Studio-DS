#!/usr/bin/env bun
/**
 * DS Input — Playground 축만 (160) + 전부 Auto Layout
 *
 * size(4) × type(5) × disabled(2) × readOnly(2) × aria-invalid(2) × hypertext(2)
 * = 4 × 5 × 2 × 2 × 2 × 2 = 320
 *
 * 이름:
 *   size=…, type=…, disabled=…, readOnly=…, aria-invalid=…, hypertext=…
 *
 * Usage: bun scripts/figma-input-variants.mjs [channel]
 */
import { randomUUID } from "crypto"

const CHANNEL = process.argv[2] || "s7sjehhc"
const WS_URL = "ws://127.0.0.1:3055"

const hex = (h) => {
  const n = h.replace("#", "")
  return {
    r: parseInt(n.slice(0, 2), 16) / 255,
    g: parseInt(n.slice(2, 4), 16) / 255,
    b: parseInt(n.slice(4, 6), 16) / 255,
  }
}

const C = {
  white: hex("#ffffff"),
  board: hex("#f5f5f7"),
  title: hex("#1a1a1f"),
  label: hex("#59595e"),
  foreground: hex("#212124"),
  placeholder: hex("#959598"),
  muted: hex("#747478"),
  borderEmphasis: hex("#e7e7eb"),
  ring: hex("#f642d4"),
  disabled: hex("#f8f8fc"),
  disabledFg: hex("#a5a5a9"),
  disabledBorder: hex("#f1f4f6"),
  destructive: hex("#ef4444"),
}

const SIZES = {
  sm: { h: 32, padX: 8, font: 13, radius: 8, action: 24 },
  default: { h: 36, padX: 10, font: 14, radius: 12, action: 32 },
  xl: { h: 40, padX: 12, font: 15, radius: 12, action: 32 },
  "2xl": { h: 48, padX: 12, font: 16, radius: 12, action: 32 },
}
const TYPES = ["text", "email", "password", "number", "file"]
const BOOLS = ["false", "true"]
const FIELD_W = 240

function visualState(disabled, readOnly, ariaInvalid) {
  if (disabled === "true") return "disabled"
  if (ariaInvalid === "true") return "invalid"
  if (readOnly === "true") return "readOnly"
  return "rest"
}

function styleFor(v) {
  switch (v) {
    case "disabled":
      return { fill: C.disabled, stroke: C.disabledBorder }
    case "invalid":
      return { fill: null, stroke: C.destructive }
    case "readOnly":
      return { fill: null, stroke: C.borderEmphasis }
    default:
      return { fill: null, stroke: C.borderEmphasis }
  }
}

function caseName(c) {
  return `size=${c.size}, type=${c.type}, disabled=${c.disabled}, readOnly=${c.readOnly}, aria-invalid=${c.ariaInvalid}, hypertext=${c.hypertext}`
}

function buildCases() {
  const cases = []
  for (const size of Object.keys(SIZES)) {
    for (const type of TYPES) {
      for (const disabled of BOOLS) {
        for (const readOnly of BOOLS) {
          for (const ariaInvalid of BOOLS) {
            for (const hypertext of BOOLS) {
              cases.push({ size, type, disabled, readOnly, ariaInvalid, hypertext })
            }
          }
        }
      }
    }
  }
  return cases
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const extractId = (d) => d?.id || d?.message?.id || null
const extractResult = (d) => {
  if (d?.result !== undefined) return d.result
  if (d?.message && typeof d.message === "object" && "result" in d.message)
    return d.message.result
  return undefined
}

async function main() {
  const pending = new Map()
  const ws = new WebSocket(WS_URL)
  await new Promise((resolve, reject) => {
    ws.onopen = resolve
    ws.onerror = reject
    setTimeout(() => reject(new Error("WS connect timeout")), 10000)
  })

  ws.onmessage = (ev) => {
    let data
    try {
      data = JSON.parse(String(ev.data))
    } catch {
      return
    }
    const id = extractId(data)
    if (!id || !pending.has(id)) return
    const msg = typeof data.message === "object" ? data.message : null
    const err = data.error || msg?.error || null
    const result = extractResult(data)
    if (result === undefined && !err) {
      if (msg?.command && !("result" in (msg || {}))) return
      if (data.type === "broadcast" && msg && !("result" in msg)) return
      return
    }
    const p = pending.get(id)
    clearTimeout(p.timer)
    pending.delete(id)
    if (err) p.reject(new Error(typeof err === "string" ? err : JSON.stringify(err)))
    else p.resolve(result)
  }

  function send(command, params = {}, timeoutMs = 90000) {
    return new Promise((resolve, reject) => {
      const id = randomUUID()
      const timer = setTimeout(() => {
        pending.delete(id)
        reject(new Error(`timeout: ${command}`))
      }, timeoutMs)
      pending.set(id, { resolve, reject, timer })
      ws.send(
        JSON.stringify(
          command === "join"
            ? {
                id,
                type: "join",
                channel: params.channel,
                message: {
                  id,
                  command: "join",
                  params: { ...params, commandId: id },
                },
              }
            : {
                id,
                type: "message",
                channel: CHANNEL,
                message: { id, command, params: { ...params, commandId: id } },
              }
        )
      )
    })
  }

  async function sendRetry(command, params = {}, tries = 4) {
    let last
    for (let i = 0; i < tries; i++) {
      try {
        return await send(command, params)
      } catch (e) {
        last = e
        await sleep(120 + i * 180)
      }
    }
    throw last
  }

  function frameId(res) {
    return res?.id || res?.node_id || res?.nodeId || res?.result?.id
  }

  /** HORIZONTAL field — hug/fixed + padding + spacing */
  async function makeField(parentId, c, w = FIELD_W) {
    const sz = SIZES[c.size]
    const v = visualState(c.disabled, c.readOnly, c.ariaInvalid)
    const st = styleFor(v)
    const filled = c.readOnly === "true"
    const disabled = v === "disabled"

    let valueText = "Placeholder"
    if (c.type === "file") valueText = filled ? "document.pdf" : "Select file"
    else if (c.type === "email") valueText = filled ? "name@email.com" : "name@email.com"
    else if (c.type === "password") valueText = filled ? "••••••••" : "Password"
    else if (c.type === "number") valueText = filled ? "0" : "0"
    else valueText = filled ? "Value" : "Placeholder"

    const fg = disabled
      ? C.disabledFg
      : filled
        ? C.foreground
        : C.placeholder

    const field = await sendRetry("create_frame", {
      x: 0,
      y: 0,
      width: w,
      height: sz.h,
      name: "field",
      parentId,
      fillColor: st.fill ? { ...st.fill, a: 1 } : { r: 1, g: 1, b: 1, a: 0.001 },
      strokeColor: { ...st.stroke, a: 1 },
      strokeWeight: 1,
      layoutMode: "HORIZONTAL",
      layoutSizingHorizontal: "FIXED",
      layoutSizingVertical: "FIXED",
      primaryAxisAlignItems: "SPACE_BETWEEN",
      counterAxisAlignItems: "CENTER",
      paddingLeft: sz.padX,
      paddingRight: sz.padX,
      paddingTop: 0,
      paddingBottom: 0,
      itemSpacing: 8,
    })
    const fid = frameId(field)
    await sendRetry("set_corner_radius", { nodeId: fid, radius: sz.radius })

    // leading: file icon + value (FILL은 생성 직후 부모 AL 미적용으로 실패 → HUG)
    const leading = await sendRetry("create_frame", {
      x: 0,
      y: 0,
      width: 160,
      height: sz.h - 2,
      name: "leading",
      parentId: fid,
      fillColor: { r: 1, g: 1, b: 1, a: 0.001 },
      layoutMode: "HORIZONTAL",
      layoutSizingHorizontal: "HUG",
      layoutSizingVertical: "HUG",
      primaryAxisAlignItems: "MIN",
      counterAxisAlignItems: "CENTER",
      itemSpacing: 8,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    })
    const lid = frameId(leading)

    if (c.type === "file") {
      await sendRetry("create_text", {
        x: 0,
        y: 0,
        text: "▣",
        fontSize: 14,
        fontWeight: 500,
        fontColor: { ...(disabled ? C.disabledFg : C.foreground), a: 1 },
        name: "file-icon",
        parentId: lid,
      })
    }

    await sendRetry("create_text", {
      x: 0,
      y: 0,
      text: valueText,
      fontSize: sz.font,
      fontWeight: 400,
      fontColor: { ...fg, a: 1 },
      name: "value",
      parentId: lid,
    })

    // trailing actions
    if (c.type === "password" || (c.type === "file" && filled && !disabled)) {
      const trailing = await sendRetry("create_frame", {
        x: 0,
        y: 0,
        width: sz.action,
        height: sz.action,
        name: "trailing",
        parentId: fid,
        fillColor: { r: 1, g: 1, b: 1, a: 0.001 },
        layoutMode: "HORIZONTAL",
        layoutSizingHorizontal: "HUG",
        layoutSizingVertical: "HUG",
        primaryAxisAlignItems: "CENTER",
        counterAxisAlignItems: "CENTER",
        itemSpacing: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      })
      const tid = frameId(trailing)
      await sendRetry("create_text", {
        x: 0,
        y: 0,
        text: c.type === "password" ? "👁" : "✕",
        fontSize: 12,
        fontWeight: 500,
        fontColor: { ...(disabled ? C.disabledFg : C.muted), a: 1 },
        name: "action-icon",
        parentId: tid,
      })
    }

    return fid
  }

  /** VERTICAL case wrap: field + optional hypertext */
  async function makeCase(x, y, c, parentId) {
    const wrap = await sendRetry("create_frame", {
      x,
      y,
      width: FIELD_W,
      height: 80,
      name: caseName(c),
      parentId,
      fillColor: { r: 1, g: 1, b: 1, a: 0.001 },
      layoutMode: "VERTICAL",
      layoutSizingHorizontal: "FIXED",
      layoutSizingVertical: "HUG",
      primaryAxisAlignItems: "MIN",
      counterAxisAlignItems: "MIN",
      itemSpacing: 8,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    })
    const wid = frameId(wrap)
    await makeField(wid, c, FIELD_W)

    if (c.hypertext === "true") {
      const htFg =
        c.ariaInvalid === "true"
          ? C.destructive
          : c.disabled === "true"
            ? C.disabledFg
            : C.placeholder
      const ht = await sendRetry("create_frame", {
        x: 0,
        y: 0,
        width: FIELD_W,
        height: 20,
        name: "hypertext",
        parentId: wid,
        fillColor: { r: 1, g: 1, b: 1, a: 0.001 },
        layoutMode: "HORIZONTAL",
        layoutSizingHorizontal: "FIXED",
        layoutSizingVertical: "HUG",
        primaryAxisAlignItems: "SPACE_BETWEEN",
        counterAxisAlignItems: "CENTER",
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 0,
        paddingBottom: 0,
        itemSpacing: 8,
      })
      const hid = frameId(ht)
      await sendRetry("create_text", {
        x: 0,
        y: 0,
        text: "Helper text",
        fontSize: 12,
        fontWeight: 400,
        fontColor: { ...htFg, a: 1 },
        name: "hypertext-message",
        parentId: hid,
      })
      await sendRetry("create_text", {
        x: 0,
        y: 0,
        text: "0/30",
        fontSize: 12,
        fontWeight: 400,
        fontColor: { ...C.placeholder, a: 1 },
        name: "hypertext-counter",
        parentId: hid,
      })
    }

    return wid
  }

  async function sectionCard(parentId, name, title, y, height = 160) {
    const sec = await sendRetry("create_frame", {
      x: 0,
      y: 0,
      width: 856,
      height,
      name,
      parentId,
      fillColor: { ...C.white, a: 1 },
      layoutMode: "VERTICAL",
      layoutSizingHorizontal: "FIXED",
      layoutSizingVertical: "HUG",
      primaryAxisAlignItems: "MIN",
      counterAxisAlignItems: "MIN",
      itemSpacing: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      paddingBottom: 16,
    })
    const sid = frameId(sec)
    await sendRetry("create_text", {
      x: 0,
      y: 0,
      text: title,
      fontSize: 20,
      fontWeight: 700,
      fontColor: { ...C.title, a: 1 },
      name: "section-title",
      parentId: sid,
    })
    return sid
  }

  async function labeledRow(parentId, labels, builders) {
    const row = await sendRetry("create_frame", {
      x: 0,
      y: 0,
      width: 824,
      height: 100,
      name: "row",
      parentId,
      fillColor: { r: 1, g: 1, b: 1, a: 0.001 },
      layoutMode: "HORIZONTAL",
      layoutSizingHorizontal: "FIXED",
      layoutSizingVertical: "HUG",
      primaryAxisAlignItems: "MIN",
      counterAxisAlignItems: "MIN",
      itemSpacing: 16,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    })
    const rid = frameId(row)
    for (let i = 0; i < labels.length; i++) {
      const cell = await sendRetry("create_frame", {
        x: 0,
        y: 0,
        width: 150,
        height: 90,
        name: `cell-${labels[i]}`,
        parentId: rid,
        fillColor: { r: 1, g: 1, b: 1, a: 0.001 },
        layoutMode: "VERTICAL",
        layoutSizingHorizontal: "HUG",
        layoutSizingVertical: "HUG",
        primaryAxisAlignItems: "MIN",
        counterAxisAlignItems: "MIN",
        itemSpacing: 8,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      })
      const cid = frameId(cell)
      await sendRetry("create_text", {
        x: 0,
        y: 0,
        text: labels[i],
        fontSize: 13,
        fontWeight: 700,
        fontColor: { ...C.label, a: 1 },
        name: "label",
        parentId: cid,
      })
      await builders[i](cid)
      await sleep(15)
    }
    return rid
  }

  console.log(await sendRetry("join", { channel: CHANNEL }))
  await sleep(400)

  const doc = await sendRetry("get_document_info", {})
  const victims = (doc?.children || [])
    .filter((c) => {
      const n = c.name || ""
      return (
        n === "DS Input Component" ||
        n === "row" ||
        n.startsWith("type=") ||
        n.startsWith("size=")
      )
    })
    .map((c) => c.id)
  if (victims.length) {
    console.log(`deleting ${victims.length} old input nodes`)
    for (let i = 0; i < victims.length; i += 40) {
      await sendRetry("delete_multiple_nodes", {
        nodeIds: victims.slice(i, i + 40),
      })
    }
  }

  // ========== 정책서 (Auto Layout) ==========
  const board = await sendRetry("create_frame", {
    x: 6100,
    y: 0,
    width: 920,
    height: 1200,
    name: "DS Input Component",
    fillColor: { ...C.board, a: 1 },
    layoutMode: "VERTICAL",
    layoutSizingHorizontal: "FIXED",
    layoutSizingVertical: "HUG",
    primaryAxisAlignItems: "MIN",
    counterAxisAlignItems: "MIN",
    itemSpacing: 16,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 32,
    paddingBottom: 32,
  })
  const bid = frameId(board)
  console.log("policy", bid)

  await sendRetry("create_text", {
    x: 0,
    y: 0,
    text: "DS Input Component",
    fontSize: 28,
    fontWeight: 700,
    fontColor: { ...C.title, a: 1 },
    name: "Text",
    parentId: bid,
  })
  await sendRetry("create_text", {
    x: 0,
    y: 0,
    text: "Playground · size×type×disabled×readOnly×aria-invalid×hypertext = 320",
    fontSize: 13,
    fontWeight: 400,
    fontColor: { ...C.muted, a: 1 },
    name: "subtitle",
    parentId: bid,
  })

  // Type
  {
    const sid = await sectionCard(
      bid,
      "Section: Type",
      "Type (size=default, flags=false)"
    )
    await labeledRow(
      sid,
      TYPES,
      TYPES.map(
        (type) => (parent) =>
          makeField(parent, {
            size: "default",
            type,
            disabled: "false",
            readOnly: "false",
            ariaInvalid: "false",
            hypertext: "false",
          }, 150)
      )
    )
  }

  // Size
  {
    const sid = await sectionCard(
      bid,
      "Section: Size Ladder",
      "Size Ladder (type=text, flags=false)"
    )
    const sizeKeys = Object.keys(SIZES)
    await labeledRow(
      sid,
      sizeKeys,
      sizeKeys.map(
        (size) => (parent) =>
          makeField(parent, {
            size,
            type: "text",
            disabled: "false",
            readOnly: "false",
            ariaInvalid: "false",
            hypertext: "false",
          }, 150)
      )
    )
  }

  // Flags
  {
    const sid = await sectionCard(
      bid,
      "Section: Flags",
      "Flags (size=default, type=text)"
    )
    const flags = [
      { label: "rest", disabled: "false", readOnly: "false", ariaInvalid: "false" },
      { label: "disabled", disabled: "true", readOnly: "false", ariaInvalid: "false" },
      { label: "readOnly", disabled: "false", readOnly: "true", ariaInvalid: "false" },
      { label: "aria-invalid", disabled: "false", readOnly: "false", ariaInvalid: "true" },
      { label: "hypertext", disabled: "false", readOnly: "false", ariaInvalid: "false", hypertext: "true" },
    ]
    await labeledRow(
      sid,
      flags.map((f) => f.label),
      flags.map(
        (f) => (parent) =>
          makeCase(0, 0, {
            size: "default",
            type: "text",
            disabled: f.disabled,
            readOnly: f.readOnly,
            ariaInvalid: f.ariaInvalid,
            hypertext: f.hypertext || "false",
          }, parent)
      )
    )
  }

  // ========== 160 flat cases ==========
  const cases = buildCases()
  console.log(`creating ${cases.length} variant frames (auto layout)…`)
  if (cases.length !== 320) {
    console.warn(`expected 320, got ${cases.length}`)
  }

  const OX = 6100
  const OY = 1100
  const COLS = 8
  const COL_W = 260
  const ROW_H = 100

  let made = 0
  for (let i = 0; i < cases.length; i++) {
    const c = cases[i]
    const col = i % COLS
    const row = Math.floor(i / COLS)
    await makeCase(OX + col * COL_W, OY + row * ROW_H, c, undefined)
    made++
    if (made % 20 === 0 || made === cases.length) console.log(`  ${made}/${cases.length}`)
    await sleep(12)
  }

  console.log(`DONE policy + ${made} flat cases (auto layout)`)
  ws.close()
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
