import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, a reset link will be sent.',
      });
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour

    // Invalidate existing tokens
    await prisma.passwordReset.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    });

    // Create new reset token
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expires,
      },
    });

    // Send email
    const emailSent = await sendPasswordResetEmail(email, token);

    if (!emailSent) {
      return NextResponse.json({
        success: false,
        message: 'Failed to send email. Please contact support or check SMTP settings.',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, a reset link will be sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
