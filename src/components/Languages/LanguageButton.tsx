import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../../css/language-button.css';

function getClassName(locale: string, currentLocale: string) {
  let className = 'btn w-100 locale-button';
  if (locale === currentLocale) {
    className += ' current-locale';
  }
  return className;
}

function useHandleClick(locale: string) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  return async () => {
    await i18n.changeLanguage(locale);
    navigate('/');
  };
}

interface Props {
  currentLocale: string;
  locale: string;
}

const LanguageButton = ({ currentLocale, locale }: Props) => {
  const handleClick = useHandleClick(locale);
  return (
    <div className="col-4 col-lg-4 col-xl-4 border-right border-top">
      <button
        type="button"
        onClick={handleClick}
        className={getClassName(locale, currentLocale)}
      >
        {locale}
      </button>
    </div>
  );
};

export default LanguageButton;
