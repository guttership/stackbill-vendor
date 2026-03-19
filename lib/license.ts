import crypto from 'crypto'
import { getDb } from '@/lib/db'
import { logLicenseEvent } from '@/lib/logger'
import type { License, LicenseInstance, VerifyRequest, VerifyResponse } from '@/types/license'

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
 * Create a new license after Stripe checkout
 */
export function createLicense(params: {
  stripeCustomerId: string
  stripeSubscriptionId: string
  email?: string
  plan?: string
  tier?: string
  maxInstances?: number
  expiresAt?: string
}): License {
  const db = getDb()
  const licenseKey = generateLicenseKey()

  const stmt = db.prepare(`
    INSERT INTO licenses (license_key, email, tier, plan, max_instances, status, expires_at, stripe_customer_id, stripe_subscription_id)
    VALUES (?, ?, ?, ?, ?, 'active', ?, ?, ?)
  `)

  const result = stmt.run(
    licenseKey,
    params.email || null,
    params.tier || 'core',
    params.plan || 'standard',
    params.maxInstances || 2,
    params.expiresAt || null,
    params.stripeCustomerId,
    params.stripeSubscriptionId
  )

  logLicenseEvent(licenseKey, 'license_created', `plan=${params.plan || 'standard'}, subscription=${params.stripeSubscriptionId}`)

  return db.prepare('SELECT * FROM licenses WHERE id = ?').get(result.lastInsertRowid) as License
}

/**
 * Find license by Stripe subscription ID
 */
export function findLicenseBySubscription(stripeSubscriptionId: string): License | undefined {
  const db = getDb()
  return db.prepare('SELECT * FROM licenses WHERE stripe_subscription_id = ?').get(stripeSubscriptionId) as License | undefined
}

/**
 * Find license by license key
 */
export function findLicenseByKey(licenseKey: string): License | undefined {
  const db = getDb()
  return db.prepare('SELECT * FROM licenses WHERE license_key = ?').get(licenseKey) as License | undefined
}

/**
 * Extend license expiration (on invoice.paid)
 */
export function extendLicense(stripeSubscriptionId: string, newExpiresAt: string): boolean {
  const db = getDb()
  const result = db.prepare(`
    UPDATE licenses SET expires_at = ?, status = 'active' WHERE stripe_subscription_id = ?
  `).run(newExpiresAt, stripeSubscriptionId)

  if (result.changes > 0) {
    const license = findLicenseBySubscription(stripeSubscriptionId)
    if (license) {
      logLicenseEvent(license.license_key, 'license_extended', `new_expires_at=${newExpiresAt}`)
    }
  }

  return result.changes > 0
}

/**
 * Cancel a license (on subscription deleted)
 */
export function cancelLicense(stripeSubscriptionId: string): boolean {
  const db = getDb()
  const result = db.prepare(`
    UPDATE licenses SET status = 'cancelled' WHERE stripe_subscription_id = ?
  `).run(stripeSubscriptionId)

  if (result.changes > 0) {
    const license = findLicenseBySubscription(stripeSubscriptionId)
    if (license) {
      logLicenseEvent(license.license_key, 'license_cancelled', `subscription=${stripeSubscriptionId}`)
    }
  }

  return result.changes > 0
}

/**
 * Get active instances for a license
 */
export function getInstanceCount(licenseId: number): number {
  const db = getDb()
  const row = db.prepare('SELECT COUNT(*) as count FROM license_instances WHERE license_id = ?').get(licenseId) as { count: number }
  return row.count
}

/**
 * Find an existing instance
 */
export function findInstance(licenseId: number, instanceId: string): LicenseInstance | undefined {
  const db = getDb()
  return db.prepare('SELECT * FROM license_instances WHERE license_id = ? AND instance_id = ?').get(licenseId, instanceId) as LicenseInstance | undefined
}

/**
 * Register or update an instance
 */
export function upsertInstance(licenseId: number, instanceId: string, domain?: string): LicenseInstance {
  const db = getDb()
  const existing = findInstance(licenseId, instanceId)

  if (existing) {
    db.prepare(`
      UPDATE license_instances SET last_seen_at = datetime('now'), domain = COALESCE(?, domain) WHERE id = ?
    `).run(domain || null, existing.id)
    return db.prepare('SELECT * FROM license_instances WHERE id = ?').get(existing.id) as LicenseInstance
  }

  const result = db.prepare(`
    INSERT INTO license_instances (license_id, instance_id, domain) VALUES (?, ?, ?)
  `).run(licenseId, instanceId, domain || null)

  return db.prepare('SELECT * FROM license_instances WHERE id = ?').get(result.lastInsertRowid) as LicenseInstance
}

/**
 * Verify a license — core validation logic
 */
export function verifyLicense(req: VerifyRequest, ip?: string): VerifyResponse {
  const now = new Date().toISOString()

  // 1. Find license
  const license = findLicenseByKey(req.license_key)
  if (!license) {
    logLicenseEvent(req.license_key, 'verify_invalid_key', `instance=${req.instance_id}`, ip)
    return { valid: false, reason: 'invalid_license' }
  }

  // 2. Check status
  if (license.status !== 'active') {
    logLicenseEvent(req.license_key, 'verify_inactive', `status=${license.status}`, ip)
    return { valid: false, reason: `license_${license.status}` }
  }

  // 3. Check expiration
  if (license.expires_at && new Date(license.expires_at) < new Date()) {
    logLicenseEvent(req.license_key, 'verify_expired', `expired_at=${license.expires_at}`, ip)
    return { valid: false, reason: 'license_expired' }
  }

  // 4. Check instance
  const existingInstance = findInstance(license.id, req.instance_id)

  if (existingInstance) {
    // Known instance — update last_seen
    upsertInstance(license.id, req.instance_id, req.domain)
    logLicenseEvent(req.license_key, 'verify_ok', `instance=${req.instance_id} (existing)`, ip)
  } else {
    // New instance — check limit
    const currentCount = getInstanceCount(license.id)
    if (currentCount >= license.max_instances) {
      logLicenseEvent(req.license_key, 'verify_instance_limit', `current=${currentCount}, max=${license.max_instances}, instance=${req.instance_id}`, ip)
      return { valid: false, reason: 'instance_limit_reached' }
    }
    // Register new instance
    upsertInstance(license.id, req.instance_id, req.domain)
    logLicenseEvent(req.license_key, 'verify_ok', `instance=${req.instance_id} (new, ${currentCount + 1}/${license.max_instances})`, ip)
  }

  return {
    valid: true,
    plan: license.plan,
    max_instances: license.max_instances,
    expires_at: license.expires_at || undefined,
    server_time: now,
  }
}
