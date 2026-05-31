'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/common/ChatWidget';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import { useTranslation } from '@/lib/useTranslation';

export default function SubscriptionPage() {
  const { isRTL } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SubscriptionPlans />
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
