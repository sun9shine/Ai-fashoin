'use client';

import { useTranslation } from '@/lib/useTranslation';
import Link from 'next/link';

export default function Footer() {
  const { t, isRTL } = useTranslation();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-8">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'direction-rtl' : ''}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              {t.app.title}
            </span>
          </div>

          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-purple-600 transition-colors">
              {t.nav.home}
            </Link>
            <Link href="/tryon" className="text-gray-500 hover:text-purple-600 transition-colors">
              {t.nav.tryOn}
            </Link>
            <Link href="/subscription" className="text-gray-500 hover:text-purple-600 transition-colors">
              {t.nav.subscription}
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-purple-600 transition-colors">
              {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
          </nav>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">{t.app.description}</p>
          <p className="text-gray-400 text-xs mt-2">
            &copy; 2024 AI Fashion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
