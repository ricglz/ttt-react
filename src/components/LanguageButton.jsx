import React, { Component } from "react";

class LanguageButton extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    const locale = this.props.locale;
    return (
      <div className="col-1 border-right">
        <button
          onClick={() => this.props.changeLocale(locale)}
          className="btn w-100"
        >
          {locale}
        </button>
      </div>
    );
  }
}

export default LanguageButton;
