import { useStore } from '@/store/useStore';
import { translations, TranslationKeys } from '@/config/i18n';

export function useTranslation() {
  const locale = useStore((state) => state.locale);
  const t = translations[locale] as TranslationKeys;
  const isRTL = locale === 'ar';

  return { t, locale, isRTL };
}
