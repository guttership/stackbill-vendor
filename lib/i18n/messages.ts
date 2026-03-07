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
    heroTitle: 'Self-hosted invoicing for developers',
    heroSubtitle: 'Stop relying on SaaS invoicing tools. Run your billing stack on your own infrastructure.',
    heroPrimaryCta: 'Install StackBill',
    heroSecondaryCta: 'View documentation',
    reassurance: ['2 instances included.', 'Self-hosted.', 'Built for developers.'],
    deployReassurance: 'Deploy in minutes. Run locally or on your own server.',
    saasContrastTitle: 'Most invoicing tools are SaaS.',
    saasContrastText: [
      'Your invoices live on someone else\'s servers.',
      'Your data depends on a third-party platform.',
      'StackBill flips that model.',
      'Run your invoicing stack on your own infrastructure.',
    ],
    targetAudienceTitle: 'Built for developers and indie makers.',
    targetAudienceText:
      'If you\'re a freelance developer, indie hacker or small dev team tired of SaaS invoicing tools, StackBill lets you run your own invoicing stack.',
    whyTitle: 'Everything you need. Nothing you don\'t.',
    whySubtitle: '',
    whyCards: [
      {
        title: 'Self-hosted',
        description: 'Run StackBill locally or on your own server.',
      },
      {
        title: 'Built for developers',
        description: 'Simple setup, clean configuration, no bloated SaaS.',
      },
      {
        title: 'Quotes to invoices',
        description: 'Turn accepted quotes into invoices instantly.',
      },
    ],
    howItWorksTitle: 'How it works',
    howItWorksSteps: [
      {
        title: 'Install StackBill',
        description: 'Run it locally or on your own server.',
      },
      {
        title: 'Activate your license',
        description: 'Connect your instance with your StackBill account.',
      },
      {
        title: 'Start invoicing',
        description: 'Create quotes, generate invoices and track projects.',
      },
    ],
    integrationsTitle: 'Integrations',
    integrationsSubtitle: '',
    integrationsCards: [
      {
        title: 'Clockify',
        badge: 'Integration',
        description: 'Import tracked time directly into invoices.',
      },
      {
        title: 'Trello',
        badge: 'Integration',
        description: 'Create project structure automatically when a quote is accepted.',
      },
    ],
    openSourceTitle: 'Open source core available on GitHub.',
    openSourceText:
      'Review the code, contribute improvements, or adapt it to your workflow.',
    openSourceLink: 'View on GitHub',
    pricingHighlightTitle: 'One product. One clear price.',
    pricingHighlightSubtitle:
      'StackBill is sold as an active license with updates included. Choose monthly or yearly billing.',
    pricingHighlightMonthly: '$9.99 / month',
    pricingHighlightYearly: '$99 / year',
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
    pricingHighlightReassurance: 'Run it locally. Deploy it anywhere.',
    pricingHighlightNote: 'One product, one clear price.',
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
    faqSubtitle: 'Everything you need to know about StackBill',
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
        q: 'Is StackBill a SaaS?',
        a: 'No. StackBill is self-hosted, but connected for licensing and updates.',
      },
      {
        q: 'What happens if my license expires?',
        a: 'Your existing setup remains accessible, while premium features or updates may be limited depending on license status.',
      },
    ],
    finalTitle: 'Ready to take control?',
    finalText:
      'Replace bloated invoicing SaaS with a self-hosted workflow that keeps you in control.',
    finalPrimaryCta: 'Install StackBill',
    finalSecondaryCta: 'View documentation',
    questionsLabel: 'Questions? Contact us at',
  },
  pricing: {
    title: 'Simple, transparent pricing',
    subtitle: 'StackBill is available at $9.99/month or $99/year. Active license, 2 instances included, updates included.',
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
    savePerYear: 'Save $20.88 per year',
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
    heroTitle: 'Facturation self-hosted pour les développeurs',
    heroSubtitle: 'Arrêtez de dépendre des plateformes SaaS de facturation. Exécutez votre stack de facturation sur votre propre infrastructure.',
    heroPrimaryCta: 'Installer StackBill',
    heroSecondaryCta: 'Voir la documentation',
    reassurance: ['2 instances incluses.', 'Self-hosted.', 'Conçu pour les développeurs.'],
    deployReassurance: 'Déployez en quelques minutes. Exécutez-le en local ou sur votre serveur.',
    saasContrastTitle: 'La plupart des outils de facturation sont des SaaS.',
    saasContrastText: [
      'Vos factures vivent sur les serveurs de quelqu\'un d\'autre.',
      'Vos données dépendent d\'une plateforme tierce.',
      'StackBill inverse ce modèle.',
      'Exécutez votre stack de facturation sur votre propre infrastructure.',
    ],
    targetAudienceTitle: 'Conçu pour les développeurs et indie makers.',
    targetAudienceText:
      'Si vous êtes développeur freelance, indie hacker ou petite équipe dev fatiguée des outils SaaS, StackBill vous permet de gérer votre propre stack de facturation.',
    whyTitle: 'Tout ce dont vous avez besoin. Rien de plus.',
    whySubtitle: '',
    whyCards: [
      {
        title: 'Self-hosted',
        description: 'Exécutez StackBill en local ou sur votre propre serveur.',
      },
      {
        title: 'Conçu pour les développeurs',
        description: 'Installation simple, configuration propre, pas de bloat SaaS.',
      },
      {
        title: 'Du devis à la facture',
        description: 'Transformez un devis accepté en facture instantanément.',
      },
    ],
    howItWorksTitle: 'Comment ça marche',
    howItWorksSteps: [
      {
        title: 'Installez StackBill',
        description: 'Executez-le en local ou sur votre propre serveur.',
      },
      {
        title: 'Activez votre licence',
        description: 'Connectez votre instance à votre compte StackBill.',
      },
      {
        title: 'Commencez à facturer',
        description: 'Créez des devis, générez des factures et suivez vos projets.',
      },
    ],
    integrationsTitle: 'Intégrations',
    integrationsSubtitle: '',
    integrationsCards: [
      {
        title: 'Clockify',
        badge: 'Intégration',
        description: 'Importez le temps suivi directement dans vos factures.',
      },
      {
        title: 'Trello',
        badge: 'Intégration',
        description: 'Créez automatiquement une structure projet lorsqu\'un devis est accepté.',
      },
    ],
    openSourceTitle: 'Code source ouvert disponible sur GitHub.',
    openSourceText:
      'Examinez le code, contribuez aux améliorations ou adaptez-le à votre workflow.',
    openSourceLink: 'Voir sur GitHub',
    pricingHighlightTitle: 'Un produit. Un prix clair.',
    pricingHighlightSubtitle:
      'StackBill fonctionne avec une licence active incluant les mises à jour. Choisissez mensuel ou annuel.',
    pricingHighlightMonthly: '9,99 $ / mois',
    pricingHighlightYearly: '99 $ / an',
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
    pricingHighlightReassurance: 'Exécutez-le en local. Déployez-le partout.',
    pricingHighlightNote: 'Un produit, un prix clair.',
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
    faqSubtitle: 'Tout ce qu\'il faut savoir sur StackBill',
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
        q: 'StackBill est-il un SaaS ?',
        a: 'Non. StackBill est self-hosted, mais connecté pour la licence et les mises à jour.',
      },
      {
        q: 'Que se passe-t-il si ma licence expire ?',
        a: 'Votre installation existante reste accessible, tandis que certaines fonctions premium ou mises à jour peuvent être limitées selon le statut de licence.',
      },
    ],
    finalTitle: 'Prêt à reprendre le contrôle ?',
    finalText: 'Remplacez les SaaS de facturation trop lourds par un workflow self-hosted, clair et maîtrisé.',
    finalPrimaryCta: 'Installer StackBill',
    finalSecondaryCta: 'Voir la documentation',
    questionsLabel: 'Une question ? Contactez-nous :',
  },
  pricing: {
    title: 'Tarification simple et transparente',
    subtitle: 'StackBill est proposé à 9,99 $/mois ou 99 $/an. Licence active, 2 instances incluses, mises à jour incluses.',
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
    savePerYear: 'Économisez 20,88 $/an',
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
            'Contactez-nous sur support@stackbill.tech et nous vous aiderons a choisir le bon plan.',
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
      amount: 'Montant : 9,99 $/mois',
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
