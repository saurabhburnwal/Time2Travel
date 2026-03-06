/**
 * emailService.js — Nodemailer-based email helper for Time2Travel.
 *
 * In development (no SMTP credentials supplied), Ethereal auto-creates a
 * test account on-the-fly and prints the preview URL to the console so you
 * can view the sent email without a real inbox.
 */

const nodemailer = require('nodemailer');

let _transporter = null;

/**
 * Lazily create (and cache) the transport.
 * If SMTP_USER is empty, falls back to an auto-generated Ethereal account.
 */
async function getTransporter() {
    if (_transporter) return _transporter;

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        // Real SMTP credentials provided
        _transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.ethereal.email',
            port: parseInt(process.env.SMTP_PORT || '587', 10),
            secure: false,          // STARTTLS
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    } else {
        // No credentials → auto-generate an Ethereal test account
        console.log('[emailService] No SMTP credentials found — creating Ethereal test account...');
        const testAccount = await nodemailer.createTestAccount();
        console.log(`[emailService] Ethereal test account: ${testAccount.user}`);
        console.log(`[emailService] View sent emails at: https://ethereal.email/messages`);

        _transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        // Save credentials to .env so the same account persists between restarts
        // (best-effort, non-blocking)
        try {
            const fs = require('fs');
            const path = require('path');
            const envPath = path.join(__dirname, '..', '.env');
            let envContent = fs.readFileSync(envPath, 'utf8');
            envContent = envContent
                .replace(/^SMTP_USER=.*$/m, `SMTP_USER=${testAccount.user}`)
                .replace(/^SMTP_PASS=.*$/m, `SMTP_PASS=${testAccount.pass}`);
            fs.writeFileSync(envPath, envContent);
            console.log('[emailService] Ethereal credentials saved to .env');
        } catch (_) {
            // Not critical
        }
    }

    return _transporter;
}

/**
 * Send a verification email to the newly registered user.
 *
 * @param {string} toEmail   Recipient email address
 * @param {string} name      User's display name
 * @param {string} token     The verification token
 */
async function sendVerificationEmail(toEmail, name, token) {
    const transport = await getTransporter();
    const baseUrl = process.env.APP_BASE_URL || 'http://localhost:5173';
    const verifyUrl = `${baseUrl}/email-verified?token=${encodeURIComponent(token)}`;

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your Time2Travel email</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:16px;overflow:hidden;
                      box-shadow:0 4px 24px rgba(0,0,0,.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#3b82f6,#0ea5e9);
                       padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:26px;font-weight:800;
                         letter-spacing:-0.5px;">
                ✈️ Time2Travel
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,.85);font-size:14px;">
                Your journey starts here
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 12px;color:#1e293b;font-size:22px;">
                Verify your email address
              </h2>
              <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">
                Hi <strong>${name}</strong>,<br/>
                Thanks for registering! Click the button below to verify your
                email address and activate your account.
              </p>

              <div style="text-align:center;margin:32px 0;">
                <a href="${verifyUrl}"
                   style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#0ea5e9);
                          color:#fff;font-weight:700;font-size:16px;
                          text-decoration:none;padding:14px 36px;
                          border-radius:10px;letter-spacing:0.3px;">
                  Verify Email Address
                </a>
              </div>

              <p style="margin:0 0 8px;color:#475569;font-size:13px;line-height:1.6;">
                This link expires in <strong>24 hours</strong>. If you didn't
                create an account, you can safely ignore this email.
              </p>
              <p style="margin:0;color:#94a3b8;font-size:12px;word-break:break-all;">
                If the button doesn't work, copy and paste this URL:<br/>
                <a href="${verifyUrl}" style="color:#3b82f6;">${verifyUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 40px;
                       border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                © 2026 Time2Travel · SPD Project · MCA TRIMESTER III
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const info = await transport.sendMail({
        from: process.env.EMAIL_FROM || '"Time2Travel" <no-reply@time2travel.app>',
        to: toEmail,
        subject: '✅ Verify your Time2Travel email address',
        html: htmlBody,
        text: `Hi ${name},\n\nPlease verify your email by visiting:\n${verifyUrl}\n\nThis link expires in 24 hours.\n\nIf you didn't register, ignore this email.`,
    });

    // In dev with Ethereal, log the preview URL
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
        console.log(`[emailService] 📨 Email preview: ${previewUrl}`);
        console.log(`[emailService] 🔗 Direct Verification Link: ${verifyUrl}`);
    }

    return info;
}

module.exports = { sendVerificationEmail };
