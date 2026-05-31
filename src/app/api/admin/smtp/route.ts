import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { testSmtpConnection } from '@/lib/email';

// GET - Retrieve SMTP settings
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const settings = await prisma.appSettings.findUnique({
    where: { id: 'settings' },
  });

  return NextResponse.json({
    smtpHost: settings?.smtpHost || '',
    smtpPort: settings?.smtpPort || 587,
    smtpUser: settings?.smtpUser || '',
    smtpPassword: settings?.smtpPassword ? '********' : '',
    smtpFromEmail: settings?.smtpFromEmail || '',
    smtpFromName: settings?.smtpFromName || '',
    smtpSecure: settings?.smtpSecure || false,
  });
}

// POST - Update SMTP settings
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { smtpHost, smtpPort, smtpUser, smtpPassword, smtpFromEmail, smtpFromName, smtpSecure } = await request.json();

  // Build update data, only update password if it's not masked
  const updateData: any = {
    smtpHost,
    smtpPort: parseInt(smtpPort) || 587,
    smtpFromEmail,
    smtpFromName,
    smtpSecure: !!smtpSecure,
    smtpUser,
  };

  if (smtpPassword && smtpPassword !== '********') {
    updateData.smtpPassword = smtpPassword;
  }

  await prisma.appSettings.upsert({
    where: { id: 'settings' },
    update: updateData,
    create: { id: 'settings', ...updateData },
  });

  return NextResponse.json({ success: true, message: 'SMTP settings saved successfully' });
}

// PUT - Test SMTP connection
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { smtpHost, smtpPort, smtpUser, smtpPassword, smtpFromEmail, smtpFromName, smtpSecure } = await request.json();

  // If password is masked, get it from DB
  let actualPassword = smtpPassword;
  if (smtpPassword === '********') {
    const settings = await prisma.appSettings.findUnique({ where: { id: 'settings' } });
    actualPassword = settings?.smtpPassword || '';
  }

  const result = await testSmtpConnection({
    host: smtpHost,
    port: parseInt(smtpPort) || 587,
    secure: !!smtpSecure,
    user: smtpUser,
    password: actualPassword,
    fromEmail: smtpFromEmail,
    fromName: smtpFromName,
  });

  return NextResponse.json(result);
}
