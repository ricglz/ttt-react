import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../css/language-button.css';
import type { LanguagePageProps } from './LanguagePage';

function getClassName(locale: string, currentLocale: string) {
  let className = 'btn w-100 locale-button';
  if (locale === currentLocale) {
    className += ' current-locale';
  }
  return className;
}

function useHandleClick(changeLocale: (locale: string) => void, locale: string) {
  const history = useHistory();
  return () => {
    changeLocale(locale);
    history.push('/');
  };
}

interface Props extends LanguagePageProps {
  locale: string
}

const LanguageButton = ({
  locale, changeLocale, currentLocale,
}: Props) => {
  const handleClick = useHandleClick(changeLocale, locale);
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
