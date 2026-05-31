# 🧥 AI Fashion - Virtual Try-On Experience

A complete AI-powered virtual fashion try-on application that allows users to try clothes, makeup, hairstyles, and shoes virtually before purchasing.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Admin Access](#admin-access)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Build for Android (Android Studio)](#build-for-android-android-studio)
- [Deployment](#deployment)

---

## ✨ Features

### User Features
- 📸 **Image Upload** - Drag & drop photo upload with AI analysis
- 👗 **Clothes Try-On** - Virtual clothing overlay with realistic rendering
- 💄 **Makeup Try-On** - AI-powered makeup application
- 💇 **Hair & Wigs** - Try different hairstyles and colors
- 👠 **Shoes Try-On** - Virtual shoe fitting
- 🤖 **AI Chat Assistant** - Fashion advice powered by OpenAI GPT-4
- 🌍 **Bilingual** - Full English & Arabic support with RTL
- 💳 **Subscription Plans** - Free, Pro, Business tiers

### Admin Features (Protected)
- 🔐 **Secure Admin Panel** - Only accessible by admin users
- ⚙️ **Feature Toggles** - Enable/disable app features
- 🏪 **Store Management** - Manage partner stores
- 📦 **Product Management** - CRUD operations on products
- 🔗 **Affiliate System** - Track affiliate links
- 💰 **Payment Gateway** - Stripe integration
- 📊 **Subscription Management** - View and manage subscribers
- 📢 **Ad Management** - Control advertisements

### Security
- 🔒 **Authentication** - NextAuth.js with credentials provider
- 🛡️ **Route Protection** - Middleware-level admin route protection
- 🔑 **Password Hashing** - bcrypt encryption
- 🚫 **Admin Hidden** - Admin page invisible to non-admin users

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Auth | NextAuth.js v4 |
| Database | Prisma + SQLite (dev) / PostgreSQL (prod) |
| AI | OpenAI GPT-4o + DALL-E 3 |
| Payments | Stripe |
| State | Zustand |
| Icons | Lucide React |
| Upload | React Dropzone |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (for AI features)
- Stripe account (for payments)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sun9shine/Ai-fashoin.git
cd Ai-fashoin

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env
# Edit .env with your API keys

# 4. Setup database
npx prisma db push

# 5. Seed database (creates admin user + sample data)
npm run db:seed

# 6. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-here"

# Admin credentials (used during seed)
ADMIN_EMAIL="admin@aifashion.com"
ADMIN_PASSWORD="Admin@123456"

# OpenAI (required for AI features)
OPENAI_API_KEY="sk-your-openai-api-key"

# Stripe (required for payments)
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Getting API Keys

1. **OpenAI**: Get from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. **Stripe**: Get from [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
3. **NEXTAUTH_SECRET**: Generate with `openssl rand -base64 32`

---

## 🗄️ Database Setup

### Development (SQLite)
```bash
# Push schema to database
npx prisma db push

# Seed with admin user and sample data
npm run db:seed

# Open Prisma Studio (visual DB editor)
npm run db:studio

# Reset database completely
npm run db:reset
```

### Production (PostgreSQL)
Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
}
```

Update `prisma.config.ts` and `.env`:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

---

## 🔐 Admin Access

### Default Admin Credentials
After running `npm run db:seed`:

| Field | Value |
|-------|-------|
| **Email** | `admin@aifashion.com` |
| **Password** | `Admin@123456` |

### Admin Security
- Admin page (`/admin`) is protected by middleware
- Non-authenticated users are redirected to `/login`
- Non-admin users are redirected to home page
- Admin link is **completely hidden** from the navigation for non-admin users
- No shield/toggle button - only database role determines admin access

### How to Access Admin
1. Go to `/login`
2. Sign in with admin credentials
3. "Admin" link appears in navigation
4. Access admin panel at `/admin`

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/[...nextauth]` | Authentication | - |
| POST | `/api/auth/register` | User registration | - |
| POST | `/api/chat` | AI chat assistant | Optional |
| POST | `/api/tryon` | Virtual try-on processing | Optional |
| POST | `/api/stripe/checkout` | Create payment session | Required |
| POST | `/api/stripe/webhook` | Stripe webhook handler | Stripe |

---

## 📁 Project Structure

```
Ai-fashoin/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeder (admin + sample data)
├── src/
│   ├── app/
│   │   ├── admin/page.tsx     # Admin panel (protected)
│   │   ├── login/page.tsx     # Login/Register page
│   │   ├── privacy/page.tsx   # Privacy policy (AR/EN)
│   │   ├── subscription/page.tsx
│   │   ├── tryon/page.tsx     # Virtual try-on workspace
│   │   ├── api/
│   │   │   ├── auth/          # NextAuth routes
│   │   │   ├── chat/          # AI chat API
│   │   │   ├── tryon/         # Try-on processing API
│   │   │   └── stripe/        # Payment APIs
│   │   ├── layout.tsx         # Root layout with SessionProvider
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── admin/             # Admin panel components
│   │   ├── common/            # Chat widget
│   │   ├── layout/            # Header, Footer
│   │   ├── providers/         # SessionProvider
│   │   ├── subscription/      # Plan cards
│   │   ├── tryon/             # Try-on UI components
│   │   └── upload/            # Image upload
│   ├── config/
│   │   ├── i18n.ts            # Translations (EN/AR)
│   │   └── system-prompt.ts   # AI system prompt
│   ├── lib/
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── auth-helpers.ts    # Auth utility functions
│   │   ├── openai.ts          # OpenAI integration
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── stripe.ts          # Stripe configuration
│   │   └── useTranslation.ts  # Translation hook
│   ├── middleware.ts          # Admin route protection
│   └── store/
│       └── useStore.ts        # Zustand state management
├── .env.example               # Environment template
├── package.json
└── README.md
```

---

## 📱 Build for Android (Android Studio)

This is a Next.js web application. To run it as a native Android app, you can use **Capacitor** or **TWA (Trusted Web Activity)**. Here are both methods:

---

### Method 1: Using Capacitor (Recommended)

Capacitor wraps your web app in a native WebView with access to native APIs.

#### Step 1: Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npx cap init "AI Fashion" "com.aifashion.app"
```

#### Step 2: Add Android Platform

```bash
npm install @capacitor/android
npx cap add android
```

#### Step 3: Build the Next.js App

```bash
# Update next.config.ts for static export:
# Add: output: 'export'

npm run build
```

#### Step 4: Copy Build to Android

```bash
# Copy the static build to Capacitor
npx cap copy android
npx cap sync android
```

#### Step 5: Open in Android Studio

```bash
npx cap open android
```

This opens the project in Android Studio. From there:

1. **Wait** for Gradle sync to complete
2. **Connect** an Android device or start an emulator
3. Click **Run** (▶️) to build and install
4. For release: **Build > Generate Signed Bundle/APK**

#### Step 6: Configure `capacitor.config.ts`

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aifashion.app',
  appName: 'AI Fashion',
  webDir: 'out', // Next.js static export directory
  server: {
    // For development, point to your dev server:
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

#### Step 7: Update `next.config.ts` for Static Export

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
```

---

### Method 2: Using TWA (Trusted Web Activity)

TWA runs your deployed website as a full-screen Chrome Custom Tab without browser UI.

#### Prerequisites
- Your app must be deployed to a public URL with HTTPS
- Your app must pass PWA requirements

#### Step 1: Deploy Your App
Deploy to Vercel, Netlify, or any hosting with HTTPS.

#### Step 2: Create TWA Project in Android Studio

1. Open **Android Studio > New Project > Empty Activity**
2. Add to `build.gradle` (app level):

```gradle
dependencies {
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
}
```

3. Configure `AndroidManifest.xml`:

```xml
<activity android:name="com.google.androidbrowserhelper.trusted.LauncherActivity">
    <meta-data android:name="android.support.customtabs.trusted.DEFAULT_URL"
               android:value="https://your-deployed-url.vercel.app" />
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

4. Add Digital Asset Links verification

#### Step 3: Build APK
- **Build > Generate Signed Bundle/APK > APK**
- Sign with your keystore
- Upload to Google Play Store

---

### Method 3: Using PWA (Progressive Web App)

The simplest approach - users can "install" the app from the browser.

#### Step 1: Add `manifest.json` to `/public/`

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
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

#### Step 2: Add to `layout.tsx`
```html
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#7C3AED" />
```

#### Step 3: Deploy and Install
Users can install directly from Chrome: **Menu > Add to Home Screen**

---

### Android Build Summary

| Method | Difficulty | Native APIs | Store Upload | Offline |
|--------|-----------|-------------|--------------|---------|
| Capacitor | Medium | ✅ Full | ✅ Yes | ✅ Yes |
| TWA | Easy | ❌ Limited | ✅ Yes | ⚠️ Partial |
| PWA | Easiest | ❌ Limited | ❌ No | ✅ Yes |

**Recommended**: Use **Capacitor** for the best balance of native features and web development speed.

---

## 🚢 Deployment

### Vercel (Recommended for Web)
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

### Production Checklist
- [ ] Set `NEXTAUTH_SECRET` to a secure random string
- [ ] Configure PostgreSQL for production database
- [ ] Set up Stripe webhook endpoint
- [ ] Add OpenAI API key
- [ ] Configure CORS if needed
- [ ] Set `NEXTAUTH_URL` to production URL
- [ ] Change admin password after first login

---

## 📄 License

This project is private and proprietary.

---

## 🤝 Support

For support, email support@aifashion.com.
