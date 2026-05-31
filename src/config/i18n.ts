export type Locale = 'en' | 'ar';

export const translations = {
  en: {
    app: {
      title: 'AI Fashion',
      subtitle: 'Virtual Try-On Experience',
      description: 'Try clothes, makeup, hairstyles, and shoes virtually before you buy',
    },
    nav: {
      home: 'Home',
      tryOn: 'Try On',
      clothes: 'Clothes',
      makeup: 'Makeup',
      hair: 'Hair',
      shoes: 'Shoes',
      admin: 'Admin',
      subscription: 'Plans',
      profile: 'Profile',
    },
    upload: {
      title: 'Upload Your Photo',
      subtitle: 'Drag & drop or click to upload your photo',
      supported: 'Supports JPG, PNG, WebP (Max 10MB)',
      analyzing: 'Analyzing your photo...',
      ready: 'Photo ready! Choose what to try on.',
    },
    tryon: {
      title: 'Virtual Try-On',
      selectCategory: 'Select a category to try on',
      clothes: {
        title: 'Clothes Try-On',
        description: 'Try different outfits virtually',
        categories: ['Dresses', 'Shirts', 'Pants', 'Jackets', 'Abayas'],
      },
      makeup: {
        title: 'Makeup Try-On',
        description: 'Try different makeup looks',
        styles: ['Light', 'Medium', 'Party', 'Wedding', 'Natural'],
      },
      hair: {
        title: 'Hair & Wigs',
        description: 'Try different hairstyles and colors',
        types: ['Short', 'Long', 'Curly', 'Straight', 'Colored'],
      },
      shoes: {
        title: 'Shoes Try-On',
        description: 'Try different shoes and heels',
        types: ['Heels', 'Sneakers', 'Boots', 'Sandals', 'Flats'],
      },
    },
    results: {
      title: 'Result',
      download: 'Download',
      share: 'Share',
      buyNow: 'Buy Now',
      tryAnother: 'Try Another',
      similar: 'Similar Products',
    },
    admin: {
      title: 'Admin Panel',
      features: 'Feature Management',
      stores: 'Store Management',
      products: 'Products',
      affiliate: 'Affiliate System',
      payments: 'Payment Gateways',
      subscriptions: 'Subscriptions',
      ads: 'Advertisements',
      aiModels: 'AI Models',
      enable: 'Enable',
      disable: 'Disable',
    },
    subscription: {
      title: 'Subscription Plans',
      free: {
        name: 'Free',
        price: '$0/month',
        features: ['5 try-ons per day', 'Basic categories', 'With ads', 'Standard quality'],
      },
      pro: {
        name: 'Pro',
        price: '$9.99/month',
        features: ['Unlimited try-ons', 'All categories', 'No ads', 'HD quality', 'Priority processing'],
      },
      business: {
        name: 'Business',
        price: '$29.99/month',
        features: ['Everything in Pro', 'API access', 'Custom branding', 'Analytics dashboard', 'Priority support'],
      },
      subscribe: 'Subscribe',
      current: 'Current Plan',
    },
    chat: {
      placeholder: 'Ask me anything about fashion...',
      send: 'Send',
    },
  },
  ar: {
    app: {
      title: 'أزياء AI',
      subtitle: 'تجربة الملابس الافتراضية',
      description: 'جرّب الملابس والمكياج وتسريحات الشعر والأحذية افتراضيًا قبل الشراء',
    },
    nav: {
      home: 'الرئيسية',
      tryOn: 'تجربة',
      clothes: 'ملابس',
      makeup: 'مكياج',
      hair: 'شعر',
      shoes: 'أحذية',
      admin: 'الإدارة',
      subscription: 'الخطط',
      profile: 'الملف',
    },
    upload: {
      title: 'ارفع صورتك',
      subtitle: 'اسحب وأفلت أو اضغط لرفع صورتك',
      supported: 'يدعم JPG, PNG, WebP (حد أقصى 10 ميجا)',
      analyzing: 'جاري تحليل صورتك...',
      ready: 'الصورة جاهزة! اختر ماذا تريد تجربته.',
    },
    tryon: {
      title: 'التجربة الافتراضية',
      selectCategory: 'اختر فئة للتجربة',
      clothes: {
        title: 'تجربة الملابس',
        description: 'جرّب أزياء مختلفة افتراضيًا',
        categories: ['فساتين', 'قمصان', 'بناطيل', 'جاكيتات', 'عبايات'],
      },
      makeup: {
        title: 'تجربة المكياج',
        description: 'جرّب إطلالات مكياج مختلفة',
        styles: ['خفيف', 'متوسط', 'حفلات', 'زفاف', 'طبيعي'],
      },
      hair: {
        title: 'الشعر والباروكات',
        description: 'جرّب تسريحات وألوان شعر مختلفة',
        types: ['قصير', 'طويل', 'مجعد', 'أملس', 'ملون'],
      },
      shoes: {
        title: 'تجربة الأحذية',
        description: 'جرّب أحذية وكعوب مختلفة',
        types: ['كعب', 'رياضي', 'بوت', 'صندل', 'فلات'],
      },
    },
    results: {
      title: 'النتيجة',
      download: 'تحميل',
      share: 'مشاركة',
      buyNow: 'اشتري الآن',
      tryAnother: 'جرّب آخر',
      similar: 'منتجات مشابهة',
    },
    admin: {
      title: 'لوحة الإدارة',
      features: 'إدارة الميزات',
      stores: 'إدارة المتاجر',
      products: 'المنتجات',
      affiliate: 'نظام الأفلييت',
      payments: 'بوابات الدفع',
      subscriptions: 'الاشتراكات',
      ads: 'الإعلانات',
      aiModels: 'نماذج الذكاء الصناعي',
      enable: 'تفعيل',
      disable: 'تعطيل',
    },
    subscription: {
      title: 'خطط الاشتراك',
      free: {
        name: 'مجاني',
        price: '$0/شهر',
        features: ['5 تجارب يوميًا', 'الفئات الأساسية', 'مع إعلانات', 'جودة عادية'],
      },
      pro: {
        name: 'احترافي',
        price: '$9.99/شهر',
        features: ['تجارب غير محدودة', 'جميع الفئات', 'بدون إعلانات', 'جودة عالية', 'معالجة سريعة'],
      },
      business: {
        name: 'أعمال',
        price: '$29.99/شهر',
        features: ['كل مميزات الاحترافي', 'وصول API', 'علامة تجارية مخصصة', 'لوحة تحليلات', 'دعم أولوية'],
      },
      subscribe: 'اشترك',
      current: 'الخطة الحالية',
    },
    chat: {
      placeholder: 'اسألني أي شيء عن الموضة...',
      send: 'إرسال',
    },
  },
} as const;

export type TranslationKeys = typeof translations.en;
