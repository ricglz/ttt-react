import React from "react";
import LanguageButton from "./LanguageButton";
import LANGUAGES from "./Languages";

const renderButtons = props => {
  return LANGUAGES.map(lang => (
    <LanguageButton
      changeLocale={props.changeLocale}
      currentLocale={props.locale}
      locale={lang}
      key={lang}
    />
  ));
};

const LanguageFooter = props => (
  <div className="row justify-content-center mt-5">{renderButtons(props)}</div>
);

export default LanguageFooter;
