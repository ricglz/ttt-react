import i18next from 'i18next';
import React from 'react';
import LanguageButton from './LanguageButton';

const LANGUAGES = i18next.languages;

export default function LanguagePage() {
  const currentLocale = i18next.language;
  return (
    <div className="row justify-content-center mt-5">
      {LANGUAGES.map((lang) => (
        <LanguageButton
          key={lang}
          locale={lang}
          currentLocale={currentLocale}
        />
      ))}
    </div>
  );
}
