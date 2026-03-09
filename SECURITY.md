# Security Policy - StackBill Vendor

## 🔐 Security Best Practices

### Required Security Setup

When deploying StackBill Vendor, you **MUST** configure the following security settings:

#### 1. Stripe API Keys

**Development vs Production:**

```env
# Development (TEST mode)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Production (LIVE mode)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

**⚠️ NEVER use test keys in production!**
**⚠️ NEVER commit live keys to version control!**

Get your keys from: [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys)

#### 2. Stripe Webhook Secret

Configure a webhook endpoint in your Stripe Dashboard:

1. Go to: [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy the webhook signing secret

Add to `.env`:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

**This is critical for webhook signature verification!**

#### 3. Stripe Price IDs

Create your products and prices in Stripe Dashboard, then configure:

```env
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_...
```

#### 4. Database Credentials

Ensure your database connection string uses strong credentials:

```env
DATABASE_URL=postgresql://user:STRONG_PASSWORD@host:5432/vendor?sslmode=require
```

- Use SSL/TLS connections (`sslmode=require`)
- Use unique database passwords
- Restrict database access to authorized IPs only

#### 5. Application URL

Set your application URL correctly:

```env
# Development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Production (MUST use HTTPS)
NEXT_PUBLIC_APP_URL=https://vendor.yourdomain.com
```

### Environment Variables

**Files that MUST be in `.gitignore`:**
- `.env`
- `.env.local`
- `.env.production`
- `.env.development`

**Files that CAN be committed:**
- `.env.example` (with placeholder values only)

### Stripe Security Best Practices

1. ✅ **Use Stripe test mode** during development
2. ✅ **Verify webhook signatures** (already implemented)
3. ✅ **Never log sensitive data** (card numbers, secrets)
4. ✅ **Use HTTPS** in production
5. ✅ **Restrict API key permissions** in Stripe Dashboard
6. ✅ **Monitor Stripe logs** for suspicious activity
7. ✅ **Enable 2FA** on your Stripe account

### Production Deployment Checklist

Before deploying to production:

- [ ] Stripe keys are LIVE mode (sk_live_, pk_live_)
- [ ] Webhook secret is configured
- [ ] Database uses SSL/TLS
- [ ] HTTPS is enabled on the web server
- [ ] Environment variables are set (not .env files)
- [ ] Price IDs are configured
- [ ] Webhook endpoint is reachable
- [ ] `.env` files are not committed to git
- [ ] Dependencies are up to date (`npm audit`)
- [ ] Firewall rules are configured
- [ ] Backups are configured and tested
- [ ] Stripe Dashboard is in live mode
- [ ] Test purchases work correctly

### Vercel Deployment Security

When deploying to Vercel:

1. Add environment variables in Vercel Dashboard
2. Use different environments (Preview vs Production)
3. Enable deployment protection
4. Use environment-specific Stripe keys

### Reporting Security Issues

If you discover a security vulnerability in StackBill Vendor:

1. **Do NOT open a public issue**
2. Email security details to: [security@stackbill.tech](mailto:security@stackbill.tech)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work with you to resolve the issue.

### Common Security Mistakes to Avoid

❌ **DON'T:**
- Commit `.env` files to git
- Use test keys in production
- Disable webhook signature verification
- Log sensitive data (API keys, card numbers)
- Use weak database passwords
- Expose admin endpoints publicly
- Ignore Stripe webhook retries

✅ **DO:**
- Use environment variables for secrets
- Enable HTTPS/SSL everywhere
- Verify webhook signatures
- Monitor Stripe logs regularly
- Keep dependencies updated
- Use strong, unique passwords
- Test webhook handling thoroughly

### Updates

Keep StackBill Vendor updated to receive security patches:

```bash
git pull origin main
npm install
npm run build
```

Check for updates regularly at: [https://stackbill.tech](https://stackbill.tech)

---

**Last Updated:** March 2026
