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
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin',
      password: hashedPassword,
      role: 'admin',
      plan: 'business',
    },
  });

  console.log(`✅ Admin user created: ${admin.email}`);

  // Create app settings
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
    },
  });

  console.log('✅ App settings created');

  // Create sample stores
  const store1 = await prisma.store.create({
    data: {
      name: 'Fashion Store',
      url: 'https://fashionstore.example.com',
      isActive: true,
    },
  });

  const store2 = await prisma.store.create({
    data: {
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
    { name: 'Natural Glow Makeup', nameAr: 'مكياج إشراقة طبيعية', category: 'makeup', price: 19.99, storeId: store2.id },
    { name: 'Bold Evening Look', nameAr: 'إطلالة مسائية جريئة', category: 'makeup', price: 24.99, storeId: store2.id },
    { name: 'Long Waves Wig', nameAr: 'باروكة موجات طويلة', category: 'hair', price: 34.99, storeId: store2.id },
    { name: 'Short Bob Cut', nameAr: 'قصة بوب قصيرة', category: 'hair', price: 29.99, storeId: store2.id },
    { name: 'Red Stiletto Heels', nameAr: 'كعب ستيليتو أحمر', category: 'shoes', price: 69.99, storeId: store1.id },
    { name: 'White Sneakers', nameAr: 'رياضي أبيض', category: 'shoes', price: 49.99, storeId: store1.id },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`✅ ${products.length} sample products created`);
  console.log('');
  console.log('🎉 Database seeded successfully!');
  console.log('');
  console.log('📧 Admin Login:');
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Password: ${adminPassword}`);
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
