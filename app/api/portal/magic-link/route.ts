import { NextRequest, NextResponse } from 'next/server'
import { sendPortalMagicLinkEmail } from '@/lib/email'
import { siteConfig } from '@/lib/config'
import { consumeRateLimit, findActiveLicenseByEmail, issueMagicLink, normalizeEmail } from '@/lib/portal'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { email?: string }
    const rawEmail = String(body.email || '')
    const email = normalizeEmail(rawEmail)

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const canProceed = consumeRateLimit(`magic-link:${ip}:${email}`, 5, 15 * 60_000)

    if (!canProceed) {
      return NextResponse.json({ success: true })
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: true })
    }

    const license = findActiveLicenseByEmail(email)
    if (!license) {
      return NextResponse.json({ success: true })
    }

    const token = issueMagicLink(email, license.id)
    const loginUrl = `${siteConfig.url}/portal/login?token=${encodeURIComponent(token)}`

    await sendPortalMagicLinkEmail({
      email,
      loginUrl,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: true })
  }
}
