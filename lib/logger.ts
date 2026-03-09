import { getDb } from '@/lib/db'

type LogEvent =
  | 'license_created'
  | 'license_extended'
  | 'license_cancelled'
  | 'verify_ok'
  | 'verify_invalid_key'
  | 'verify_inactive'
  | 'verify_expired'
  | 'verify_instance_limit'
  | 'webhook_received'
  | 'webhook_error'

export function logLicenseEvent(
  licenseKey: string | null,
  event: LogEvent,
  details?: string,
  ipAddress?: string
) {
  try {
    const db = getDb()
    db.prepare(`
      INSERT INTO license_logs (license_key, event, details, ip_address) VALUES (?, ?, ?, ?)
    `).run(licenseKey, event, details || null, ipAddress || null)
  } catch (err) {
    // Fallback to console if DB logging fails
    console.error(`[LICENSE LOG ERROR] ${event}:`, err)
  }

  // Always console.log for server observability
  const prefix = licenseKey ? `[${licenseKey}]` : '[system]'
  console.log(`[LICENSE] ${prefix} ${event}${details ? ` — ${details}` : ''}`)
}
