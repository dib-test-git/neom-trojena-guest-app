import { useTranslation } from 'react-i18next';

export type Direction = 'ltr' | 'rtl';

/**
 * Returns the active layout direction derived from i18next's current language
 * tag. Bilingual UX kit v2 components consume this instead of reading
 * `I18nManager.isRTL` directly — that read is unreliable on cold launch
 * (see KAN-51).
 */
export function useDirection(): Direction {
  const { i18n } = useTranslation();
  const lang = i18n?.language ?? 'en';
  return lang.startsWith('ar') ? 'rtl' : 'ltr';
}
