import { readFile } from "node:fs/promises"
import path from "node:path"

import { stitch, StitchError, type Project } from "@google/stitch-sdk"

export type StitchDeviceType =
  | "DEVICE_TYPE_UNSPECIFIED"
  | "MOBILE"
  | "DESKTOP"
  | "TABLET"
  | "AGNOSTIC"

export type GenerateUserCustomUIInput = {
  prompt: string
  projectId?: string
  /** DESIGN.md 경로. 기본값: 프로젝트 루트 DESIGN.md */
  designMdPath?: string
  deviceType?: StitchDeviceType
  /** true면 htmlUrl에서 HTML 본문을 fetch해 함께 반환 */
  includeHtml?: boolean
  designSystemName?: string
}

export type GenerateUserCustomUIResult = {
  projectId: string
  screenId: string
  htmlUrl: string
  previewImageUrl: string
  html?: string
}

const DEFAULT_DESIGN_MD = path.join(process.cwd(), "DESIGN.md")

function assertStitchApiKey() {
  if (!process.env.STITCH_API_KEY) {
    throw new Error(
      "STITCH_API_KEY 환경 변수가 필요합니다. .env.local에 설정하세요."
    )
  }
}

async function readDesignMd(designMdPath: string): Promise<string> {
  const resolved = path.isAbsolute(designMdPath)
    ? designMdPath
    : path.join(process.cwd(), designMdPath)

  return readFile(resolved, "utf8")
}

async function syncDesignSystem(
  project: Project,
  designMd: string,
  displayName: string
) {
  const input = {
    displayName,
    theme: { designMd },
  }

  const existing = await project.listDesignSystems()

  if (existing.length === 0) {
    return project.createDesignSystem(input)
  }

  return project.designSystem(existing[0].id).update(input)
}

async function resolveProject(projectId?: string): Promise<Project> {
  if (projectId) {
    return stitch.project(projectId)
  }

  return stitch.createProject("Design System Test")
}

/**
 * DESIGN.md 컨텍스트를 적용한 뒤 Stitch로 UI 화면을 생성합니다.
 * getHtml/getImage는 다운로드 URL을 반환합니다.
 */
export async function generateUserCustomUI(
  input: GenerateUserCustomUIInput
): Promise<GenerateUserCustomUIResult> {
  assertStitchApiKey()

  const {
    prompt,
    projectId,
    designMdPath = DEFAULT_DESIGN_MD,
    deviceType = "DESKTOP",
    includeHtml = false,
    designSystemName = "Design System Test",
  } = input

  if (!prompt.trim()) {
    throw new Error("prompt는 비어 있을 수 없습니다.")
  }

  const designMd = await readDesignMd(designMdPath)
  const project = await resolveProject(projectId)

  await syncDesignSystem(project, designMd, designSystemName)

  const screen = await project.generate(prompt, deviceType)

  const htmlUrl = await screen.getHtml()
  const previewImageUrl = await screen.getImage()

  const result: GenerateUserCustomUIResult = {
    projectId: project.id,
    screenId: screen.id,
    htmlUrl,
    previewImageUrl,
  }

  if (includeHtml) {
    const response = await fetch(htmlUrl)
    if (!response.ok) {
      throw new Error(`HTML 다운로드 실패: ${response.status}`)
    }
    result.html = await response.text()
  }

  return result
}

export function toStitchErrorResponse(error: unknown) {
  if (error instanceof StitchError) {
    return {
      status: error.code === "AUTH_FAILED" ? 401 : 502,
      body: {
        error: error.message,
        code: error.code,
        recoverable: error.recoverable,
      },
    }
  }

  if (error instanceof Error) {
    const status = error.message.includes("STITCH_API_KEY") ? 500 : 400
    return {
      status,
      body: { error: error.message },
    }
  }

  return {
    status: 500,
    body: { error: "알 수 없는 오류가 발생했습니다." },
  }
}
