import React from 'react';
import PropTypes from 'prop-types';
import '../../css/language-button.css';
import { historyProps } from '../../constants/props';

function getClassName(locale, currentLocale) {
  let className = 'btn w-100 locale-button';
  if (locale === currentLocale) {
    className += ' current-locale';
  }
  return className;
}

function handleClick(changeLocale, locale, history) {
  changeLocale(locale);
  history.push('/');
}

const LanguageButton = ({
  locale, changeLocale, currentLocale, history,
}) => (
  <div className="col-4 col-lg-4 col-xl-4 border-right border-top">
    <button
      type="button"
      onClick={() => handleClick(changeLocale, locale, history)}
      className={getClassName(locale, currentLocale)}
    >
      {locale}
    </button>
  </div>
);

LanguageButton.propTypes = {
  locale: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  changeLocale: PropTypes.func.isRequired,
  history: historyProps.isRequired,
};

export default LanguageButton;
