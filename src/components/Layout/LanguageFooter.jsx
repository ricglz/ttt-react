import React from "react";
import LanguageButton from "./LanguageButton";

const LanguageFooter = props => (
  <div className="row justify-content-center mt-5">
    <LanguageButton
      changeLocale={props.changeLocale}
      currentLocale={props.locale}
      locale="es"
    />
    <LanguageButton
      changeLocale={props.changeLocale}
      currentLocale={props.locale}
      locale="en"
    />
    <LanguageButton
      changeLocale={props.changeLocale}
      currentLocale={props.locale}
      locale="fr"
    />
    <LanguageButton
      changeLocale={props.changeLocale}
      currentLocale={props.locale}
      locale="pt"
    />
    <LanguageButton
      changeLocale={props.changeLocale}
      currentLocale={props.locale}
      locale="it"
    />
    <LanguageButton
      changeLocale={props.changeLocale}
      currentLocale={props.locale}
      locale="hi"
    />
    <LanguageButton
      changeLocale={props.changeLocale}
      currentLocale={props.locale}
      locale="mr"
    />
    <LanguageButton
      changeLocale={props.changeLocale}
      currentLocale={props.locale}
      locale="kr"
    />
    <LanguageButton
      changeLocale={props.changeLocale}
      currentLocale={props.locale}
      locale="jp"
    />
    <LanguageButton
      changeLocale={props.changeLocale}
      currentLocale={props.locale}
      locale="da"
    />
  </div>
);

export default LanguageFooter;
