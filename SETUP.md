# Setup Guide - StackBill Vendor Portal

## Configuration Stripe

### 1. Créer un compte Stripe

Rendez-vous sur [stripe.com](https://stripe.com) et créez un compte (ou utilisez le mode test).

### 2. Récupérer les clés API

Dans le dashboard Stripe:
1. Allez dans **Developers** > **API keys**
2. Copiez la **Publishable key** et la **Secret key**
3. Ajoutez-les dans [.env.local](.env.local):
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...`
   - `STRIPE_SECRET_KEY=sk_test_...`

### 3. Créer les produits et prix

Dans le dashboard Stripe:
1. Allez dans **Products**
2. Créez un produit "StackBill License"
3. Ajoutez 2 prix:
   - **Monthly**: $11/month (recurring)
   - **Yearly**: $110/year (recurring)
4. Copiez les Price IDs (commencent par `price_...`)
5. Ajoutez-les dans [.env.local](.env.local):
   - `NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_...`
   - `NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_...`

### 4. Configurer le webhook (optionnel pour le moment)

Pour recevoir les événements de paiement:
1. Dans **Developers** > **Webhooks**, cliquez **Add endpoint**
2. URL: `https://votre-domaine.com/api/webhooks/stripe`
3. Sélectionnez ces événements:
   - checkout.session.completed
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted
   - invoice.payment_succeeded
   - invoice.payment_failed
4. Copiez le **Signing secret** (commence par `whsec_...`)
5. Ajoutez-le dans [.env.local](.env.local):
   - `STRIPE_WEBHOOK_SECRET=whsec_...`

## Installation

```powershell
npm install
```

## Développement

```powershell
npm run dev
```

Le site sera accessible sur http://localhost:3000

## Build Production

```powershell
npm run build
npm start
```

## Structure du projet

```
stackbill-vendor/
├── app/
│   ├── (marketing)/         # Pages marketing (landing, pricing)
│   ├── (checkout)/          # Pages checkout (success, cancel)
│   ├── (account)/           # Dashboard account (futur)
│   └── api/                 # API routes (checkout, webhooks)
├── components/
│   ├── ui/                  # Composants UI de base
│   ├── layout/              # Header, Footer
│   ├── pricing/             # Composants pricing
│   └── checkout/            # Composants checkout
├── lib/                     # Utilitaires et config
└── types/                   # Types TypeScript
```

## Pages disponibles

- `/` - Landing page
- `/pricing` - Page pricing
- `/checkout/success` - Page de succès après paiement
- `/checkout/cancel` - Page d'annulation
- `/account` - Dashboard account (placeholder)
- `/account/licenses` - Gestion des licences (placeholder)

## Prochaines étapes

1. Configurer Stripe selon le guide ci-dessus
2. Tester le flow de paiement en mode test
3. Implémenter la base de données (suggestions: PostgreSQL + Prisma)
4. Compléter les TODOs dans les fichiers:
   - [lib/license.ts](lib/license.ts) - Génération et validation de licences
   - [app/api/webhooks/stripe/route.ts](app/api/webhooks/stripe/route.ts) - Sauvegarde en DB
   - [app/(account)/*](app/(account)) - Affichage des données réelles
5. Implémenter l'envoi d'emails (suggestions: Resend, SendGrid)
6. Déployer sur Vercel ou votre hosting préféré

## Support

Pour toute question sur le setup, consultez:
- [Documentation Stripe](https://stripe.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)
