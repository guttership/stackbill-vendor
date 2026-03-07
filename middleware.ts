import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { detectPreferredLocale } from '@/lib/i18n/detect-locale'

export function middleware(request: NextRequest) {
  const locale = detectPreferredLocale({
    country: request.headers.get('x-vercel-ip-country'),
    region: request.headers.get('x-vercel-ip-country-region'),
    acceptLanguage: request.headers.get('accept-language'),
  })

  const response = NextResponse.next()
  const current = request.cookies.get('NEXT_LOCALE')?.value

  if (current !== locale) {
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
