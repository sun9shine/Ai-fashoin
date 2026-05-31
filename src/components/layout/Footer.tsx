'use client';

import { useTranslation } from '@/lib/useTranslation';

export default function Footer() {
  const { t, isRTL } = useTranslation();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-8">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${isRTL ? 'direction-rtl' : ''}`}>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            {t.app.title}
          </span>
        </div>
        <p className="text-gray-500 text-sm">{t.app.description}</p>
        <p className="text-gray-400 text-xs mt-4">
          &copy; 2024 AI Fashion. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
