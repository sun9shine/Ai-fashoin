'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/lib/useTranslation';

export default function PrivacyPage() {
  const { isRTL, locale } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          {locale === 'ar' ? <PrivacyArabic /> : <PrivacyEnglish />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function PrivacyEnglish() {
  return (
    <div className="prose prose-purple max-w-none">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: January 2024</p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">1. Introduction</h2>
      <p className="text-gray-600 leading-relaxed">
        Welcome to AI Fashion (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our virtual try-on application.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">2. Information We Collect</h2>
      <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">2.1 Personal Information</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Name and email address when you create an account</li>
        <li>Payment information when you subscribe to a paid plan</li>
        <li>Profile information you choose to provide</li>
      </ul>

      <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">2.2 Images and Photos</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Photos you upload for virtual try-on purposes</li>
        <li>Generated try-on result images</li>
        <li>These images are processed by our AI systems and may be temporarily stored for processing</li>
      </ul>

      <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">2.3 Usage Data</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Device information (browser type, operating system)</li>
        <li>Usage patterns and preferences</li>
        <li>Chat interactions with our AI assistant</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">3. How We Use Your Information</h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>To provide and improve our virtual try-on services</li>
        <li>To process your payments and manage subscriptions</li>
        <li>To personalize your experience and provide recommendations</li>
        <li>To communicate with you about updates and promotions</li>
        <li>To ensure the security and integrity of our platform</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">4. Image Processing & AI</h2>
      <p className="text-gray-600 leading-relaxed">
        Your uploaded photos are processed by our AI systems solely for the purpose of providing virtual try-on results. We do not:
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Share your photos with third parties for marketing purposes</li>
        <li>Use your photos to train AI models without explicit consent</li>
        <li>Store your photos longer than necessary for service delivery</li>
        <li>Use facial recognition for identification purposes</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">5. Data Sharing</h2>
      <p className="text-gray-600 leading-relaxed">
        We may share your information with:
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Payment processors (Stripe) for handling transactions</li>
        <li>AI service providers for image processing</li>
        <li>Analytics providers to improve our services</li>
        <li>Law enforcement when required by law</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">6. Data Security</h2>
      <p className="text-gray-600 leading-relaxed">
        We implement appropriate technical and organizational measures to protect your personal information, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">7. Your Rights</h2>
      <p className="text-gray-600 leading-relaxed">You have the right to:</p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Access your personal data</li>
        <li>Correct inaccurate data</li>
        <li>Delete your account and associated data</li>
        <li>Export your data in a portable format</li>
        <li>Opt-out of marketing communications</li>
        <li>Withdraw consent for data processing</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">8. Data Retention</h2>
      <p className="text-gray-600 leading-relaxed">
        We retain your personal information only as long as necessary to provide our services and fulfill the purposes outlined in this policy. Uploaded images are automatically deleted after 24 hours of processing.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">9. Children&apos;s Privacy</h2>
      <p className="text-gray-600 leading-relaxed">
        Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">10. Changes to This Policy</h2>
      <p className="text-gray-600 leading-relaxed">
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">11. Contact Us</h2>
      <p className="text-gray-600 leading-relaxed">
        If you have any questions about this Privacy Policy, please contact us at:
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Email: privacy@aifashion.com</li>
        <li>Support: support@aifashion.com</li>
      </ul>
    </div>
  );
}

function PrivacyArabic() {
  return (
    <div className="prose prose-purple max-w-none">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">سياسة الخصوصية</h1>
      <p className="text-gray-500 text-sm mb-8">آخر تحديث: يناير 2024</p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">1. المقدمة</h2>
      <p className="text-gray-600 leading-relaxed">
        مرحبًا بك في AI Fashion (&quot;نحن&quot; أو &quot;لنا&quot;). نحن ملتزمون بحماية خصوصيتك ومعلوماتك الشخصية. توضح سياسة الخصوصية هذه كيف نجمع ونستخدم ونكشف ونحمي معلوماتك عند استخدام تطبيق التجربة الافتراضية الخاص بنا.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">2. المعلومات التي نجمعها</h2>
      <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">2.1 المعلومات الشخصية</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>الاسم وعنوان البريد الإلكتروني عند إنشاء حساب</li>
        <li>معلومات الدفع عند الاشتراك في خطة مدفوعة</li>
        <li>معلومات الملف الشخصي التي تختار تقديمها</li>
      </ul>

      <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">2.2 الصور والملفات</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>الصور التي ترفعها لأغراض التجربة الافتراضية</li>
        <li>صور نتائج التجربة المُنشأة</li>
        <li>يتم معالجة هذه الصور بواسطة أنظمة الذكاء الصناعي لدينا وقد يتم تخزينها مؤقتًا للمعالجة</li>
      </ul>

      <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">2.3 بيانات الاستخدام</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>معلومات الجهاز (نوع المتصفح، نظام التشغيل)</li>
        <li>أنماط الاستخدام والتفضيلات</li>
        <li>التفاعلات مع مساعد الذكاء الصناعي</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">3. كيف نستخدم معلوماتك</h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>لتقديم وتحسين خدمات التجربة الافتراضية</li>
        <li>لمعالجة مدفوعاتك وإدارة الاشتراكات</li>
        <li>لتخصيص تجربتك وتقديم التوصيات</li>
        <li>للتواصل معك بشأن التحديثات والعروض</li>
        <li>لضمان أمان ونزاهة منصتنا</li>
        <li>للامتثال للالتزامات القانونية</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">4. معالجة الصور والذكاء الصناعي</h2>
      <p className="text-gray-600 leading-relaxed">
        يتم معالجة صورك المرفوعة بواسطة أنظمة الذكاء الصناعي لدينا فقط لغرض تقديم نتائج التجربة الافتراضية. نحن لا:
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>نشارك صورك مع أطراف ثالثة لأغراض تسويقية</li>
        <li>نستخدم صورك لتدريب نماذج الذكاء الصناعي بدون موافقة صريحة</li>
        <li>نخزن صورك لفترة أطول من اللازم لتقديم الخدمة</li>
        <li>نستخدم التعرف على الوجه لأغراض التعريف</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">5. مشاركة البيانات</h2>
      <p className="text-gray-600 leading-relaxed">قد نشارك معلوماتك مع:</p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>معالجات الدفع (Stripe) لمعالجة المعاملات</li>
        <li>مزودي خدمات الذكاء الصناعي لمعالجة الصور</li>
        <li>مزودي التحليلات لتحسين خدماتنا</li>
        <li>الجهات القانونية عند الحاجة بموجب القانون</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">6. أمان البيانات</h2>
      <p className="text-gray-600 leading-relaxed">
        ننفذ إجراءات تقنية وتنظيمية مناسبة لحماية معلوماتك الشخصية، بما في ذلك التشفير والخوادم الآمنة وعمليات التدقيق الأمني المنتظمة.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">7. حقوقك</h2>
      <p className="text-gray-600 leading-relaxed">لديك الحق في:</p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>الوصول إلى بياناتك الشخصية</li>
        <li>تصحيح البيانات غير الدقيقة</li>
        <li>حذف حسابك والبيانات المرتبطة</li>
        <li>تصدير بياناتك بتنسيق قابل للنقل</li>
        <li>إلغاء الاشتراك في الاتصالات التسويقية</li>
        <li>سحب الموافقة على معالجة البيانات</li>
      </ul>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">8. الاحتفاظ بالبيانات</h2>
      <p className="text-gray-600 leading-relaxed">
        نحتفظ بمعلوماتك الشخصية فقط طالما كان ذلك ضروريًا لتقديم خدماتنا. يتم حذف الصور المرفوعة تلقائيًا بعد 24 ساعة من المعالجة.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">9. خصوصية الأطفال</h2>
      <p className="text-gray-600 leading-relaxed">
        خدمتنا غير مخصصة للأطفال دون سن 13 عامًا. نحن لا نجمع عن قصد معلومات شخصية من الأطفال.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">10. التغييرات على هذه السياسة</h2>
      <p className="text-gray-600 leading-relaxed">
        قد نحدث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات عن طريق نشر السياسة الجديدة على هذه الصفحة.
      </p>

      <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">11. اتصل بنا</h2>
      <p className="text-gray-600 leading-relaxed">إذا كان لديك أي أسئلة:</p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>البريد الإلكتروني: privacy@aifashion.com</li>
        <li>الدعم: support@aifashion.com</li>
      </ul>
    </div>
  );
}
