// /lib/emails/sendVerificationEmail.ts - UPDATED
import { transporter } from '@/lib/nodemailer';

export async function sendVerificationEmail(email: string, verificationUrl: string) {
  try {
    console.log(`📧 Sending verification email to: ${email}`);

    const mailOptions = {
      from: `"Maloof Health Systems" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Verify Your Email - Maloof Health Systems',
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: auto; background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%);">
          <div style="background: linear-gradient(135deg, #2563eb, #06b6d4); color: white; padding: 30px; border-radius: 16px 16px 0 0;">
            <div style="text-align: center;">
              <span style="font-size: 48px; display: block; margin-bottom: 10px;">🏥</span>
              <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Maloof Health Systems</h1>
              <p style="margin: 5px 0 0; opacity: 0.9;">Your trusted healthcare partner</p>
            </div>
          </div>
          
          <div style="padding: 35px; background: #ffffff; border-radius: 0 0 16px 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; font-size: 22px; margin-top: 0; text-align: center;">
              Verify Your Email Address
            </h2>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; text-align: center;">
              Thank you for choosing Maloof Health as your healthcare partner. 
              Please verify your email address to activate your patient portal.
            </p>
            
            <div style="background: #f0f9ff; border-radius: 12px; padding: 25px; margin: 30px 0; border: 1px solid #bae6fd; text-align: center;">
              <p style="color: #0369a1; font-size: 16px; font-weight: 600; margin: 0 0 15px;">
                Secure Verification Required
              </p>
              
              <a href="${verificationUrl}" 
                 style="background: linear-gradient(135deg, #2563eb, #06b6d4); 
                        color: white; 
                        padding: 14px 32px; 
                        text-decoration: none; 
                        border-radius: 50px; 
                        display: inline-block;
                        font-weight: 600;
                        font-size: 16px;
                        box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);">
                Verify Email Address
              </a>
            </div>
            
            <div style="background: #f8fafc; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                <strong style="color: #334155;">🔒 Security Notice:</strong> This link will expire in 1 hour. 
                If you didn't create an account, please ignore this email.
              </p>
            </div>
            
            <p style="color: #94a3b8; font-size: 13px; text-align: center; margin-top: 25px;">
              Need help? Contact us at support@maloofhealth.com
            </p>
            
            <div style="border-top: 1px solid #e2e8f0; margin-top: 25px; padding-top: 20px; text-align: center;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} Maloof Health Systems. All rights reserved.<br/>
                <span style="font-size: 11px;">700 West Elm Street, Dallas, TX 75201</span>
              </p>
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}:`, info.messageId);

  } catch (error) {
    console.error('❌ Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
}