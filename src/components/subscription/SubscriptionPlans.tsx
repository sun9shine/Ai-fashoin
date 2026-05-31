'use client';

import { useStore } from '@/store/useStore';
import { useTranslation } from '@/lib/useTranslation';
import { Check, Crown, Zap, Building2 } from 'lucide-react';

export default function SubscriptionPlans() {
  const { t, isRTL } = useTranslation();
  const { subscriptionPlan, setSubscriptionPlan } = useStore();

  const plans = [
    {
      key: 'free' as const,
      icon: <Zap className="w-8 h-8" />,
      name: t.subscription.free.name,
      price: t.subscription.free.price,
      features: t.subscription.free.features,
      gradient: 'from-gray-500 to-gray-600',
      popular: false,
    },
    {
      key: 'pro' as const,
      icon: <Crown className="w-8 h-8" />,
      name: t.subscription.pro.name,
      price: t.subscription.pro.price,
      features: t.subscription.pro.features,
      gradient: 'from-purple-600 to-pink-500',
      popular: true,
    },
    {
      key: 'business' as const,
      icon: <Building2 className="w-8 h-8" />,
      name: t.subscription.business.name,
      price: t.subscription.business.price,
      features: t.subscription.business.features,
      gradient: 'from-blue-600 to-indigo-600',
      popular: false,
    },
  ];

  return (
    <div className={`space-y-8 ${isRTL ? 'text-right' : ''}`}>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">{t.subscription.title}</h1>
        <p className="text-gray-500 mt-2">
          {isRTL
            ? 'اختر الخطة المناسبة لاحتياجاتك'
            : 'Choose the plan that fits your needs'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.key}
            className={`relative rounded-2xl border-2 p-6 transition-all duration-300 ${
              plan.popular
                ? 'border-purple-500 shadow-xl scale-105'
                : 'border-gray-200 hover:border-purple-300 hover:shadow-lg'
            } ${subscriptionPlan === plan.key ? 'ring-2 ring-purple-400' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                {isRTL ? 'الأكثر شعبية' : 'Most Popular'}
              </div>
            )}

            <div className="text-center mb-6">
              <div
                className={`w-16 h-16 mx-auto bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center text-white mb-4`}
              >
                {plan.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">{plan.price}</p>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSubscriptionPlan(plan.key)}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                subscriptionPlan === plan.key
                  ? 'bg-gray-200 text-gray-600 cursor-default'
                  : `bg-gradient-to-r ${plan.gradient} text-white hover:opacity-90 hover:shadow-lg`
              }`}
              disabled={subscriptionPlan === plan.key}
            >
              {subscriptionPlan === plan.key ? t.subscription.current : t.subscription.subscribe}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
