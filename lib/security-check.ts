/**
 * Script de vérification de sécurité au démarrage - StackBill Vendor
 * Vérifie que les variables d'environnement critiques sont configurées correctement
 */

// Vérifications de sécurité au démarrage
function checkSecurityConfig() {
  const warnings: string[] = [];
  const errors: string[] = [];

  // 1. Vérifier STRIPE_SECRET_KEY
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    errors.push('STRIPE_SECRET_KEY is not defined! Configure your Stripe secret key.');
  } else if (stripeSecret.startsWith('sk_test_')) {
    if (process.env.NODE_ENV === 'production') {
      errors.push('STRIPE_SECRET_KEY uses TEST mode in production! Use a live key (sk_live_...)');
    }
  } else if (!stripeSecret.startsWith('sk_live_') && !stripeSecret.startsWith('sk_test_')) {
    errors.push('STRIPE_SECRET_KEY has invalid format. Should start with sk_test_ or sk_live_');
  }

  // 2. Vérifier STRIPE_WEBHOOK_SECRET
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    warnings.push('STRIPE_WEBHOOK_SECRET is not defined. Webhook signature verification will fail.');
  } else if (!webhookSecret.startsWith('whsec_')) {
    errors.push('STRIPE_WEBHOOK_SECRET has invalid format. Should start with whsec_');
  }

  // 3. Vérifier NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  const stripePubKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!stripePubKey) {
    errors.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined!');
  } else if (stripePubKey.startsWith('pk_test_')) {
    if (process.env.NODE_ENV === 'production') {
      errors.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY uses TEST mode in production! Use a live key (pk_live_...)');
    }
  }

  // 4. Vérifier DATABASE_URL
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    errors.push('DATABASE_URL is not defined!');
  } else {
    // Vérifier si SSL est activé en production
    if (!dbUrl.includes('sslmode=require') && !dbUrl.includes('ssl=true')) {
      if (process.env.NODE_ENV === 'production') {
        warnings.push('DATABASE_URL does not enforce SSL in production. Consider adding sslmode=require');
      }
    }
  }

  // 5. Vérifier les Price IDs
  if (!process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID) {
    warnings.push('NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID not configured. Monthly plan will be unavailable.');
  }
  if (!process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID) {
    warnings.push('NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID not configured. Yearly plan will be unavailable.');
  }

  // 6. En production, vérifier HTTPS
  if (process.env.NODE_ENV === 'production') {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (appUrl && !appUrl.startsWith('https://')) {
      errors.push('NEXT_PUBLIC_APP_URL does not use HTTPS in production!');
    }
  }

  // Afficher les résultats
  console.log('\n🔐 StackBill Vendor - Security Configuration Check\n');
  
  if (errors.length > 0) {
    console.error('❌ CRITICAL SECURITY ERRORS:\n');
    errors.forEach((err) => console.error(`   • ${err}`));
    console.error('\n⚠️  Fix these errors before running in production!\n');
    
    if (process.env.NODE_ENV === 'production') {
      console.error('🚨 BLOCKING STARTUP IN PRODUCTION MODE\n');
      process.exit(1);
    }
  }

  if (warnings.length > 0) {
    console.warn('⚠️  SECURITY WARNINGS:\n');
    warnings.forEach((warn) => console.warn(`   • ${warn}`));
    console.warn('');
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All security checks passed!\n');
  }
}

// Exécuter au chargement du module
checkSecurityConfig();

export {};
