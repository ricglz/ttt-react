import React from 'react';
import LanguageButton from '../Layout/LanguageButton';

const LANGUAGES = [
  'en', 'es', 'fr', 'pt', 'de', 'it', 'hi', 'mr', 'ko', 'ja', 'da', 'sr',
  'id', 'uk', 'ru', 'sv', 'zh', 'ar', 'ca', 'cs', 'tr',
];

interface LanguagePageProps {
  changeLocale: (locale: string) => void,
  locale: string,
}

const LanguagePage = (props: LanguagePageProps) => (
  <div className="row justify-content-center mt-5">
    {LANGUAGES.map((lang) => <LanguageButton key={lang} {...props} locale={lang} />)}
  </div>
);

export default LanguagePage;
