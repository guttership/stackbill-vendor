import type { Locale } from './detect-locale'

export interface Messages {
  header: {
    features: string
    pricing: string
    faq: string
    docs: string
    cta: string
  }
  footer: {
    product: string
    resources: string
    legal: string
    documentation: string
    terms: string
    privacy: string
    rights: string
  }
  marketing: {
    heroTitle: string
    heroSubtitle: string
    heroPrimaryCta: string
    heroSecondaryCta: string
    reassurance: string[]
    deployReassurance: string
    saasContrastTitle: string
    saasContrastText: string[]
    targetAudienceTitle: string
    targetAudienceText: string
    whyTitle: string
    whySubtitle: string
    whyCards: Array<{ title: string; description: string }>
    clientDeployTitle: string
    clientDeployText: string
    clientDeployCards: Array<{ title: string; description: string }>
    howItWorksTitle: string
    howItWorksSteps: Array<{ title: string; description: string }>
    integrationsTitle: string
    integrationsSubtitle: string
    integrationsCards: Array<{ title: string; badge: string; description: string }>
    openSourceTitle: string
    openSourceText: string
    openSourceLink: string
    pricingHighlightTitle: string
    pricingHighlightSubtitle: string
    pricingHighlightMonthly: string
    pricingHighlightYearly: string
    pricingHighlightOr: string
    pricingHighlightFeatures: string[]
    pricingHighlightReassurance: string
    pricingHighlightNote: string
    pricingHighlightPrimaryCta: string
    pricingHighlightSecondaryCta: string
    installationTitle: string
    installationText: string
    installBadge: string
    installTerminalLabel: string
    installFooter: string
    installButton: string
    faqTitle: string
    faqSubtitle: string
    faqs: Array<{ q: string; a: string }>
    finalTitle: string
    finalText: string
    finalPrimaryCta: string
    finalSecondaryCta: string
    questionsLabel: string
  }
  pricing: {
    title: string
    subtitle: string
    includedTitle: string
    includedFeatures: string[]
    bestValue: string
    savePerYear: string
    getStarted: string
  }
  checkout: {
    loading: string
    success: {
      title: string
      subtitle: string
      nextTitle: string
      steps: Array<{ title: string; description: string }>
      help: string
      download: string
      backHome: string
    }
    cancel: {
      title: string
      subtitle: string
      helpTitle: string
      blocks: Array<{ title: string; description: string }>
      whatYouGet: string
      bulletPoints: string[]
      viewPricingAgain: string
      backHome: string
    }
    errors: {
      priceNotConfigured: string
      failedSession: string
      noCheckoutUrl: string
      generic: string
    }
  }
  notFound: {
    title: string
    text: string
    goHome: string
    viewPricing: string
    help: string
    documentation: string
    support: string
  }
  account: {
    nav: {
      overview: string
      licenses: string
      billing: string
      settings: string
    }
    helpTitle: string
    helpText: string
    helpCta: string
    overview: {
      title: string
      subtitle: string
      subStatus: string
      active: string
      monthlyPlan: string
      nextBilling: string
      amount: string
      quickStats: {
        activeLicenses: string
        ofAvailable: string
        activeInstances: string
        instancesRunning: string
        accountStatus: string
        good: string
        noIssues: string
      }
      recentActivity: string
      activated: string
      noActivity: string
      startUsing: string
    }
    licenses: {
      title: string
      subtitle: string
      addInstance: string
      yourLicense: string
      yourLicenseText: string
      licenseKey: string
      licenseKeyText: string
      created: string
      instances: string
      activeInstances: string
      noInstance: string
      noInstanceText: string
      howToActivate: string
      steps: string[]
      viewDocs: string
      copy: string
    }
  }
}

