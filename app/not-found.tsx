import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { getCurrentMessages } from '@/lib/i18n/server'

export default async function NotFound() {
  const messages = await getCurrentMessages()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-12 flex justify-center">
          <Image
            src="/images/logo.svg"
            alt={siteConfig.name}
            width={360}
            height={80}
            className="h-16 w-auto opacity-50"
          />
        </div>

        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <div className="-mt-8">
            <p className="text-2xl font-semibold text-gray-900">{messages.notFound.title}</p>
            <p className="mt-2 text-gray-600">{messages.notFound.text}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              {messages.notFound.goHome}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/pricing">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {messages.notFound.viewPricing}
            </Link>
          </Button>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>{messages.notFound.help}</p>
          <div className="mt-2 space-x-4">
            <Link href="https://stackbill.tech" className="text-blue-600 hover:text-blue-700">
              {messages.notFound.documentation}
            </Link>
            <span>·</span>
            <Link href="mailto:designmoiunmouton@gmail.com" className="text-blue-600 hover:text-blue-700">
              {messages.notFound.support}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
