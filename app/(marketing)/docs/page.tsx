import type { Metadata } from 'next'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { getCurrentMessages, getCurrentLocale } from '@/lib/i18n/server'

export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Github } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { AnimateOnScroll } from '@/components/marketing/animate-on-scroll'

export const metadata: Metadata = {
  title: 'Documentation — Installation Guide',
  description:
    'Step-by-step installation guide for StackBill. Deploy your self-hosted invoicing tool with Docker in minutes. Supports Linux, macOS and Windows.',
  alternates: {
    canonical: `${siteConfig.url}/docs`,
  },
  openGraph: {
    url: `${siteConfig.url}/docs`,
    title: `Documentation | ${siteConfig.name}`,
    description:
      'Step-by-step installation guide for StackBill. Deploy your self-hosted invoicing tool with Docker in minutes. Supports Linux, macOS and Windows.',
  },
}

async function getInstallationDoc(locale: 'fr' | 'en') {
  try {
    const fileName = locale === 'en' ? 'INSTALLATION.en.md' : 'INSTALLATION.fr.md'
    const docPath = path.join(process.cwd(), fileName)
    const content = await readFile(docPath, 'utf-8')
    return content
  } catch {
    return null
  }
}

export default async function DocsPage() {
  const messages = await getCurrentMessages()
  const locale = await getCurrentLocale()
  const docContent = await getInstallationDoc(locale)

  if (!docContent) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Documentation not available</h1>
        <p className="text-[#676060] mb-8">The installation guide could not be loaded.</p>
        <Button asChild>
          <Link href="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="relative z-10">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll animation="slide-up">
            <div className="mb-12 flex items-center justify-between">
              <Button variant="outline" asChild>
                <Link href="/">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {messages.marketing.heroTitle}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  {locale === 'en' ? 'View on GitHub' : 'Voir sur GitHub'}
                </Link>
              </Button>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="scale-up" delay={100}>
            <article className="prose prose-slate max-w-none">
              <div
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(docContent) }}
              />
            </article>
          </AnimateOnScroll>

          <AnimateOnScroll animation="slide-up" delay={200}>
            <div className="mt-16 pt-8 border-t border-black/10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/pricing">{locale === 'en' ? 'Install StackBill' : 'Installer StackBill'}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/">{locale === 'en' ? 'Back to home' : 'Retour à l\'accueil'}</Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  )
}

// Simple markdown to HTML converter for basic formatting
function convertMarkdownToHTML(markdown: string): string {
  let html = markdown

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, (match, lang, code) => {
    return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`
  })

  // Inline code
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>')

  // Unordered lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>[\s\S]*?<\/li>)/gim, '<ul>$1</ul>')

  // Ordered lists
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>')

  // Paragraphs
  html = html
    .split('\n\n')
    .map((paragraph) => {
      paragraph = paragraph.trim()
      if (
        paragraph.startsWith('<h') ||
        paragraph.startsWith('<pre>') ||
        paragraph.startsWith('<ul>') ||
        paragraph.startsWith('<ol>') ||
        paragraph.startsWith('<hr') ||
        paragraph === ''
      ) {
        return paragraph
      }
      return `<p>${paragraph}</p>`
    })
    .join('\n')

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr />')

  return html
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m] || m)
}
