import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Layout from './Layout';
import ContextsProvider from './ContextsProvider';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        'Welcome to React': 'Welcome to React and react-i18next',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});

export default function App() {
  return <ContextsProvider ChildrenComponent={Layout} />;
}
