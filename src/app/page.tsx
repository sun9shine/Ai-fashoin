'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/common/ChatWidget';
import ImageUpload from '@/components/upload/ImageUpload';
import { useStore } from '@/store/useStore';
import { useTranslation } from '@/lib/useTranslation';
import { Shirt, Sparkles, Scissors, Footprints, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { t, isRTL } = useTranslation();
  const { locale } = useStore();

  const features = [
    {
      icon: <Shirt className="w-8 h-8" />,
      title: locale === 'ar' ? 'تجربة الملابس' : 'Clothes Try-On',
      desc: locale === 'ar' ? 'جرّب الملابس افتراضيًا على صورتك' : 'Try clothes virtually on your photo',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: locale === 'ar' ? 'تجربة المكياج' : 'Makeup Try-On',
      desc: locale === 'ar' ? 'إطلالات مكياج واقعية على وجهك' : 'Realistic makeup looks on your face',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: locale === 'ar' ? 'تسريحات الشعر' : 'Hairstyles',
      desc: locale === 'ar' ? 'جرّب تسريحات وألوان مختلفة' : 'Try different styles and colors',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      icon: <Footprints className="w-8 h-8" />,
      title: locale === 'ar' ? 'تجربة الأحذية' : 'Shoes Try-On',
      desc: locale === 'ar' ? 'شاهد الأحذية على قدميك' : 'See shoes on your feet',
      gradient: 'from-green-500 to-teal-600',
    },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 ${isRTL ? 'direction-rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            {isRTL ? 'مدعوم بالذكاء الصناعي' : 'Powered by AI'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              {t.app.title}
            </span>
            <br />
            <span className="text-3xl md:text-4xl text-gray-700">{t.app.subtitle}</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            {t.app.description}
          </p>
          <Link
            href="/tryon"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 hover:shadow-xl transition-all"
          >
            {isRTL ? 'ابدأ التجربة' : 'Start Try-On'}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Upload Section */}
        <section className="py-16">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {isRTL ? 'جرّب الآن' : 'Try It Now'}
              </h2>
              <p className="text-gray-500">
                {isRTL ? 'ارفع صورتك وابدأ التجربة فورًا' : 'Upload your photo and start trying on instantly'}
              </p>
            </div>
            <ImageUpload />
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-12">
            {isRTL ? 'كيف يعمل؟' : 'How It Works'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: isRTL ? 'ارفع صورتك' : 'Upload Your Photo',
                desc: isRTL ? 'ارفع صورة واضحة لنفسك' : 'Upload a clear photo of yourself',
              },
              {
                step: '2',
                title: isRTL ? 'اختر المنتج' : 'Choose Product',
                desc: isRTL ? 'اختر ما تريد تجربته' : 'Select what you want to try on',
              },
              {
                step: '3',
                title: isRTL ? 'شاهد النتيجة' : 'See Result',
                desc: isRTL ? 'شاهد كيف تبدو بالمنتج' : 'See how you look with the product',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
