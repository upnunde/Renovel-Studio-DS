#!/usr/bin/env bun
/**
 * DS Input 정책서만 Button 템플릿에 맞춰 재작성.
 * (회색 보드 + 흰 Section 카드 + 28px 타이틀)
 * 하단 size=* 플랫 배리언트 프레임은 유지.
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
  board: hex("#f5f5f7"),
  white: hex("#ffffff"),
  title: hex("#1a1a1f"),
  label: hex("#59595e"),
  placeholder: hex("#959598"),
  foreground: hex("#212124"),
  borderEmphasis: hex("#e7e7eb"),
  ring: hex("#f642d4"),
  disabled: hex("#f8f8fc"),
  disabledFg: hex("#a5a5a9"),
  disabledBorder: hex("#f1f4f6"),
  destructive: hex("#ef4444"),
  muted: hex("#747478"),
}

const SIZES = {
  sm: { h: 32, padX: 8, font: 13, radius: 8, clear: 24 },
  default: { h: 36, padX: 10, font: 14, radius: 12, clear: 32 },
  xl: { h: 40, padX: 12, font: 15, radius: 12, clear: 32 },
  "2xl": { h: 48, padX: 12, font: 16, radius: 12, clear: 32 },
}

function styleFor(state) {
  switch (state) {
    case "focus":
      return { fill: null, stroke: C.ring }
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const extractId = (d) => d?.id || d?.message?.id || null
const extractResult = (d) => {
  if (d?.result !== undefined) return d.result
  if (d?.message && typeof d.message === "object" && "result" in d.message) return d.message.result
  return undefined
}

async function main() {
  const pending = new Map()
  const ws = new WebSocket(WS_URL)
  await new Promise((res, rej) => {
    ws.onopen = res
    ws.onerror = rej
    setTimeout(() => rej(new Error("WS timeout")), 10000)
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

  function send(command, params = {}) {
    return new Promise((resolve, reject) => {
      const id = randomUUID()
      const timer = setTimeout(() => {
        pending.delete(id)
        reject(new Error(`timeout ${command}`))
      }, 60000)
      pending.set(id, { resolve, reject, timer })
      ws.send(
        JSON.stringify(
          command === "join"
            ? {
                id,
                type: "join",
                channel: params.channel,
                message: { id, command: "join", params: { ...params, commandId: id } },
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

  async function sendRetry(command, params = {}, tries = 3) {
    let last
    for (let i = 0; i < tries; i++) {
      try {
        return await send(command, params)
      } catch (e) {
        last = e
        await sleep(200)
      }
    }
    throw last
  }

  async function makeField(parentId, x, y, sizeKey, state, content, withClear, w = 200) {
    const sz = SIZES[sizeKey]
    const st = styleFor(state)
    const filled = content === "filled"
    const fg = state === "disabled" ? C.disabledFg : filled ? C.foreground : C.placeholder
    const text = filled ? "Value" : "Placeholder"
    const f = await sendRetry("create_frame", {
      x,
      y,
      width: w,
      height: sz.h,
      name: `preview`,
      parentId,
      fillColor: st.fill ? { ...st.fill, a: 1 } : { r: 1, g: 1, b: 1, a: 0.001 },
      strokeColor: { ...st.stroke, a: 1 },
      strokeWeight: 1,
      layoutMode: "NONE",
      layoutSizingHorizontal: "FIXED",
      layoutSizingVertical: "FIXED",
    })
    await sendRetry("set_corner_radius", { nodeId: f.id, radius: sz.radius })
    await sendRetry("create_text", {
      x: sz.padX,
      y: (sz.h - sz.font) / 2 - 1,
      text,
      fontSize: sz.font,
      fontWeight: 400,
      fontColor: { ...fg, a: 1 },
      parentId: f.id,
    })
    if (withClear) {
      const bx = w - sz.padX - sz.clear
      const by = (sz.h - sz.clear) / 2
      const btn = await sendRetry("create_frame", {
        x: bx,
        y: by,
        width: sz.clear,
        height: sz.clear,
        name: "clear",
        parentId: f.id,
        fillColor: { r: 1, g: 1, b: 1, a: 0.001 },
        layoutMode: "NONE",
        layoutSizingHorizontal: "FIXED",
        layoutSizingVertical: "FIXED",
      })
      await sendRetry("set_corner_radius", { nodeId: btn.id, radius: 8 })
      await sendRetry("create_text", {
        x: sz.clear / 2 - 5,
        y: sz.clear / 2 - 7,
        text: "✕",
        fontSize: 12,
        fontWeight: 500,
        fontColor: { ...C.muted, a: 1 },
        parentId: btn.id,
      })
    }
    return f.id
  }

  console.log(await sendRetry("join", { channel: CHANNEL }))
  await sleep(300)

  const doc = await sendRetry("get_document_info", {})
  const old = (doc?.children || []).filter((c) => c.name === "DS Input Component").map((c) => c.id)
  if (old.length) {
    await sendRetry("delete_multiple_nodes", { nodeIds: old })
    console.log("deleted old policy")
  }

  // Button과 동일: board #f5f5f7, pad 32, title 28
  const PX = 6100
  const PY = 0
  const board = await sendRetry("create_frame", {
    x: PX,
    y: PY,
    width: 601,
    height: 920,
    name: "DS Input Component",
    fillColor: { ...C.board, a: 1 },
    layoutMode: "NONE",
  })
  const bid = board.id
  console.log("board", bid)

  await sendRetry("create_text", {
    x: 32,
    y: 32,
    text: "DS Input Component",
    fontSize: 28,
    fontWeight: 700,
    fontColor: { ...C.title, a: 1 },
    name: "Text",
    parentId: bid,
  })

  // —— Section: Size Ladder (흰 카드) —— Button Size Ladder와 동일 패턴
  const sec1 = await sendRetry("create_frame", {
    x: 32,
    y: 98,
    width: 537,
    height: 200,
    name: "Section: Size Ladder",
    parentId: bid,
    fillColor: { ...C.white, a: 1 },
    layoutMode: "NONE",
  })
  await sendRetry("create_text", {
    x: 16,
    y: 16,
    text: "Size Ladder (state=rest, content=empty)",
    fontSize: 20,
    fontWeight: 700,
    fontColor: { ...C.title, a: 1 },
    parentId: sec1.id,
  })
  // horizontal sizes like button row
  let sx = 16
  const sizeKeys = Object.keys(SIZES)
  const baseY = 56
  for (const size of sizeKeys) {
    const h = SIZES[size].h
    await makeField(sec1.id, sx, baseY + (48 - h) / 2, size, "rest", "empty", false, 110)
    sx += 122
    await sleep(30)
  }

  // —— Section: States —— rest / focus / disabled / invalid / readOnly
  const sec2 = await sendRetry("create_frame", {
    x: 32,
    y: 314,
    width: 537,
    height: 160,
    name: "Section: States",
    parentId: bid,
    fillColor: { ...C.white, a: 1 },
    layoutMode: "NONE",
  })
  await sendRetry("create_text", {
    x: 16,
    y: 16,
    text: "States (size=default, content=empty)",
    fontSize: 20,
    fontWeight: 700,
    fontColor: { ...C.title, a: 1 },
    parentId: sec2.id,
  })
  const states = ["rest", "focus", "disabled", "invalid", "readOnly"]
  let cx = 16
  for (const state of states) {
    await sendRetry("create_text", {
      x: cx,
      y: 52,
      text: state,
      fontSize: 13,
      fontWeight: 700,
      fontColor: { ...C.label, a: 1 },
      parentId: sec2.id,
    })
    await makeField(sec2.id, cx, 76, "default", state, "empty", false, 96)
    cx += 102
    await sleep(30)
  }

  // —— Section: Content & Clearable —— Button의 두 번째 States 카드와 같은 톤
  const sec3 = await sendRetry("create_frame", {
    x: 32,
    y: 490,
    width: 537,
    height: 160,
    name: "Section: Content Clearable",
    parentId: bid,
    fillColor: { ...C.white, a: 1 },
    layoutMode: "NONE",
  })
  await sendRetry("create_text", {
    x: 16,
    y: 16,
    text: "Content · Clearable (size=default)",
    fontSize: 20,
    fontWeight: 700,
    fontColor: { ...C.title, a: 1 },
    parentId: sec3.id,
  })
  const demos = [
    ["empty", "rest", false, "empty"],
    ["filled", "rest", false, "filled"],
    ["filled", "focus", true, "filled+clear"],
    ["filled", "readOnly", false, "readOnly"],
  ]
  cx = 16
  for (const [content, state, clear, label] of demos) {
    await sendRetry("create_text", {
      x: cx,
      y: 52,
      text: label,
      fontSize: 13,
      fontWeight: 700,
      fontColor: { ...C.label, a: 1 },
      parentId: sec3.id,
    })
    await makeField(sec3.id, cx, 76, "default", state, content, clear, 118)
    cx += 128
    await sleep(30)
  }

  // —— Section: Disabled filled (Button처럼 state 카드 하나 더) ——
  const sec4 = await sendRetry("create_frame", {
    x: 32,
    y: 666,
    width: 537,
    height: 124,
    name: "Section: States Filled-Disabled",
    parentId: bid,
    fillColor: { ...C.white, a: 1 },
    layoutMode: "NONE",
  })
  await sendRetry("create_text", {
    x: 16,
    y: 16,
    text: "States (size=default, content=filled)",
    fontSize: 20,
    fontWeight: 700,
    fontColor: { ...C.title, a: 1 },
    parentId: sec4.id,
  })
  await sendRetry("create_text", {
    x: 16,
    y: 52,
    text: "rest",
    fontSize: 13,
    fontWeight: 700,
    fontColor: { ...C.label, a: 1 },
    parentId: sec4.id,
  })
  await makeField(sec4.id, 16, 76, "default", "rest", "filled", false, 120)
  await sendRetry("create_text", {
    x: 152,
    y: 52,
    text: "disabled",
    fontSize: 13,
    fontWeight: 700,
    fontColor: { ...C.label, a: 1 },
    parentId: sec4.id,
  })
  await makeField(sec4.id, 152, 76, "default", "disabled", "filled", false, 120)
  await sendRetry("create_text", {
    x: 288,
    y: 52,
    text: "invalid",
    fontSize: 13,
    fontWeight: 700,
    fontColor: { ...C.label, a: 1 },
    parentId: sec4.id,
  })
  await makeField(sec4.id, 288, 76, "default", "invalid", "filled", false, 120)

  // resize board height
  await sendRetry("resize_node", { nodeId: bid, width: 601, height: 820 })

  console.log("DONE policy matched to Button template")
  ws.close()
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
