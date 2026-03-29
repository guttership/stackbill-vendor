import crypto from 'crypto'
import type { NextRequest } from 'next/server'
import { query } from '@/lib/db'

const PORTAL_SESSION_COOKIE = 'stackbill_portal_session'
const SESSION_TTL_SECONDS = 60 * 60 * 24
const MAGIC_LINK_TTL_MINUTES = 15
const DOWNLOAD_TOKEN_TTL_MINUTES = 5
const SIGNED_DOWNLOAD_URL_TTL_SECONDS = Number(process.env.PRIVATE_DOWNLOAD_URL_TTL_SECONDS || 90)

type LicenseRow = {
  id: number
  license_key: string
  email?: string | null
  status: string
  expires_at: string | null
  max_instances: number
}

type PortalSessionRow = {
  id: number
  license_id: number
  expires_at: string
  revoked_at: string | null
}

type PortalSessionInfo = {
  sessionId: number
  licenseId: number
}

type ArtifactRow = {
  id: number
  version: string
  type: 'source' | 'docker'
  filename: string
  storage_key: string
  sha256: string
  size_bytes: number
  is_active: number
  published_at: string
}

const rateBuckets = new Map<string, number[]>()

function tokenHash(raw: string): string {
  return crypto.createHash('sha256').update(raw).digest('hex')
}

function newToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString('base64url')
}

function nowIso(): string {
  return new Date().toISOString()
}

function addMinutesIso(minutes: number): string {
  return new Date(Date.now() + minutes * 60_000).toISOString()
}

function addSecondsIso(seconds: number): string {
  return new Date(Date.now() + seconds * 1000).toISOString()
}

export function isLicenseActive(license: Pick<LicenseRow, 'status' | 'expires_at'>): boolean {
  const status = String(license.status || '').toLowerCase()
  if (status !== 'active') {
    return false
  }

  if (!license.expires_at) {
    return true
  }

  return new Date(license.expires_at).getTime() > Date.now()
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase()
}

export function consumeRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const start = now - windowMs
  const values = rateBuckets.get(key) || []
  const filtered = values.filter((ts) => ts >= start)

  if (filtered.length >= limit) {
    rateBuckets.set(key, filtered)
    return false
  }

  filtered.push(now)
  rateBuckets.set(key, filtered)
  return true
}

export async function findActiveLicenseByEmail(email: string): Promise<LicenseRow | null> {
  const result = await query(
    `SELECT id, license_key, email, status, expires_at, max_instances
     FROM licenses
     WHERE LOWER(COALESCE(email, '')) = LOWER($1)
     ORDER BY created_at DESC
     LIMIT 1`,
    [email]
  )

  const license = result.rows[0] as LicenseRow | undefined

  if (!license) {
    return null
  }

  return isLicenseActive(license) ? license : null
}

export async function issueMagicLink(email: string, licenseId: number): Promise<string> {
  const rawToken = newToken(32)
  const hash = tokenHash(rawToken)

  await query(
    `INSERT INTO portal_magic_links (license_id, email, token_hash, expires_at)
     VALUES ($1, $2, $3, $4)`,
    [licenseId, normalizeEmail(email), hash, addMinutesIso(MAGIC_LINK_TTL_MINUTES)]
  )

  return rawToken
}

export async function consumeMagicLink(token: string): Promise<{ licenseId: number } | null> {
  const hash = tokenHash(token)

  const result = await query(
    `SELECT id, license_id, expires_at, used_at
     FROM portal_magic_links
     WHERE token_hash = $1
     LIMIT 1`,
    [hash]
  )

  const row = result.rows[0] as {
    id: number
    license_id: number
    expires_at: string
    used_at: string | null
  } | undefined

  if (!row) {
    return null
  }

  if (row.used_at || new Date(row.expires_at).getTime() <= Date.now()) {
    return null
  }

  await query(
    `UPDATE portal_magic_links SET used_at = $1 WHERE id = $2`,
    [nowIso(), row.id]
  )

  return { licenseId: row.license_id }
}

export async function createPortalSession(licenseId: number): Promise<string> {
  const rawToken = newToken(24)

  await query(
    `INSERT INTO portal_sessions (license_id, session_hash, expires_at)
     VALUES ($1, $2, $3)`,
    [licenseId, tokenHash(rawToken), addSecondsIso(SESSION_TTL_SECONDS)]
  )

  return rawToken
}

export async function getPortalSessionFromRequest(request: NextRequest): Promise<PortalSessionRow | null> {
  const raw = request.cookies.get(PORTAL_SESSION_COOKIE)?.value
  if (!raw) {
    return null
  }

  const result = await query(
    `SELECT id, license_id, expires_at, revoked_at
     FROM portal_sessions
     WHERE session_hash = $1
     LIMIT 1`,
    [tokenHash(raw)]
  )

  const row = result.rows[0] as PortalSessionRow | undefined

  if (!row) {
    return null
  }

  if (row.revoked_at || new Date(row.expires_at).getTime() <= Date.now()) {
    return null
  }

  return row
}

