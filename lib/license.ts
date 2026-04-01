import crypto from 'crypto'
import { query } from '@/lib/db'
import { logLicenseEvent } from '@/lib/logger'
import type { License, LicenseInstance, VerifyRequest, VerifyResponse, RestoreInstanceRequest } from '@/types/license'

const PUBLIC_DEMO_LICENSE_KEY = 'SB-DEMO-DMUM-2026'
const PUBLIC_DEMO_LICENSE_DOMAIN = 'factures.dmum.eu'
const PUBLIC_DEMO_MAX_INSTANCES = 10000

/**
 * Detect language from country code
 */
export function detectLanguage(countryCode?: string): 'fr' | 'en' {
  if (!countryCode) return 'en'
  
  const frenchCountries = ['FR', 'BE', 'CH', 'CA', 'LU', 'ML', 'SN', 'CD', 'CI']
  return frenchCountries.includes(countryCode.toUpperCase()) ? 'fr' : 'en'
}

/**
 * Generate a unique license key in format SB-XXXX-XXXX-XXXX
 */
export function generateLicenseKey(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no ambiguous chars (0/O, 1/I)
  const segment = () =>
    Array.from({ length: 4 }, () => chars[crypto.randomInt(chars.length)]).join('')
  return `SB-${segment()}-${segment()}-${segment()}`
}

/**
 * Create a new license after Stripe checkout (async for PostgreSQL)
 */
export async function createLicense(params: {
  stripeCustomerId: string
  stripeSubscriptionId: string
  email?: string
  plan?: string
  tier?: string
  maxInstances?: number
  expiresAt?: string
}): Promise<License> {
  const licenseKey = generateLicenseKey()

  const result = await query(
    `INSERT INTO licenses 
      (license_key, email, tier, plan, max_instances, status, expires_at, stripe_customer_id, stripe_subscription_id)
     VALUES 
      ($1, $2, $3, $4, $5, 'active', $6, $7, $8)
     RETURNING *`,
    [
      licenseKey,
      params.email || null,
      params.tier || 'core',
      params.plan || 'standard',
      params.maxInstances || 2,
      params.expiresAt || null,
      params.stripeCustomerId,
      params.stripeSubscriptionId,
    ]
  )

  const license = result.rows[0] as License

  logLicenseEvent(licenseKey, 'license_created', `plan=${params.plan || 'standard'}, subscription=${params.stripeSubscriptionId}`)

  return license
}

/**
 * Find license by Stripe subscription ID (async for PostgreSQL)
 */
export async function findLicenseBySubscription(stripeSubscriptionId: string): Promise<License | undefined> {
  const result = await query('SELECT * FROM licenses WHERE stripe_subscription_id = $1', [stripeSubscriptionId])
  return result.rows[0] as License | undefined
}

/**
 * Find license by license key (async for PostgreSQL)
 */
export async function findLicenseByKey(licenseKey: string): Promise<License | undefined> {
  const result = await query('SELECT * FROM licenses WHERE license_key = $1', [licenseKey])
  return result.rows[0] as License | undefined
}

function normalizeDomain(domain?: string): string | null {
  if (!domain) return null

  const normalized = domain
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .split('/')[0]
    .replace(/^www\./, '')

  return normalized || null
}

function buildPublicDemoResponse(now: string): VerifyResponse {
  return {
    valid: true,
    plan: 'demo',
    max_instances: PUBLIC_DEMO_MAX_INSTANCES,
    server_time: now,
  }
}

/**
 * Extend license expiration (on invoice.paid) - async for PostgreSQL
 */
export async function extendLicense(stripeSubscriptionId: string, newExpiresAt: string): Promise<boolean> {
  const result = await query(
    `UPDATE licenses SET expires_at = $1, status = 'active' WHERE stripe_subscription_id = $2`,
    [newExpiresAt, stripeSubscriptionId]
  )

  if (result.rowCount && result.rowCount > 0) {
    const license = await findLicenseBySubscription(stripeSubscriptionId)
    if (license) {
      logLicenseEvent(license.license_key, 'license_extended', `new_expires_at=${newExpiresAt}`)
    }
  }

  return (result.rowCount || 0) > 0
}

/**
 * Cancel a license (on subscription deleted) - async for PostgreSQL
 */
export async function cancelLicense(stripeSubscriptionId: string): Promise<boolean> {
  const result = await query(
    `UPDATE licenses SET status = 'cancelled' WHERE stripe_subscription_id = $1`,
    [stripeSubscriptionId]
  )

  if (result.rowCount && result.rowCount > 0) {
    const license = await findLicenseBySubscription(stripeSubscriptionId)
    if (license) {
      logLicenseEvent(license.license_key, 'license_cancelled', `subscription=${stripeSubscriptionId}`)
    }
  }

  return (result.rowCount || 0) > 0
}

/**
 * Get active instances for a license (async for PostgreSQL)
 */
export async function getInstanceCount(licenseId: number): Promise<number> {
  const result = await query('SELECT COUNT(*) as count FROM license_instances WHERE license_id = $1', [licenseId])
  return parseInt(result.rows[0].count, 10)
}

/**
 * Verify license (async for PostgreSQL)
 */
