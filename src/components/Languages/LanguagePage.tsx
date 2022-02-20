import React from 'react';
import LanguageButton from './LanguageButton';

const LANGUAGES = [
  'en', 'es', 'fr', 'pt', 'de', 'it', 'hi', 'mr', 'ko', 'ja', 'da', 'sr',
  'id', 'uk', 'ru', 'sv', 'zh', 'ar', 'ca', 'cs', 'tr',
];

export interface LanguagePageProps {
  changeLocale: (locale: string) => void,
  currentLocale: string,
}

const LanguagePage = (props: LanguagePageProps) => (
  <div className="row justify-content-center mt-5">
    {LANGUAGES.map((lang) => <LanguageButton key={lang} locale={lang} {...props} />)}
  </div>
);

export default LanguagePage;
