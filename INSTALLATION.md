# Installation de StackBill

## Introduction

StackBill est un outil self-hosted de devis et facturation conçu pour les développeurs. Cette documentation explique comment installer StackBill en local depuis le repository GitHub.

L'installation prend quelques minutes et permet de lancer StackBill sur votre machine ou sur votre propre serveur.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** version 18 ou supérieure
- **npm** ou **yarn**
- **PostgreSQL** version 14 ou supérieure (ou MySQL/SQLite comme alternative)
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
git clone https://github.com/guttership/stackbill.git
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

# URL de l'application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important :** Remplacez les valeurs fictives par vos vrais identifiants de base de données.

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

Si le projet utilise Prisma, exécutez les migrations :

```powershell
npm run db:migrate
```

Ou initialisez le schéma :

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
▲ Next.js
- Local:        http://localhost:3000
- Environments: .env.local

✓ Compiled
```

---

## Accéder à StackBill

Ouvrez votre navigateur et accédez à :

```
http://localhost:3000
```

Vous verrez l'interface de StackBill. Vous pouvez maintenant :

1. Créer des devis
2. Générer des factures
3. Gérer vos clients
4. Intégrer Clockify et Trello

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

## Déployer en production

### Sur votre propre serveur

1. Clonez le repository sur votre serveur
2. Configurez les variables d'environnement
3. Installez les dépendances : `npm install`
4. Exécutez les migrations
5. Buildez : `npm run build`
6. Lancez : `npm start`

### Avec Docker

Si vous avez Docker installé :

```powershell
docker build -t stackbill .
docker run -p 3000:3000 --env-file .env.local stackbill
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

- Consultez la documentation : https://stackbill.tech
- Ouvrez une issue sur GitHub : https://github.com/guttership/stackbill/issues
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
- **PostgreSQL** version 14 or higher (or MySQL/SQLite as alternatives)
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
git clone https://github.com/guttership/stackbill.git
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

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important:** Replace the placeholder values with your actual database credentials.

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

If the project uses Prisma, run the migrations:

```powershell
npm run db:migrate
```

Or initialize the schema:

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
▲ Next.js
- Local:        http://localhost:3000
- Environments: .env.local

✓ Compiled
```

---

## Access StackBill

Open your browser and navigate to:

```
http://localhost:3000
```

You will see the StackBill interface. You can now:

1. Create quotes
2. Generate invoices
3. Manage your clients
4. Integrate Clockify and Trello

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

## Deploy to production

### On your own server

1. Clone the repository on your server
2. Configure environment variables
3. Install dependencies: `npm install`
4. Run migrations
5. Build: `npm run build`
6. Start: `npm start`

### With Docker

If you have Docker installed:

```powershell
docker build -t stackbill .
docker run -p 3000:3000 --env-file .env.local stackbill
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

- Check the documentation: https://stackbill.tech
- Open an issue on GitHub: https://github.com/guttership/stackbill/issues
- Contact support: support@stackbill.tech

---

