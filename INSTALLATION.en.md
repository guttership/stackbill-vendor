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

### On your own server (VPS/Dedicated)

1. Clone the repository on your server
2. Configure environment variables
3. Install dependencies: `npm install`
4. Run migrations
5. Build: `npm run build`
6. Start: `npm start`

### Online database configuration

For a hosted PostgreSQL database:

```env
DATABASE_URL=postgresql://stackbill_user:your_secure_password@db.example.com:5432/stackbill
```

**Hosted database options:**
- **Railway**: https://railway.app (Managed PostgreSQL)
- **Render**: https://render.com (PostgreSQL and deployment)
- **AWS RDS**: https://aws.amazon.com/rds/
- **Digital Ocean**: https://www.digitalocean.com/products/managed-databases/
- **Heroku**: https://www.heroku.com/postgres

### Custom domain configuration

To access StackBill via your own domain (e.g., `invoicing.yourcompany.com`):

1. **Point your domain to your server:**
   - Update DNS records at your registrar
   - Create an A record pointing to your server IP
   - Example: `invoicing.yourcompany.com A 192.168.1.100`

2. **Configure HTTPS with Let's Encrypt:**
   ```powershell
   npm install -g certbot
   sudo certbot certonly --standalone -d invoicing.yourcompany.com
   ```

3. **Update application URL:**
   ```env
   NEXT_PUBLIC_APP_URL=https://invoicing.yourcompany.com
   ```

4. **Setup reverse proxy (Nginx):**
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

### Deploy on Vercel

Vercel offers the simplest deployment for Next.js applications:

1. **Push your code to GitHub:**
   ```powershell
   git push origin main
   ```

2. **Import project on Vercel:**
   - Go to https://vercel.com/new
   - Connect your GitHub account
   - Select the `stackbill` repository
   - Click "Import"

3. **Configure environment variables:**
   - Go to "Settings" → "Environment Variables"
   - Add:
     - `DATABASE_URL`: your PostgreSQL URL
     - `NEXT_PUBLIC_APP_URL`: your Vercel URL or custom domain

4. **Connect your custom domain:**
   - In "Settings" → "Domains"
   - Add your domain (e.g., `invoicing.yourcompany.com`)
   - Vercel automatically generates an SSL certificate

5. **Automatic deployment:**
   Every push to `main` automatically redeploys your application.

### Deploy on Railway

Railway is perfect for small projects:

1. **Create a Railway account:**
   https://railway.app

2. **Connect your GitHub:**
   - Click "Start New Project"
   - Select "Deploy from GitHub"
   - Authorize Railway to access your account

3. **Create a PostgreSQL database:**
   - In the dashboard, click "Add a Database"
   - Select "PostgreSQL"
   - Railway automatically generates `DATABASE_URL`

4. **Configure environment variables:**
   - In the StackBill service, go to "Variables"
   - Add:
     - `NEXT_PUBLIC_APP_URL`: your Railway URL

5. **Generate a domain:**
   - Railway automatically generates a public URL
   - Or point your custom domain via DNS

### Deploy with Docker

To deploy with Docker on any server:

1. **Create a Dockerfile:**
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

2. **Create docker-compose.yml:**
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

3. **Start the services:**
   ```powershell
   docker-compose up -d
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
