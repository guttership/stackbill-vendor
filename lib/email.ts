interface SendLicenseEmailParams {
  email: string
  licenseKey: string
  plan: string
  expiresAt: string | null
  language?: 'fr' | 'en'
}

interface SendPortalMagicLinkEmailParams {
  email: string
  loginUrl: string
}

const emailTemplates = {
  fr: {
    subject: (key: string) => `Votre licence StackBill : ${key}`,
    title: 'Licence StackBill activée',
    subtitle: 'Votre abonnement est prêt à être utilisé',
    greeting: 'Bonjour,',
    intro: 'Merci d\'avoir choisi StackBill. Votre licence a été activée avec succès.',
    licenseLabel: 'Votre clé de licence',
    licenseHint: 'Conservez cette clé précieusement. Vous en aurez besoin pour installer StackBill.',
    planLabel: 'Plan',
    planMonthly: 'Mensuel (10 €/mois)',
    planYearly: 'Annuel (100 €/an)',
    instancesLabel: 'Instances incluses',
    instancesValue: '2 instances auto-hébergées',
    validUntilLabel: 'Valide jusqu\'au',
    stepsTitle: 'Premiers pas',
    step1: 'Visitez <strong>github.com/guttership/stackbill</strong> pour télécharger StackBill',
    step2: 'Suivez le guide d\'installation pour votre plateforme',
    step3: 'Lors de la configuration, vous devrez entrer votre clé de licence',
    step4: 'C\'est tout ! Votre instance est prête à être utilisée',
    noteTitle: 'Important',
    noteText: 'Chaque instance auto-hébergée doit envoyer sa clé de licence à notre serveur de vérification au démarrage. Cela garantit que vos instances restent dans les limites de votre plan (2 instances actives maximum).',
    helpText: 'Pour toute question ou besoin d\'assistance, consultez notre documentation sur <strong>docs.stackbill.tech</strong> ou contactez le support.',
    closing: 'Cordialement,<br>L\'équipe StackBill',
    footerText: 'StackBill Vendor © 2026. Tous droits réservés.',
  },
  en: {
    subject: (key: string) => `Your StackBill License: ${key}`,
    title: 'StackBill License Activated',
    subtitle: 'Your subscription is ready to use',
    greeting: 'Hello,',
    intro: 'Thank you for choosing StackBill. Your license has been successfully activated.',
    licenseLabel: 'Your License Key',
    licenseHint: 'Keep this key safe. You\'ll need it to install StackBill.',
    planLabel: 'Plan',
    planMonthly: 'Monthly ($11/month)',
    planYearly: 'Annual ($110/year)',
    instancesLabel: 'Instances Included',
    instancesValue: '2 self-hosted instances',
    validUntilLabel: 'Valid Until',
    stepsTitle: 'Getting Started',
    step1: 'Visit <strong>github.com/guttership/stackbill</strong> to download StackBill',
    step2: 'Follow the installation guide for your platform',
    step3: 'During setup, you\'ll be asked to enter your license key',
    step4: 'That\'s it! Your instance is ready to use',
    noteTitle: 'Important',
    noteText: 'Each self-hosted instance must send its license key to our verification server during startup. This ensures your instances stay within your plan limits (maximum 2 active instances).',
    helpText: 'If you have any questions or need assistance, please visit our documentation at <strong>docs.stackbill.tech</strong> or contact support.',
    closing: 'Best regards,<br>The StackBill Team',
    footerText: 'StackBill Vendor © 2026. All rights reserved.',
  },
}

