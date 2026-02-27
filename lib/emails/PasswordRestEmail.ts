// /lib/emails/PasswordResetEmail.ts
import nodemailer from "nodemailer";

// Use the shared transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/resetpassword?token=${token}`;

  const mailOptions = {
    from: `"Maloof Health Systems" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "🔐 Reset Your Password - Maloof Health Systems",
    html: `
      <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 30px; font-family: 'Inter', Arial, sans-serif;">
        <div style="max-width: 550px; margin: 0 auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
          
          <!-- Header with Healthcare Gradient -->
          <div style="background: linear-gradient(135deg, #2563eb, #06b6d4); padding: 30px; text-align: center;">
            <span style="font-size: 48px; display: block; margin-bottom: 10px;">🏥</span>
            <h1 style="margin: 0; font-size: 28px; color: #ffffff; font-weight: 600;">Maloof Health Systems</h1>
            <p style="margin: 5px 0 0; color: rgba(255,255,255,0.9);">Secure Patient Portal</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px; background: #ffffff;">
            <div style="text-align: center; margin-bottom: 30px;">
              <span style="font-size: 32px; display: block; margin-bottom: 15px;">🔐</span>
              <h2 style="color: #1e293b; font-size: 24px; margin: 0 0 10px; font-weight: 600;">
                Password Reset Request
              </h2>
              <p style="color: #475569; font-size: 16px; margin: 0;">
                We received a request to reset your password
              </p>
            </div>

            <!-- Patient Email -->
            <div style="background: #f8fafc; border-radius: 12px; padding: 15px; margin-bottom: 25px; text-align: center; border: 1px solid #e2e8f0;">
              <p style="color: #334155; font-size: 15px; margin: 0;">
                <strong>Account:</strong> ${email}
              </p>
            </div>

            <!-- Reset Button Section -->
            <div style="background: linear-gradient(135deg, #eff6ff, #ffffff); border-radius: 16px; padding: 30px; margin: 25px 0; border: 1px solid #bae6fd; text-align: center;">
              <p style="color: #0369a1; font-size: 16px; font-weight: 600; margin: 0 0 20px;">
                Click below to create a new password
              </p>
              
              <a href="${resetUrl}" 
                style="display: inline-block; 
                       padding: 16px 36px; 
                       background: linear-gradient(135deg, #2563eb, #06b6d4); 
                       color: #ffffff; 
                       text-decoration: none; 
                       border-radius: 50px; 
                       font-size: 16px; 
                       font-weight: 600;
                       box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
                       border: none;
                       transition: all 0.3s ease;">
                Reset Password
              </a>

              <!-- Backup Link -->
              <p style="font-size: 13px; color: #64748b; margin: 25px 0 0;">
                Or copy this link:<br/>
                <code style="background: #f1f5f9; padding: 8px 12px; border-radius: 6px; font-size: 12px; word-break: break-all; display: inline-block; margin-top: 8px; color: #2563eb;">
                  ${resetUrl}
                </code>
              </p>
            </div>

            <!-- Security Info Grid -->
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 25px 0;">
              <div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
                <span style="font-size: 20px; display: block;">⏰</span>
                <span style="color: #475569; font-size: 12px;">Expires in 1 hour</span>
              </div>
              <div style="background: #f8fafc; padding: 12px; border-radius: 8px; text-align: center;">
                <span style="font-size: 20px; display: block;">🔒</span>
                <span style="color: #475569; font-size: 12px;">256-bit Encrypted</span>
              </div>
            </div>

            <!-- Important Notice -->
            <div style="background: #fff7ed; border-radius: 8px; padding: 15px; margin: 25px 0; border: 1px solid #fed7aa;">
              <p style="color: #9a3412; font-size: 13px; margin: 0; text-align: center;">
                ⚠️ If you didn't request this password reset, please ignore this email 
                or contact our support team immediately.
              </p>
            </div>

            <!-- Divider -->
            <div style="border-top: 1px solid #e2e8f0; margin: 25px 0 15px;"></div>

            <!-- Footer -->
            <div style="text-align: center;">
              <p style="color: #1e293b; font-size: 14px; font-weight: 600; margin: 0 0 5px;">
                Maloof Health Systems
              </p>
              <p style="color: #64748b; font-size: 12px; margin: 0 0 5px;">
                700 West Elm Street, Dallas, TX 75201
              </p>
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                📞 (214) 555-0423 | 📧 support@maloofhealth.com
              </p>
              <p style="color: #94a3b8; font-size: 11px; margin-top: 15px;">
                © ${new Date().getFullYear()} Maloof Health Systems. All rights reserved.<br/>
                <span style="font-size: 10px;">This is an automated message, please do not reply.</span>
              </p>
            </div>

            <!-- HIPAA Badge -->
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px dashed #cbd5e1; text-align: center;">
              <span style="background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: 600;">
                HIPAA Compliant • Secure Communication
              </span>
            </div>
          </div>
        </div>
      </div>
    `,
  };

  try {
    console.log(`📧 Attempting to send password reset email to: ${email}`);

    // Verify transporter connection first
    await transporter.verify();

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}:`, info.messageId);

    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error("❌ Failed to send password reset email to", email, ":", error);

    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        throw new Error("Email service configuration error. Please check your email credentials.");
      } else if (error.message.includes('ECONNREFUSED')) {
        throw new Error("Email service unavailable. Please try again later.");
      } else if (error.message.includes('ENOTFOUND')) {
        throw new Error("Network error. Please check your internet connection.");
      }
    }

    throw new Error("Failed to send password reset email. Please try again.");
  }
}