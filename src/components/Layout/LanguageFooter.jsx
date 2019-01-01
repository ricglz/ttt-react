import React from 'react';
import PropTypes from 'prop-types';
import LanguageButton from './LanguageButton';

const LanguageFooter = ({ changeToLanguage, locale }) => (
  <div
    className="row justify-content-center mt-5"
  >
    <LanguageButton
      changeLocale={changeToLanguage}
      currentLocale={locale}
      locale={locale}
    />
  </div>
);

LanguageFooter.propTypes = {
//  changeToLanguage: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default LanguageFooter;
