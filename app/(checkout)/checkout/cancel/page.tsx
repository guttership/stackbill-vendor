import Link from 'next/link'
import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XCircle, HelpCircle, MessageSquare } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { getCurrentMessages } from '@/lib/i18n/server'

export default async function CheckoutCancelPage() {
  const messages = await getCurrentMessages()
  const blocks = messages.checkout.cancel.blocks

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
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
            <CardTitle className="text-3xl">{messages.checkout.cancel.title}</CardTitle>
            <CardDescription className="text-base">{messages.checkout.cancel.subtitle}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{messages.checkout.cancel.helpTitle}</h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{blocks[0].title}</p>
                    <p className="text-sm text-muted-foreground">{blocks[0].description}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{blocks[1].title}</p>
                    <p className="text-sm text-muted-foreground">{blocks[1].description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="font-medium text-sm">{messages.checkout.cancel.whatYouGet}</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                {messages.checkout.cancel.bulletPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/pricing">{messages.checkout.cancel.viewPricingAgain}</Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/">{messages.checkout.cancel.backHome}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
