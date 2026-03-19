import { NextRequest, NextResponse } from 'next/server'
import { getPortalSessionFromRequest, findLicenseById, isLicenseActive, listActiveArtifacts } from '@/lib/portal'

export async function GET(request: NextRequest) {
  const session = getPortalSessionFromRequest(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const license = findLicenseById(session.license_id)
  if (!license || !isLicenseActive(license)) {
    return NextResponse.json({ error: 'License inactive' }, { status: 403 })
  }

  const artifacts = listActiveArtifacts().map((item) => ({
    id: item.id,
    version: item.version,
    type: item.type,
    filename: item.filename,
    sha256: item.sha256,
    sizeBytes: item.size_bytes,
    publishedAt: item.published_at,
  }))

  return NextResponse.json({
    license: {
      keyMasked: `${license.license_key.slice(0, 6)}...${license.license_key.slice(-4)}`,
      status: license.status,
      expiresAt: license.expires_at,
    },
    artifacts,
  })
}
