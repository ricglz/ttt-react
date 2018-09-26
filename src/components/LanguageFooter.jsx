import React, { Component } from "react";
import LanguageButton from "./LanguageButton";

class LanguageFooter extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div className="row justify-content-center mt-5">
        <LanguageButton changeLocale={this.props.changeLocale} locale="es" />
        <LanguageButton changeLocale={this.props.changeLocale} locale="en" />
        <LanguageButton changeLocale={this.props.changeLocale} locale="fr" />
      </div>
    );
  }
}

export default LanguageFooter;
