import { NextRequest, NextResponse } from 'next/server'
import { normalizeLocale, detectPreferredLocale } from '@/lib/i18n/detect-locale'

export function middleware(request: NextRequest) {
  // Read locale from cookie first (explicit user preference)
  const cookieLocale = normalizeLocale(request.cookies.get('NEXT_LOCALE')?.value)

  const locale = cookieLocale ?? detectPreferredLocale({
    country: request.headers.get('x-vercel-ip-country'),
    region: request.headers.get('x-vercel-ip-country-region'),
    acceptLanguage: request.headers.get('accept-language'),
  })

  // Forward locale as a request header so server components always get it fresh,
  // bypassing any page/data caching layer.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: [
    // Run on all pages except Next.js internals and static assets
    '/((?!_next/static|_next/image|favicon|api|fonts|images|uploads|robots\\.txt|sitemap\\.xml).*)',
  ],
}
