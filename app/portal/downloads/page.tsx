'use client'

import { useEffect, useMemo, useState } from 'react'

type ArtifactItem = {
  id: number
  version: string
  type: 'source' | 'docker'
  filename: string
  sha256: string
  sizeBytes: number
  publishedAt: string
}

type PortalPayload = {
  license: {
    keyMasked: string
    status: string
    expiresAt: string | null
  }
  artifacts: ArtifactItem[]
}

export default function PortalDownloadsPage() {
  const [data, setData] = useState<PortalPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [downloadingId, setDownloadingId] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')
      try {
        const response = await fetch('/api/portal/artifacts')
        if (response.status === 401) {
          window.location.href = '/portal/request-access'
          return
        }
        if (!response.ok) {
          throw new Error('Failed to load artifacts')
        }
        const payload = await response.json() as PortalPayload
        if (!cancelled) {
          setData(payload)
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load your downloads right now.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const countLabel = useMemo(() => {
    if (!data) {
      return '0 package'
    }
    return data.artifacts.length > 1 ? `${data.artifacts.length} packages` : '1 package'
  }, [data])

  async function startDownload(artifactId: number) {
    setDownloadingId(artifactId)
    setError('')

    try {
      const response = await fetch('/api/portal/download-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artifactId }),
      })

      if (!response.ok) {
        throw new Error('Could not generate a download token')
      }

      const payload = await response.json() as { token: string }
      window.location.href = `/api/portal/download/${encodeURIComponent(payload.token)}`
    } catch {
      setError('Download failed. Please retry in a few seconds.')
    } finally {
      setDownloadingId(null)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">Portal downloads</h1>
          <p className="mt-2 text-sm text-gray-600">Secure access to your StackBill release artifacts.</p>

          {data ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
              <div className="rounded-lg bg-gray-100 px-3 py-2">
                <p className="text-gray-500">License</p>
                <p className="font-medium text-gray-900">{data.license.keyMasked}</p>
              </div>
              <div className="rounded-lg bg-gray-100 px-3 py-2">
                <p className="text-gray-500">Status</p>
                <p className="font-medium text-gray-900">{data.license.status}</p>
              </div>
              <div className="rounded-lg bg-gray-100 px-3 py-2">
                <p className="text-gray-500">Artifacts</p>
                <p className="font-medium text-gray-900">{countLabel}</p>
              </div>
            </div>
          ) : null}
        </header>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {loading ? <p className="text-sm text-gray-600">Loading artifacts...</p> : null}
          {error ? <p className="text-sm text-red-700">{error}</p> : null}

          {!loading && !error && data && data.artifacts.length === 0 ? (
            <p className="text-sm text-gray-600">No downloadable artifact is available yet.</p>
          ) : null}

          {!loading && data && data.artifacts.length > 0 ? (
            <div className="space-y-3">
              {data.artifacts.map((artifact) => (
                <article key={artifact.id} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-base font-medium text-gray-900">{artifact.filename}</h2>
                      <p className="text-sm text-gray-600">
                        {artifact.type} • v{artifact.version} • {Math.round(artifact.sizeBytes / 1024 / 1024)} MB
                      </p>
                      <p className="mt-1 text-xs text-gray-500">SHA256: {artifact.sha256}</p>
                    </div>
                    <button
                      onClick={() => startDownload(artifact.id)}
                      disabled={downloadingId === artifact.id}
                      className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-medium text-white hover:bg-lime-700 disabled:opacity-70"
                    >
                      {downloadingId === artifact.id ? 'Preparing...' : 'Download'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  )
}