export async function sendLicenseEmail(params: SendLicenseEmailParams) {
  const language = params.language || 'en'
  const t = emailTemplates[language]
  const expiryDate = params.expiresAt ? new Date(params.expiresAt).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US') : (language === 'fr' ? 'Non défini' : 'Undefined')

  const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        font-family: 'Fira Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
        line-height: 1.6; 
        color: #555353; 
        background-color: #f6f4f4;
      }
      .wrapper { background-color: #f6f4f4; padding: 40px 20px; }
      .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
      .header { 
        background: linear-gradient(135deg, #a0bf36 0%, #8fa82a 100%);
        color: #ffffff; 
        padding: 48px 30px; 
        text-align: center; 
      }
      .header h1 { 
        font-size: 32px; 
        font-weight: 700; 
        margin-bottom: 8px;
        letter-spacing: 0.01em;
      }
      .header p { font-size: 16px; opacity: 0.95; font-weight: 300; }
      .content { padding: 40px 30px; }
      .content p { margin-bottom: 20px; font-size: 15px; }
      .license-section { 
        background-color: #f6f4f4; 
        border: 2px solid #a0bf36;
        border-radius: 8px; 
        padding: 28px; 
        margin: 32px 0; 
        text-align: center; 
      }
      .license-label { 
        font-size: 12px; 
        color: #3f3a3a; 
        text-transform: uppercase; 
        letter-spacing: 1px; 
        margin-bottom: 12px;
        font-weight: 600;
      }
      .license-key { 
        font-size: 24px; 
        font-weight: 700; 
        font-family: 'Courier New', monospace; 
        color: #ff6a00;
        letter-spacing: 3px; 
        word-break: break-all;
        margin: 12px 0;
      }
      .license-hint { font-size: 13px; color: #555353; margin-top: 14px; font-style: italic; }
      .info-table { width: 100%; margin: 32px 0; border-collapse: collapse; }
      .info-table tr { border-bottom: 1px solid #e8e8e8; }
      .info-table td { padding: 14px 0; font-size: 14px; }
      .info-table td:first-child { font-weight: 600; color: #3f3a3a; width: 40%; }
      .info-table td:last-child { color: #555353; }
      .steps { margin: 32px 0; }
      .steps h3 { font-size: 17px; font-weight: 600; color: #3f3a3a; margin-bottom: 16px; }
      .steps ol { margin-left: 20px; }
      .steps li { margin-bottom: 12px; font-size: 14px; color: #555353; line-height: 1.7; }
      .note { 
        background-color: #fffbf0; 
        border-left: 4px solid #ff6a00; 
        padding: 16px; 
        margin: 32px 0; 
        border-radius: 4px; 
        font-size: 14px; 
        color: #3f3a3a;
      }
      .note strong { color: #ff6a00; font-weight: 600; }
      .footer { 
        background-color: #f6f4f4; 
        padding: 24px; 
        text-align: center; 
        border-top: 1px solid #e8e8e8; 
        font-size: 12px; 
        color: #555353; 
      }
      strong { color: #3f3a3a; font-weight: 600; }
      a { color: #a0bf36; text-decoration: none; }
      a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        <div class="header">
          <h1>${t.title}</h1>
          <p>${t.subtitle}</p>
        </div>

        <div class="content">
          <p>${t.greeting}</p>
          <p>${t.intro}</p>

          <div class="license-section">
            <div class="license-label">${t.licenseLabel}</div>
            <div class="license-key">${params.licenseKey}</div>
            <div class="license-hint">${t.licenseHint}</div>
          </div>

          <table class="info-table">
            <tr>
              <td>${t.planLabel}</td>
              <td>${params.plan === 'monthly' ? t.planMonthly : t.planYearly}</td>
            </tr>
            <tr>
              <td>${t.instancesLabel}</td>
              <td>${t.instancesValue}</td>
            </tr>
            <tr>
              <td>${t.validUntilLabel}</td>
              <td>${expiryDate}</td>
            </tr>
          </table>

          <div class="steps">
            <h3>${t.stepsTitle}</h3>
            <ol>
              <li>${t.step1}</li>
              <li>${t.step2}</li>
              <li>${t.step3}</li>
              <li>${t.step4}</li>
            </ol>
          </div>

          <div class="note">
            <strong>${t.noteTitle}:</strong> ${t.noteText}
          </div>

          <p>${t.helpText}</p>

          <p style="margin-top: 32px; margin-bottom: 0;">${t.closing}</p>
        </div>

        <div class="footer">
          <p>${t.footerText}</p>
        </div>
      </div>
    </div>
  </body>
</html>
  `

  const apiKey = process.env.SENDGRID_API_KEY

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey || '',
      },
      body: JSON.stringify({
        sender: {
          name: 'StackBill',
          email: 'noreply@stackbill.tech',
        },
        to: [
          {
            email: params.email,
          },
        ],
        subject: t.subject(params.licenseKey),
        htmlContent: htmlContent,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Brevo API error: ${JSON.stringify(error)}`)
    }

    console.log(`[EMAIL] License sent to ${params.email}`)
  } catch (error) {
    console.error(`[EMAIL] Failed to send to ${params.email}:`, error)
    throw error
  }
}

export async function sendPortalMagicLinkEmail(params: SendPortalMagicLinkEmailParams) {
  const apiKey = process.env.SENDGRID_API_KEY

  const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: 'Fira Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #2e2a2a; background: #f6f4f4; margin: 0; }
      .wrap { max-width: 560px; margin: 32px auto; background: #fff; border-radius: 8px; padding: 28px; border: 1px solid #ececec; }
      h1 { margin: 0 0 12px 0; font-size: 24px; }
      p { line-height: 1.6; font-size: 14px; }
      .button { display: inline-block; margin: 16px 0; background: #a0bf36; color: #fff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-weight: 600; }
      .muted { font-size: 12px; color: #6b6666; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <h1>Portal access link</h1>
      <p>You requested access to your StackBill downloads portal.</p>
      <p>This link is valid for 15 minutes and can be used once.</p>
      <p><a class="button" href="${params.loginUrl}">Open portal</a></p>
      <p class="muted">If you did not request this email, you can ignore it.</p>
    </div>
  </body>
</html>
  `

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': apiKey || '',
    },
    body: JSON.stringify({
      sender: {
        name: 'StackBill',
        email: 'noreply@stackbill.tech',
      },
      to: [
        {
          email: params.email,
        },
      ],
      subject: 'Your StackBill portal access link',
      htmlContent,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Brevo API error: ${error}`)
  }
}
