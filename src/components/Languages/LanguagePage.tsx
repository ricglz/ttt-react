import { useTranslation } from 'react-i18next';
import LanguageButton from './LanguageButton';

export default function LanguagePage() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  return (
    <div className="row justify-content-center mt-5">
      {i18n.languages.map((lang) => (
        <LanguageButton
          key={lang}
          locale={lang}
          currentLocale={currentLocale}
        />
      ))}
    </div>
  );
}
