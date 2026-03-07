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
