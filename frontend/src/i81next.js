import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        hello: 'Hello',
      },
    },
    tr: {
      translation: {
        hello: 'Merhaba',
      },
    },
    ar: {
      translation: {
        hello: 'مرحبا',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18next;
