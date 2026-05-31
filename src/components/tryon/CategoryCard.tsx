'use client';

import { TryOnCategory } from '@/store/useStore';
import { Shirt, Sparkles, Scissors, Footprints } from 'lucide-react';

interface CategoryCardProps {
  category: TryOnCategory;
  title: string;
  description: string;
  isActive: boolean;
  isEnabled: boolean;
  onClick: () => void;
}

const icons: Record<TryOnCategory, React.ReactNode> = {
  clothes: <Shirt className="w-8 h-8" />,
  makeup: <Sparkles className="w-8 h-8" />,
  hair: <Scissors className="w-8 h-8" />,
  shoes: <Footprints className="w-8 h-8" />,
};

const gradients: Record<TryOnCategory, string> = {
  clothes: 'from-blue-500 to-purple-600',
  makeup: 'from-pink-500 to-rose-600',
  hair: 'from-amber-500 to-orange-600',
  shoes: 'from-green-500 to-teal-600',
};

export default function CategoryCard({
  category,
  title,
  description,
  isActive,
  isEnabled,
  onClick,
}: CategoryCardProps) {
  if (!isEnabled) return null;

  return (
    <button
      onClick={onClick}
      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left w-full ${
        isActive
          ? `border-transparent bg-gradient-to-br ${gradients[category]} text-white shadow-lg scale-105`
          : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
      }`}
    >
      <div className={`mb-3 ${isActive ? 'text-white' : 'text-purple-600'}`}>
        {icons[category]}
      </div>
      <h3 className={`font-bold text-lg mb-1 ${isActive ? 'text-white' : 'text-gray-800'}`}>
        {title}
      </h3>
      <p className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
        {description}
      </p>
    </button>
  );
}
