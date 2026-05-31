'use client';

import { useStore } from '@/store/useStore';
import { useTranslation } from '@/lib/useTranslation';
import {
  Shirt,
  Sparkles,
  Scissors,
  Footprints,
  Megaphone,
  Store,
  CreditCard,
  Link,
  Brain,
  ToggleLeft,
  ToggleRight,
  Users,
} from 'lucide-react';

export default function AdminPanel() {
  const { t, isRTL } = useTranslation();
  const { features, toggleFeature, isAdmin } = useStore();

  if (!isAdmin) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">
          {isRTL ? 'يرجى تفعيل وضع الأدمن للوصول لهذه الصفحة' : 'Please enable Admin Mode to access this page'}
        </p>
      </div>
    );
  }

  const featureToggles = [
    { key: 'clothes' as const, icon: <Shirt className="w-5 h-5" />, label: t.nav.clothes },
    { key: 'makeup' as const, icon: <Sparkles className="w-5 h-5" />, label: t.nav.makeup },
    { key: 'hair' as const, icon: <Scissors className="w-5 h-5" />, label: t.nav.hair },
    { key: 'shoes' as const, icon: <Footprints className="w-5 h-5" />, label: t.nav.shoes },
    { key: 'ads' as const, icon: <Megaphone className="w-5 h-5" />, label: t.admin.ads },
  ];

  const managementSections = [
    { icon: <Store className="w-6 h-6" />, label: t.admin.stores, count: 3 },
    { icon: <Shirt className="w-6 h-6" />, label: t.admin.products, count: 156 },
    { icon: <Link className="w-6 h-6" />, label: t.admin.affiliate, count: 12 },
    { icon: <CreditCard className="w-6 h-6" />, label: t.admin.payments, count: 4 },
    { icon: <Users className="w-6 h-6" />, label: t.admin.subscriptions, count: 1247 },
    { icon: <Brain className="w-6 h-6" />, label: t.admin.aiModels, count: 3 },
  ];

  return (
    <div className={`space-y-8 ${isRTL ? 'text-right' : ''}`}>
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{t.admin.title}</h1>
        <p className="text-gray-500 mt-1">
          {isRTL ? 'إدارة جميع ميزات التطبيق' : 'Manage all application features'}
        </p>
      </div>

      {/* Feature Toggles */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{t.admin.features}</h2>
        <div className="space-y-3">
          {featureToggles.map((feature) => (
            <div
              key={feature.key}
              className={`flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="text-purple-600">{feature.icon}</div>
                <span className="font-medium text-gray-700">{feature.label}</span>
              </div>
              <button
                onClick={() => toggleFeature(feature.key)}
                className="transition-colors"
              >
                {features[feature.key] ? (
                  <ToggleRight className="w-8 h-8 text-green-500" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-gray-400" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Management Sections */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {isRTL ? 'إدارة النظام' : 'System Management'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {managementSections.map((section, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="text-purple-600 group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <div>
                  <p className="font-medium text-gray-700">{section.label}</p>
                  <p className="text-sm text-gray-400">
                    {section.count} {isRTL ? 'عنصر' : 'items'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Price Settings */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {isRTL ? 'إعدادات الإعلانات' : 'Ad Settings'}
        </h2>
        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <label className="text-gray-600 font-medium">
            {isRTL ? 'سعر إزالة الإعلانات:' : 'Ad removal price:'}
          </label>
          <input
            type="number"
            defaultValue={4.99}
            step={0.01}
            className="px-4 py-2 border border-gray-300 rounded-lg w-32 focus:ring-2 focus:ring-purple-300 outline-none"
          />
          <span className="text-gray-500">{isRTL ? 'دولار/شهر' : 'USD/month'}</span>
        </div>
      </div>
    </div>
  );
}
