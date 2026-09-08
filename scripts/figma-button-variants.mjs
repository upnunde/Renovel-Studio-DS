#!/usr/bin/env bun
/**
 * DS Button 전체 조합을 Figma에 DS와 동일하게 재생성.
 *
 * 플러그인 버그: fill/stroke의 a===0 이면 `parseFloat(a)||1` 때문에 불투명이 됨.
 * → 투명은 a:0.001 사용. stroke 40%는 a:0.4 (truthy라 create에서도 OK, set_stroke_color로 확정).
 *
 * Usage: bun scripts/figma-button-variants.mjs [channel]
 */
import { randomUUID } from "crypto"

const CHANNEL = process.argv[2] || "u37mni4n"
const WS_URL = "ws://127.0.0.1:3055"
const ORIGIN_X = 0
const ORIGIN_Y = 5200
const RADIUS = 8 // rounded-md = --radius-md = 0.5rem

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
  foreground: hex("#212124"), // grayscale-140
  inverseMuted: hex("#535356"), // grayscale-110
  primary: hex("#f642d4"), // brand-500
  primaryContainer: hex("#fce8f8"), // brand-100
  backgroundMuted: hex("#f8f8fc"), // grayscale-10
  border: hex("#f1f4f6"), // grayscale-15
  success: hex("#10b981"),
  successSoft: hex("#d1fae5"), // ~success/10–100
  warning: hex("#f59e0b"),
  warningSoft: hex("#fef3c7"),
  destructive: hex("#ef4444"),
  destructiveSoft: hex("#fee2e2"),
  disabled: hex("#f8f8fc"),
  disabledFg: hex("#a5a5a9"), // grayscale-60
  disabledBorder: hex("#f1f4f6"),
}

const VARIANTS = ["default", "secondary", "outline", "ghost", "link"]
const TONES = ["neutral", "brand", "success", "warning", "destructive"]
const SIZES = {
  xs: { h: 24, padX: 8, font: 12 },
  sm: { h: 32, padX: 10, font: 13 },
  default: { h: 36, padX: 10, font: 14 },
  xl: { h: 40, padX: 12, font: 14 },
  "2xl": { h: 48, padX: 12, font: 16 },
}
const STATES = ["rest", "disabled"]

