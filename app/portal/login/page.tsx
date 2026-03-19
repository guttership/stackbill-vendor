import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  consumeMagicLink,
  createPortalSession,
  getPortalSessionCookieName,
  getPortalSessionTtlSeconds,
} from '@/lib/portal'

type LoginPageProps = {
  searchParams: Promise<{ token?: string }>
}

export default async function PortalLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const token = String(params.token || '')

  if (!token) {
    redirect('/portal/request-access')
  }

  const consumed = consumeMagicLink(token)
  if (!consumed) {
    redirect('/portal/request-access?error=invalid_or_expired')
  }

  const sessionToken = createPortalSession(consumed.licenseId)
  const cookieStore = await cookies()

  cookieStore.set({
    name: getPortalSessionCookieName(),
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: getPortalSessionTtlSeconds(),
  })

  redirect('/portal/downloads')
}
