import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET - List all products
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  const where: any = {};
  if (category) where.category = category;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { store: true },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({ products, total, page, totalPages: Math.ceil(total / limit) });
}

// POST - Create a product
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();

  if (!data.name || !data.category || !data.price) {
    return NextResponse.json({ error: 'Name, category, and price are required' }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      name: data.name,
      nameAr: data.nameAr || null,
      category: data.category,
      price: parseFloat(data.price),
      currency: data.currency || 'USD',
      image: data.image || null,
      description: data.description || null,
      descriptionAr: data.descriptionAr || null,
      storeId: data.storeId || null,
      affiliateUrl: data.affiliateUrl || null,
      isActive: data.isActive !== false,
    },
  });

  return NextResponse.json({ success: true, product });
}

// PUT - Update a product
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();

  if (!data.id) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  const product = await prisma.product.update({
    where: { id: data.id },
    data: {
      name: data.name,
      nameAr: data.nameAr,
      category: data.category,
      price: data.price ? parseFloat(data.price) : undefined,
      currency: data.currency,
      image: data.image,
      description: data.description,
      descriptionAr: data.descriptionAr,
      storeId: data.storeId,
      affiliateUrl: data.affiliateUrl,
      isActive: data.isActive,
    },
  });

  return NextResponse.json({ success: true, product });
}

// DELETE - Delete a product
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  await prisma.product.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
