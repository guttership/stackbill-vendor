import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { normalizeLocale, detectPreferredLocale } from '@/lib/i18n/detect-locale'

export function proxy(request: NextRequest) {
  // Cookie = explicit user choice, always takes priority over geo detection.
  const cookieLocale = normalizeLocale(request.cookies.get('NEXT_LOCALE')?.value)

  const locale = cookieLocale ?? detectPreferredLocale({
    country: request.headers.get('x-vercel-ip-country'),
    region: request.headers.get('x-vercel-ip-country-region'),
    acceptLanguage: request.headers.get('accept-language'),
  })

  // Inject x-locale header so server components read it fresh on every request,
  // bypassing any page/data cache layer.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)

  const response = NextResponse.next({ request: { headers: requestHeaders } })

  // Only write the cookie when there is none yet (first visit, geo-based default).
  // Never overwrite an explicitly set user preference.
  if (!cookieLocale) {
    response.cookies.set('NEXT_LOCALE', locale, {
      httpOnly: false,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