const en: Messages = {
  header: {
    features: 'Features',
    pricing: 'Pricing',
    faq: 'FAQ',
    docs: 'Docs',
    cta: 'Install StackBill',
  },
  footer: {
    product: 'Product',
    resources: 'Resources',
    legal: 'Legal',
    documentation: 'Documentation',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    rights: 'All rights reserved.',
  },
  marketing: {
    heroTitle: 'Invoicing you host. Control you keep.',
    heroSubtitle: 'StackBill helps freelance developers and small tech teams create quotes, generate invoices, and export clean PDFs without depending on SaaS platforms.',
    heroPrimaryCta: 'Install StackBill',
    heroSecondaryCta: 'View documentation',
    reassurance: ['2 instances included.', 'Works on localhost.', 'Built for developers.'],
    deployReassurance: 'Deploy locally first, then move to your server when you are ready.',
    saasContrastTitle: 'SaaS invoicing is convenient until it blocks your workflow.',
    saasContrastText: [
      'Client billing data lives on someone else\'s stack.',
      'Pricing, limits, and access rules can change without notice.',
      'StackBill gives the control back to your team.',
      'You run the app, you own the data, you decide how to deploy it.',
    ],
    targetAudienceTitle: 'Built for freelance developers, indie makers, and small tech teams.',
    targetAudienceText:
      'Use StackBill for your own business, then reuse the same setup for client projects that need invoicing with custom branding.',
    whyTitle: 'Why teams switch to StackBill',
    whySubtitle: '',
    whyCards: [
      {
        title: 'Keep full control of billing data',
        description: 'Invoices, quotes, and customer information stay on infrastructure you control.',
      },
      {
        title: 'Ship invoices faster',
        description: 'Generate quotes, convert them to invoices, and export polished PDFs in one workflow.',
      },
      {
        title: 'Reuse your workflow across clients',
        description: 'Keep a consistent setup and deploy separate instances for your own projects or client projects.',
      },
    ],
    clientDeployTitle: 'Deploy for clients. Brand each instance.',
    clientDeployText:
      'StackBill is a strong fit if you build and maintain tools for clients: deploy per client, customize branding, and keep technical ownership.',
    clientDeployCards: [
      {
        title: 'One instance per client',
        description: 'Deploy isolated instances so every client gets a clean and dedicated billing workspace.',
      },
      {
        title: 'Custom branding ready',
        description: 'Adjust logo, legal mentions, and invoice presentation to match each client identity.',
      },
      {
        title: 'Resell as a service',
        description: 'Package setup, hosting, and maintenance as a recurring service for your clients.',
      },
    ],
    howItWorksTitle: 'From install to first invoice in one flow',
    howItWorksSteps: [
      {
        title: 'Install StackBill',
        description: 'Run it on localhost first, then deploy on your own infrastructure.',
      },
      {
        title: 'Activate your license',
        description: 'Connect your instance to your StackBill account and unlock full access.',
      },
      {
        title: 'Create quotes and invoice faster',
        description: 'Use your quote-to-invoice workflow, then duplicate and adapt as your projects grow.',
      },
    ],
    integrationsTitle: 'Integrations',
    integrationsSubtitle: 'Optional advanced workflow tools. StackBill works perfectly without integrations.',
    integrationsCards: [
      {
        title: 'Clockify',
        badge: 'Integration',
        description: 'Automatically create projects and import tracked time directly into invoices when a quote is accepted.',
      },
      {
        title: 'Trello',
        badge: 'Integration',
        description: 'Automatically create cards and project structure when a quote is accepted.',
      },
    ],
    openSourceTitle: 'Open source core available on GitHub.',
    openSourceText:
      'Review the code before deploying, adapt it to your stack, and keep your process transparent for your team and clients.',
    openSourceLink: 'View on GitHub',
    pricingHighlightTitle: 'One product. One clear price.',
    pricingHighlightSubtitle:
      'Start monthly, switch to yearly anytime. Same features in both plans, updates included while your license is active.',
    pricingHighlightMonthly: '$11 / month',
    pricingHighlightYearly: '$110 / year',
    pricingHighlightOr: 'or',
    pricingHighlightFeatures: [
      '2 instances included',
      'Self-hosted deployment',
      'Updates included',
      'Clockify integration',
      'Trello integration',
      'License-based access',
      'Built for developers',
    ],
    pricingHighlightReassurance: 'No hidden tiers. No feature gating between plans.',
    pricingHighlightNote: 'Clear pricing for developers who want predictable billing tools.',
    pricingHighlightPrimaryCta: 'Install StackBill',
    pricingHighlightSecondaryCta: 'View documentation',
    installationTitle: 'Deploy it your way',
    installationText:
      'StackBill runs locally or on your own infrastructure. Get started in minutes with a simple git clone.',
    installBadge: 'Easy setup',
    installTerminalLabel: 'Terminal',
    installFooter: 'Runs on Node.js 18+. Works with PostgreSQL, MySQL, or SQLite.',
    installButton: 'View documentation',
    faqTitle: 'Frequently asked questions',
    faqSubtitle: 'Clear answers before you deploy',
    faqs: [
      {
        q: 'Can I self-host StackBill?',
        a: 'Yes. Run it locally or on your own server.',
      },
      {
        q: 'Does it work on localhost?',
        a: 'Yes. A license includes up to 2 instances.',
      },
      {
        q: 'Can I use StackBill without Clockify or Trello?',
        a: 'Yes. Integrations are optional. Core quote and invoicing features work without them.',
      },
      {
        q: 'Can I deploy StackBill for clients?',
        a: 'Yes. Many developers deploy one instance per client and handle setup, hosting, and maintenance.',
      },
      {
        q: 'Can I customize branding per client?',
        a: 'Yes. You can adapt logo, legal details, and invoice presentation for each deployment.',
      },
      {
        q: 'Is StackBill a SaaS?',
        a: 'No. StackBill is self-hosted, but connected for licensing and updates.',
      },
      {
        q: 'What happens if my license expires?',
        a: 'Your existing setup remains accessible, while premium features or updates may be limited depending on license status.',
      },
      {
        q: 'What is included in monthly and yearly plans?',
        a: 'Both plans include the same features and 2 instances. Yearly gives a better price over time.',
      },
      {
        q: 'How is StackBill different from classic invoicing SaaS tools?',
        a: 'With StackBill, you host the app yourself. You control data location, access, and deployment strategy.',
      },
    ],
    finalTitle: 'Ready to take control?',
    finalText:
      'Install once, own your invoicing workflow, and scale it for your own business or your clients.',
    finalPrimaryCta: 'Install StackBill',
    finalSecondaryCta: 'View documentation',
    questionsLabel: 'Questions? Contact us at',
  },
  pricing: {
    title: 'Simple, transparent pricing',
    subtitle: 'StackBill is available at $11/month or $110/year. Active license, 2 instances included, updates included.',
    includedTitle: 'Everything included in all plans',
    includedFeatures: [
      '2 instances included',
      'Self-hosted on your infrastructure',
      'Updates included',
      'Clockify time tracking integration',
      'Trello project management integration',
      'License-based access',
      'Built for developers',
    ],
    bestValue: 'Best Value',
    savePerYear: 'Save €20 per year',
    getStarted: 'Install StackBill',
  },
  checkout: {
    loading: 'Loading...',
    success: {
      title: 'Payment successful',
      subtitle: 'Thank you for subscribing to StackBill',
      nextTitle: 'What happens next?',
      steps: [
        {
          title: 'Check your email',
          description:
            'You will receive a confirmation email with your license key and download instructions.',
        },
        {
          title: 'Download StackBill',
          description:
            'Access the latest version and follow our installation guide to set up your self-hosted instance.',
        },
        {
          title: 'Read the documentation',
          description:
            'Learn how to configure your instance, customize templates, and integrate with your tools.',
        },
      ],
      help: 'Need help? Our documentation and email support are available to help you get started.',
      download: 'Download StackBill',
      backHome: 'Back to home',
    },
    cancel: {
      title: 'Payment cancelled',
      subtitle: 'Your checkout session was cancelled. No charges were made.',
      helpTitle: 'Need help deciding?',
      blocks: [
        {
          title: 'Common questions',
          description:
            'Both plans include all features. The yearly plan offers better value with 2 months free.',
        },
        {
          title: 'Have questions?',
          description:
            'Contact us at designmoiunmouton@gmail.com and we will be happy to help you choose the right plan.',
        },
      ],
      whatYouGet: 'What you get with StackBill:',
      bulletPoints: [
        'Full control of your data with self-hosting',
        'Unlimited quotes and invoices',
        'Integrations with Clockify and Trello',
        'Custom branding for your business',
      ],
      viewPricingAgain: 'View pricing again',
      backHome: 'Back to home',
    },
    errors: {
      priceNotConfigured: 'Price ID not configured',
      failedSession: 'Failed to create checkout session',
      noCheckoutUrl: 'No checkout URL returned',
      generic: 'Something went wrong',
    },
  },
  notFound: {
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has been moved.',
    goHome: 'Go to Home',
    viewPricing: 'View Pricing',
    help: 'Need help? Check our documentation or contact support.',
    documentation: 'Documentation',
    support: 'Support',
  },
  account: {
    nav: {
      overview: 'Overview',
      licenses: 'Licenses',
      billing: 'Billing',
      settings: 'Settings',
    },
    helpTitle: 'Need help?',
    helpText: 'Check our documentation or contact support',
    helpCta: 'View documentation',
    overview: {
      title: 'Account Overview',
      subtitle: 'Manage your subscription, licenses, and account settings',
      subStatus: 'Subscription Status',
      active: 'Active',
      monthlyPlan: 'Monthly Plan',
      nextBilling: 'Next billing date: April 7, 2026',
      amount: 'Amount: $11/month',
      quickStats: {
        activeLicenses: 'Active Licenses',
        ofAvailable: 'of 2 available',
        activeInstances: 'Active Instances',
        instancesRunning: 'instances running',
        accountStatus: 'Account Status',
        good: 'Good',
        noIssues: 'no issues detected',
      },
      recentActivity: 'Recent Activity',
      activated: 'Subscription activated',
      noActivity: 'No other activity yet',
      startUsing: 'Start using your license to see more',
    },
    licenses: {
      title: 'Licenses',
      subtitle: 'Manage your StackBill licenses and instances',
      addInstance: 'Add Instance',
      yourLicense: 'Your License',
      yourLicenseText:
        'You have 2 instances available with your subscription. Activate your license on your self-hosted StackBill instances.',
      licenseKey: 'License Key',
      licenseKeyText: 'Use this key to activate your StackBill instances',
      created: 'Created: March 7, 2026',
      instances: 'Instances: 0 of 2 used',
      activeInstances: 'Active Instances',
      noInstance: 'No instances activated yet',
      noInstanceText: 'Activate your license on a self-hosted StackBill instance to get started',
      howToActivate: 'How to Activate',
      steps: [
        'Install StackBill on your server following the installation guide',
        'Copy your license key from above',
        'Enter the license key in your StackBill instance settings',
        'Your instance will be activated and appear in the list above',
      ],
      viewDocs: 'View Documentation',
      copy: 'Copy',
    },
  },
}

