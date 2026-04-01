import { NextRequest, NextResponse } from 'next/server'
import { restoreLicenseInstance } from '@/lib/license'
import type { RestoreInstanceRequest } from '@/types/license'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Partial<RestoreInstanceRequest>

    if (!body.instance_id || typeof body.instance_id !== 'string') {
      return NextResponse.json(
        { valid: false, reason: 'missing_instance_id' },
        { status: 400 }
      )
    }

    const result = await restoreLicenseInstance({
      instance_id: body.instance_id.trim(),
      domain: body.domain?.trim(),
    })

    return NextResponse.json(result, { status: result.valid ? 200 : 404 })
  } catch (error) {
    console.error('License restore error:', error)
    return NextResponse.json(
      { valid: false, reason: 'server_error' },
      { status: 500 }
    )
  }
}