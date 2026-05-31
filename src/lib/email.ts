import nodemailer from 'nodemailer';
import prisma from './prisma';

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  fromEmail: string;
  fromName: string;
}

export async function getSmtpConfig(): Promise<SmtpConfig | null> {
  const settings = await prisma.appSettings.findUnique({
    where: { id: 'settings' },
  });

  if (!settings?.smtpHost || !settings?.smtpUser || !settings?.smtpPassword) {
    return null;
  }

  return {
    host: settings.smtpHost,
    port: settings.smtpPort,
    secure: settings.smtpSecure,
    user: settings.smtpUser,
    password: settings.smtpPassword,
    fromEmail: settings.smtpFromEmail || settings.smtpUser,
    fromName: settings.smtpFromName || 'AI Fashion',
  };
}

export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<boolean> {
  const config = await getSmtpConfig();

  if (!config) {
    console.error('SMTP not configured. Please configure SMTP settings in admin panel.');
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });

    await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to,
      subject,
      html,
    });

    return true;
  } catch (error: any) {
    console.error('Email send error:', error.message);
    return false;
  }
}

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string
): Promise<boolean> {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

  const html = `
    <!DOCTYPE html>
    <html dir="ltr">
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; background: linear-gradient(135deg, #7C3AED, #EC4899); border-radius: 12px; padding: 12px 20px;">
          <span style="color: white; font-weight: bold; font-size: 24px;">AI Fashion</span>
        </div>
      </div>
      
      <h2 style="color: #1F2937; text-align: center;">Password Reset Request</h2>
      
      <p style="color: #4B5563; line-height: 1.6;">
        You requested a password reset for your AI Fashion account. Click the button below to set a new password:
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #7C3AED, #EC4899); color: white; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: bold; font-size: 16px;">
          Reset Password
        </a>
      </div>
      
      <p style="color: #6B7280; font-size: 14px;">
        If you didn't request this, you can safely ignore this email. This link expires in 1 hour.
      </p>
      
      <p style="color: #6B7280; font-size: 14px;">
        Or copy this link: <a href="${resetUrl}" style="color: #7C3AED;">${resetUrl}</a>
      </p>
      
      <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;" />
      
      <p style="color: #9CA3AF; font-size: 12px; text-align: center;">
        &copy; AI Fashion. All rights reserved.
      </p>
    </body>
    </html>
  `;

  return sendEmail(email, 'Reset Your Password - AI Fashion', html);
}

export async function testSmtpConnection(config: SmtpConfig): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });

    await transporter.verify();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
