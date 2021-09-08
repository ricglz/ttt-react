import React from 'react';
import LanguageButton from '../Layout/LanguageButton';
import LANGUAGES from './Languages';

const renderButtons = ({ changeLocale, locale, history }) => LANGUAGES.map((lang) => (
  <LanguageButton
    changeLocale={changeLocale}
    currentLocale={locale}
    history={history}
    locale={lang}
    key={lang}
  />
));

const LanguagePage = (props) => (
  <div className="row justify-content-center mt-5">{renderButtons(props)}</div>
);

export default LanguagePage;
