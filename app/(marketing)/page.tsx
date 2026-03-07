import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Server,
  Code2,
  FileText,
  Clock,
  Trello,
  Palette,
  Download,
  ChevronRight,
  Check,
} from 'lucide-react'
import { getCurrentMessages } from '@/lib/i18n/server'

export default async function HomePage() {
  const messages = await getCurrentMessages()

  const whyIcons = [Server, Code2, FileText]
  const integrationIcons = [Clock, Trello, Palette]

  return (
    <div className="relative z-10 flex flex-col text-[#463f3f]">
      <section className="relative overflow-hidden border-b border-black/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="page-title">{messages.marketing.heroTitle}</h1>
                <p className="text-xl max-w-[600px] text-[#555353]">{messages.marketing.heroSubtitle}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/pricing">
                    {messages.marketing.heroPrimaryCta}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pricing">{messages.marketing.heroSecondaryCta}</Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 items-center text-sm text-[#676060]">
                <Check className="h-4 w-4" />
                <span>{messages.marketing.reassurance[0]}</span>
                <span className="text-black/20">•</span>
                <span>{messages.marketing.reassurance[1]}</span>
                <span className="text-black/20">•</span>
                <span>{messages.marketing.reassurance[2]}</span>
              </div>
            </div>

            <div className="relative">
              <div className="glass-card relative overflow-hidden p-2 md:p-3">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/image.webp"
                    alt="StackBill dashboard preview"
                    fill
                    className="object-cover object-center"
                    priority
                    quality={72}
                    sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, 100vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-b border-black/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="section-title">{messages.marketing.whyTitle}</h2>
            <p className="text-lg max-w-[700px] mx-auto text-[#676060]">{messages.marketing.whySubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {messages.marketing.whyCards.map((card, index) => {
              const Icon = whyIcons[index]
              return (
                <Card key={card.title} className="relative overflow-hidden">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-[color:var(--brand-primary)]/15 flex items-center justify-center mb-4 text-[#3f3a3a]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="section-title">{messages.marketing.integrationsTitle}</h2>
            <p className="text-lg max-w-[700px] mx-auto text-[#676060]">{messages.marketing.integrationsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {messages.marketing.integrationsCards.map((card, index) => {
              const Icon = integrationIcons[index]
              const bgClass = index % 2 === 0 ? 'bg-[color:var(--brand-primary)]/15' : 'bg-[color:var(--brand-accent)]/15'

              return (
                <Card key={card.title}>
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${bgClass} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-[#4f4a4a]" />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      {card.title}
                      <Badge variant="outline">{card.badge}</Badge>
                    </CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h2 className="section-title">{messages.marketing.pricingHighlightTitle}</h2>
              <p className="text-lg max-w-[760px] mx-auto text-[#676060]">{messages.marketing.pricingHighlightSubtitle}</p>
            </div>

            <Card className="max-w-3xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">StackBill</CardTitle>
                <CardDescription className="text-base">{messages.marketing.pricingHighlightNote}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center">
                  <div className="rounded-xl border border-black/10 px-6 py-4 min-w-[200px]">
                    <p className="text-2xl font-semibold text-[#3f3a3a]">{messages.marketing.pricingHighlightMonthly}</p>
                  </div>
                  <span className="text-sm text-[#676060] uppercase tracking-[0.15em]">{messages.marketing.pricingHighlightOr}</span>
                  <div className="rounded-xl border border-black/10 px-6 py-4 min-w-[200px]">
                    <p className="text-2xl font-semibold text-[#3f3a3a]">{messages.marketing.pricingHighlightYearly}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                  {messages.marketing.pricingHighlightFeatures.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-4 w-4 mt-1 text-[#4f4a4a]" />
                      <span className="text-sm text-[#555353]">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/pricing">
                      {messages.marketing.pricingHighlightPrimaryCta}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href={"https://stackbill.tech"} target="_blank" rel="noopener noreferrer">
                      {messages.marketing.pricingHighlightSecondaryCta}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="installation" className="border-b border-black/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Download className="h-6 w-6" />
                <Badge>{messages.marketing.installBadge}</Badge>
              </div>
              <h2 className="section-title">{messages.marketing.installationTitle}</h2>
              <p className="text-lg max-w-[600px] mx-auto text-[#676060]">{messages.marketing.installationText}</p>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 pb-3 border-b border-black/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-xs text-[#676060] ml-2">{messages.marketing.installTerminalLabel}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0 pb-6">
                <pre className="text-sm font-mono overflow-x-auto">
                  <code className="text-[#3f3a3a]">
{`git clone https://github.com/guttership/stackbill.git
cd stackbill
npm install
npm run dev`}
                  </code>
                </pre>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-sm text-[#676060] mb-4">{messages.marketing.installFooter}</p>
              <Button variant="outline" asChild>
                <Link href="/pricing">
                  {messages.marketing.installButton}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="border-b border-black/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="section-title">{messages.marketing.faqTitle}</h2>
              <p className="text-lg text-[#676060]">{messages.marketing.faqSubtitle}</p>
            </div>

            <div className="space-y-6">
              {messages.marketing.faqs.map((item) => (
                <Card key={item.q}>
                  <CardHeader>
                    <CardTitle className="text-xl">{item.q}</CardTitle>
                    <CardDescription className="text-base pt-2">{item.a}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="section-title">{messages.marketing.finalTitle}</h2>
              <p className="text-xl text-[#676060] max-w-[600px] mx-auto">{messages.marketing.finalText}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild>
                <Link href="/pricing">
                  {messages.marketing.finalPrimaryCta}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={"https://stackbill.tech"} target="_blank" rel="noopener noreferrer">
                  {messages.marketing.finalSecondaryCta}
                </Link>
              </Button>
            </div>

            <div className="pt-8">
              <p className="text-sm text-[#676060]">
                {messages.marketing.questionsLabel}{' '}
                <a
                  href="mailto:support@stackbill.tech"
                  className="underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  support@stackbill.tech
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
