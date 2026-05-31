# 🧥 AI Fashion - Virtual Try-On Experience

تطبيق تجربة أزياء وجمال افتراضي مدعوم بالذكاء الصناعي. يتيح للمستخدم تجربة الملابس والمكياج والشعر والأحذية قبل الشراء.

A complete AI-powered virtual fashion try-on application.

---

## 🔐 بيانات الأدمن / Admin Credentials

```
═══════════════════════════════════════════════
  👑 Admin Account:
     Email:    admin@aifashion.com
     Password: Admin@123456
     URL:      http://localhost:3000/login

  👤 Test User Account:
     Email:    user@example.com
     Password: User@123456
═══════════════════════════════════════════════
```

> ⚠️ **مهم:** قم بتغيير كلمة مرور الأدمن فور أول تسجيل دخول في بيئة الإنتاج.

### كيف تدخل لوحة الأدمن؟
1. اذهب إلى `/login`
2. سجّل دخول بالبريد: `admin@aifashion.com` وكلمة المرور: `Admin@123456`
3. سيظهر رابط **Admin** في شريط التنقل (مخفي عن باقي المستخدمين)
4. صفحة `/admin` محمية بالكامل ولا يمكن لأي شخص الوصول إليها إلا الأدمن

---

## 🚀 طريقة التشغيل / How to Run

### المتطلبات
- Node.js 18 أو أعلى
- npm أو yarn
- مفتاح OpenAI API (للذكاء الصناعي)
- حساب Stripe (للدفع)

### التشغيل خطوة بخطوة

```bash
# 1. استنساخ المشروع
git clone https://github.com/sun9shine/Ai-fashoin.git
cd Ai-fashoin

# 2. تثبيت المكتبات
npm install

# 3. نسخ ملف البيئة
cp .env.example .env

# 4. تعديل .env بمفاتيح API الخاصة بك (OpenAI, Stripe)
# افتح .env وعدّل القيم

# 5. إعداد قاعدة البيانات
npx prisma db push

# 6. إنشاء حساب الأدمن + بيانات تجريبية
npm run db:seed

# 7. تشغيل السيرفر
npm run dev
```

افتح المتصفح على: **http://localhost:3000**

### أوامر مفيدة

| الأمر | الوظيفة |
|-------|---------|
| `npm run dev` | تشغيل وضع التطوير |
| `npm run build` | بناء للإنتاج |
| `npm start` | تشغيل نسخة الإنتاج |
| `npm run db:seed` | إنشاء الأدمن + بيانات تجريبية |
| `npm run db:push` | مزامنة قاعدة البيانات |
| `npm run db:studio` | فتح واجهة Prisma المرئية |
| `npm run db:reset` | إعادة تعيين قاعدة البيانات بالكامل |

---

## 📱 تحويل التطبيق إلى أندرويد / Build Android App

التطبيق مبني بـ Next.js (ويب). يمكنك تحويله إلى تطبيق أندرويد بـ 3 طرق:

---

### الطريقة 1: Capacitor (الأفضل ✅)

Capacitor يغلف تطبيق الويب في WebView مع وصول كامل لـ Native APIs.

#### الخطوات:

```bash
# 1. تثبيت Capacitor
npm install @capacitor/core @capacitor/cli
npx cap init "AI Fashion" "com.aifashion.app"

# 2. إضافة منصة أندرويد
npm install @capacitor/android
npx cap add android

# 3. تعديل next.config.ts (أضف output: 'export')
```

عدّل ملف `next.config.ts`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

```bash
# 4. بناء التطبيق
npm run build

# 5. نسخ البناء إلى أندرويد
npx cap copy android
npx cap sync android

# 6. فتح في Android Studio
npx cap open android
```

#### في Android Studio:
1. انتظر حتى ينتهي **Gradle Sync**
2. اوصل جهاز أندرويد أو شغّل Emulator
3. اضغط **Run ▶️** لتثبيت التطبيق
4. للنشر: **Build → Generate Signed Bundle/APK**

#### ملف `capacitor.config.ts`:
```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aifashion.app',
  appName: 'AI Fashion',
  webDir: 'out',
  server: {
    // للتطوير فقط (اكتب IP جهازك):
    // url: 'http://192.168.1.x:3000',
    // cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#7C3AED',
    },
  },
};

export default config;
```

---

### الطريقة 2: TWA (Trusted Web Activity)

تعمل مع التطبيق المنشور على سيرفر (HTTPS مطلوب).

#### الخطوات:
1. انشر التطبيق على Vercel أو أي استضافة HTTPS
2. افتح **Android Studio → New Project → Empty Activity**
3. أضف في `build.gradle`:
```gradle
dependencies {
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
}
```
4. عدّل `AndroidManifest.xml`:
```xml
<activity android:name="com.google.androidbrowserhelper.trusted.LauncherActivity">
    <meta-data 
        android:name="android.support.customtabs.trusted.DEFAULT_URL"
        android:value="https://your-app.vercel.app" />
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```
5. **Build → Generate Signed Bundle/APK**
6. ارفع إلى Google Play Store

