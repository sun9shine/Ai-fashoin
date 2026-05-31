'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/useTranslation';
import {
  Shirt,
  Sparkles,
  Scissors,
  Footprints,
  Megaphone,
  Store,
  CreditCard,
  Link as LinkIcon,
  Brain,
  ToggleLeft,
  ToggleRight,
  Users,
  Mail,
  Plus,
  Save,
  Loader2,
  TestTube,
  CheckCircle,
  XCircle,
  Package,
  Trash2,
} from 'lucide-react';

type Tab = 'features' | 'products' | 'smtp' | 'stats';

export default function AdminPanel() {
  const { t, isRTL } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('features');

  const tabs = [
    { key: 'features' as Tab, label: isRTL ? 'الميزات' : 'Features', icon: <Brain className="w-4 h-4" /> },
    { key: 'products' as Tab, label: isRTL ? 'المنتجات' : 'Products', icon: <Package className="w-4 h-4" /> },
    { key: 'smtp' as Tab, label: 'SMTP', icon: <Mail className="w-4 h-4" /> },
    { key: 'stats' as Tab, label: isRTL ? 'الإحصائيات' : 'Stats', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className={`space-y-6 ${isRTL ? 'text-right' : ''}`}>
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{t.admin.title}</h1>
        <p className="text-gray-500 mt-1">
          {isRTL ? 'إدارة جميع ميزات التطبيق' : 'Manage all application features'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === tab.key
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'features' && <FeaturesPanel />}
      {activeTab === 'products' && <ProductsPanel />}
      {activeTab === 'smtp' && <SmtpPanel />}
      {activeTab === 'stats' && <StatsPanel />}
    </div>
  );
}

function FeaturesPanel() {
  const { t, isRTL } = useTranslation();
  const [features, setFeatures] = useState({
    clothes: true,
    makeup: true,
    hair: true,
    shoes: true,
    ads: true,
  });
  const [saving, setSaving] = useState(false);

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const saveFeatures = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clothesEnabled: features.clothes,
          makeupEnabled: features.makeup,
          hairEnabled: features.hair,
          shoesEnabled: features.shoes,
          adsEnabled: features.ads,
        }),
      });
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const featureToggles = [
    { key: 'clothes' as const, icon: <Shirt className="w-5 h-5" />, label: t.nav.clothes },
    { key: 'makeup' as const, icon: <Sparkles className="w-5 h-5" />, label: t.nav.makeup },
    { key: 'hair' as const, icon: <Scissors className="w-5 h-5" />, label: t.nav.hair },
    { key: 'shoes' as const, icon: <Footprints className="w-5 h-5" />, label: t.nav.shoes },
    { key: 'ads' as const, icon: <Megaphone className="w-5 h-5" />, label: t.admin.ads },
  ];

  return (
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
            <button onClick={() => toggleFeature(feature.key)}>
              {features[feature.key] ? (
                <ToggleRight className="w-8 h-8 text-green-500" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-gray-400" />
              )}
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={saveFeatures}
        disabled={saving}
        className="mt-4 flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
      >
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {isRTL ? 'حفظ' : 'Save'}
      </button>
    </div>
  );
}

