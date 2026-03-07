# Installation de StackBill

## Introduction

StackBill est un outil self-hosted de devis et facturation conçu pour les développeurs. Cette documentation explique comment installer StackBill en local depuis le repository GitHub.

L'installation prend quelques minutes et permet de lancer StackBill sur votre machine ou sur votre propre serveur.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** version 18 ou supérieure
- **npm** ou **yarn**
- **PostgreSQL** version 14 ou supérieure
- **Git**

Vérifiez vos versions installées :

```powershell
node --version
npm --version
git --version
psql --version
```

---

## Cloner le repository

Clonez le repository GitHub de StackBill sur votre machine :

```powershell
git clone https://github.com/yourusername/stackbill.git
cd stackbill
```

---

## Installer les dépendances

Installez les dépendances Node.js avec npm :

```powershell
npm install
```

Ou avec yarn :

```powershell
yarn install
```

---

## Configurer l'environnement (.env)

Créez un fichier `.env.local` à la racine du projet en copiant le fichier d'exemple :

```powershell
Copy-Item .env.example .env.local
```

Ouvrez `.env.local` et configurez les variables d'environnement :

```env
# Base de données PostgreSQL
DATABASE_URL=postgresql://stackbill:password@localhost:5432/stackbill

# Stripe (pour les paiements)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_votre_cle_publique
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete
STRIPE_WEBHOOK_SECRET=whsec_votre_webhook_secret
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_votre_prix_mensuel
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_votre_prix_annuel

# URL de l'application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important :** Remplacez les valeurs fictives par vos vraies clés Stripe et vos identifiants de base de données.

---

## Configurer la base de données PostgreSQL

### 1. Créer la base de données

Connectez-vous à PostgreSQL :

```powershell
psql -U postgres
```

Créez l'utilisateur et la base de données :

```sql
CREATE USER stackbill WITH PASSWORD 'password';
CREATE DATABASE stackbill OWNER stackbill;
GRANT ALL PRIVILEGES ON DATABASE stackbill TO stackbill;
\q
```

### 2. Exécuter les migrations

Si le projet utilise Prisma ou un autre ORM, exécutez les migrations :

```powershell
npm run db:migrate
```

Ou initialisez manuellement le schéma si nécessaire :

```powershell
npm run db:push
```

---

## Lancer l'application

Démarrez le serveur de développement :

```powershell
npm run dev
```

Le serveur démarre sur le port 3000 par défaut.

Vous devriez voir :

```
▲ Next.js 16.1.6
- Local:        http://localhost:3000
- Environments: .env.local

✓ Compiled in 1.2s
```

---

## Accéder à StackBill

Ouvrez votre navigateur et accédez à :

```
http://localhost:3000
```

Vous verrez la page d'accueil de StackBill.

### Activer votre licence

1. Créez un compte sur la page de tarification
2. Obtenez votre clé de licence
3. Activez votre instance locale avec cette clé
4. Commencez à créer vos devis et factures

---

## Commandes utiles

```powershell
# Lancer en mode développement
npm run dev

# Builder pour la production
npm run build

# Lancer en mode production
npm run start

# Vérification TypeScript
npm run type-check

# Linter
npm run lint
```

---

## Dépannage

### Le serveur ne démarre pas

Vérifiez que le port 3000 n'est pas déjà utilisé :

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
```

Tuez le processus si nécessaire :

```powershell
$pid = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
Stop-Process -Id $pid -Force
```

### Erreur de connexion PostgreSQL

Vérifiez que PostgreSQL est démarré :

```powershell
Get-Service postgresql*
```

Vérifiez vos identifiants dans `.env.local`.

### Erreurs de dépendances

Supprimez `node_modules` et réinstallez :

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

---

## Support

Pour toute question ou problème :

- Consultez la documentation complète : https://stackbill.tech
- Ouvrez une issue sur GitHub
- Contactez le support : support@stackbill.tech

---

---

---

# StackBill Installation

## Introduction

StackBill is a self-hosted invoicing and quoting tool built for developers. This documentation explains how to install StackBill locally from the GitHub repository.

Installation takes just a few minutes and allows you to run StackBill on your machine or on your own server.

---

## Prerequisites

Before you begin, make sure you have installed:

- **Node.js** version 18 or higher
- **npm** or **yarn**
- **PostgreSQL** version 14 or higher
- **Git**

Check your installed versions:

```powershell
node --version
npm --version
git --version
psql --version
```

---

## Clone the repository

Clone the StackBill GitHub repository to your machine:

```powershell
git clone https://github.com/yourusername/stackbill.git
cd stackbill
```

---

## Install dependencies

Install Node.js dependencies with npm:

```powershell
npm install
```

Or with yarn:

```powershell
yarn install
```

---

## Configure environment (.env)

Create a `.env.local` file at the project root by copying the example file:

```powershell
Copy-Item .env.example .env.local
```

Open `.env.local` and configure the environment variables:

```env
# PostgreSQL database
DATABASE_URL=postgresql://stackbill:password@localhost:5432/stackbill

# Stripe (for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_public_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_your_monthly_price
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_your_yearly_price

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important:** Replace the placeholder values with your actual Stripe keys and database credentials.

---

## Configure PostgreSQL database

### 1. Create the database

Connect to PostgreSQL:

```powershell
psql -U postgres
```

Create the user and database:

```sql
CREATE USER stackbill WITH PASSWORD 'password';
CREATE DATABASE stackbill OWNER stackbill;
GRANT ALL PRIVILEGES ON DATABASE stackbill TO stackbill;
\q
```

### 2. Run migrations

If the project uses Prisma or another ORM, run the migrations:

```powershell
npm run db:migrate
```

Or manually initialize the schema if needed:

```powershell
npm run db:push
```

---

## Start the application

Start the development server:

```powershell
npm run dev
```

The server starts on port 3000 by default.

You should see:

```
▲ Next.js 16.1.6
- Local:        http://localhost:3000
- Environments: .env.local

✓ Compiled in 1.2s
```

---

## Access StackBill

Open your browser and navigate to:

```
http://localhost:3000
```

You will see the StackBill homepage.

### Activate your license

1. Create an account on the pricing page
2. Get your license key
3. Activate your local instance with this key
4. Start creating your quotes and invoices

---

## Useful commands

```powershell
# Run in development mode
npm run dev

# Build for production
npm run build

# Run in production mode
npm run start

# TypeScript type checking
npm run type-check

# Linter
npm run lint
```

---

## Troubleshooting

### Server won't start

Check if port 3000 is already in use:

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
```

Kill the process if necessary:

```powershell
$pid = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
Stop-Process -Id $pid -Force
```

### PostgreSQL connection error

Check that PostgreSQL is running:

```powershell
Get-Service postgresql*
```

Verify your credentials in `.env.local`.

### Dependency errors

Delete `node_modules` and reinstall:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

---

## Support

For any questions or issues:

- Check the full documentation: https://stackbill.tech
- Open an issue on GitHub
- Contact support: support@stackbill.tech

---
