import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <Image
            src="/images/logo.svg"
            alt={siteConfig.name}
            width={360}
            height={80}
            className="h-16 w-auto opacity-50"
          />
        </div>
        
        {/* 404 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <div className="-mt-8">
            <p className="text-2xl font-semibold text-gray-900">Page not found</p>
            <p className="mt-2 text-gray-600">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Go to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/pricing">
              <ArrowLeft className="h-4 w-4 mr-2" />
              View Pricing
            </Link>
          </Button>
        </div>

        {/* Help text */}
        <div className="mt-12 text-sm text-gray-500">
          <p>Need help? Check our documentation or contact support.</p>
          <div className="mt-2 space-x-4">
            <Link 
              href="https://docs.stackbill.com" 
              className="text-blue-600 hover:text-blue-700"
            >
              Documentation
            </Link>
            <span>·</span>
            <Link 
              href="mailto:support@stackbill.com" 
              className="text-blue-600 hover:text-blue-700"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
