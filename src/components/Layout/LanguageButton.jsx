import React from 'react';
import PropTypes from 'prop-types';
import '../../css/language-button.css';

function getClassName(locale, currentLocale) {
  let className = 'btn w-100 locale-button';
  if (locale === currentLocale) {
    className += ' current-locale';
  }
  return className;
}

const LanguageButton = ({ locale, changeLocale, currentLocale }) => (
  <div className="col-4 col-lg-4 col-xl-4 border-right border-top">
    <button
      type="button"
      onClick={() => changeLocale(locale)}
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
};

export default LanguageButton;
