'use client';

import { useStore } from '@/store/useStore';
import { useTranslation } from '@/lib/useTranslation';
import { Menu, X, Globe, LogIn, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { t, locale, isRTL } = useTranslation();
  const { setLocale } = useStore();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = (session?.user as any)?.role === 'admin';

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              {t.app.title}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              {t.nav.home}
            </Link>
            <Link href="/tryon" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              {t.nav.tryOn}
            </Link>
            <Link href="/subscription" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
              {t.nav.subscription}
            </Link>
            {/* Admin link ONLY for admin users */}
            {isAdmin && (
              <Link href="/admin" className="text-purple-600 hover:text-purple-800 transition-colors font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                {t.nav.admin}
              </Link>
            )}
            <Link href="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors font-medium text-sm">
              {isRTL ? 'الخصوصية' : 'Privacy'}
            </Link>
          </nav>

          {/* Actions */}
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Language Toggle */}
            <button
              onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-5 h-5 text-gray-600" />
            </button>

            {/* Auth Button */}
            {session ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="font-medium">{session.user?.name || session.user?.email}</span>
                  {isAdmin && (
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-bold">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="p-2 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-medium text-sm hover:opacity-90 transition-all"
              >
                <LogIn className="w-4 h-4" />
                {isRTL ? 'دخول' : 'Login'}
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className={`md:hidden py-4 border-t border-gray-100 flex flex-col gap-3 ${isRTL ? 'items-end' : ''}`}>
            <Link href="/" onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-purple-600 font-medium">
              {t.nav.home}
            </Link>
            <Link href="/tryon" onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-purple-600 font-medium">
              {t.nav.tryOn}
            </Link>
            <Link href="/subscription" onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-purple-600 font-medium">
              {t.nav.subscription}
            </Link>
            {isAdmin && (
              <Link href="/admin" onClick={() => setMobileOpen(false)} className="text-purple-600 hover:text-purple-800 font-medium">
                {t.nav.admin}
              </Link>
            )}
            <Link href="/privacy" onClick={() => setMobileOpen(false)} className="text-gray-600 hover:text-purple-600 font-medium">
              {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
