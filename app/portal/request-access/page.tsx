'use client'

import { FormEvent, useState } from 'react'

export default function PortalRequestAccessPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    try {
      await fetch('/api/portal/magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">Downloads portal access</h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter the email used during purchase. If a valid license exists, you will receive a login link.
        </p>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-lime-600 text-white text-sm font-medium py-2.5 hover:bg-lime-700 disabled:opacity-70"
          >
            {loading ? 'Sending...' : 'Send magic link'}
          </button>
        </form>

        {sent ? (
          <p className="mt-4 text-sm text-gray-700">
            If your account is eligible, an email has been sent.
          </p>
        ) : null}
      </div>
    </main>
  )
}