function styleFor(variant, tone, state) {
  // returns { fill: null|{r,g,b} , stroke: null|{r,g,b,a} , fg }
  if (state === "disabled") {
    if (variant === "default" || variant === "secondary") {
      return { fill: C.disabled, stroke: null, fg: C.disabledFg } // border transparent
    }
    if (variant === "outline") {
      return { fill: null, stroke: { ...C.disabledBorder, a: 1 }, fg: C.disabledFg }
    }
    return { fill: null, stroke: null, fg: C.disabledFg }
  }

  const byTone = {
    neutral: {
      solid: C.inverseMuted,
      solidFg: C.white,
      soft: C.backgroundMuted,
      softFg: C.foreground,
      line: { ...C.border, a: 1 },
      accent: C.foreground,
    },
    brand: {
      solid: C.primary,
      solidFg: C.white,
      soft: C.primaryContainer,
      softFg: C.primary,
      line: { ...C.primary, a: 0.4 },
      accent: C.primary,
    },
    success: {
      solid: C.success,
      solidFg: C.white,
      soft: C.successSoft,
      softFg: C.success,
      line: { ...C.success, a: 0.4 },
      accent: C.success,
    },
    warning: {
      solid: C.warning,
      solidFg: C.white,
      soft: C.warningSoft,
      softFg: C.warning,
      line: { ...C.warning, a: 0.4 },
      accent: C.warning,
    },
    destructive: {
      solid: C.destructive,
      solidFg: C.white,
      soft: C.destructiveSoft,
      softFg: C.destructive,
      line: { ...C.destructive, a: 0.4 },
      accent: C.destructive,
    },
  }
  const t = byTone[tone]

  switch (variant) {
    case "default":
      return { fill: t.solid, stroke: null, fg: t.solidFg }
    case "secondary":
      return { fill: t.soft, stroke: null, fg: t.softFg }
    case "outline":
      return { fill: null, stroke: t.line, fg: t.accent }
    case "ghost":
      return {
        fill: null,
        stroke: null,
        fg: tone === "neutral" ? C.foreground : t.accent,
      }
    case "link":
      return {
        fill: null,
        stroke: null,
        fg: tone === "neutral" || tone === "brand" ? C.primary : t.accent,
      }
    default:
      return { fill: t.solid, stroke: null, fg: t.solidFg }
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function extractId(data) {
  return data?.id || data?.message?.id || null
}
function extractResult(data) {
  if (data?.result !== undefined) return data.result
  if (data?.message && typeof data.message === "object" && "result" in data.message) {
    return data.message.result
  }
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

    // 같은 id의 command echo(result 없음)는 무시 — 채널에 MCP 등 peer가 있을 때 발생
    if (result === undefined && !err) {
      if (msg?.command && !("result" in (msg || {}))) return
      if (data.type === "broadcast" && msg && !("result" in msg)) return
      return
    }

    const { resolve, reject, timer } = pending.get(id)
    clearTimeout(timer)
    pending.delete(id)
    if (err) {
      let errMsg = "unknown error"
      try {
        errMsg = typeof err === "string" ? err : JSON.stringify(err)
      } catch {
        errMsg = String(err)
      }
      reject(new Error(errMsg))
    } else resolve(result)
  }

  function send(command, params = {}, timeoutMs = 90000) {
    return new Promise((resolve, reject) => {
      const id = randomUUID()
      const timer = setTimeout(() => {
        pending.delete(id)
        reject(new Error(`timeout: ${command}`))
      }, timeoutMs)
      pending.set(id, { resolve, reject, timer })
      const payload =
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
      ws.send(JSON.stringify(payload))
    })
  }

  async function sendRetry(command, params = {}, tries = 3) {
    let last
    for (let i = 0; i < tries; i++) {
      try {
        return await send(command, params)
      } catch (e) {
        last = e
        console.warn(`retry ${command} (${i + 1}/${tries}):`, e?.message || e)
        await sleep(200 + i * 300)
      }
    }
    throw last
  }

  console.log(`join ${CHANNEL}`)
  console.log(await sendRetry("join", { channel: CHANNEL }))
  await sleep(500)

  // 이전 배치 삭제 (이름 variant= 로 시작하는 페이지 자식)
  const doc = await sendRetry("get_document_info", {})
  const children = doc?.children || []
  const toDelete = children
    .filter((c) => typeof c.name === "string" && c.name.startsWith("variant="))
    .map((c) => c.id)
  console.log(`deleting ${toDelete.length} old variant frames…`)
  for (let i = 0; i < toDelete.length; i += 40) {
    const chunk = toDelete.slice(i, i + 40)
    await sendRetry("delete_multiple_nodes", { nodeIds: chunk })
    console.log(`  deleted ${Math.min(i + 40, toDelete.length)}/${toDelete.length}`)
    await sleep(150)
  }

  const sizeKeys = Object.keys(SIZES)
  const total = VARIANTS.length * TONES.length * sizeKeys.length * STATES.length
  console.log(`creating ${total} DS-matched buttons at y=${ORIGIN_Y}…`)

  let made = 0
  let row = 0
  for (const variant of VARIANTS) {
    for (const tone of TONES) {
      for (const state of STATES) {
        let col = 0
        for (const size of sizeKeys) {
          const sz = SIZES[size]
          const name = `variant=${variant}, tone=${tone}, size=${size}, state=${state}`
          const st = styleFor(variant, tone, state)
          const x = ORIGIN_X + col * (130 + 16)
          const y = ORIGIN_Y + row * (64 + 20)

          const frameParams = {
            x,
            y,
            width: 72,
            height: sz.h,
            name,
            fillColor: st.fill
              ? { ...st.fill, a: 1 }
              : { r: 1, g: 1, b: 1, a: 0.001 },
            layoutMode: "HORIZONTAL",
            layoutSizingHorizontal: "HUG",
            layoutSizingVertical: "FIXED",
            primaryAxisAlignItems: "CENTER",
            counterAxisAlignItems: "CENTER",
            paddingLeft: sz.padX,
            paddingRight: sz.padX,
            paddingTop: 0,
            paddingBottom: 0,
            itemSpacing: 0,
          }
          if (st.stroke) {
            const sa = st.stroke.a ?? 1
            frameParams.strokeColor = {
              r: st.stroke.r,
              g: st.stroke.g,
              b: st.stroke.b,
              a: sa < 0.01 ? 0.001 : sa,
            }
            frameParams.strokeWeight = 1
          } else {
            frameParams.strokeColor = { r: 0, g: 0, b: 0, a: 0.001 }
            frameParams.strokeWeight = 1
          }

          const frame = await sendRetry("create_frame", frameParams)
          const frameId =
            frame?.id || frame?.node_id || frame?.nodeId || frame?.result?.id
          if (!frameId) {
            console.error("create_frame raw:", JSON.stringify(frame)?.slice(0, 500))
            throw new Error(`no id for ${name}`)
          }

          await sendRetry("set_corner_radius", { nodeId: frameId, radius: RADIUS })

          await sendRetry("create_text", {
            x: 0,
            y: 0,
            text: "Label",
            fontSize: sz.font,
            fontWeight: 500,
            fontColor: { ...st.fg, a: 1 },
            name: "Label",
            parentId: frameId,
          })

          made++
          if (made % 10 === 0 || made === total) console.log(`  ${made}/${total}`)
          col++
          await sleep(40)
        }
        row++
      }
    }
  }

  console.log(`DONE ${made} — radius=${RADIUS}px, no-surface fill a=0.001`)
  ws.close()
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
