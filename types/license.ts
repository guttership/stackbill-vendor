export interface License {
  id: string
  customerId: string
  subscriptionId: string
  status: 'active' | 'inactive' | 'expired' | 'cancelled'
  licenseKey: string
  activatedAt: Date | null
  expiresAt: Date | null
  instanceUrl: string | null
  maxInstances: number
  currentInstances: number
  createdAt: Date
  updatedAt: Date
}

export interface LicenseActivation {
  licenseId: string
  instanceUrl: string
  activatedAt: Date
}

export interface LicenseValidation {
  isValid: boolean
  license?: License
  error?: string
}
