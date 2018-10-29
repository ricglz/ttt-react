import React from "react";
import "../../css/language-button.css";

function getClassName(props) {
  var className = "btn w-100 locale-button";
  if (props.locale === props.currentLocale) {
    className += " current-locale";
  }
  return className;
}

const LanguageButton = props => (
  <div className="col-4 col-lg-4 col-xl-4 border-right border-top">
    <button
      onClick={() => props.changeLocale(props.locale)}
      className={getClassName(props)}
    >
      {props.locale}
    </button>
  </div>
);

export default LanguageButton;
