import Link from 'next/link'
import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XCircle, HelpCircle, MessageSquare } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export default function CheckoutCancelPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt={siteConfig.name}
              width={360}
              height={80}
              className="h-16 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
        
        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
              <XCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <CardTitle className="text-3xl">Payment cancelled</CardTitle>
            <CardDescription className="text-base">
              Your checkout session was cancelled. No charges were made.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Need help deciding?</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Common questions</p>
                    <p className="text-sm text-muted-foreground">
                      Both plans include all features. The yearly plan offers better value with 2 months free.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Have questions?</p>
                    <p className="text-sm text-muted-foreground">
                      Contact us at support@stackbill.com and we will be happy to help you choose the right plan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="font-medium text-sm">What you get with StackBill:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Full control of your data with self-hosting</li>
                <li>Unlimited quotes and invoices</li>
                <li>Integrations with Clockify and Trello</li>
                <li>Custom branding for your business</li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/pricing">
                View pricing again
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/">
                Back to home
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