---

### الطريقة 3: PWA (تطبيق ويب تقدمي)

أبسط طريقة - المستخدم "يثبت" التطبيق من المتصفح مباشرة.

#### الخطوات:
1. أنشئ ملف `public/manifest.json`:
```json
{
  "name": "AI Fashion",
  "short_name": "AI Fashion",
  "description": "Virtual Try-On Experience",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#7C3AED",
  "theme_color": "#7C3AED",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```
2. أضف في `src/app/layout.tsx` داخل `<head>`:
```html
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#7C3AED" />
```
3. انشر التطبيق
4. المستخدم يفتح Chrome → **القائمة → إضافة إلى الشاشة الرئيسية**

---

### مقارنة الطرق الثلاث

| الطريقة | الصعوبة | APIs أصلية | رفع للمتجر | بدون إنترنت |
|---------|---------|-----------|-----------|------------|
| **Capacitor** | متوسط | ✅ كامل | ✅ نعم | ✅ نعم |
| **TWA** | سهل | ❌ محدود | ✅ نعم | ⚠️ جزئي |
| **PWA** | أسهل | ❌ محدود | ❌ لا | ✅ نعم |

> 💡 **نصيحة:** استخدم **Capacitor** لأفضل تجربة مع إمكانيات الجهاز الأصلية.

---

## ☁️ النشر / Deployment

### Vercel (الأسهل للويب)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t ai-fashion .
docker run -p 3000:3000 --env-file .env ai-fashion
```

### VPS (DigitalOcean / AWS / etc.)
```bash
# على السيرفر
git clone https://github.com/sun9shine/Ai-fashoin.git
cd Ai-fashoin
npm install
cp .env.example .env
# عدّل .env بالقيم الحقيقية
npx prisma db push
npm run db:seed
npm run build
npm start
# أو استخدم PM2:
npm install -g pm2
pm2 start npm --name "ai-fashion" -- start
```

---

## 🔑 متغيرات البيئة / Environment Variables

```env
# قاعدة البيانات
DATABASE_URL="file:./dev.db"

# المصادقة
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="ولّد بـ: openssl rand -base64 32"

# الأدمن (يُستخدم عند الـ seed فقط)
ADMIN_EMAIL="admin@aifashion.com"
ADMIN_PASSWORD="Admin@123456"

# OpenAI (للذكاء الصناعي)
OPENAI_API_KEY="sk-your-key"

# Stripe (للدفع)
STRIPE_SECRET_KEY="sk_test_xxx"
STRIPE_PUBLISHABLE_KEY="pk_test_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"