export async function verifyLicense(request: VerifyRequest): Promise<VerifyResponse> {
  const now = new Date().toISOString()

  // Check for demo license
  const domain = normalizeDomain(request.domain)
  if (request.license_key === PUBLIC_DEMO_LICENSE_KEY && domain === PUBLIC_DEMO_LICENSE_DOMAIN) {
    console.log(`[LICENSE] Demo license verified for domain: ${domain}`)
    return buildPublicDemoResponse(now)
  }

  // Look up in database
  const license = await findLicenseByKey(request.license_key)

  if (!license) {
    return {
      valid: false,
      reason: 'invalid_or_expired',
      server_time: now,
    }
  }

  // Check expiration
  if (license.expires_at) {
    const expiresAt = new Date(license.expires_at)
    if (expiresAt < new Date()) {
      return {
        valid: false,
        reason: 'license_expired',
        server_time: now,
      }
    }
  }

  // Check status
  if (license.status === 'cancelled') {
    return {
      valid: false,
      reason: 'license_cancelled',
      server_time: now,
    }
  }

  // Check max instances (allow already-registered instance to revalidate)
  const existingInstanceResult = await query(
    `SELECT 1 FROM license_instances WHERE license_id = $1 AND instance_id = $2 LIMIT 1`,
    [license.id, request.instance_id]
  )
  const hasExistingInstance = existingInstanceResult.rowCount !== null && existingInstanceResult.rowCount > 0

  const instanceCount = await getInstanceCount(license.id)
  if (!hasExistingInstance && instanceCount >= license.max_instances) {
    // If the same domain already has a registered instance, reassign it to the new instance_id.
    if (domain) {
      const sameDomainResult = await query(
        `SELECT id FROM license_instances WHERE license_id = $1 AND domain = $2 ORDER BY last_seen_at DESC LIMIT 1`,
        [license.id, domain]
      )

      const sameDomainInstanceId = sameDomainResult.rows[0]?.id as number | undefined
      if (sameDomainInstanceId) {
        await query(
          `UPDATE license_instances
           SET instance_id = $1, last_seen_at = NOW(), domain = $2
           WHERE id = $3`,
          [request.instance_id, domain, sameDomainInstanceId]
        )
      } else {
        return {
          valid: false,
          reason: 'max_instances_exceeded',
          server_time: now,
        }
      }
    } else {
      return {
        valid: false,
        reason: 'max_instances_exceeded',
        server_time: now,
      }
    }
  }

  // Register or update instance
  if (request.domain && request.instance_id) {
    const normDomain = normalizeDomain(request.domain)
    await query(
      `INSERT INTO license_instances (license_id, instance_id, domain)
       VALUES ($1, $2, $3)
       ON CONFLICT(license_id, instance_id) DO UPDATE 
       SET last_seen_at = NOW(), domain = $3`,
      [license.id, request.instance_id, normDomain]
    )
  }

  return {
    valid: true,
    tier: license.tier,
    plan: (license.plan as any) || 'standard',
    max_instances: license.max_instances,
    expires_at: license.expires_at || undefined,
    server_time: now,
  }
}

export async function restoreLicenseInstance(request: RestoreInstanceRequest): Promise<VerifyResponse> {
  const now = new Date().toISOString()
  const domain = normalizeDomain(request.domain)

  if (!request.instance_id) {
    return {
      valid: false,
      reason: 'missing_instance_id',
      server_time: now,
    }
  }

  const params: string[] = [request.instance_id.trim()]
  let domainFilter = ''
  if (domain) {
    params.push(domain)
    domainFilter = 'AND li.domain = $2'
  }

  const result = await query(
    `SELECT l.*
     FROM license_instances li
     JOIN licenses l ON l.id = li.license_id
     WHERE li.instance_id = $1 ${domainFilter}
     ORDER BY li.last_seen_at DESC
     LIMIT 1`,
    params
  )

  const license = result.rows[0] as License | undefined

  if (!license) {
    return {
      valid: false,
      reason: 'instance_not_found',
      server_time: now,
    }
  }

  if (license.expires_at) {
    const expiresAt = new Date(license.expires_at)
    if (expiresAt < new Date()) {
      return {
        valid: false,
        reason: 'license_expired',
        server_time: now,
      }
    }
  }

  if (license.status === 'cancelled' || license.status === 'revoked') {
    return {
      valid: false,
      reason: 'license_cancelled',
      server_time: now,
    }
  }

  await query(
    `UPDATE license_instances
     SET last_seen_at = NOW(),
         domain = COALESCE($2, domain)
     WHERE instance_id = $1`,
    [request.instance_id.trim(), domain]
  )

  return {
    valid: true,
    tier: license.tier,
    plan: (license.plan as any) || 'standard',
    max_instances: license.max_instances,
    expires_at: license.expires_at || undefined,
    server_time: now,
  }
}

/**
 * Mock function for backward compatibility (returns empty array)
 */
export function verifyLicenseSync(request: VerifyRequest): VerifyResponse {
  const now = new Date().toISOString()

  // Check for demo license only (sync path)
  const domain = normalizeDomain(request.domain)
  if (request.license_key === PUBLIC_DEMO_LICENSE_KEY && domain === PUBLIC_DEMO_LICENSE_DOMAIN) {
    return buildPublicDemoResponse(now)
  }

  return {
    valid: false,
    reason: 'database_unavailable',
    server_time: now,
  }
}
