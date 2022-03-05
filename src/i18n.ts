import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import MESSAGES from './messages';

i18n.use(initReactI18next).init({
  resources: MESSAGES,
  lng: 'en',
  fallbackLng: ['en', ...Object.keys(MESSAGES).filter((val) => val !== 'en')],
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});
