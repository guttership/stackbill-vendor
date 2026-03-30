export type KeywordCluster = {
  intent: 'transactional' | 'comparison' | 'informational'
  keywords: string[]
}

export type SeoOutlineSection = {
  h2: string
  h3: string[]
}

export type SeoCta = {
  label: string
  href: string
}

export type SeoLandingPage = {
  slug: string
  mainKeyword: string
  seoTitle: string
  metaDescription: string
  h1: string
  intro: string
  outline: SeoOutlineSection[]
  ctas: SeoCta[]
}

export type BlogPost = {
  slug: string
  title: string
  targetKeyword: string
  searchIntent: 'transactional' | 'comparison' | 'informational'
  intro: string
  outline: string[]
}

export const keywordClusters: KeywordCluster[] = [
  {
    intent: 'transactional',
    keywords: [
      'self hosted invoicing software',
      'invoice software for developers',
      'freelance developer invoice tool',
      'open source invoicing software',
      'self hosted billing software for freelancers',
      'api first invoicing software',
      'white label invoicing software',
      'invoicing software for small dev agency',
      'french compliant invoicing software',
      'quote to invoice software for freelancers',
      'self hosted quote and invoice tool',
      'developer invoicing app',
    ],
  },
  {
    intent: 'comparison',
    keywords: [
      'quickbooks alternative for developers',
      'freshbooks alternative self hosted',
      'indy alternative for freelancers',
      'freebe alternative for developers',
      'stripe invoicing alternative self hosted',
      'zoho invoice alternative for developers',
      'open source invoicing vs saas',
      'self hosted invoicing vs quickbooks',
      'best invoicing software for indie hackers',
      'invoicing tool for developers vs accounting software',
    ],
  },
  {
    intent: 'informational',
    keywords: [
      'how to self host invoicing software',
      'how to avoid saas lock in for invoicing',
      'best invoicing workflow for developers',
      'how to invoice freelance development clients',
      'how to create recurring revenue with white label software',
      'french invoicing requirements for freelancers',
      'api invoicing software explained',
      'self hosted billing architecture for agencies',
    ],
  },
]

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: 'invoice-software-for-developers',
    mainKeyword: 'invoice software for developers',
    seoTitle: 'Invoice Software for Developers (Self-Hosted)',
    metaDescription:
      'Self-hosted invoicing built for developers. Own your data, customize billing flows, and avoid SaaS lock-in.',
    h1: 'Invoice software for developers who want control',
    intro:
      'Most invoicing tools are built for accounting workflows, not engineering workflows. If billing is critical to cashflow, developers should own the stack.',
    outline: [
      {
        h2: 'Why dev teams outgrow SaaS invoicing',
        h3: ['Pricing dependency kills margin', 'Workflow limits create manual work'],
      },
      {
        h2: 'What control means in billing',
        h3: ['Own your data and deployment', 'Extend logic with your own stack'],
      },
      {
        h2: 'Start local, deploy when ready',
        h3: ['Fast setup path', 'Safe rollout plan'],
      },
    ],
    ctas: [
      { label: 'Compare plans now', href: '/pricing' },
      { label: 'Read docs', href: '/docs' },
    ],
  },
  {
    slug: 'self-hosted-invoicing-software',
    mainKeyword: 'self hosted invoicing software',
    seoTitle: 'Self-Hosted Invoicing Software for Freelancers',
    metaDescription:
      'Stop renting your invoicing stack. Host billing yourself and keep full control of your data and costs.',
    h1: 'Self-hosted invoicing software, no SaaS lock-in',
    intro:
      'Hosted tools feel simple until pricing changes, feature limits, or policy shifts start dictating how you run billing.',
    outline: [
      { h2: 'The hidden cost of hosted billing', h3: ['Lock-in risk', 'Roadmap dependency'] },
      { h2: 'What changes with self-hosting', h3: ['Ownership', 'Predictable economics'] },
      { h2: 'Deployment models', h3: ['Solo freelance setup', 'Agency setup'] },
    ],
    ctas: [
      { label: 'Switch without lock-in', href: '/pricing' },
      { label: 'Deployment guide', href: '/docs' },
    ],
  },
  {
    slug: 'freelance-developer-invoice-tool',
    mainKeyword: 'freelance developer invoice tool',
    seoTitle: 'Freelance Developer Invoice Tool (Self-Hosted)',
    metaDescription:
      'Built for freelance developers: fast quote-to-invoice, full control, and no dependency on SaaS billing platforms.',
    h1: 'A freelance developer invoice tool you actually control',
    intro:
      'You ship production systems for clients. Your invoicing should follow the same standard: predictable, extensible, and under your control.',
    outline: [
      { h2: 'Freelancer billing pain points', h3: ['Admin overhead', 'Tool switching fatigue'] },
      { h2: 'A better quote-to-invoice flow', h3: ['Less manual handling', 'Reusable process'] },
      { h2: 'Protect margin over time', h3: ['No forced upgrades', 'Predictable cost'] },
    ],
    ctas: [
      { label: 'See freelancer pricing', href: '/pricing' },
      { label: 'See workflow docs', href: '/docs' },
    ],
  },
  {
    slug: 'api-first-invoicing-software',
    mainKeyword: 'api first invoicing software',
    seoTitle: 'API-First Invoicing Software for Developers',
    metaDescription:
      'Connect billing to your stack with API-friendly, self-hosted invoicing built for technical workflows.',
    h1: 'API-first invoicing software for real dev workflows',
    intro: 'If your invoicing tool cannot integrate, your team ends up copying data manually and losing time every week.',
    outline: [
      { h2: 'Why API-first matters', h3: ['Automations', 'Less data duplication'] },
      { h2: 'Common integrations', h3: ['Project tools', 'Time tracking'] },
      { h2: 'Custom billing logic', h3: ['Your own rules', 'Safe extensibility'] },
    ],
    ctas: [
      { label: 'Explore docs', href: '/docs' },
      { label: 'See pricing', href: '/pricing' },
    ],
  },
  {
    slug: 'white-label-invoicing-software',
    mainKeyword: 'white label invoicing software',
    seoTitle: 'White-Label Invoicing Software for Agencies',
    metaDescription:
      'Deploy invoicing for clients under their own brand and turn delivery into recurring revenue.',
    h1: 'White-label invoicing that creates recurring revenue',
    intro:
      'Stop shipping only one-off projects. Deploy invoicing per client, host it, maintain it, and turn delivery into predictable monthly revenue.',
    outline: [
      { h2: 'Deploy per client', h3: ['Isolated environments', 'Repeatable setup'] },
      { h2: 'Host and support', h3: ['Own the stack', 'Keep control over uptime'] },
      { h2: 'Productized service', h3: ['Monthly plans', 'Better agency cashflow'] },
    ],
    ctas: [
      { label: 'Build your MRR offer', href: '/pricing' },
      { label: 'Read docs', href: '/docs' },
    ],
  },
  {
    slug: 'invoicing-software-for-dev-agencies',
    mainKeyword: 'invoicing software for small dev agency',
    seoTitle: 'Invoicing Software for Small Dev Agencies',
    metaDescription:
      'Self-hosted invoicing for small dev agencies that need control, custom workflows, and better margins.',
    h1: 'Invoicing software for small dev agencies',
    intro: 'When your agency scales, SaaS invoicing limits become operational debt.',
    outline: [
      { h2: 'Agency pain points', h3: ['Scaling clients', 'Tool constraints'] },
      { h2: 'A reusable agency billing stack', h3: ['Per-client deployment', 'Brand control'] },
      { h2: 'Economics', h3: ['Margin protection', 'Recurring retainers'] },
    ],
    ctas: [
      { label: 'See agency pricing', href: '/pricing' },
      { label: 'Deployment docs', href: '/docs' },
    ],
  },
  {
    slug: 'french-compliant-invoicing-software',
    mainKeyword: 'french compliant invoicing software',
    seoTitle: 'French-Compliant Invoicing Software (Self-Hosted)',
    metaDescription:
      'Self-hosted invoicing with French compliance basics and full control for technical freelancers and teams.',
    h1: 'French-compliant invoicing software you host yourself',
    intro: 'Compliance matters. Ownership matters too. You should not have to choose.',
    outline: [
      { h2: 'French invoicing requirements', h3: ['Required mentions', 'Operational checks'] },
      { h2: 'Control and compliance', h3: ['Data location', 'Custom legal details'] },
      { h2: 'Deployment checklist', h3: ['Go-live steps', 'Validation routine'] },
    ],
    ctas: [
      { label: 'Check pricing', href: '/pricing' },
      { label: 'Compliance docs', href: '/docs' },
    ],
  },
  {
    slug: 'quote-to-invoice-software-for-freelancers',
    mainKeyword: 'quote to invoice software for freelancers',
    seoTitle: 'Quote-to-Invoice Software for Freelancers',
    metaDescription:
      'Convert accepted quotes into invoices faster with a self-hosted workflow designed for freelancers.',
    h1: 'Quote to invoice without workflow friction',
    intro: 'Freelancers lose time when quotes and invoicing live in separate tools. Keep it in one controlled flow.',
    outline: [
      { h2: 'Where time is lost', h3: ['Manual copy-paste', 'Status confusion'] },
      { h2: 'A faster flow', h3: ['Quote to invoice conversion', 'Template reuse'] },
      { h2: 'Scale your process', h3: ['Repeatable billing', 'Less admin stress'] },
    ],
    ctas: [
      { label: 'Start now', href: '/pricing' },
      { label: 'Read docs', href: '/docs' },
    ],
  },
  {
    slug: 'open-source-invoicing-software-for-developers',
    mainKeyword: 'open source invoicing software',
    seoTitle: 'Open Source Invoicing Software for Developers',
    metaDescription:
      'Open-source invoicing with self-hosted control, transparent code, and developer-first extensibility.',
    h1: 'Open-source invoicing software for technical teams',
    intro: 'Open source gives technical teams auditability and freedom that generic SaaS tools cannot match.',
    outline: [
      { h2: 'Why open source matters', h3: ['Auditability', 'No black boxes'] },
      { h2: 'Self-hosted control', h3: ['Data ownership', 'Deployment freedom'] },
      { h2: 'Build on top', h3: ['Custom modules', 'Integration-first approach'] },
    ],
    ctas: [
      { label: 'View docs', href: '/docs' },
      { label: 'View pricing', href: '/pricing' },
    ],
  },
  {
    slug: 'quickbooks-alternative-for-developers',
    mainKeyword: 'quickbooks alternative for developers',
    seoTitle: 'QuickBooks Alternative for Developers',
    metaDescription:
      'A self-hosted QuickBooks alternative for developers who need control, flexibility, and predictable costs.',
    h1: 'A QuickBooks alternative built for developers',
    intro:
      'QuickBooks can work, but many developer teams pay for complexity they do not need. If you want control and speed, a self-hosted approach is usually cleaner.',
    outline: [
      { h2: 'Where QuickBooks feels rigid', h3: ['Workflow mismatch', 'Customization limits'] },
      { h2: 'What a dev-first alternative changes', h3: ['Control', 'Integration'] },
      { h2: 'How to migrate safely', h3: ['Data prep', 'Phased rollout'] },
    ],
    ctas: [
      { label: 'Compare alternatives', href: '/pricing' },
      { label: 'Read migration docs', href: '/docs' },
    ],
  },
  {
    slug: 'freshbooks-alternative-self-hosted',
    mainKeyword: 'freshbooks alternative self hosted',
    seoTitle: 'FreshBooks Alternative (Self-Hosted)',
    metaDescription:
      'Replace hosted invoicing dependency with self-hosted control and a workflow built for developers.',
    h1: 'FreshBooks alternative for teams that want ownership',
    intro: 'FreshBooks is easy to start with. Harder to own when your workflow gets technical.',
    outline: [
      { h2: 'Hosted convenience vs ownership', h3: ['Fast start', 'Long-term constraints'] },
      { h2: 'Cost and control comparison', h3: ['Recurring SaaS cost', 'Self-hosted economics'] },
      { h2: 'Migration without drama', h3: ['Data continuity', 'Process transition'] },
    ],
    ctas: [
      { label: 'See alternatives', href: '/pricing' },
      { label: 'Go to docs', href: '/docs' },
    ],
  },
  {
    slug: 'indy-alternative-for-freelancers',
    mainKeyword: 'indy alternative for freelancers',
    seoTitle: 'Indy Alternative for Freelancers',
    metaDescription:
      'Keep freelancer simplicity while gaining ownership, customization, and self-hosted control.',
    h1: 'Indy alternative for freelancers who want control',
    intro: 'Simplicity is useful. Dependency is expensive. You can keep both speed and ownership.',
    outline: [
      { h2: 'What freelancers like in Indy', h3: ['Simple UX', 'Fast onboarding'] },
      { h2: 'Where limitations show up', h3: ['Locked workflows', 'Pricing dependency'] },
      { h2: 'A better long-term stack', h3: ['Self-hosted setup', 'Adaptability'] },
    ],
    ctas: [
      { label: 'See pricing', href: '/pricing' },
      { label: 'Read setup docs', href: '/docs' },
    ],
  },
  {
    slug: 'freebe-alternative-for-developers',
    mainKeyword: 'freebe alternative for developers',
    seoTitle: 'Freebe Alternative for Developers',
    metaDescription:
      'Developer-first invoicing with self-hosting and no forced dependency on a third-party SaaS roadmap.',
    h1: 'Freebe alternative for developer freelancers',
    intro: 'If your invoicing process needs technical flexibility, generic SaaS starts slowing you down.',
    outline: [
      { h2: 'What works in Freebe', h3: ['Ease of use', 'Basic billing flow'] },
      { h2: 'Where devs hit limits', h3: ['Custom logic', 'Integration depth'] },
      { h2: 'Migration plan', h3: ['Transition checklist', 'Risk mitigation'] },
    ],
    ctas: [
      { label: 'Compare options', href: '/pricing' },
      { label: 'Implementation docs', href: '/docs' },
    ],
  },
  {
    slug: 'stripe-invoicing-alternative-self-hosted',
    mainKeyword: 'stripe invoicing alternative self hosted',
    seoTitle: 'Stripe Invoicing Alternative (Self-Hosted)',
    metaDescription:
      'Keep payment flexibility while owning your invoicing logic with a self-hosted developer-first stack.',
    h1: 'Self-hosted alternative to Stripe Invoicing',
    intro: 'Stripe Invoicing is useful, but many teams need billing logic they can fully own and adapt.',
    outline: [
      { h2: 'Stripe invoicing limits', h3: ['Workflow constraints', 'Roadmap dependency'] },
      { h2: 'Owning invoice logic', h3: ['Custom rules', 'Internal process fit'] },
      { h2: 'Hybrid architecture options', h3: ['Payments external', 'Invoicing internal'] },
    ],
    ctas: [
      { label: 'See pricing', href: '/pricing' },
      { label: 'Architecture docs', href: '/docs' },
    ],
  },
  {
    slug: 'zoho-invoice-alternative-for-developers',
    mainKeyword: 'zoho invoice alternative for developers',
    seoTitle: 'Zoho Invoice Alternative for Developers',
    metaDescription:
      'Move from generic invoicing suites to self-hosted tooling designed for technical teams.',
    h1: 'Zoho Invoice alternative for developer teams',
    intro: 'Generic suites optimize for broad users. Dev teams need control and extensibility.',
    outline: [
      { h2: 'Suite vs dev-first approach', h3: ['Generic defaults', 'Technical fit'] },
      { h2: 'Control and extensibility', h3: ['Deployment ownership', 'Custom workflows'] },
      { h2: 'Decision checklist', h3: ['When to switch', 'What to validate'] },
    ],
    ctas: [
      { label: 'Review pricing', href: '/pricing' },
      { label: 'Go to docs', href: '/docs' },
    ],
  },
  {
    slug: 'self-hosted-invoicing-vs-saas',
    mainKeyword: 'open source invoicing vs saas',
    seoTitle: 'Self-Hosted Invoicing vs SaaS: Honest Comparison',
    metaDescription:
      'A direct comparison of SaaS and self-hosted invoicing across cost, risk, control, and long-term flexibility.',
    h1: 'Self-hosted invoicing vs SaaS',
    intro: 'SaaS is not always wrong. It is often expensive once your workflow becomes strategic.',
    outline: [
      { h2: 'Total cost over 12 months', h3: ['Subscription creep', 'Ownership value'] },
      { h2: 'Risk profile', h3: ['Lock-in', 'Access control'] },
      { h2: 'Who should switch now', h3: ['Freelancers', 'Small dev agencies'] },
    ],
    ctas: [
      { label: 'See pricing impact', href: '/pricing' },
      { label: 'Read deployment docs', href: '/docs' },
    ],
  },
  {
    slug: 'best-invoicing-software-for-indie-hackers',
    mainKeyword: 'best invoicing software for indie hackers',
    seoTitle: 'Best Invoicing Software for Indie Hackers',
    metaDescription:
      'Compare invoicing tools for indie hackers based on control, speed, flexibility, and long-term cost.',
    h1: 'Best invoicing software for indie hackers',
    intro: 'Indie hackers need speed now and control later. Your invoicing stack should not block both.',
    outline: [
      { h2: 'What to evaluate', h3: ['Cost', 'Control', 'Workflow fit'] },
      { h2: 'Tool categories', h3: ['Hosted SaaS', 'Self-hosted'] },
      { h2: 'Decision by growth stage', h3: ['Early solo', 'Growing product'] },
    ],
    ctas: [
      { label: 'Choose a plan', href: '/pricing' },
      { label: 'Read docs', href: '/docs' },
    ],
  },
  {
    slug: 'invoice-tool-with-api-for-freelancers',
    mainKeyword: 'invoicing tool with api',
    seoTitle: 'Invoicing Tool with API for Freelancers',
    metaDescription:
      'Automate your billing workflow with an API-friendly invoicing tool that you can host yourself.',
    h1: 'An invoicing tool with API that freelancers can scale',
    intro: 'As a freelancer, automation is a margin multiplier. API access is no longer optional.',
    outline: [
      { h2: 'High leverage API use cases', h3: ['Project sync', 'Client operations'] },
      { h2: 'Automation examples', h3: ['Trigger-based billing', 'Status updates'] },
      { h2: 'Secure self-hosting', h3: ['Access model', 'Operational guardrails'] },
    ],
    ctas: [
      { label: 'See pricing', href: '/pricing' },
      { label: 'See docs', href: '/docs' },
    ],
  },
  {
    slug: 'self-hosted-billing-software-for-freelancers',
    mainKeyword: 'self hosted billing software for freelancers',
    seoTitle: 'Self-Hosted Billing Software for Freelancers',
    metaDescription:
      'Stay independent from SaaS vendors with self-hosted billing software built for technical freelancers.',
    h1: 'Self-hosted billing software for independent developers',
    intro: 'Owning your billing stack gives you stability when your freelance business grows.',
    outline: [
      { h2: 'Why ownership matters', h3: ['Control over data', 'Control over costs'] },
      { h2: 'Setup path', h3: ['Local first', 'Production deployment'] },
      { h2: 'Maintenance reality', h3: ['Weekly tasks', 'Long-term benefits'] },
    ],
    ctas: [
      { label: 'Get started', href: '/pricing' },
      { label: 'Install docs', href: '/docs' },
    ],
  },
  {
    slug: 'developer-invoicing-app',
    mainKeyword: 'developer invoicing app',
    seoTitle: 'Developer Invoicing App with Full Control',
    metaDescription:
      'A developer invoicing app that is self-hosted, customizable, and designed to avoid SaaS lock-in.',
    h1: 'A developer invoicing app you own',
    intro: 'When invoicing is tied to cashflow, dependency is a risk. Ownership is leverage.',
    outline: [
      { h2: 'What devs need from billing tools', h3: ['Control', 'Extensibility'] },
      { h2: 'Custom integration patterns', h3: ['Internal tools', 'External automations'] },
      { h2: 'No-brainer economics', h3: ['Cost recovery', 'Recurring revenue upside'] },
    ],
    ctas: [
      { label: 'See plans', href: '/pricing' },
      { label: 'Open docs', href: '/docs' },
    ],
  },
]

