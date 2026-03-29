import { NextRequest, NextResponse } from 'next/server'
import { verifyLicense } from '@/lib/license'
import type { VerifyRequest } from '@/types/license'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Partial<VerifyRequest>

    // Validate required fields
    if (!body.license_key || typeof body.license_key !== 'string') {
      return NextResponse.json(
        { valid: false, reason: 'missing_license_key' },
        { status: 400 }
      )
    }

    if (!body.instance_id || typeof body.instance_id !== 'string') {
      return NextResponse.json(
        { valid: false, reason: 'missing_instance_id' },
        { status: 400 }
      )
    }

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined

    const result = await verifyLicense(
      {
        license_key: body.license_key.trim(),
        instance_id: body.instance_id.trim(),
        domain: body.domain?.trim(),
        app_version: body.app_version?.trim(),
      }
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('License verify error:', error)
    return NextResponse.json(
      { valid: false, reason: 'server_error' },
      { status: 500 }
    )
  }
}
