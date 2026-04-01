import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getCurrentLocale } from '@/lib/i18n/server'

export const dynamic = 'force-dynamic'

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getCurrentLocale()

  return (
    <div className="relative min-h-screen overflow-x-clip" style={{ backgroundColor: 'var(--brand-bg)' }}>
      <div className="hidden md:block bg-orb bg-orb-accent w-[560px] h-[560px] -top-32 right-[8%] fixed opacity-[0.16]" />
      <div className="hidden md:block bg-orb bg-orb-primary w-[440px] h-[440px] bottom-[-10%] left-[18%] fixed opacity-[0.11]" />
      <div className="hidden md:block bg-orb bg-orb-accent w-[280px] h-[280px] top-[45%] -left-[5%] fixed opacity-[0.08]" />

      <Header />
      <main className="surface-texture relative z-10 flex-1 pt-28">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  )
}
