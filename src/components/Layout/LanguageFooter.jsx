import React from "react";
import LanguageButton from "./LanguageButton";

const LanguageFooter = props => (
  <div
    className="row justify-content-center mt-5"
  >
    <LanguageButton
      changeLocale={props.changeToLanguage}
      currentLocale={props.locale}
      locale={props.locale}
    />
  </div>
);

export default LanguageFooter;
