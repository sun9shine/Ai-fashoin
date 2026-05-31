'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/common/ChatWidget';
import ImageUpload from '@/components/upload/ImageUpload';
import TryOnPanel from '@/components/tryon/TryOnPanel';
import ResultDisplay from '@/components/tryon/ResultDisplay';
import { useStore } from '@/store/useStore';
import { useTranslation } from '@/lib/useTranslation';

export default function TryOnPage() {
  const { isRTL } = useTranslation();
  const { uploadedImage, resultImage } = useStore();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Image Upload & Result */}
          <div className="space-y-6">
            <ImageUpload />
            {resultImage && <ResultDisplay />}
          </div>

          {/* Right Panel - Try-On Controls */}
          <div>
            <TryOnPanel />
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
