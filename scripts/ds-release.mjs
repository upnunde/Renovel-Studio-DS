#!/usr/bin/env node
/**
 * packages/design-system → 패키지 루트 릴리스 브랜치·태그·GitHub Release → 스튜디오 동기화
 *
 * 사용:
 *   npm run ds:release              # patch bump + 릴리스 + (가능하면) 스튜디오 sync
 *   DS_BUMP=minor npm run ds:release
 *   DS_TAG=v0.1.14 npm run ds:release  # 버전 고정
 *   DS_SKIP_STUDIO=1 npm run ds:release
 *
 * 스튜디오는 github:upnunde/Renovel-Studio-DS#vX.Y.Z 태그를 소비한다.
 * monorepo main 푸시만으로는 감지되지 않으므로 깃푸시 후 이 스크립트를 실행한다.
 */
import { execSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const PKG_DIR = path.join(ROOT, "packages", "design-system")
const PKG_JSON = path.join(PKG_DIR, "package.json")
const STUDIO_APP =
  process.env.DS_STUDIO_APP ??
  path.resolve(ROOT, "..", "upnunde-test", "app")

const TAG_RE = /^v(\d+)\.(\d+)\.(\d+)$/

function sh(cmd, opts = {}) {
  return execSync(cmd, {
    cwd: opts.cwd ?? ROOT,
    stdio: opts.silent ? "pipe" : "inherit",
    encoding: "utf8",
    env: { ...process.env, ...opts.env },
  })
}

function shOut(cmd, cwd = ROOT) {
  return execSync(cmd, { cwd, encoding: "utf8" }).trim()
}

function parseSemver(tag) {
  const m = tag?.match(TAG_RE)
  if (!m) return null
  return [Number(m[1]), Number(m[2]), Number(m[3])]
}

function formatTag([maj, min, pat]) {
  return `v${maj}.${min}.${pat}`
}

function bump([maj, min, pat], kind) {
  if (kind === "major") return [maj + 1, 0, 0]
  if (kind === "minor") return [maj, min + 1, 0]
  return [maj, min, pat + 1]
}

function latestTag() {
  const tags = shOut("git tag -l 'v*'")
    .split("\n")
    .map((t) => t.trim())
    .filter((t) => TAG_RE.test(t))
  if (tags.length === 0) throw new Error("v*.*.* 태그가 없습니다.")
  tags.sort((a, b) => {
    const pa = parseSemver(a)
    const pb = parseSemver(b)
    for (let i = 0; i < 3; i += 1) {
      if (pa[i] !== pb[i]) return pa[i] - pb[i]
    }
    return 0
  })
  return tags.at(-1)
}

function replaceVersionRefs(filePath, fromTag, toTag) {
  if (!fs.existsSync(filePath)) return
  const fromVer = fromTag.slice(1)
  const toVer = toTag.slice(1)
  const text = fs.readFileSync(filePath, "utf8")
  const next = text.replaceAll(fromTag, toTag).replaceAll(fromVer, toVer)
  if (next !== text) fs.writeFileSync(filePath, next)
}

function gitCommit(message, cwd = ROOT, paths = null) {
  if (paths?.length) {
    sh(`git add ${paths.map((p) => `"${p}"`).join(" ")}`, { cwd })
  } else {
    sh("git add -A", { cwd })
  }
  const status = shOut("git status --porcelain --untracked-files=no", cwd)
  // staged만 보려면 diff --cached
  const staged = shOut("git diff --cached --name-only", cwd)
  if (!staged) return false
  sh(`git commit -m "${message}"`, { cwd })
  return true
}

function main() {
  const prevTag = latestTag()
  const prev = parseSemver(prevTag)
  const forced = process.env.DS_TAG?.trim()
  let nextTag
  if (forced) {
    if (!TAG_RE.test(forced)) {
      throw new Error(`DS_TAG 형식 오류: ${forced} (예: v0.1.14)`)
    }
    nextTag = forced
  } else {
    const kind = (process.env.DS_BUMP ?? "patch").toLowerCase()
    nextTag = formatTag(bump(prev, kind))
  }
  const nextVer = nextTag.slice(1)

  if (shOut(`git tag -l ${nextTag}`)) {
    throw new Error(`태그 ${nextTag}가 이미 있습니다.`)
  }

  console.log(`\n📦 DS 릴리스 ${prevTag} → ${nextTag}\n`)

  // 1) monorepo 패키지 버전 반영
  const pkg = JSON.parse(fs.readFileSync(PKG_JSON, "utf8"))
  pkg.version = nextVer
  fs.writeFileSync(PKG_JSON, `${JSON.stringify(pkg, null, 2)}\n`)
  replaceVersionRefs(path.join(PKG_DIR, "README.md"), prevTag, nextTag)
  replaceVersionRefs(path.join(ROOT, "DESIGN.md"), prevTag, nextTag)

  // 2) main에 버전 커밋 (변경 있을 때만)
  if (
    gitCommit(`chore(release): design-system ${nextTag}`, ROOT, [
      "packages/design-system/package.json",
      "packages/design-system/README.md",
      "DESIGN.md",
    ])
  ) {
    sh("git push --force-with-lease origin HEAD:main")
  }

  // 3) 패키지 루트 릴리스 worktree
  const work = fs.mkdtempSync(path.join(os.tmpdir(), `ds-release-${nextVer}-`))
  try {
    sh(`git fetch origin tag ${prevTag}`)
    sh(`git worktree add -B release/${nextTag} "${work}" ${prevTag}`)

    sh(
      `rsync -a --delete --exclude '.git' --exclude '.github' "${PKG_DIR}/" "${work}/"`,
    )

    const notifySrc = path.join(
      ROOT,
      ".github",
      "workflows",
      "notify-upnunde-test.yml",
    )
    const notifyDestDir = path.join(work, ".github", "workflows")
    const notifyDest = path.join(notifyDestDir, "notify-upnunde-test.yml")
    if (fs.existsSync(notifySrc)) {
      fs.mkdirSync(notifyDestDir, { recursive: true })
      fs.copyFileSync(notifySrc, notifyDest)
    }

    if (!gitCommit(`feat(ds): design-system ${nextTag}`, work)) {
      throw new Error("릴리스 worktree에 반영할 변경이 없습니다.")
    }

    sh(`git tag -a ${nextTag} -m "design-system ${nextTag}"`, { cwd: work })
    sh(`git push -u origin release/${nextTag}`, { cwd: work })
    sh(`git push origin ${nextTag}`, { cwd: work })

    try {
      sh(
        `gh release create ${nextTag} --repo upnunde/Renovel-Studio-DS --title "design-system ${nextTag}" --generate-notes`,
      )
    } catch (err) {
      console.warn(
        "gh release create 실패 — 태그 푸시만으로 notify가 돌 수 있습니다.",
        err?.message ?? err,
      )
    }

    try {
      sh(
        `gh api repos/upnunde/upnunde-test/dispatches -f event_type=ds-release -f 'client_payload[tag]=${nextTag}'`,
      )
      console.log(`→ upnunde-test repository_dispatch (${nextTag})`)
    } catch (err) {
      console.warn("repository_dispatch 실패 (권한 확인):", err?.message ?? err)
    }

    if (
      process.env.DS_SKIP_STUDIO !== "1" &&
      fs.existsSync(path.join(STUDIO_APP, "package.json"))
    ) {
      console.log(`\n🔄 스튜디오 sync: ${STUDIO_APP}`)
      sh(`DS_TAG=${nextTag} npm run sync:ds`, {
        cwd: STUDIO_APP,
        env: { DS_TAG: nextTag },
      })
      const studioRoot = path.resolve(STUDIO_APP, "..")
      try {
        const studioDirty = shOut(
          "git status --porcelain app/package.json app/package-lock.json",
          studioRoot,
        )
        if (studioDirty) {
          sh("git add app/package.json app/package-lock.json", {
            cwd: studioRoot,
          })
          sh(`git commit -m "chore(app): design-system ${nextTag} 동기화"`, {
            cwd: studioRoot,
          })
          sh("git push origin HEAD", { cwd: studioRoot })
        }
      } catch (err) {
        console.warn("스튜디오 커밋/푸시 건너뜀:", err?.message ?? err)
      }
    } else {
      console.log("스튜디오 로컬 sync 건너뜀 (DS_SKIP_STUDIO 또는 경로 없음)")
    }

    console.log(`\n✅ 완료: ${nextTag}`)
    console.log(
      `   https://github.com/upnunde/Renovel-Studio-DS/releases/tag/${nextTag}`,
    )
  } finally {
    try {
      sh(`git worktree remove "${work}" --force`)
    } catch {
      fs.rmSync(work, { recursive: true, force: true })
    }
  }
}

try {
  main()
} catch (err) {
  console.error(err)
  process.exit(1)
}
