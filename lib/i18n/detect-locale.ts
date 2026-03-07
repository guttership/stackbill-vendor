export type Locale = 'fr' | 'en'

export function normalizeLocale(input?: string | null): Locale | null {
  if (!input) return null
  const value = input.toLowerCase().trim()
  if (value === 'fr' || value.startsWith('fr-')) return 'fr'
  if (value === 'en' || value.startsWith('en-')) return 'en'
  return null
}

function parseAcceptLanguage(acceptLanguage?: string | null): Locale | null {
  if (!acceptLanguage) return null
  const parts = acceptLanguage
    .toLowerCase()
    .split(',')
    .map((part) => part.trim().split(';')[0])

  const frMatch = parts.find((part) => part === 'fr' || part.startsWith('fr-'))
  return frMatch ? 'fr' : 'en'
}

export function detectPreferredLocale(params: {
  country?: string | null
  region?: string | null
  acceptLanguage?: string | null
}): Locale {
  const country = params.country?.toUpperCase()
  const region = params.region?.toUpperCase()
  const acceptLanguage = params.acceptLanguage

  if (country === 'FR') {
    return 'fr'
  }

  if (country === 'CA' && region === 'QC') {
    return 'fr'
  }

  // Local dev fallback when geo headers are unavailable.
  if (!country) {
    return parseAcceptLanguage(acceptLanguage) ?? 'en'
  }

  return 'en'
}
