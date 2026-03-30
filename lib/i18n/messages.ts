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
    heroTitle: 'Still paying for an invoicing SaaS you do not control?',
    heroSubtitle: 'StackBill is self-hosted invoicing for developers who want control over code, data, and costs.',
    heroPrimaryCta: 'Take back control',
    heroSecondaryCta: 'View documentation',
    reassurance: ['2 instances included.', 'Works on localhost.', 'Built for developers.'],
    deployReassurance: 'Deploy locally first, then move to your server when you are ready.',
    saasContrastTitle: 'Why switch now',
    saasContrastText: [
      'Tools like Freebe or Indy stay convenient until your pricing depends on their roadmap.',
      'You do not own the product, so you absorb their limits, plan changes, and lock-in.',
      'StackBill flips that: you own the app, you set the rules, you can customize every critical flow.',
    ],
    targetAudienceTitle: 'For developers, not accountants.',
    targetAudienceText:
      'Control the deployment, extend the business logic, and integrate it with your stack. Built to fit how developers work, not how accounting software dictates workflows, with French invoicing compliance included.',
    whyTitle: 'What breaks with typical invoicing SaaS',
    whySubtitle: 'You are renting a critical workflow. That is the real risk.',
    whyCards: [
      {
        title: 'No ownership',
        description: 'Your invoicing workflow runs on a product you do not control.',
      },
      {
        title: 'Pricing dependency',
        description: 'When plans change, your margins and process change with them.',
      },
      {
        title: 'Customization walls',
        description: 'You adapt to the tool instead of adapting the tool to your business.',
      },
    ],
    clientDeployTitle: 'Turn client deployments into recurring revenue.',
    clientDeployText:
      'Do not stop at one-off delivery. Deploy StackBill for each client, host it, maintain it, and charge monthly.',
    clientDeployCards: [
      {
        title: 'Deploy per client',
        description: 'Ship one dedicated instance for each client with clear boundaries.',
      },
      {
        title: 'Host and control',
        description: 'Run it on your infrastructure or theirs, with full technical ownership.',
      },
      {
        title: 'Charge monthly',
        description: 'Package setup, hosting, support, and updates as recurring MRR.',
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
    pricingHighlightTitle: 'Simple pricing. Easy decision.',
    pricingHighlightSubtitle:
      'You are not paying rent to a SaaS. You are buying an asset you can run for yourself and for clients.',
    pricingHighlightMonthly: '$11 / month',
    pricingHighlightYearly: '$110 / year',
    pricingHighlightOr: 'or',
    pricingHighlightFeatures: [
      '2 instances included',
      'Self-hosted deployment',
      'Updates included',
      'French invoicing compliance',
      'Clockify integration',
      'Trello integration',
      'License-based access',
      'Built for developers',
    ],
    pricingHighlightReassurance: 'Same features on both plans. No hidden tiers. No surprise limits.',
    pricingHighlightNote: 'Recover the cost with one or two client deployments, then keep the margin.',
    pricingHighlightPrimaryCta: 'See pricing',
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
    finalTitle: 'Stop renting your invoicing stack.',
    finalText:
      'Own your billing workflow, keep your margins, and turn delivery into recurring revenue.',
    finalPrimaryCta: 'Switch to StackBill',
    finalSecondaryCta: 'View documentation',
    questionsLabel: 'Questions? Contact us at',
  },
  pricing: {
    title: 'Simple pricing for developers',
    subtitle: 'One clear price, same features on every plan, and a cost you can recover fast by deploying for clients.',
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
    heroTitle: 'Vous payez encore un SaaS de facturation que vous ne contrôlez pas ?',
    heroSubtitle: 'StackBill est la facturation self-hosted pour devs qui veulent garder la main sur le code, les données et les coûts.',
    heroPrimaryCta: 'Reprendre le contrôle',
    heroSecondaryCta: 'Voir la documentation',
    reassurance: ['2 instances incluses.', 'Fonctionne en local.', 'Pensé pour les développeurs.'],
    deployReassurance: 'Testez en local, déployez sur votre serveur, gardez la main du début à la fin.',
    saasContrastTitle: 'Pourquoi changer maintenant',
    saasContrastText: [
      'Freebe, Indy et les autres sont pratiques jusqu\'au jour où votre marge dépend de leurs choix.',
      'Vous ne possédez pas le produit, donc vous subissez les limites, les hausses et le lock-in.',
      'StackBill inverse le rapport de force : vous possédez l\'app, vous fixez les règles, vous adaptez les flux.',
    ],
    targetAudienceTitle: 'Pour les développeurs, pas pour les comptables.',
    targetAudienceText:
      'Pilotez le déploiement, étendez votre logique métier et connectez votre stack. Pensé pour un workflow de dev, pas pour une interface de cabinet comptable, avec conformité facturation française.',
    whyTitle: 'Ce qui casse avec les SaaS de facturation',
    whySubtitle: 'Vous louez un flux critique. C\'est le vrai risque.',
    whyCards: [
      {
        title: 'Aucune propriété',
        description: 'Votre facturation tourne sur un produit que vous ne contrôlez pas.',
      },
      {
        title: 'Dépendance tarifaire',
        description: 'Quand leur pricing bouge, vos marges et vos process bougent aussi.',
      },
      {
        title: 'Personnalisation limitée',
        description: 'Vous adaptez votre activité à l\'outil au lieu d\'adapter l\'outil à votre activité.',
      },
    ],
    clientDeployTitle: 'Transformez vos déploiements clients en revenu récurrent.',
    clientDeployText:
      'Ne vous limitez pas à une livraison one-shot. Déployez StackBill pour chaque client, hébergez, maintenez, facturez chaque mois.',
    clientDeployCards: [
      {
        title: 'Déployez par client',
        description: 'Livrez une instance dédiée par client, avec des frontières claires.',
      },
      {
        title: 'Hébergez et contrôlez',
        description: 'Sur votre infra ou la leur, en gardant la main technique de bout en bout.',
      },
      {
        title: 'Facturez au mois',
        description: 'Pack setup, hébergement, support et évolutions en offre MRR.',
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
    pricingHighlightTitle: 'Tarif simple. Décision facile.',
    pricingHighlightSubtitle:
      'Vous ne payez pas un loyer SaaS. Vous investissez dans un actif que vous exploitez pour vous et vos clients.',
    pricingHighlightMonthly: '10 € / mois',
    pricingHighlightYearly: '100 € / an',
    pricingHighlightOr: 'ou',
    pricingHighlightFeatures: [
      '2 instances incluses',
      'Déploiement self-hosted',
      'Mises à jour incluses',
      'Conformité facturation française',
      'Intégration Clockify',
      'Intégration Trello',
      'Accès basé sur licence',
      'Conçu pour les développeurs',
    ],
    pricingHighlightReassurance: 'Même fonctionnalités sur tous les plans. Pas de paliers cachés. Pas de limites surprises.',
    pricingHighlightNote: 'Coût amorti avec un ou deux déploiements clients, puis marge conservée.',
    pricingHighlightPrimaryCta: 'Voir les tarifs',
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
    finalTitle: 'Arrêtez de louer votre facturation.',
    finalText: 'Gardez le contrôle, protégez vos marges et transformez vos livraisons en revenu récurrent.',
    finalPrimaryCta: 'Passer sur StackBill',
    finalSecondaryCta: 'Voir la documentation',
    questionsLabel: 'Une question ? Contactez-nous :',
  },
  pricing: {
    title: 'Tarification simple pour développeurs',
    subtitle: 'Un prix clair, les mêmes fonctionnalités sur chaque plan, et un coût vite amorti si vous déployez chez vos clients.',
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
