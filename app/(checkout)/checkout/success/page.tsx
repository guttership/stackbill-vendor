import Link from 'next/link'
import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Mail, Download, FileText } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { getCurrentMessages } from '@/lib/i18n/server'

export default async function CheckoutSuccessPage() {
  const messages = await getCurrentMessages()
  const steps = messages.checkout.success.steps

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
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-3xl">{messages.checkout.success.title}</CardTitle>
            <CardDescription className="text-base">{messages.checkout.success.subtitle}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{messages.checkout.success.nextTitle}</h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{steps[0].title}</p>
                    <p className="text-sm text-muted-foreground">{steps[0].description}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Download className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{steps[1].title}</p>
                    <p className="text-sm text-muted-foreground">{steps[1].description}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{steps[2].title}</p>
                    <p className="text-sm text-muted-foreground">{steps[2].description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">{messages.checkout.success.help}</p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="w-full sm:w-auto">
              <Link href="https://github.com/guttership/stackbill">{messages.checkout.success.download}</Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/">{messages.checkout.success.backHome}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