# رابط التطبيق
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# SMTP (يمكن ضبطه من لوحة الأدمن أيضاً)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM_EMAIL="noreply@aifashion.com"
SMTP_FROM_NAME="AI Fashion"
```

### كيف تحصل على المفاتيح؟

| الخدمة | الرابط |
|--------|--------|
| **OpenAI** | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| **Stripe** | [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys) |
| **Gmail SMTP** | استخدم [App Passwords](https://myaccount.google.com/apppasswords) |

---

## ✨ الميزات الكاملة / Features

### ميزات المستخدم
| الميزة | الوصف |
|--------|-------|
| 📸 رفع الصور | رفع drag & drop مع تحليل AI |
| 👗 تجربة الملابس | تركيب ملابس افتراضية بشكل واقعي |
| 💄 تجربة المكياج | تطبيق مكياج بالذكاء الصناعي |
| 💇 تجربة الشعر | تسريحات وألوان مختلفة |
| 👠 تجربة الأحذية | تجربة أحذية افتراضية |
| 🤖 مساعد AI | محادثة ذكية للأزياء والجمال |
| 🌍 ثنائي اللغة | عربي + إنجليزي مع RTL |
| 💳 اشتراكات | مجاني / احترافي / أعمال |
| 🔑 استرجاع كلمة المرور | عبر البريد الإلكتروني (SMTP) |

### ميزات الأدمن (محمية)
| الميزة | الوصف |
|--------|-------|
| ⚙️ تبديل الميزات | تفعيل/تعطيل كل قسم |
| 📦 إدارة المنتجات | إضافة/حذف/تعديل المنتجات |
| 📧 إعدادات SMTP | ضبط البريد + اختبار الاتصال |
| 📊 الإحصائيات | عدد المستخدمين/المنتجات/الطلبات |
| 🏪 إدارة المتاجر | إضافة متاجر شريكة |
| 🔗 نظام الأفلييت | روابط تتبع للمنتجات |
| 💰 بوابة الدفع | Stripe مدمج |
| 📢 الإعلانات | تحكم بالإعلانات وسعر الإزالة |

---

## 📡 API Endpoints

| Method | Endpoint | الوصف | المصادقة |
|--------|----------|-------|----------|
| POST | `/api/auth/[...nextauth]` | تسجيل الدخول | - |
| POST | `/api/auth/register` | إنشاء حساب | - |
| POST | `/api/auth/forgot-password` | طلب استعادة كلمة المرور | - |
| POST | `/api/auth/reset-password` | تعيين كلمة مرور جديدة | - |
| POST | `/api/chat` | محادثة AI | اختياري |
| POST | `/api/tryon` | معالجة التجربة الافتراضية | اختياري |
| POST | `/api/upload` | رفع الصور | اختياري |
| POST | `/api/stripe/checkout` | إنشاء جلسة دفع | مطلوب |
| POST | `/api/stripe/webhook` | Webhook من Stripe | Stripe |
| GET/POST | `/api/admin/settings` | إعدادات التطبيق | أدمن فقط |
| GET/POST/PUT/DELETE | `/api/admin/products` | إدارة المنتجات | أدمن فقط |
| GET/POST/PUT | `/api/admin/smtp` | إعدادات SMTP | أدمن فقط |

---

## 📁 هيكل المشروع / Project Structure

```
Ai-fashoin/
├── prisma/
│   ├── schema.prisma              # مخطط قاعدة البيانات
│   └── seed.ts                    # بيانات أولية (أدمن + منتجات)
├── public/
│   └── uploads/                   # مجلد الصور المرفوعة
├── src/
│   ├── app/
│   │   ├── page.tsx               # الصفحة الرئيسية
│   │   ├── login/page.tsx         # تسجيل الدخول/إنشاء حساب
│   │   ├── forgot-password/       # استعادة كلمة المرور
│   │   ├── reset-password/        # تعيين كلمة مرور جديدة
│   │   ├── tryon/page.tsx         # مساحة التجربة الافتراضية
│   │   ├── admin/page.tsx         # لوحة الأدمن (محمية)
│   │   ├── subscription/page.tsx  # خطط الاشتراك
│   │   ├── privacy/page.tsx       # سياسة الخصوصية
│   │   └── api/                   # جميع الـ APIs
│   ├── components/
│   │   ├── admin/AdminPanel.tsx   # لوحة أدمن (ميزات + منتجات + SMTP + إحصائيات)
│   │   ├── common/ChatWidget.tsx  # ويدجت المحادثة
│   │   ├── layout/                # Header + Footer
│   │   ├── providers/             # SessionProvider
│   │   ├── subscription/          # بطاقات الخطط
│   │   ├── tryon/                 # مكونات التجربة
│   │   └── upload/                # رفع الصور
│   ├── config/
│   │   ├── i18n.ts                # الترجمات (عربي/إنجليزي)
│   │   └── system-prompt.ts       # برومبت الذكاء الصناعي
│   ├── lib/
│   │   ├── auth.ts                # إعدادات NextAuth
│   │   ├── email.ts               # إرسال البريد (Nodemailer)
│   │   ├── openai.ts              # ربط OpenAI
│   │   ├── prisma.ts              # عميل Prisma
│   │   └── stripe.ts              # إعدادات Stripe
│   ├── middleware.ts              # حماية صفحات الأدمن
│   └── store/useStore.ts          # إدارة الحالة (Zustand)
├── .env.example                   # قالب متغيرات البيئة
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

| الطبقة | التقنية |
|--------|---------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Auth | NextAuth.js v4 + bcrypt |
| Database | Prisma 5 + SQLite (dev) / PostgreSQL (prod) |
| AI | OpenAI GPT-4o + DALL-E 3 |
| Payments | Stripe |
| Email | Nodemailer (SMTP) |
| State | Zustand |
| Upload | React Dropzone + Server Storage |
| Icons | Lucide React |

---

## 🗄️ قاعدة البيانات

### تطوير (SQLite)
```bash
npx prisma db push       # مزامنة
npm run db:seed           # بيانات أولية
npm run db:studio         # واجهة مرئية
npm run db:reset          # إعادة تعيين
```

### إنتاج (PostgreSQL)
عدّل `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

عدّل `.env`:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

ثم:
```bash
npx prisma migrate deploy
npm run db:seed
```

---

## ✅ قائمة الإنتاج / Production Checklist

- [ ] تغيير كلمة مرور الأدمن
- [ ] توليد `NEXTAUTH_SECRET` آمن
- [ ] إعداد PostgreSQL بدل SQLite
- [ ] إضافة مفتاح OpenAI API حقيقي
- [ ] إعداد Stripe (مفاتيح + Webhook)
- [ ] إعداد SMTP من لوحة الأدمن
- [ ] تعيين `NEXTAUTH_URL` لرابط الإنتاج
- [ ] نشر على Vercel / VPS
- [ ] إعداد HTTPS
- [ ] اختبار استعادة كلمة المرور

---

## 📄 License

This project is private and proprietary.

---

## 🤝 الدعم / Support

- البريد: support@aifashion.com
- الخصوصية: privacy@aifashion.com
