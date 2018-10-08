import React, { Component } from "react";
import '../css/language-button.css'

class LanguageButton extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  getClassName() {
    var className = "btn w-100 locale-button";
    if(this.props.locale === this.props.currentLocale) {
      className += " current-locale";
    }
    return className;
  }

  render() {
    const locale = this.props.locale;
    return (
      <div className="col-1 border-right">
        <button
          onClick={() => this.props.changeLocale(locale)}
          className={this.getClassName()}
        >
          {locale}
        </button>
      </div>
    );
  }
}

export default LanguageButton;