export const blogPosts: BlogPost[] = [
  {
    slug: 'saas-invoicing-lock-in-cost',
    title: 'SaaS invoicing lock-in is costing freelancers more than they think',
    targetKeyword: 'how to avoid saas lock in for invoicing',
    searchIntent: 'informational',
    intro: 'The monthly fee is not the real cost. The real cost is dependency when your process needs to evolve.',
    outline: ['What lock-in really means', 'How lock-in hits margin', 'When to switch'],
  },
  {
    slug: 'developers-outgrow-generic-invoicing-tools',
    title: 'Why developer freelancers outgrow generic invoicing tools',
    targetKeyword: 'invoice software for developers',
    searchIntent: 'informational',
    intro: 'Generic tools optimize for broad users. Developer workflows need flexible systems.',
    outline: ['Where generic tools fail', 'What a dev-first stack needs', 'A switch framework'],
  },
  {
    slug: 'quickbooks-vs-self-hosted-invoicing',
    title: 'QuickBooks vs self-hosted invoicing for developers',
    targetKeyword: 'self hosted invoicing vs quickbooks',
    searchIntent: 'comparison',
    intro: 'QuickBooks can work, but many developer teams pay for complexity they do not need.',
    outline: ['Cost comparison', 'Workflow comparison', 'Migration path'],
  },
  {
    slug: 'freebe-vs-self-hosted-invoicing',
    title: 'Freebe vs self-hosted invoicing: what you gain and lose',
    targetKeyword: 'freebe alternative for developers',
    searchIntent: 'comparison',
    intro: 'Convenience is great until workflow constraints hit your business.',
    outline: ['What Freebe gets right', 'Where it limits dev teams', 'Switch criteria'],
  },
  {
    slug: 'indy-vs-self-hosted-invoicing',
    title: 'Indy vs self-hosted invoicing for freelance developers',
    targetKeyword: 'indy alternative for freelancers',
    searchIntent: 'comparison',
    intro: 'You can keep simplicity without giving up ownership.',
    outline: ['Simplicity vs control', 'Cost over 12 months', 'Decision matrix'],
  },
  {
    slug: 'stripe-invoicing-workflow-control',
    title: 'Stripe Invoicing is fine until you need workflow control',
    targetKeyword: 'stripe invoicing alternative self hosted',
    searchIntent: 'comparison',
    intro: 'If your process is custom, generic billing rails become friction.',
    outline: ['Where Stripe helps', 'Where teams hit limits', 'Hybrid architecture'],
  },
  {
    slug: 'developer-quote-to-invoice-workflow',
    title: 'The developer quote-to-invoice workflow that actually scales',
    targetKeyword: 'quote to invoice software for freelancers',
    searchIntent: 'informational',
    intro: 'Most billing inefficiency starts between quote acceptance and invoice creation.',
    outline: ['Workflow design', 'Automation hooks', 'Scale playbook'],
  },
  {
    slug: 'white-label-invoicing-mrr',
    title: 'Turn client maintenance into recurring revenue with white-label invoicing',
    targetKeyword: 'how to create recurring revenue with white label software',
    searchIntent: 'transactional',
    intro: 'If you already deploy for clients, productize the billing layer and bill monthly.',
    outline: ['Offer design', 'Packaging and pricing', 'Execution checklist'],
  },
  {
    slug: 'french-invoicing-compliance-checklist',
    title: 'French invoicing compliance for tech freelancers: practical checklist',
    targetKeyword: 'french invoicing requirements for freelancers',
    searchIntent: 'informational',
    intro: 'Compliance is easier when the process is explicit and repeatable.',
    outline: ['Required mentions', 'Common mistakes', 'Validation routine'],
  },
  {
    slug: 'api-first-invoicing-explained',
    title: 'API-first invoicing: what it means and why it matters',
    targetKeyword: 'api invoicing software explained',
    searchIntent: 'informational',
    intro: 'API-first is not a buzzword. It is operational leverage for technical teams.',
    outline: ['Definition', 'Use cases', 'Implementation pattern'],
  },
  {
    slug: 'self-hosted-invoicing-for-agencies',
    title: 'Self-hosted invoicing for agencies: deployment patterns that work',
    targetKeyword: 'invoicing software for small dev agency',
    searchIntent: 'transactional',
    intro: 'A repeatable deployment model is the difference between service chaos and margin.',
    outline: ['Per-client instance model', 'Ops model', 'Support model'],
  },
  {
    slug: 'best-invoicing-tools-indie-hackers-2026',
    title: 'Best invoicing software for indie hackers in 2026 (no fluff)',
    targetKeyword: 'best invoicing software for indie hackers',
    searchIntent: 'comparison',
    intro: 'This is a practical ranking based on control, speed, and long-term cost.',
    outline: ['Scoring criteria', 'Top options', 'Recommendation by stage'],
  },
  {
    slug: 'open-source-invoicing-vs-saas-trade-offs',
    title: 'Open-source invoicing vs SaaS: the real trade-offs',
    targetKeyword: 'open source invoicing vs saas',
    searchIntent: 'comparison',
    intro: 'SaaS is not always wrong. Open source is not always free. Context decides.',
    outline: ['Cost', 'Control', 'Operational burden'],
  },
  {
    slug: 'local-to-production-self-hosted-invoicing',
    title: 'From local install to production: self-hosted invoicing in one afternoon',
    targetKeyword: 'how to self host invoicing software',
    searchIntent: 'informational',
    intro: 'A good deployment path should move from local to production without surprises.',
    outline: ['Prerequisites', 'Step-by-step deployment', 'Pitfalls to avoid'],
  },
  {
    slug: 'invoicing-tool-without-integration-bottleneck',
    title: 'If your invoicing tool cannot integrate, it becomes your bottleneck',
    targetKeyword: 'invoicing tool with api',
    searchIntent: 'informational',
    intro: 'Integration debt is one of the quietest margin killers in service businesses.',
    outline: ['How integration debt appears', 'API requirements', 'Action plan'],
  },
]

export function getSeoLandingBySlug(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug)
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
