import { NextRequest, NextResponse } from 'next/server'
import {
  consumeDownloadToken,
  findArtifactById,
  findLicenseById,
  getSignedStorageUrl,
  isLicenseActive,
  logDownloadEvent,
} from '@/lib/portal'

type RouteContext = {
  params: Promise<{ token: string }>
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { token } = await context.params
  const consumed = consumeDownloadToken(token)

  if (!consumed) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
  }

  const license = findLicenseById(consumed.licenseId)
  if (!license || !isLicenseActive(license)) {
    return NextResponse.json({ error: 'License inactive' }, { status: 403 })
  }

  const artifact = findArtifactById(consumed.artifactId)
  if (!artifact || artifact.is_active !== 1) {
    return NextResponse.json({ error: 'Artifact unavailable' }, { status: 404 })
  }

  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null
  const userAgent = request.headers.get('user-agent') || null
  logDownloadEvent(license.id, artifact.id, ip, userAgent)

  try {
    const signedUrl = getSignedStorageUrl(artifact.storage_key)
    return NextResponse.redirect(signedUrl)
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Download configuration error',
      },
      { status: 503 }
    )
  }
}
