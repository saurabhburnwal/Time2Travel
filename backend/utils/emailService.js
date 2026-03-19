const nodemailer = require('nodemailer');

/**
 * Email transporter — uses Gmail SMTP with app password.
 * Config is loaded from environment variables with sensible defaults.
 */
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM_EMAIL = process.env.SMTP_FROM_EMAIL || process.env.EMAIL_FROM || SMTP_USER;
const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME || 'Time2Travel';
const SMTP_FAMILY = parseInt(process.env.SMTP_FAMILY || (process.env.NODE_ENV === 'production' ? '4' : '0'), 10);

if (process.env.NODE_ENV === 'production' && (!SMTP_USER || !SMTP_PASS)) {
  throw new Error('[emailService] Missing SMTP_USER or SMTP_PASS in production environment.');
}

if (!SMTP_USER || !SMTP_PASS) {
  console.warn('[emailService] SMTP_USER/SMTP_PASS not fully configured. Email sending will fail until configured.');
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  family: SMTP_FAMILY,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const FROM_EMAIL = SMTP_FROM_EMAIL;
const FROM_NAME = SMTP_FROM_NAME;

/**
 * Verify SMTP connection on startup (non-blocking, skip in tests).
 */
if (process.env.NODE_ENV !== 'test') {
    transporter.verify()
        .then(() => console.log('✅ SMTP email service connected'))
        .catch((err) => console.error('❌ SMTP connection error:', err.message));
}

// ======================== EMAIL TEMPLATES ========================

/**
 * Send a welcome email to a newly registered user.
 */
async function sendWelcomeEmail(name, email) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f7fa; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #18465a, #1a6b8a); padding: 40px 30px; text-align: center; }
            .header h1 { color: #ffffff; font-size: 28px; margin: 0 0 8px 0; }
            .header p { color: rgba(255,255,255,0.85); font-size: 14px; margin: 0; }
            .body { padding: 36px 30px; }
            .body h2 { color: #18465a; font-size: 22px; margin: 0 0 16px 0; }
            .body p { color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 16px 0; }
            .cta { display: inline-block; background: linear-gradient(135deg, #18465a, #1a6b8a); color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-size: 15px; font-weight: 600; margin: 16px 0; }
            .features { background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; }
            .features ul { list-style: none; padding: 0; margin: 0; }
            .features li { padding: 8px 0; color: #444; font-size: 14px; }
            .features li::before { content: "✅ "; }
            .footer { background: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #eee; }
            .footer p { color: #999; font-size: 12px; margin: 4px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🌍 Time2Travel</h1>
                <p>Smart Travel Planning Within Your Budget</p>
            </div>
            <div class="body">
                <h2>Welcome aboard, ${name}! 🎉</h2>
                <p>Thank you for joining Time2Travel — your go-to platform for budget-smart travel planning across South India.</p>
                <p>Your account has been created successfully. Here's what you can do next:</p>
                <div class="features">
                    <ul>
                        <li>Plan trips to 130+ destinations across 7 states</li>
                        <li>Get AI-optimized routes based on your stay location</li>
                        <li>Track expenses within your budget (₹2K–₹10K per person)</li>
                        <li>Download complete trip itineraries as PDF</li>
                        <li>Access safety contacts and solo traveler tips</li>
                    </ul>
                </div>
                <p style="text-align: center;">
                    <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/plan" class="cta">🗺️ Plan Your First Trip</a>
                </p>
                <p style="color: #888; font-size: 13px;">If you didn't create this account, you can safely ignore this email.</p>
            </div>
            <div class="footer">
                <p>Time2Travel — Budget Constrained Intelligent Travel Roadmap System</p>
                <p>Contact us: <a href="mailto:ttimettottravel@gmail.com" style="color: #18465a;">ttimettottravel@gmail.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `;

  try {
    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: email,
      subject: `Welcome to Time2Travel, ${name}! 🌍`,
      html,
    });
    console.log(`📧 Welcome email sent to ${email}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to send welcome email to ${email}:`, err.message);
    return false;
  }
}

/**
 * Send a trip confirmation email with the generated PDF attached.
 *
 * @param {string} name          - User's name
 * @param {string} email         - User's email address
 * @param {object} tripData      - Trip details (destination, days, budget, etc.)
 * @param {Buffer|string} pdfBuffer - PDF as a Buffer or base64 string
 */
async function sendTripConfirmationEmail(name, email, tripData, pdfBuffer) {
  // Convert base64 to Buffer if needed
  const attachment = Buffer.isBuffer(pdfBuffer)
    ? pdfBuffer
    : Buffer.from(pdfBuffer, 'base64');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f7fa; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #18465a, #1a6b8a); padding: 40px 30px; text-align: center; }
            .header h1 { color: #ffffff; font-size: 28px; margin: 0 0 8px 0; }
            .header p { color: rgba(255,255,255,0.85); font-size: 14px; margin: 0; }
            .body { padding: 36px 30px; }
            .body h2 { color: #18465a; font-size: 22px; margin: 0 0 16px 0; }
            .body p { color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 16px 0; }
            .trip-card { background: linear-gradient(135deg, #f0f9ff, #e8f4fd); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #d1e9f6; }
            .trip-card .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(24,70,90,0.1); }
            .trip-card .row:last-child { border-bottom: none; }
            .trip-card .label { color: #888; font-size: 13px; }
            .trip-card .value { color: #18465a; font-size: 14px; font-weight: 600; }
            .cta { display: inline-block; background: linear-gradient(135deg, #18465a, #1a6b8a); color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-size: 15px; font-weight: 600; margin: 16px 0; }
            .footer { background: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #eee; }
            .footer p { color: #999; font-size: 12px; margin: 4px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🌍 Time2Travel</h1>
                <p>Your Trip is Confirmed!</p>
            </div>
            <div class="body">
                <h2>Happy travels, ${name}! ✈️</h2>
                <p>Thank you for planning your trip with Time2Travel. Your complete itinerary is attached to this email as a PDF.</p>

                <div class="trip-card">
                    <div class="row">
                        <span class="label">📍 Destination</span>
                        <span class="value">${tripData.destination || 'N/A'}${tripData.state ? ', ' + tripData.state : ''}</span>
                    </div>
                    <div class="row">
                        <span class="label">📅 Duration</span>
                        <span class="value">${tripData.days || 'N/A'} days</span>
                    </div>
                    <div class="row">
                        <span class="label">💰 Budget</span>
                        <span class="value">₹${tripData.budget ? Number(tripData.budget).toLocaleString('en-IN') : 'N/A'}</span>
                    </div>
                    <div class="row">
                        <span class="label">🏨 Stay</span>
                        <span class="value">${tripData.selectedStay || 'N/A'}</span>
                    </div>
                    <div class="row">
                        <span class="label">🗺️ Route</span>
                        <span class="value">${tripData.roadmapType || 'Standard'}</span>
                    </div>
                </div>

                <p>📎 <strong>Your trip itinerary PDF is attached below.</strong> Save it to your phone for offline access during your trip!</p>

                <p style="text-align: center;">
                    <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/plan" class="cta">🗺️ Plan Another Trip</a>
                </p>

                <p style="color: #888; font-size: 13px;">
                    <strong>Safety Tip:</strong> Share your itinerary with family and friends. Keep emergency contacts handy. Travel smart! 🛡️
                </p>
            </div>
            <div class="footer">
                <p>Time2Travel — Budget Constrained Intelligent Travel Roadmap System</p>
                <p>Contact us: <a href="mailto:ttimettottravel@gmail.com" style="color: #18465a;">ttimettottravel@gmail.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `;

  try {
    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: email,
      subject: `Your Trip to ${tripData.destination || 'an amazing place'} is ready! 🗺️`,
      html,
      attachments: [
        {
          filename: `Time2Travel_${(tripData.destination || 'Trip').replace(/\s+/g, '_')}_Itinerary.pdf`,
          content: attachment,
          contentType: 'application/pdf',
        },
      ],
    });
    console.log(`📧 Trip confirmation email sent to ${email}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to send trip email to ${email}:`, err.message);
    return false;
  }
}

/**
 * Send a verification email to the newly registered user.
 *
 * @param {string} toEmail   Recipient email address
 * @param {string} name      User's display name
 * @param {string} token     The verification token
 */
async function sendVerificationEmail(toEmail, name, token) {
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
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

  try {
    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: toEmail,
      subject: '✅ Verify your Time2Travel email address',
      html: htmlBody,
      text: `Hi ${name},\n\nPlease verify your email by visiting:\n${verifyUrl}\n\nThis link expires in 24 hours.\n\nIf you didn't register, ignore this email.`,
    });
    console.log(`[emailService] 📧 Verification email sent to ${toEmail}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to send verification email to ${toEmail}:`, err.message);
    throw err;
  }
}

/**
 * Send an email to a host when their registration is approved.
 */
async function sendHostApprovalEmail(name, email) {
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const profileUrl = `${baseUrl}/profile`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f7fa; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #059669, #10b981); padding: 40px 30px; text-align: center; }
            .header h1 { color: #ffffff; font-size: 28px; margin: 0 0 8px 0; }
            .header p { color: rgba(255,255,255,0.85); font-size: 14px; margin: 0; }
            .body { padding: 36px 30px; }
            .body h2 { color: #059669; font-size: 22px; margin: 0 0 16px 0; }
            .body p { color: #555; font-size: 15px; line-height: 1.7; margin: 0 0 16px 0; }
            .cta { display: inline-block; background: linear-gradient(135deg, #059669, #10b981); color: #fff !important; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-size: 15px; font-weight: 600; margin: 16px 0; }
            .footer { background: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #eee; }
            .footer p { color: #999; font-size: 12px; margin: 4px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🏠 Host Approved!</h1>
                <p>Welcome to the Time2Travel Host Community</p>
            </div>
            <div class="body">
                <h2>Congratulations, ${name}! 🎉</h2>
                <p>We are thrilled to inform you that your host registration has been <strong>successfully approved</strong> by our admin team.</p>
                <p>Your profile is now active, and you can start managing your properties, viewing your earnings, and welcoming travelers to your beautiful destination.</p>
                <p style="text-align: center;">
                    <a href="${profileUrl}" class="cta">🚀 Manage Your Host Profile</a>
                </p>
                <p>We're excited to have you with us. If you have any questions or need help setting up your property details, feel free to reach out to our host support team.</p>
                <p>Happy Hosting!</p>
            </div>
            <div class="footer">
                <p>Time2Travel — Budget Constrained Intelligent Travel Roadmap System</p>
                <p>Contact us: <a href="mailto:ttimettottravel@gmail.com" style="color: #059669;">ttimettottravel@gmail.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `;

  try {
    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: email,
      subject: `Registration Successful! Welcome to Time2Travel, ${name} 🏠`,
      html,
    });
    console.log(`📧 Host approval email sent to ${email}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to send host approval email to ${email}:`, err.message);
    return false;
  }
}

/**
 * Send an OTP for password reset.
 */
async function sendPasswordResetOTP(toEmail, name, otp) {
  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset your Time2Travel Password</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#f59e0b,#d97706);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:26px;font-weight:800;letter-spacing:-0.5px;">🔐 Password Reset</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 12px;color:#1e293b;font-size:22px;">Here is your verification code</h2>
              <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">
                Hi <strong>${name}</strong>,<br/>
                We received a request to reset the password for your Time2Travel account. 
                Enter the following 6-digit code to continue.
              </p>
              
              <div style="text-align:center;margin:32px 0;">
                <span style="display:inline-block;background:#f8fafc;color:#1e293b;font-weight:800;font-size:32px;padding:16px 40px;border-radius:12px;letter-spacing:6px;border:2px dashed #cbd5e1;">
                  ${otp}
                </span>
              </div>

              <p style="margin:0 0 8px;color:#ef4444;font-size:13px;font-weight:600;text-align:center;">
                This code will expire in 15 minutes.
              </p>
              <p style="margin:0;color:#94a3b8;font-size:12px;text-align:center;">
                If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">© 2026 Time2Travel · SPD Project · MCA TRIMESTER III</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  try {
    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: toEmail,
      subject: '🔐 Your Time2Travel Password Reset Code',
      html: htmlBody,
      text: `Hi ${name},\n\nYour password reset code is: ${otp}\n\nThis code expires in 15 minutes.\n\nIf you didn't request a reset, ignore this email.`,
    });
    console.log(`[emailService] 📧 Password reset OTP sent to ${toEmail}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to send reset OTP to ${toEmail}:`, err.message);
    throw err;
  }
}

module.exports = {
  sendWelcomeEmail,
  sendTripConfirmationEmail,
  sendVerificationEmail,
  sendHostApprovalEmail,
  sendPasswordResetOTP
};
