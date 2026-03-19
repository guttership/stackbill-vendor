import { NextRequest, NextResponse } from 'next/server'
import {
  consumeRateLimit,
  findArtifactById,
  findLicenseById,
  getPortalSessionFromRequest,
  isLicenseActive,
  issueDownloadToken,
} from '@/lib/portal'

export async function POST(request: NextRequest) {
  const session = getPortalSessionFromRequest(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const allowed = consumeRateLimit(`download-token:${session.license_id}:${ip}`, 20, 10 * 60_000)

  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const license = findLicenseById(session.license_id)
  if (!license || !isLicenseActive(license)) {
    return NextResponse.json({ error: 'License inactive' }, { status: 403 })
  }

  const body = await request.json() as { artifactId?: number }
  const artifactId = Number(body.artifactId)

  if (!Number.isFinite(artifactId)) {
    return NextResponse.json({ error: 'artifactId is required' }, { status: 400 })
  }

  const artifact = findArtifactById(artifactId)
  if (!artifact || artifact.is_active !== 1) {
    return NextResponse.json({ error: 'Artifact unavailable' }, { status: 404 })
  }

  const token = issueDownloadToken(session.license_id, artifact.id)

  return NextResponse.json({ token, expiresInSeconds: 300 })
}
