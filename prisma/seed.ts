import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@aifashion.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword, role: 'admin' },
    create: {
      email: adminEmail,
      name: 'Admin',
      password: hashedPassword,
      role: 'admin',
      plan: 'business',
    },
  });

  console.log(`✅ Admin user created: ${admin.email}`);

  // Create app settings with SMTP placeholders
  await prisma.appSettings.upsert({
    where: { id: 'settings' },
    update: {},
    create: {
      id: 'settings',
      clothesEnabled: true,
      makeupEnabled: true,
      hairEnabled: true,
      shoesEnabled: true,
      adsEnabled: true,
      adRemovalPrice: 4.99,
      freeTrialsPerDay: 5,
      smtpHost: process.env.SMTP_HOST || null,
      smtpPort: parseInt(process.env.SMTP_PORT || '587'),
      smtpUser: process.env.SMTP_USER || null,
      smtpPassword: process.env.SMTP_PASSWORD || null,
      smtpFromEmail: process.env.SMTP_FROM_EMAIL || null,
      smtpFromName: process.env.SMTP_FROM_NAME || 'AI Fashion',
      smtpSecure: false,
    },
  });

  console.log('✅ App settings created');

  // Create sample stores
  const store1 = await prisma.store.upsert({
    where: { id: 'store-fashion' },
    update: {},
    create: {
      id: 'store-fashion',
      name: 'Fashion Store',
      url: 'https://fashionstore.example.com',
      isActive: true,
    },
  });

  const store2 = await prisma.store.upsert({
    where: { id: 'store-beauty' },
    update: {},
    create: {
      id: 'store-beauty',
      name: 'Beauty Palace',
      url: 'https://beautypalace.example.com',
      isActive: true,
    },
  });

  console.log('✅ Sample stores created');

  // Create sample products
  const products = [
    { name: 'Elegant Red Dress', nameAr: 'فستان أحمر أنيق', category: 'clothes', price: 49.99, storeId: store1.id },
    { name: 'Casual Blue Shirt', nameAr: 'قميص أزرق كاجوال', category: 'clothes', price: 29.99, storeId: store1.id },
    { name: 'Formal Black Blazer', nameAr: 'بليزر أسود رسمي', category: 'clothes', price: 89.99, storeId: store1.id },
    { name: 'Summer Floral Dress', nameAr: 'فستان صيفي زهري', category: 'clothes', price: 39.99, storeId: store1.id },
    { name: 'Natural Glow Makeup', nameAr: 'مكياج إشراقة طبيعية', category: 'makeup', price: 19.99, storeId: store2.id },
    { name: 'Bold Evening Look', nameAr: 'إطلالة مسائية جريئة', category: 'makeup', price: 24.99, storeId: store2.id },
    { name: 'Wedding Bridal Set', nameAr: 'طقم مكياج عروس', category: 'makeup', price: 59.99, storeId: store2.id },
    { name: 'Long Waves Wig', nameAr: 'باروكة موجات طويلة', category: 'hair', price: 34.99, storeId: store2.id },
    { name: 'Short Bob Cut', nameAr: 'قصة بوب قصيرة', category: 'hair', price: 29.99, storeId: store2.id },
    { name: 'Platinum Blonde Wig', nameAr: 'باروكة أشقر بلاتيني', category: 'hair', price: 44.99, storeId: store2.id },
    { name: 'Red Stiletto Heels', nameAr: 'كعب ستيليتو أحمر', category: 'shoes', price: 69.99, storeId: store1.id },
    { name: 'White Sneakers', nameAr: 'رياضي أبيض', category: 'shoes', price: 49.99, storeId: store1.id },
    { name: 'Black Ankle Boots', nameAr: 'بوت كاحل أسود', category: 'shoes', price: 79.99, storeId: store1.id },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: `product-${product.name.toLowerCase().replace(/\s/g, '-')}` },
      update: {},
      create: {
        id: `product-${product.name.toLowerCase().replace(/\s/g, '-')}`,
        ...product,
      },
    });
  }

  console.log(`✅ ${products.length} sample products created`);

  // Create a sample user
  const userPassword = await bcrypt.hash('User@123456', 12);
  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Test User',
      password: userPassword,
      role: 'user',
      plan: 'free',
    },
  });

  console.log('✅ Sample user created: user@example.com / User@123456');
  console.log('');
  console.log('🎉 Database seeded successfully!');
  console.log('');
  console.log('═══════════════════════════════════════');
  console.log('  📧 Admin Login:');
  console.log(`     Email:    ${adminEmail}`);
  console.log(`     Password: ${adminPassword}`);
  console.log('');
  console.log('  👤 Test User Login:');
  console.log('     Email:    user@example.com');
  console.log('     Password: User@123456');
  console.log('═══════════════════════════════════════');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