const fr: Messages = {
  header: {
    features: 'Fonctionnalités',
    pricing: 'Tarifs',
    faq: 'FAQ',
    docs: 'Docs',
    cta: 'Installer StackBill',
  },
  footer: {
    product: 'Produit',
    resources: 'Ressources',
    legal: 'Legal',
    documentation: 'Documentation',
    terms: 'Conditions d\'utilisation',
    privacy: 'Politique de confidentialité',
    rights: 'Tous droits réservés.',
  },
  marketing: {
    heroTitle: 'Arrêtez de louer votre facturation. Hébergez‑la.',
    heroSubtitle: 'StackBill donne aux freelances et petites équipes tech un outil de devis/factures qu\'ils contrôlent vraiment, sur leur propre infrastructure.',
    heroPrimaryCta: 'Installer StackBill',
    heroSecondaryCta: 'Voir la documentation',
    reassurance: ['2 instances incluses.', 'Fonctionne en local.', 'Pensé pour les développeurs.'],
    deployReassurance: 'Testez en local, déployez sur votre serveur, gardez la main du début à la fin.',
    saasContrastTitle: 'Le SaaS, c\'est pratique. Jusqu\'au jour où ça vous enferme.',
    saasContrastText: [
      'Vos données de facturation vivent chez quelqu\'un d\'autre.',
      'Les règles, quotas et tarifs peuvent bouger sans vous demander votre avis.',
      'Avec StackBill, vous reprenez la main.',
      'Vous décidez de l\'hébergement, des accès et du mode de déploiement.',
    ],
    targetAudienceTitle: 'Conçu pour les freelances dev, les indie makers et les petites équipes techniques.',
    targetAudienceText:
      'Utilisez StackBill pour votre activité, puis répliquez la même base sur vos projets clients avec un branding dédié.',
    whyTitle: 'Pourquoi StackBill fait la différence',
    whySubtitle: '',
    whyCards: [
      {
        title: 'Maîtrise complète de vos données',
        description: 'Devis, factures et données clients restent sur une infrastructure que vous contrôlez.',
      },
      {
        title: 'Un flux qui va droit au but',
        description: 'Devis, facture, PDF : tout s\'enchaîne sans gymnastique ni aller-retour inutiles.',
      },
      {
        title: 'Une base réutilisable pour vos clients',
        description: 'Conservez un socle solide et déployez des instances séparées selon chaque contexte client.',
      },
    ],
    clientDeployTitle: 'Déployez chez vos clients, sans repartir de zéro.',
    clientDeployText:
      'Si vous créez et maintenez des outils métier pour vos clients, StackBill s\'intègre naturellement : une instance par client, une identité visuelle dédiée, et une base technique que vous pilotez.',
    clientDeployCards: [
      {
        title: 'Une instance par client',
        description: 'Isolez les environnements pour offrir à chaque client un espace de facturation clair et dédié.',
      },
      {
        title: 'Branding personnalisé',
        description: 'Ajustez logo, mentions légales et rendu des factures selon l\'identité de chaque client.',
      },
      {
        title: 'Un vrai levier de revenu récurrent',
        description: 'Transformez installation, hébergement et maintenance en offre de service durable.',
      },
    ],
    howItWorksTitle: 'De l\'installation à la première facture, sans détour',
    howItWorksSteps: [
      {
        title: 'Installez StackBill',
        description: 'Lancez-le en local, validez votre setup, puis déployez-le sur votre infrastructure.',
      },
      {
        title: 'Activez votre licence',
        description: 'Associez l\'instance à votre compte StackBill pour activer l\'ensemble des fonctionnalités.',
      },
      {
        title: 'Passez du devis à la facture en quelques clics',
        description: 'Travaillez dans un flux direct, puis dupliquez et adaptez selon votre manière de facturer.',
      },
    ],
    integrationsTitle: 'Intégrations',
    integrationsSubtitle: 'Des outils optionnels pour accélérer. StackBill reste parfaitement utilisable sans intégration.',
    integrationsCards: [
      {
        title: 'Clockify',
        badge: 'Intégration',
        description: 'Créez automatiquement des projets et importez le temps suivi directement dans vos factures à la validation d\'un devis.',
      },
      {
        title: 'Trello',
        badge: 'Intégration',
        description: 'Créez automatiquement des cartes et une structure projet à la validation d\'un devis.',
      },
    ],
    openSourceTitle: 'Code source ouvert disponible sur GitHub.',
    openSourceText:
      'Consultez le code avant déploiement, adaptez-le à votre stack et gardez une base transparente, côté équipe comme côté client.',
    openSourceLink: 'Voir sur GitHub',
    pricingHighlightTitle: 'Un produit. Un prix clair.',
    pricingHighlightSubtitle:
      'Commencez en mensuel, passez en annuel quand vous voulez. Les deux plans incluent les mêmes fonctionnalités, avec mises à jour tant que la licence est active.',
    pricingHighlightMonthly: '10 € / mois',
    pricingHighlightYearly: '100 € / an',
    pricingHighlightOr: 'ou',
    pricingHighlightFeatures: [
      '2 instances incluses',
      'Déploiement self-hosted',
      'Mises à jour incluses',
      'Intégration Clockify',
      'Intégration Trello',
      'Accès basé sur licence',
      'Conçu pour les développeurs',
    ],
    pricingHighlightReassurance: 'Pas de paliers cachés. Pas de mauvaise surprise au moment de passer en production.',
    pricingHighlightNote: 'Une tarification claire pour les équipes techniques qui veulent avancer sans friction.',
    pricingHighlightPrimaryCta: 'Installer StackBill',
    pricingHighlightSecondaryCta: 'Voir la documentation',
    installationTitle: 'Déployez à votre façon',
    installationText:
      'StackBill fonctionne en local ou sur votre propre infrastructure. Démarrage en quelques minutes.',
    installBadge: 'Installation rapide',
    installTerminalLabel: 'Terminal',
    installFooter: 'Compatible Node.js 18+. Fonctionne avec PostgreSQL, MySQL ou SQLite.',
    installButton: 'Voir la documentation complète',
    faqTitle: 'Questions fréquentes',
    faqSubtitle: 'Des réponses nettes avant de vous lancer',
    faqs: [
      {
        q: 'Puis-je auto-héberger StackBill ?',
        a: 'Oui. Vous pouvez l\'exécuter en local ou sur votre propre serveur.',
      },
      {
        q: 'Est-ce que StackBill fonctionne sur localhost ?',
        a: 'Oui. Une licence inclut jusqu\'à 2 instances.',
      },
      {
        q: 'Puis-je utiliser StackBill sans Clockify ni Trello ?',
        a: 'Oui. Les intégrations sont facultatives. Le coeur devis/facturation fonctionne très bien sans elles.',
      },
      {
        q: 'Puis-je déployer StackBill pour des clients ?',
        a: 'Oui. Vous pouvez déployer une instance par client et proposer setup, hébergement et maintenance.',
      },
      {
        q: 'Puis-je personnaliser le branding pour chaque client ?',
        a: 'Oui. Logo, mentions légales et présentation des factures peuvent être adaptés à chaque déploiement.',
      },
      {
        q: 'StackBill est-il un SaaS ?',
        a: 'Non. StackBill est self-hosted, mais connecté pour la licence et les mises à jour.',
      },
      {
        q: 'Que se passe-t-il si ma licence expire ?',
        a: 'Votre installation existante reste accessible. Selon le statut de licence, certaines fonctionnalités avancées ou mises à jour peuvent être limitées.',
      },
      {
        q: 'Qu\'est-ce qui est inclus en mensuel et annuel ?',
        a: 'Les deux plans incluent les mêmes fonctionnalités et 2 instances. L\'annuel est plus avantageux dans la durée.',
      },
      {
        q: 'Quelle différence avec un SaaS de facturation classique ?',
        a: 'Avec StackBill, vous hébergez l\'application vous-même. Vous décidez où résident les données, qui y accède et comment vous déployez.',
      },
    ],
    finalTitle: 'Prêt à reprendre le contrôle ?',
    finalText: 'Installez une fois, gardez la maîtrise de votre facturation, puis faites évoluer le même workflow pour votre activité et vos clients.',
    finalPrimaryCta: 'Installer StackBill',
    finalSecondaryCta: 'Voir la documentation',
    questionsLabel: 'Une question ? Contactez-nous :',
  },
  pricing: {
    title: 'Tarification simple et transparente',
    subtitle: 'StackBill est proposé à 10 €/mois ou 100 €/an. Licence active, 2 instances incluses, mises à jour incluses.',
    includedTitle: 'Inclus dans tous les plans',
    includedFeatures: [
      '2 instances incluses',
      'Self-hosted sur votre infrastructure',
      'Mises à jour incluses',
      'Intégration Clockify',
      'Intégration Trello',
      'Accès basé sur licence',
      'Conçu pour les développeurs',
    ],
    bestValue: 'Meilleure offre',
    savePerYear: 'Économisez 20€ par an',
    getStarted: 'Installer StackBill',
  },
  checkout: {
    loading: 'Chargement...',
    success: {
      title: 'Paiement confirmé',
      subtitle: 'Merci pour votre abonnement à StackBill',
      nextTitle: 'Et maintenant ?',
      steps: [
        {
          title: 'Vérifiez votre email',
          description:
            'Vous recevrez un email de confirmation avec votre clé de licence et les instructions de téléchargement.',
        },
        {
          title: 'Téléchargez StackBill',
          description:
            'Récupérez la dernière version et suivez le guide d\'installation pour votre instance self-hosted.',
        },
        {
          title: 'Consultez la documentation',
          description: 'Apprenez à configurer votre instance, personnaliser vos templates et intégrer vos outils.',
        },
      ],
      help: 'Besoin d\'aide ? La documentation et le support email sont là pour vous accompagner.',
      download: 'Télécharger StackBill',
      backHome: 'Retour à l\'accueil',
    },
    cancel: {
      title: 'Paiement annulé',
      subtitle: 'Votre session de paiement a été annulée. Aucun débit n\'a été effectué.',
      helpTitle: 'Besoin d\'aide pour choisir ?',
      blocks: [
        {
          title: 'Questions fréquentes',
          description:
            'Les deux plans incluent toutes les fonctionnalités. Le plan annuel offre un meilleur rapport qualité/prix.',
        },
        {
          title: 'Une question ?',
          description:
            'Contactez-nous sur designmoiunmouton@gmail.com et nous vous aiderons a choisir le bon plan.',
        },
      ],
      whatYouGet: 'Ce que vous obtenez avec StackBill :',
      bulletPoints: [
        'Contrôle total des données avec le self-hosting',
        'Devis et factures illimités',
        'Intégrations Clockify et Trello',
        'Branding personnalisé pour votre activité',
      ],
      viewPricingAgain: 'Voir les tarifs',
      backHome: 'Retour à l\'accueil',
    },
    errors: {
      priceNotConfigured: 'Price ID non configuré',
      failedSession: 'Échec de création de la session de paiement',
      noCheckoutUrl: 'Aucune URL de paiement retournée',
      generic: 'Une erreur est survenue',
    },
  },
  notFound: {
    title: 'Page introuvable',
    text: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
    goHome: 'Retour à l\'accueil',
    viewPricing: 'Voir les tarifs',
    help: 'Besoin d\'aide ? Consultez la documentation ou contactez le support.',
    documentation: 'Documentation',
    support: 'Support',
  },
  account: {
    nav: {
      overview: 'Vue d\'ensemble',
      licenses: 'Licences',
      billing: 'Facturation',
      settings: 'Paramètres',
    },
    helpTitle: 'Besoin d\'aide ?',
    helpText: 'Consultez la documentation ou contactez le support',
    helpCta: 'Voir la documentation',
    overview: {
      title: 'Vue d\'ensemble du compte',
      subtitle: 'Gérez votre abonnement, vos licences et les paramètres du compte',
      subStatus: 'Statut de l\'abonnement',
      active: 'Actif',
      monthlyPlan: 'Plan mensuel',
      nextBilling: 'Prochaine facturation : 7 avril 2026',
      amount: 'Montant : 10 €/mois',
      quickStats: {
        activeLicenses: 'Licences actives',
        ofAvailable: 'sur 2 disponibles',
        activeInstances: 'Instances actives',
        instancesRunning: 'instances en cours',
        accountStatus: 'État du compte',
        good: 'Bon',
        noIssues: 'aucun problème détecté',
      },
      recentActivity: 'Activité récente',
      activated: 'Abonnement activé',
      noActivity: 'Aucune autre activité pour le moment',
      startUsing: 'Utilisez votre licence pour voir plus d\'activité',
    },
    licenses: {
      title: 'Licences',
      subtitle: 'Gérez vos licences StackBill et vos instances',
      addInstance: 'Ajouter une instance',
      yourLicense: 'Votre licence',
      yourLicenseText:
        'Vous disposez de 2 instances avec votre abonnement. Activez votre licence sur vos instances StackBill self-hosted.',
      licenseKey: 'Clé de licence',
      licenseKeyText: 'Utilisez cette clé pour activer vos instances StackBill',
      created: 'Créée le : 7 mars 2026',
      instances: 'Instances : 0 sur 2 utilisées',
      activeInstances: 'Instances actives',
      noInstance: 'Aucune instance active pour le moment',
      noInstanceText: 'Activez votre licence sur une instance StackBill self-hosted pour commencer',
      howToActivate: 'Comment activer',
      steps: [
        'Installez StackBill sur votre serveur en suivant le guide d\'installation',
        'Copiez votre clé de licence ci-dessus',
        'Entrez la clé dans les paramètres de votre instance StackBill',
        'Votre instance sera activée et apparaîtra dans la liste ci-dessus',
      ],
      viewDocs: 'Voir la documentation',
      copy: 'Copier',
    },
  },
}

const messages: Record<Locale, Messages> = { en, fr }

export function getMessages(locale: Locale): Messages {
  return messages[locale]
}
