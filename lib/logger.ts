import { query } from '@/lib/db'

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

export async function logLicenseEvent(
  licenseKey: string | null,
  event: LogEvent,
  details?: string,
  ipAddress?: string
) {
  try {
    // Fire-and-forget async logging
    query(
      `INSERT INTO license_logs (license_key, event, details, ip_address) VALUES ($1, $2, $3, $4)`,
      [licenseKey, event, details || null, ipAddress || null]
    ).catch(err => {
      console.error(`[LICENSE LOG ERROR] ${event}:`, err)
    })
  } catch (err) {
    console.error(`[LICENSE LOG ERROR] ${event}:`, err)
  }

  // Always console.log for server observability
  const prefix = licenseKey ? `[${licenseKey}]` : '[system]'
  console.log(`[LICENSE] ${prefix} ${event}${details ? ` — ${details}` : ''}`)
}
