import React from 'react';
import LanguageButton from '../Layout/LanguageButton';
import LANGUAGES from './Languages';

const renderButtons = props => LANGUAGES.map(lang => (
  <LanguageButton
    changeLocale={props.changeLocale}
    currentLocale={props.locale}
    locale={lang}
    key={lang}
  />
));

const LanguagePage = props => (
  <div className="row justify-content-center mt-5">{renderButtons(props)}</div>
);

export default LanguagePage;
