# Deployment Guide - StackBill Vendor Portal

## Déploiement sur Vercel

### 1. Connexion à Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec votre compte GitHub
3. Importez le projet `stackbill-vendor`

### 2. Configuration des variables d'environnement

Dans les **Project Settings** > **Environment Variables**, ajoutez les variables suivantes :

#### Variables Stripe (REQUIRED)

```bash
# Clés API Stripe
STRIPE_SECRET_KEY=sk_live_...                           # Clé secrète Stripe (LIVE mode en production)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...          # Clé publique Stripe (LIVE mode)
STRIPE_WEBHOOK_SECRET=whsec_...                          # Secret webhook Stripe

# Price IDs Stripe
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_...           # ID du prix mensuel (10€/mois)
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_...            # ID du prix annuel (100€/an)
```

#### Variables Database (REQUIRED)

```bash
# PostgreSQL Database URL
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
```

**Note**: Pour une base de données PostgreSQL gratuite, utilisez [Neon](https://neon.tech) ou [Supabase](https://supabase.com).

#### Variables Application (OPTIONAL)

```bash
# URL de l'application
NEXT_PUBLIC_APP_URL=https://stackbill-vendor.vercel.app  # Votre domaine Vercel

# Email configuration (if using email notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 3. Configuration de la base de données

#### Option A : Neon (Recommandé)

1. Créez un compte sur [neon.tech](https://neon.tech)
2. Créez un nouveau projet
3. Copiez la **Connection String** (commence par `postgresql://`)
4. Ajoutez-la dans Vercel comme `DATABASE_URL`

#### Option B : Supabase

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Dans **Settings** > **Database**, copiez la **Connection String** (mode Connection Pooling)
4. Ajoutez-la dans Vercel comme `DATABASE_URL`

### 4. Configuration du webhook Stripe

Une fois le site déployé :

1. Dans le dashboard Stripe, allez dans **Developers** > **Webhooks**
2. Cliquez sur **Add endpoint**
3. URL : `https://votre-domaine.vercel.app/api/webhooks/stripe`
4. Événements à sélectionner :
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copiez le **Signing secret** (commence par `whsec_...`)
6. Ajoutez-le dans Vercel comme `STRIPE_WEBHOOK_SECRET`

### 5. Migration de la base de données

Après avoir configuré la base de données, initialisez le schéma :

```bash
# En local, avec la DATABASE_URL de production
npx prisma db push
```

Ou ajoutez un script de build dans Vercel :
- Dans **Project Settings** > **General** > **Build & Development Settings**
- Override Build command : `npm run build && npx prisma db push`

### 6. Redéploiement

Après avoir configuré toutes les variables d'environnement :

1. Allez dans **Deployments**
2. Cliquez sur le dernier déploiement
3. Cliquez sur **Redeploy**
4. Sélectionnez **Use existing Build Cache** = No

Le déploiement devrait maintenant réussir ! ✅

## Vérifications post-déploiement

### 1. Tester le paiement

1. En mode test Stripe : utilisez la carte `4242 4242 4242 4242`
2. Vérifiez que la session de checkout s'ouvre correctement
3. Complétez un paiement test
4. Vérifiez que le webhook est bien reçu dans Stripe Dashboard

### 2. Vérifier les logs

Dans Vercel :
- **Deployments** > Votre déploiement > **Functions**
- Vérifiez qu'il n'y a pas d'erreurs dans les logs

### 3. SSL et Sécurité

- Vérifiez que votre site utilise HTTPS (automatique sur Vercel)
- Testez les webhooks Stripe
- Vérifiez la connexion à la base de données (SSL activé)

## Passage en LIVE mode

Quand vous êtes prêt pour la production :

1. Dans Stripe, passez du mode **Test** au mode **Live**
2. Générez de nouvelles clés API (Live) : `sk_live_...` et `pk_live_...`
3. Créez de nouveaux prix (Live mode) et récupérez les Price IDs
4. Mettez à jour les variables d'environnement dans Vercel :
   - `STRIPE_SECRET_KEY` → clé Live
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → clé Live
   - `NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID` → Price ID Live
   - `NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID` → Price ID Live
5. Recréez le webhook en mode Live
6. Redéployez l'application

## Troubleshooting

### Build échoue avec des erreurs de sécurité

Si vous voyez :
```
❌ CRITICAL SECURITY ERRORS:
   • STRIPE_SECRET_KEY is not defined!
```

**Solution** : Le build affichera ces avertissements mais ne bloquera pas. Configurez les variables d'environnement dans Vercel **après** le premier build.

### Runtime errors après déploiement

Si l'application démarre mais ne fonctionne pas :

1. Vérifiez les logs dans Vercel
2. Assurez-vous que toutes les variables d'environnement sont définies
3. Redéployez après avoir ajouté les variables manquantes

### Webhook Stripe ne fonctionne pas

1. Vérifiez que l'URL du webhook est correcte
2. Vérifiez que `STRIPE_WEBHOOK_SECRET` est défini dans Vercel
3. Testez le webhook dans Stripe Dashboard > Webhooks > Votre endpoint > Send test webhook

## Support

Pour toute question :
- Email : designmoiunmouton@gmail.com
- GitHub Issues : [github.com/guttership/stackbill-vendor/issues](https://github.com/guttership/stackbill-vendor/issues)