export async function getPortalSessionInfoFromRequest(request: NextRequest): Promise<PortalSessionInfo | null> {
  const session = await getPortalSessionFromRequest(request)
  if (!session) {
    return null
  }

  return {
    sessionId: session.id,
    licenseId: session.license_id,
  }
}

export async function revokePortalSession(sessionId: number): Promise<void> {
  await query(
    `UPDATE portal_sessions SET revoked_at = $1 WHERE id = $2`,
    [nowIso(), sessionId]
  )
}

export function getPortalSessionCookieName(): string {
  return PORTAL_SESSION_COOKIE
}

export function getPortalSessionTtlSeconds(): number {
  return SESSION_TTL_SECONDS
}

export async function findLicenseById(licenseId: number): Promise<LicenseRow | null> {
  const result = await query(
    `SELECT id, license_key, email, status, expires_at, max_instances
     FROM licenses
     WHERE id = $1
     LIMIT 1`,
    [licenseId]
  )

  return result.rows[0] as LicenseRow | null || null
}

export async function listActiveArtifacts(): Promise<ArtifactRow[]> {
  const result = await query(
    `SELECT id, version, type, filename, storage_key, sha256, size_bytes, is_active, published_at
     FROM artifacts
     WHERE is_active = 1
     ORDER BY published_at DESC`
  )

  return result.rows as ArtifactRow[]
}

export async function issueDownloadToken(licenseId: number, artifactId: number): Promise<string> {
  const rawToken = newToken(28)

  await query(
    `INSERT INTO portal_download_tokens (license_id, artifact_id, token_hash, expires_at)
     VALUES ($1, $2, $3, $4)`,
    [licenseId, artifactId, tokenHash(rawToken), addMinutesIso(DOWNLOAD_TOKEN_TTL_MINUTES)]
  )

  return rawToken
}

export async function consumeDownloadToken(token: string): Promise<{ licenseId: number; artifactId: number } | null> {
  const hash = tokenHash(token)

  const result = await query(
    `SELECT id, license_id, artifact_id, expires_at, used_at
     FROM portal_download_tokens
     WHERE token_hash = $1
     LIMIT 1`,
    [hash]
  )

  const row = result.rows[0] as {
    id: number
    license_id: number
    artifact_id: number
    expires_at: string
    used_at: string | null
  } | undefined

  if (!row) {
    return null
  }

  if (row.used_at || new Date(row.expires_at).getTime() <= Date.now()) {
    return null
  }

  await query(
    `UPDATE portal_download_tokens SET used_at = $1 WHERE id = $2`,
    [nowIso(), row.id]
  )

  return { licenseId: row.license_id, artifactId: row.artifact_id }
}

export async function findArtifactById(artifactId: number): Promise<ArtifactRow | null> {
  const result = await query(
    `SELECT id, version, type, filename, storage_key, sha256, size_bytes, is_active, published_at
     FROM artifacts
     WHERE id = $1
     LIMIT 1`,
    [artifactId]
  )

  return result.rows[0] as ArtifactRow | null || null
}

export async function logDownloadEvent(
  licenseId: number,
  artifactId: number,
  ip: string | null,
  userAgent: string | null
): Promise<void> {
  await query(
    `INSERT INTO download_events (license_id, artifact_id, ip, user_agent)
     VALUES ($1, $2, $3, $4)`,
    [licenseId, artifactId, ip, userAgent]
  )
}

export function getSignedStorageUrl(storageKey: string): string {
  const baseUrl = process.env.PRIVATE_DOWNLOAD_BASE_URL
  if (!baseUrl) {
    throw new Error('PRIVATE_DOWNLOAD_BASE_URL is not configured')
  }

  const signingSecret = process.env.PRIVATE_DOWNLOAD_SIGNING_SECRET
  const effectiveSecret = signingSecret || (process.env.NODE_ENV !== 'production' ? 'dev-only-download-signing-secret' : '')
  if (!effectiveSecret) {
    throw new Error('PRIVATE_DOWNLOAD_SIGNING_SECRET is not configured')
  }

  const separator = baseUrl.endsWith('/') ? '' : '/'
  const expiresAt = Math.floor(Date.now() / 1000) + Math.max(30, SIGNED_DOWNLOAD_URL_TTL_SECONDS)
  const payload = `${storageKey}:${expiresAt}`
  const signature = crypto
    .createHmac('sha256', effectiveSecret)
    .update(payload)
    .digest('base64url')

  return `${baseUrl}${separator}${storageKey}?exp=${expiresAt}&sig=${signature}`
}
