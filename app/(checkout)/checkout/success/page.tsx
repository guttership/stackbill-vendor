import Link from 'next/link'
import Image from 'next/image'
import { headers } from 'next/headers'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Mail, Download, FileText } from 'lucide-react'
import { siteConfig } from '@/lib/config'

const copy = {
  en: {
    title: 'Payment successful',
    subtitle: 'Thank you for subscribing to StackBill',
    nextTitle: 'What happens next?',
    emailTitle: 'Check your email',
    emailText: 'You will receive a confirmation email with your license key and download instructions.',
    downloadTitle: 'Download StackBill',
    downloadText: 'Access the latest version and follow our installation guide to set up your self-hosted instance.',
    docsTitle: 'Read the documentation',
    docsText: 'Learn how to configure your instance, customize templates, and integrate with your tools.',
    helpText: 'Need help? Our documentation and email support are available to help you get started.',
    downloadCta: 'Download StackBill',
    backCta: 'Back to home',
  },
  fr: {
    title: 'Paiement reussi',
    subtitle: 'Merci pour votre abonnement a StackBill',
    nextTitle: 'Que se passe-t-il maintenant ?',
    emailTitle: 'Verifiez votre email',
    emailText: 'Vous allez recevoir un email de confirmation avec votre cle de licence et les instructions de telechargement.',
    downloadTitle: 'Telecharger StackBill',
    downloadText: 'Accedez a la derniere version et suivez notre guide d installation pour configurer votre instance auto-hebergee.',
    docsTitle: 'Lire la documentation',
    docsText: 'Apprenez a configurer votre instance, personnaliser vos modeles et integrer vos outils.',
    helpText: 'Besoin d aide ? Notre documentation et le support email sont disponibles pour vous aider a demarrer.',
    downloadCta: 'Telecharger StackBill',
    backCta: 'Retour a l accueil',
  },
} as const

type CopyKey = keyof typeof copy

function SuccessContent({ locale }: { locale: CopyKey }) {
  const t = copy[locale]

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
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-3xl">{t.title}</CardTitle>
            <CardDescription className="text-base">
              {t.subtitle}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{t.nextTitle}</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{t.emailTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.emailText}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Download className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{t.downloadTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.downloadText}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{t.docsTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.docsText}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                {t.helpText}
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="w-full sm:w-auto">
              <Link href="https://github.com/guttership/stackbill">
                {t.downloadCta}
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/">
                {t.backCta}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default async function CheckoutSuccessPage() {
  const acceptLanguage = (await headers()).get('accept-language') || ''
  const locale: CopyKey = acceptLanguage.toLowerCase().includes('fr') ? 'fr' : 'en'

  return (
    <SuccessContent locale={locale} />
  )
}
