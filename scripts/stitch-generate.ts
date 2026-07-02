/**
 * Stitch UI 생성 CLI
 *
 * 사용법:
 *   STITCH_API_KEY=... npx tsx scripts/stitch-generate.ts "대시보드 화면"
 *   STITCH_API_KEY=... npx tsx scripts/stitch-generate.ts "로그인 폼" --include-html
 *   STITCH_API_KEY=... npx tsx scripts/stitch-generate.ts "설정 페이지" --project-id 123
 */
import { generateUserCustomUI } from "../src/lib/stitch/generate-ui"

function parseArgs(argv: string[]) {
  const flags = new Set(argv.filter((arg) => arg.startsWith("--")))
  const prompt = argv.find((arg) => !arg.startsWith("--")) ?? ""

  const projectId = argv
    .find((arg) => arg.startsWith("--project-id="))
    ?.slice("--project-id=".length)

  const designMdPath = argv
    .find((arg) => arg.startsWith("--design-md="))
    ?.slice("--design-md=".length)

  return {
    prompt,
    projectId,
    designMdPath,
    includeHtml: flags.has("--include-html"),
  }
}

async function main() {
  const { prompt, projectId, designMdPath, includeHtml } = parseArgs(
    process.argv.slice(2)
  )

  if (!prompt) {
    console.error(
      '프롬프트가 필요합니다. 예: npx tsx scripts/stitch-generate.ts "대시보드 화면"'
    )
    process.exit(1)
  }

  const result = await generateUserCustomUI({
    prompt,
    projectId,
    designMdPath,
    includeHtml,
  })

  console.log(JSON.stringify(result, null, 2))
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
