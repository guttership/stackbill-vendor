import { headers } from 'next/headers'
import { normalizeLocale, type Locale } from './detect-locale'
import { getMessages } from './messages'

export async function getCurrentLocale(): Promise<Locale> {
  const headersStore = await headers()

  // x-locale is injected by middleware on every request before any cache layer,
  // reading NEXT_LOCALE cookie + geo headers. Always fresh.
  const middlewareLocale = normalizeLocale(headersStore.get('x-locale'))
  if (middlewareLocale) return middlewareLocale

  // Fallback for local dev (middleware may not run on all configs)
  return 'en'
}

export async function getCurrentMessages() {
  const locale = await getCurrentLocale()
  return getMessages(locale)
}
