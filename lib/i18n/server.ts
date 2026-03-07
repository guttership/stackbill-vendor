import { cookies, headers } from 'next/headers'
import { detectPreferredLocale, normalizeLocale, type Locale } from './detect-locale'
import { getMessages } from './messages'

export async function getCurrentLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const headersStore = await headers()

  const cookieLocale = normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value)
  if (cookieLocale) {
    return cookieLocale
  }

  return detectPreferredLocale({
    country: headersStore.get('x-vercel-ip-country'),
    region: headersStore.get('x-vercel-ip-country-region'),
    acceptLanguage: headersStore.get('accept-language'),
  })
}

export async function getCurrentMessages() {
  const locale = await getCurrentLocale()
  return getMessages(locale)
}
