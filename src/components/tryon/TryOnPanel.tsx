'use client';

import { useStore, TryOnCategory } from '@/store/useStore';
import { useTranslation } from '@/lib/useTranslation';
import CategoryCard from './CategoryCard';
import ProductGrid from './ProductGrid';

export default function TryOnPanel() {
  const { t, isRTL } = useTranslation();
  const { selectedCategory, setSelectedCategory, features, uploadedImage } = useStore();

  const categories: { key: TryOnCategory; title: string; description: string }[] = [
    { key: 'clothes', title: t.tryon.clothes.title, description: t.tryon.clothes.description },
    { key: 'makeup', title: t.tryon.makeup.title, description: t.tryon.makeup.description },
    { key: 'hair', title: t.tryon.hair.title, description: t.tryon.hair.description },
    { key: 'shoes', title: t.tryon.shoes.title, description: t.tryon.shoes.description },
  ];

  if (!uploadedImage) {
    return (
      <div className={`text-center py-12 ${isRTL ? 'text-right' : ''}`}>
        <p className="text-gray-500 text-lg">{t.tryon.selectCategory}</p>
        <p className="text-gray-400 text-sm mt-2">
          {isRTL ? 'يرجى رفع صورتك أولاً' : 'Please upload your photo first'}
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isRTL ? 'text-right' : ''}`}>
      <h2 className="text-2xl font-bold text-gray-800">{t.tryon.title}</h2>

      {/* Category Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.key}
            category={cat.key}
            title={cat.title}
            description={cat.description}
            isActive={selectedCategory === cat.key}
            isEnabled={features[cat.key]}
            onClick={() => setSelectedCategory(cat.key)}
          />
        ))}
      </div>

      {/* Product Grid */}
      {selectedCategory && <ProductGrid category={selectedCategory} />}
    </div>
  );
}
