import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import ar from './ar.json';

export function initI18n(lng: 'ar' | 'en'): void {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
}
