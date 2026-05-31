'use client';

import { TryOnCategory, useStore } from '@/store/useStore';
import { useTranslation } from '@/lib/useTranslation';
import { Wand2, Loader2 } from 'lucide-react';

interface ProductGridProps {
  category: TryOnCategory;
}

// Mock product data
const mockProducts: Record<TryOnCategory, { id: string; name: string; nameAr: string; color: string; price: string }[]> = {
  clothes: [
    { id: '1', name: 'Elegant Dress', nameAr: 'فستان أنيق', color: 'bg-red-400', price: '$49.99' },
    { id: '2', name: 'Casual Shirt', nameAr: 'قميص كاجوال', color: 'bg-blue-400', price: '$29.99' },
    { id: '3', name: 'Formal Blazer', nameAr: 'بليزر رسمي', color: 'bg-gray-700', price: '$89.99' },
    { id: '4', name: 'Summer Top', nameAr: 'توب صيفي', color: 'bg-yellow-400', price: '$24.99' },
    { id: '5', name: 'Evening Gown', nameAr: 'فستان سهرة', color: 'bg-purple-500', price: '$129.99' },
    { id: '6', name: 'Sport Jacket', nameAr: 'جاكيت رياضي', color: 'bg-green-500', price: '$59.99' },
  ],
  makeup: [
    { id: '1', name: 'Natural Glow', nameAr: 'إشراقة طبيعية', color: 'bg-pink-300', price: '$19.99' },
    { id: '2', name: 'Bold Evening', nameAr: 'مسائي جريء', color: 'bg-red-600', price: '$24.99' },
    { id: '3', name: 'Soft Romantic', nameAr: 'رومانسي ناعم', color: 'bg-rose-400', price: '$22.99' },
    { id: '4', name: 'Glamorous Party', nameAr: 'حفلة ساحرة', color: 'bg-fuchsia-500', price: '$29.99' },
    { id: '5', name: 'Wedding Look', nameAr: 'إطلالة زفاف', color: 'bg-amber-300', price: '$39.99' },
    { id: '6', name: 'Everyday Fresh', nameAr: 'إطلالة يومية', color: 'bg-orange-300', price: '$14.99' },
  ],
  hair: [
    { id: '1', name: 'Long Waves', nameAr: 'موجات طويلة', color: 'bg-amber-800', price: '$34.99' },
    { id: '2', name: 'Short Bob', nameAr: 'بوب قصير', color: 'bg-amber-900', price: '$29.99' },
    { id: '3', name: 'Curly Volume', nameAr: 'مجعد كثيف', color: 'bg-yellow-900', price: '$39.99' },
    { id: '4', name: 'Platinum Blonde', nameAr: 'أشقر بلاتيني', color: 'bg-yellow-200', price: '$44.99' },
    { id: '5', name: 'Red Highlights', nameAr: 'خصلات حمراء', color: 'bg-red-700', price: '$49.99' },
    { id: '6', name: 'Braided Style', nameAr: 'تسريحة ضفائر', color: 'bg-stone-700', price: '$54.99' },
  ],
  shoes: [
    { id: '1', name: 'Stiletto Heels', nameAr: 'كعب عالي', color: 'bg-red-500', price: '$69.99' },
    { id: '2', name: 'White Sneakers', nameAr: 'رياضي أبيض', color: 'bg-white', price: '$49.99' },
    { id: '3', name: 'Ankle Boots', nameAr: 'بوت كاحل', color: 'bg-amber-900', price: '$89.99' },
    { id: '4', name: 'Elegant Sandals', nameAr: 'صندل أنيق', color: 'bg-amber-400', price: '$39.99' },
    { id: '5', name: 'Platform Shoes', nameAr: 'حذاء بلاتفورم', color: 'bg-black', price: '$79.99' },
    { id: '6', name: 'Ballet Flats', nameAr: 'باليه فلات', color: 'bg-pink-400', price: '$34.99' },
  ],
};

export default function ProductGrid({ category }: ProductGridProps) {
  const { t, locale, isRTL } = useTranslation();
  const { isProcessing, setIsProcessing, setResultImage, uploadedImage } = useStore();
  const products = mockProducts[category];

  const handleTryOn = (productId: string) => {
    if (!uploadedImage) return;
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setResultImage(uploadedImage); // In real app, this would be the AI-generated result
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className={`space-y-4 ${isRTL ? 'text-right' : ''}`}>
      <h3 className="text-lg font-semibold text-gray-700">
        {isRTL ? 'اختر المنتج للتجربة' : 'Select a product to try on'}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            <div className={`h-32 ${product.color} flex items-center justify-center relative`}>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <button
                  onClick={() => handleTryOn(product.id)}
                  disabled={isProcessing}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-purple-600 px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Wand2 className="w-4 h-4" />
                  )}
                  {isRTL ? 'جرّب' : 'Try'}
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="font-medium text-gray-800 text-sm">
                {locale === 'ar' ? product.nameAr : product.name}
              </p>
              <p className="text-purple-600 font-bold text-sm mt-1">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