function ProductsPanel() {
  const { isRTL } = useTranslation();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', nameAr: '', category: 'clothes', price: '', description: '', affiliateUrl: '',
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;
    try {
      await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      setNewProduct({ name: '', nameAr: '', category: 'clothes', price: '', description: '', affiliateUrl: '' });
      setShowAdd(false);
      fetchProducts();
    } catch (e) { console.error(e); }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm(isRTL ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return;
    try {
      await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (e) { console.error(e); }
  };

  useState(() => { fetchProducts(); });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{isRTL ? 'إدارة المنتجات' : 'Product Management'}</h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
        >
          <Plus className="w-4 h-4" />
          {isRTL ? 'إضافة منتج' : 'Add Product'}
        </button>
      </div>

      {/* Add Product Form */}
      {showAdd && (
        <div className="bg-purple-50 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              placeholder={isRTL ? 'اسم المنتج (إنجليزي)' : 'Product name'}
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
            <input
              placeholder={isRTL ? 'اسم المنتج (عربي)' : 'Product name (Arabic)'}
              value={newProduct.nameAr}
              onChange={(e) => setNewProduct({ ...newProduct, nameAr: e.target.value })}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="clothes">Clothes</option>
              <option value="makeup">Makeup</option>
              <option value="hair">Hair</option>
              <option value="shoes">Shoes</option>
            </select>
            <input
              placeholder={isRTL ? 'السعر' : 'Price'}
              type="number"
              step="0.01"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
            <input
              placeholder={isRTL ? 'رابط الأفلييت' : 'Affiliate URL'}
              value={newProduct.affiliateUrl}
              onChange={(e) => setNewProduct({ ...newProduct, affiliateUrl: e.target.value })}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
            <input
              placeholder={isRTL ? 'الوصف' : 'Description'}
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <button
            onClick={addProduct}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            <Save className="w-4 h-4" />
            {isRTL ? 'حفظ المنتج' : 'Save Product'}
          </button>
        </div>
      )}

      {/* Products List */}
      {loading ? (
        <div className="text-center py-8"><Loader2 className="w-6 h-6 animate-spin mx-auto text-purple-600" /></div>
      ) : products.length === 0 ? (
        <p className="text-gray-400 text-center py-8">{isRTL ? 'لا توجد منتجات' : 'No products yet'}</p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800 text-sm">{product.name}</p>
                <p className="text-xs text-gray-500">{product.category} - ${product.price}</p>
              </div>
              <button onClick={() => deleteProduct(product.id)} className="text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SmtpPanel() {
  const { isRTL } = useTranslation();
  const [smtp, setSmtp] = useState({
    smtpHost: '',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
    smtpFromEmail: '',
    smtpFromName: 'AI Fashion',
    smtpSecure: false,
  });
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; error?: string } | null>(null);
  const [saved, setSaved] = useState(false);

  // Load existing settings
  useState(() => {
    fetch('/api/admin/smtp')
      .then((r) => r.json())
      .then((data) => {
        if (data.smtpHost) setSmtp(data);
      })
      .catch(() => {});
  });

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/admin/smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smtp),
      });
      if (res.ok) setSaved(true);
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/admin/smtp', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smtp),
      });
      const data = await res.json();
      setTestResult(data);
    } catch (e) {
      setTestResult({ success: false, error: 'Network error' });
    }
    setTesting(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-800">
          {isRTL ? 'إعدادات البريد الإلكتروني (SMTP)' : 'Email Settings (SMTP)'}
        </h2>
      </div>

      <p className="text-gray-500 text-sm mb-4">
        {isRTL
          ? 'إعداد SMTP مطلوب لإرسال رسائل استعادة كلمة المرور والإشعارات للمستخدمين.'
          : 'SMTP setup is required for sending password reset emails and user notifications.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'خادم SMTP' : 'SMTP Host'}
          </label>
          <input
            type="text"
            value={smtp.smtpHost}
            onChange={(e) => setSmtp({ ...smtp, smtpHost: e.target.value })}
            placeholder="smtp.gmail.com"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-300 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'المنفذ' : 'Port'}
          </label>
          <input
            type="number"
            value={smtp.smtpPort}
            onChange={(e) => setSmtp({ ...smtp, smtpPort: e.target.value })}
            placeholder="587"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-300 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'اسم المستخدم' : 'Username'}
          </label>
          <input
            type="text"
            value={smtp.smtpUser}
            onChange={(e) => setSmtp({ ...smtp, smtpUser: e.target.value })}
            placeholder="your-email@gmail.com"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-300 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'كلمة المرور' : 'Password'}
          </label>
          <input
            type="password"
            value={smtp.smtpPassword}
            onChange={(e) => setSmtp({ ...smtp, smtpPassword: e.target.value })}
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-300 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'بريد المرسل' : 'From Email'}
          </label>
          <input
            type="email"
            value={smtp.smtpFromEmail}
            onChange={(e) => setSmtp({ ...smtp, smtpFromEmail: e.target.value })}
            placeholder="noreply@aifashion.com"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-300 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'اسم المرسل' : 'From Name'}
          </label>
          <input
            type="text"
            value={smtp.smtpFromName}
            onChange={(e) => setSmtp({ ...smtp, smtpFromName: e.target.value })}
            placeholder="AI Fashion"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-300 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          id="smtpSecure"
          checked={smtp.smtpSecure}
          onChange={(e) => setSmtp({ ...smtp, smtpSecure: e.target.checked })}
          className="rounded"
        />
        <label htmlFor="smtpSecure" className="text-sm text-gray-600">
          {isRTL ? 'استخدام SSL/TLS (المنفذ 465)' : 'Use SSL/TLS (Port 465)'}
        </label>
      </div>

      {/* Test Result */}
      {testResult && (
        <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
          testResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {testResult.success ? (
            <><CheckCircle className="w-5 h-5" /> {isRTL ? 'الاتصال ناجح!' : 'Connection successful!'}</>
          ) : (
            <><XCircle className="w-5 h-5" /> {testResult.error || (isRTL ? 'فشل الاتصال' : 'Connection failed')}</>
          )}
        </div>
      )}

      {saved && (
        <div className="mt-4 p-3 rounded-lg bg-green-50 text-green-700 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" /> {isRTL ? 'تم الحفظ بنجاح!' : 'Settings saved successfully!'}
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isRTL ? 'حفظ الإعدادات' : 'Save Settings'}
        </button>
        <button
          onClick={handleTest}
          disabled={testing}
          className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : <TestTube className="w-4 h-4" />}
          {isRTL ? 'اختبار الاتصال' : 'Test Connection'}
        </button>
      </div>
    </div>
  );
}

function StatsPanel() {
  const { isRTL } = useTranslation();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useState(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => {
        setStats(data.stats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  });

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-600" />
      </div>
    );
  }

  const statCards = [
    { label: isRTL ? 'المستخدمين' : 'Users', value: stats?.userCount || 0, icon: <Users className="w-6 h-6" /> },
    { label: isRTL ? 'المنتجات' : 'Products', value: stats?.productCount || 0, icon: <Package className="w-6 h-6" /> },
    { label: isRTL ? 'المتاجر' : 'Stores', value: stats?.storeCount || 0, icon: <Store className="w-6 h-6" /> },
    { label: isRTL ? 'الطلبات' : 'Orders', value: stats?.orderCount || 0, icon: <CreditCard className="w-6 h-6" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-purple-600">{stat.icon}</div>
            <span className="text-gray-500 text-sm">{stat.label}</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
