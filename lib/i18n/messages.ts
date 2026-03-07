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
    whyTitle: string
    whySubtitle: string
    whyCards: Array<{ title: string; description: string }>
    integrationsTitle: string
    integrationsSubtitle: string
    integrationsCards: Array<{ title: string; badge: string; description: string }>
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
    cta: 'Start using StackBill',
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
    heroTitle: 'Self-hosted invoicing for developers',
    heroSubtitle: 'Create quotes, generate invoices, and keep full control of your data.',
    heroPrimaryCta: 'Start using StackBill',
    heroSecondaryCta: 'View documentation',
    reassurance: ['2 instances included.', 'Self-hosted.', 'Built for developers.'],
    whyTitle: 'Own your invoices. Own your stack.',
    whySubtitle: 'No subscriptions. No data sharing. No vendor lock-in.',
    whyCards: [
      {
        title: 'Self-hosted',
        description:
          'Run StackBill locally or on your own server. Your data stays on your infrastructure, under your control.',
      },
      {
        title: 'Built for developers',
        description:
          'Simple setup, clean configuration, no bloated SaaS. Configure everything with code, deploy anywhere.',
      },
      {
        title: 'Quotes to invoices',
        description:
          'Turn accepted quotes into invoices instantly. Track everything from proposal to payment in one place.',
      },
    ],
    integrationsTitle: 'Built to fit your workflow',
    integrationsSubtitle:
      'Connect with the tools you already use. Extend functionality through simple integrations.',
    integrationsCards: [
      {
        title: 'Clockify',
        badge: 'Integration',
        description:
          'Import tracked time into invoices. Convert your time entries into billable line items automatically.',
      },
      {
        title: 'Trello',
        badge: 'Integration',
        description:
          'Create project structure automatically when a quote is accepted. Streamline your project management workflow.',
      },
      {
        title: 'Custom branding',
        badge: 'Built-in',
        description:
          'Generate quotes and invoices that match your identity. Full control over colors, logos, and templates.',
      },
    ],
    installationTitle: 'Deploy it your way',
    installationText:
      'StackBill runs locally or on your own infrastructure. Get started in minutes with a simple git clone.',
    installBadge: 'Easy setup',
    installTerminalLabel: 'Terminal',
    installFooter: 'Runs on Node.js 18+. Works with PostgreSQL, MySQL, or SQLite.',
    installButton: 'View full documentation',
    faqTitle: 'Frequently asked questions',
    faqSubtitle: 'Everything you need to know about StackBill',
    faqs: [
      {
        q: 'What does "2 instances included" mean?',
        a: 'Each license allows you to run StackBill on up to 2 separate environments or servers. Perfect for running a production instance and a staging/development instance.',
      },
      {
        q: 'Is StackBill completely self-hosted?',
        a: 'Yes. StackBill runs entirely on your own infrastructure. No data is sent to external servers. You have complete control over your invoicing data, backups, and security.',
      },
      {
        q: 'Can I customize the invoice templates?',
        a: 'Absolutely. StackBill provides full control over invoice and quote templates. You can customize colors, fonts, logos, and layout through configuration files or by editing the templates directly.',
      },
      {
        q: 'What integrations are available?',
        a: 'Currently, StackBill integrates with Clockify for time tracking and Trello for project management. More integrations are being added regularly. You can also build custom integrations using the API.',
      },
      {
        q: 'Do I need technical knowledge to run StackBill?',
        a: 'Basic knowledge of Node.js and command-line tools is helpful. If you can run npm commands and deploy a web application, you can run StackBill. Detailed documentation guides you through every step.',
      },
      {
        q: 'What happens after I purchase?',
        a: 'You receive immediate access to the private GitHub repository, complete documentation, and all future updates. Installation takes just minutes, and you can start creating invoices right away.',
      },
    ],
    finalTitle: 'Ready to take control?',
    finalText:
      'Start creating professional invoices with StackBill. One-time purchase, lifetime access.',
    finalPrimaryCta: 'View pricing',
    finalSecondaryCta: 'Learn more',
    questionsLabel: 'Questions? Contact us at',
  },
  pricing: {
    title: 'Simple, transparent pricing',
    subtitle: 'Choose the plan that works best for you. All plans include full access to StackBill.',
    includedTitle: 'Everything included in all plans',
    includedFeatures: [
      '2 instances included',
      'Self-hosted on your infrastructure',
      'Unlimited quotes & invoices',
      'Custom branding & templates',
      'Clockify time tracking integration',
      'Trello project management integration',
      'Email support',
      'Regular updates & improvements',
    ],
    bestValue: 'Best Value',
    savePerYear: 'Save $20.88 per year',
    getStarted: 'Get started',
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
            'Contact us at support@stackbill.tech and we will be happy to help you choose the right plan.',
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
      amount: 'Amount: $9.99/month',
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
    features: 'Fonctionnalites',
    pricing: 'Tarifs',
    faq: 'FAQ',
    docs: 'Docs',
    cta: 'Commencer avec StackBill',
  },
  footer: {
    product: 'Produit',
    resources: 'Ressources',
    legal: 'Legal',
    documentation: 'Documentation',
    terms: 'Conditions d\'utilisation',
    privacy: 'Politique de confidentialite',
    rights: 'Tous droits reserves.',
  },
  marketing: {
    heroTitle: 'Facturation self-hosted pour les developpeurs',
    heroSubtitle: 'Creez des devis, generez des factures et gardez le controle total de vos donnees.',
    heroPrimaryCta: 'Commencer avec StackBill',
    heroSecondaryCta: 'Voir la documentation',
    reassurance: ['2 instances incluses.', 'Self-hosted.', 'Concu pour les developpeurs.'],
    whyTitle: 'Vos factures. Votre stack.',
    whySubtitle: 'Pas de verrou SaaS. Pas de partage de donnees. Pas de dependance.',
    whyCards: [
      {
        title: 'Self-hosted',
        description:
          'Executez StackBill en local ou sur votre serveur. Vos donnees restent chez vous, sous votre controle.',
      },
      {
        title: 'Pense pour les developpeurs',
        description:
          'Installation simple, configuration propre, sans complexite SaaS inutile. Deploiement partout.',
      },
      {
        title: 'Du devis a la facture',
        description:
          'Transformez un devis accepte en facture instantanement et suivez le cycle complet.',
      },
    ],
    integrationsTitle: 'Concu pour votre workflow',
    integrationsSubtitle:
      'Connectez les outils que vous utilisez deja et etendez facilement StackBill.',
    integrationsCards: [
      {
        title: 'Clockify',
        badge: 'Integration',
        description:
          'Importez le temps suivi dans vos factures et convertissez vos entrees en lignes facturables.',
      },
      {
        title: 'Trello',
        badge: 'Integration',
        description:
          'Creez automatiquement une structure projet lorsqu\'un devis est accepte.',
      },
      {
        title: 'Branding personnalise',
        badge: 'Inclus',
        description:
          'Generez des devis et factures a votre image: couleurs, logo et templates.',
      },
    ],
    installationTitle: 'Deployez a votre facon',
    installationText:
      'StackBill fonctionne en local ou sur votre propre infrastructure. Demarrage en quelques minutes.',
    installBadge: 'Installation rapide',
    installTerminalLabel: 'Terminal',
    installFooter: 'Compatible Node.js 18+. Fonctionne avec PostgreSQL, MySQL ou SQLite.',
    installButton: 'Voir la documentation complete',
    faqTitle: 'Questions frequentes',
    faqSubtitle: 'Tout ce qu\'il faut savoir sur StackBill',
    faqs: [
      {
        q: 'Que signifie "2 instances incluses" ?',
        a: 'Chaque licence vous permet d\'executer StackBill sur 2 environnements ou serveurs distincts.',
      },
      {
        q: 'StackBill est-il vraiment self-hosted ?',
        a: 'Oui. StackBill s\'execute entierement sur votre infrastructure, sans envoi de donnees vers des serveurs tiers.',
      },
      {
        q: 'Puis-je personnaliser les templates de facture ?',
        a: 'Oui. Vous pouvez personnaliser couleurs, polices, logos et mise en page.',
      },
      {
        q: 'Quelles integrations sont disponibles ?',
        a: 'Clockify et Trello sont deja disponibles, avec possibilite d\'integrations custom via API.',
      },
      {
        q: 'Faut-il un niveau technique pour l\'utiliser ?',
        a: 'Des bases Node.js/CLI sont utiles. Si vous savez lancer des commandes npm, vous pouvez deployer StackBill.',
      },
      {
        q: 'Que se passe-t-il apres l\'achat ?',
        a: 'Vous obtenez l\'acces au repo prive, la documentation complete et les mises a jour futures.',
      },
    ],
    finalTitle: 'Pret a reprendre le controle ?',
    finalText: 'Creez des factures professionnelles avec StackBill. Achat unique, acces a vie.',
    finalPrimaryCta: 'Voir les tarifs',
    finalSecondaryCta: 'En savoir plus',
    questionsLabel: 'Une question ? Contactez-nous :',
  },
  pricing: {
    title: 'Tarification simple et transparente',
    subtitle: 'Choisissez le plan qui vous convient. Tous les plans incluent l\'acces complet a StackBill.',
    includedTitle: 'Inclus dans tous les plans',
    includedFeatures: [
      '2 instances incluses',
      'Self-hosted sur votre infrastructure',
      'Devis et factures illimites',
      'Branding et templates personnalises',
      'Integration Clockify',
      'Integration Trello',
      'Support email',
      'Mises a jour regulieres',
    ],
    bestValue: 'Meilleure offre',
    savePerYear: 'Economisez 20,88 $/an',
    getStarted: 'Commencer',
  },
  checkout: {
    loading: 'Chargement...',
    success: {
      title: 'Paiement confirme',
      subtitle: 'Merci pour votre abonnement a StackBill',
      nextTitle: 'Et maintenant ?',
      steps: [
        {
          title: 'Verifiez votre email',
          description:
            'Vous recevrez un email de confirmation avec votre cle de licence et les instructions de telechargement.',
        },
        {
          title: 'Telechargez StackBill',
          description:
            'Recuperez la derniere version et suivez le guide d\'installation pour votre instance self-hosted.',
        },
        {
          title: 'Consultez la documentation',
          description: 'Apprenez a configurer votre instance, personnaliser vos templates et integrer vos outils.',
        },
      ],
      help: 'Besoin d\'aide ? La documentation et le support email sont la pour vous accompagner.',
      download: 'Telecharger StackBill',
      backHome: 'Retour a l\'accueil',
    },
    cancel: {
      title: 'Paiement annule',
      subtitle: 'Votre session de paiement a ete annulee. Aucun debit n\'a ete effectue.',
      helpTitle: 'Besoin d\'aide pour choisir ?',
      blocks: [
        {
          title: 'Questions frequentes',
          description:
            'Les deux plans incluent toutes les fonctionnalites. Le plan annuel offre un meilleur rapport qualite/prix.',
        },
        {
          title: 'Une question ?',
          description:
            'Contactez-nous sur support@stackbill.tech et nous vous aiderons a choisir le bon plan.',
        },
      ],
      whatYouGet: 'Ce que vous obtenez avec StackBill :',
      bulletPoints: [
        'Controle total des donnees avec le self-hosting',
        'Devis et factures illimites',
        'Integrations Clockify et Trello',
        'Branding personnalise pour votre activite',
      ],
      viewPricingAgain: 'Voir les tarifs',
      backHome: 'Retour a l\'accueil',
    },
    errors: {
      priceNotConfigured: 'Price ID non configure',
      failedSession: 'Echec de creation de la session de paiement',
      noCheckoutUrl: 'Aucune URL de paiement retournee',
      generic: 'Une erreur est survenue',
    },
  },
  notFound: {
    title: 'Page introuvable',
    text: 'La page que vous recherchez n\'existe pas ou a ete deplacee.',
    goHome: 'Retour a l\'accueil',
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
      settings: 'Parametres',
    },
    helpTitle: 'Besoin d\'aide ?',
    helpText: 'Consultez la documentation ou contactez le support',
    helpCta: 'Voir la documentation',
    overview: {
      title: 'Vue d\'ensemble du compte',
      subtitle: 'Gerez votre abonnement, vos licences et les parametres du compte',
      subStatus: 'Statut de l\'abonnement',
      active: 'Actif',
      monthlyPlan: 'Plan mensuel',
      nextBilling: 'Prochaine facturation : 7 avril 2026',
      amount: 'Montant : 9,99 $/mois',
      quickStats: {
        activeLicenses: 'Licences actives',
        ofAvailable: 'sur 2 disponibles',
        activeInstances: 'Instances actives',
        instancesRunning: 'instances en cours',
        accountStatus: 'Etat du compte',
        good: 'Bon',
        noIssues: 'aucun probleme detecte',
      },
      recentActivity: 'Activite recente',
      activated: 'Abonnement active',
      noActivity: 'Aucune autre activite pour le moment',
      startUsing: 'Utilisez votre licence pour voir plus d\'activite',
    },
    licenses: {
      title: 'Licences',
      subtitle: 'Gerez vos licences StackBill et vos instances',
      addInstance: 'Ajouter une instance',
      yourLicense: 'Votre licence',
      yourLicenseText:
        'Vous disposez de 2 instances avec votre abonnement. Activez votre licence sur vos instances StackBill self-hosted.',
      licenseKey: 'Cle de licence',
      licenseKeyText: 'Utilisez cette cle pour activer vos instances StackBill',
      created: 'Creee le : 7 mars 2026',
      instances: 'Instances : 0 sur 2 utilisees',
      activeInstances: 'Instances actives',
      noInstance: 'Aucune instance active pour le moment',
      noInstanceText: 'Activez votre licence sur une instance StackBill self-hosted pour commencer',
      howToActivate: 'Comment activer',
      steps: [
        'Installez StackBill sur votre serveur en suivant le guide d\'installation',
        'Copiez votre cle de licence ci-dessus',
        'Entrez la cle dans les parametres de votre instance StackBill',
        'Votre instance sera activee et apparaitra dans la liste ci-dessus',
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
