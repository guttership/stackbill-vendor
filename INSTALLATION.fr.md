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

### Sur votre propre serveur (VPS/Dédié)

1. Clonez le repository sur votre serveur
2. Configurez les variables d'environnement
3. Installez les dépendances : `npm install`
4. Exécutez les migrations
5. Buildez : `npm run build`
6. Lancez : `npm start`

### Configuration de la base de données en ligne

Pour une base de données PostgreSQL hébergée :

```env
DATABASE_URL=postgresql://stackbill_user:your_secure_password@db.example.com:5432/stackbill
```

**Options de base de données hébergées :**
- **Railway** : https://railway.app (PostgreSQL managé)
- **Render** : https://render.com (PostgreSQL et déploiement)
- **AWS RDS** : https://aws.amazon.com/rds/
- **Digital Ocean** : https://www.digitalocean.com/products/managed-databases/
- **Heroku** : https://www.heroku.com/postgres

### Configuration du domaine personnalisé

Pour accéder à StackBill via votre propre domaine (ex: `invoicing.yourcompany.com`) :

1. **Pointez votre domaine vers votre serveur :**
   - Mettez à jour les DNS de votre registraire
   - Créez un enregistrement A pointant vers l'IP de votre serveur
   - Exemple : `invoicing.yourcompany.com A 192.168.1.100`

2. **Configurez HTTPS avec Let's Encrypt :**
   ```powershell
   npm install -g certbot
   sudo certbot certonly --standalone -d invoicing.yourcompany.com
   ```

3. **Mettez à jour l'URL de l'application :**
   ```env
   NEXT_PUBLIC_APP_URL=https://invoicing.yourcompany.com
   ```

4. **Configurez un reverse proxy (Nginx) :**
   ```nginx
   server {
     listen 80;
     server_name invoicing.yourcompany.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

### Déploiement sur Vercel

Vercel offre le déploiement le plus simple pour les applications Next.js :

1. **Poussez votre code sur GitHub :**
   ```powershell
   git push origin main
   ```

2. **Importez le projet sur Vercel :**
   - Allez sur https://vercel.com/new
   - Connectez votre compte GitHub
   - Sélectionnez le repository `stackbill`
   - Cliquez sur "Import"

3. **Configurez les variables d'environnement :**
   - Allez dans l'onglet "Settings" → "Environment Variables"
   - Ajoutez :
     - `DATABASE_URL` : votre URL PostgreSQL
     - `NEXT_PUBLIC_APP_URL` : votre URL Vercel ou domaine personnalisé

4. **Connectez votre domaine personnalisé :**
   - Dans "Settings" → "Domains"
   - Ajoutez votre domaine (ex: `invoicing.yourcompany.com`)
   - Vercel génère automatiquement un certificat SSL

5. **Déploiement automatique :**
   Chaque push sur `main` redéploie automatiquement votre application.

### Déploiement sur Railway

Railway est parfait pour les petits projets :

1. **Créez un compte sur Railway :**
   https://railway.app

2. **Connectez votre GitHub :**
   - Cliquez sur "Start New Project"
   - Sélectionnez "Deploy from GitHub"
   - Autorisez Railway à accéder à votre compte

3. **Créez une base de données PostgreSQL :**
   - Dans le dashboard, cliquez sur "Add a Database"
   - Sélectionnez "PostgreSQL"
   - Railway génère automatiquement `DATABASE_URL`

4. **Configurez les variables d'environnement :**
   - Dans le service StackBill, allez dans "Variables"
   - Ajoutez :
     - `NEXT_PUBLIC_APP_URL` : votre URL Railway

5. **Générez un domaine :**
   - Railway génère automatiquement une URL publique
   - Ou pointez votre domaine personnalisé via DNS

### Déploiement avec Docker

Pour déployer avec Docker sur n'importe quel serveur :

1. **Créez un Dockerfile :**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   
   COPY . .
   RUN npm run build
   
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Créez un docker-compose.yml :**
   ```yaml
   version: '3.8'
   services:
     stackbill:
       build: .
       ports:
         - "3000:3000"
       environment:
         DATABASE_URL: postgresql://stackbill:password@postgres:5432/stackbill
         NEXT_PUBLIC_APP_URL: http://localhost:3000
       depends_on:
         - postgres
     postgres:
       image: postgres:14
       environment:
         POSTGRES_USER: stackbill
         POSTGRES_PASSWORD: password
         POSTGRES_DB: stackbill
       volumes:
         - postgres_data:/var/lib/postgresql/data
   
   volumes:
     postgres_data:
   ```

3. **Démarrez les services :**
   ```powershell
   docker-compose up -d
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
- Contactez le support : designmoiunmouton@gmail.com
