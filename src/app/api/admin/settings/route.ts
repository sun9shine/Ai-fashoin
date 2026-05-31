import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET - Get app settings
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const settings = await prisma.appSettings.findUnique({ where: { id: 'settings' } });

  // Also get stats
  const [userCount, orderCount, productCount, storeCount] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.product.count(),
    prisma.store.count(),
  ]);

  return NextResponse.json({
    settings,
    stats: { userCount, orderCount, productCount, storeCount },
  });
}

// POST - Update app settings
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();

  const settings = await prisma.appSettings.upsert({
    where: { id: 'settings' },
    update: {
      clothesEnabled: data.clothesEnabled,
      makeupEnabled: data.makeupEnabled,
      hairEnabled: data.hairEnabled,
      shoesEnabled: data.shoesEnabled,
      adsEnabled: data.adsEnabled,
      adRemovalPrice: data.adRemovalPrice ? parseFloat(data.adRemovalPrice) : undefined,
      freeTrialsPerDay: data.freeTrialsPerDay ? parseInt(data.freeTrialsPerDay) : undefined,
    },
    create: {
      id: 'settings',
      clothesEnabled: data.clothesEnabled ?? true,
      makeupEnabled: data.makeupEnabled ?? true,
      hairEnabled: data.hairEnabled ?? true,
      shoesEnabled: data.shoesEnabled ?? true,
      adsEnabled: data.adsEnabled ?? true,
      adRemovalPrice: data.adRemovalPrice || 4.99,
      freeTrialsPerDay: data.freeTrialsPerDay || 5,
    },
  });

  return NextResponse.json({ success: true, settings });
}
