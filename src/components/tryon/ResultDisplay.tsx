'use client';

import { useStore } from '@/store/useStore';
import { useTranslation } from '@/lib/useTranslation';
import { Download, Share2, ShoppingCart, RotateCcw } from 'lucide-react';
import Image from 'next/image';

export default function ResultDisplay() {
  const { t, isRTL } = useTranslation();
  const { resultImage, setResultImage, reset } = useStore();

  if (!resultImage) return null;

  return (
    <div className="space-y-4">
      <h3 className={`text-xl font-bold text-gray-800 ${isRTL ? 'text-right' : ''}`}>
        {t.results.title}
      </h3>

      <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
        <Image src={resultImage} alt="Try-on result" fill className="object-cover" />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white text-center text-sm">
            {isRTL ? 'نتيجة التجربة الافتراضية' : 'Virtual Try-On Result'}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
          <Download className="w-4 h-4" />
          {t.results.download}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors">
          <Share2 className="w-4 h-4" />
          {t.results.share}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
          <ShoppingCart className="w-4 h-4" />
          {t.results.buyNow}
        </button>
        <button
          onClick={() => setResultImage(null)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          {t.results.tryAnother}
        </button>
      </div>
    </div>
  );
}
