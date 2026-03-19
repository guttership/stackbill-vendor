import { NextRequest, NextResponse } from 'next/server'
import {
  findLicenseById,
  getPortalSessionCookieName,
  getPortalSessionInfoFromRequest,
  isLicenseActive,
  revokePortalSession,
} from '@/lib/portal'

export async function GET(request: NextRequest) {
  const session = getPortalSessionInfoFromRequest(request)
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  const license = findLicenseById(session.licenseId)
  if (!license || !isLicenseActive(license)) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({
    authenticated: true,
    license: {
      keyMasked: `${license.license_key.slice(0, 6)}...${license.license_key.slice(-4)}`,
      status: license.status,
      expiresAt: license.expires_at,
    },
  })
}

export async function DELETE(request: NextRequest) {
  const session = getPortalSessionInfoFromRequest(request)

  if (session) {
    revokePortalSession(session.sessionId)
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set({
    name: getPortalSessionCookieName(),
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })

  return response
}
