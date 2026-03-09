# StackBill Vendor Portal

Portail vendeur officiel de StackBill - Self-hosted invoicing for developers.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Stripe

## Installation

```powershell
npm install
```

## Configuration

1. Copier `.env.example` vers `.env.local`
2. Remplir vos clés Stripe

**🔐 Security Setup (CRITICAL):**

```bash
# 1. Get Stripe API keys from https://dashboard.stripe.com/apikeys
# Development: Use TEST keys (sk_test_*, pk_test_*)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# 2. Configure webhook endpoint and get signing secret
# Go to https://dashboard.stripe.com/webhooks
# Add endpoint: https://your-domain.com/api/webhooks/stripe
STRIPE_WEBHOOK_SECRET=whsec_...

# 3. Create products in Stripe and get price IDs
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_...

# 4. Set application URL (MUST use HTTPS in production)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# 5. Configure database
DATABASE_URL=postgresql://user:password@host:5432/vendor?sslmode=require
```

⚠️ **NEVER commit `.env.local` files to version control!**

⚠️ **NEVER use test keys in production!**

📖 **See [SECURITY.md](SECURITY.md) for complete security guidelines.**

## Développement

```powershell
npm run dev
```

Le site sera accessible sur http://localhost:3000

## Build

```powershell
npm run build
npm start
```

## Structure

- `/app` - Routes Next.js (App Router)
- `/components` - Composants React
- `/lib` - Utilitaires et configuration
- `/types` - Types TypeScript
- `/public` - Assets statiques
