export interface License {
  id: number
  license_key: string
  email: string | null
  tier: string
  plan: string
  max_instances: number
  status: 'active' | 'expired' | 'cancelled' | 'revoked'
  created_at: string
  expires_at: string | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
}

export interface LicenseInstance {
  id: number
  license_id: number
  instance_id: string
  domain: string | null
  first_seen_at: string
  last_seen_at: string
}

export interface VerifyRequest {
  license_key: string
  instance_id: string
  domain?: string
  app_version?: string
}

export interface RestoreInstanceRequest {
  instance_id: string
  domain?: string
}

export interface VerifyResponse {
  valid: boolean
  tier?: string
  plan?: string
  max_instances?: number
  expires_at?: string
  server_time?: string
  reason?: string
}
