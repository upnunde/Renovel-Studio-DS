import { NextResponse } from "next/server"

import {
  generateUserCustomUI,
  toStitchErrorResponse,
  type StitchDeviceType,
} from "@/lib/stitch/generate-ui"

export const runtime = "nodejs"

type GenerateRequestBody = {
  prompt?: string
  projectId?: string
  designMdPath?: string
  deviceType?: StitchDeviceType
  includeHtml?: boolean
  designSystemName?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateRequestBody

    if (!body.prompt?.trim()) {
      return NextResponse.json(
        { error: "prompt 필드가 필요합니다." },
        { status: 400 }
      )
    }

    const result = await generateUserCustomUI({
      prompt: body.prompt,
      projectId: body.projectId,
      designMdPath: body.designMdPath,
      deviceType: body.deviceType,
      includeHtml: body.includeHtml,
      designSystemName: body.designSystemName,
    })

    return NextResponse.json(result)
  } catch (error) {
    const { status, body } = toStitchErrorResponse(error)
    return NextResponse.json(body, { status })
  }
}
