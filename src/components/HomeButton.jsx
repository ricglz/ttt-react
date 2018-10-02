import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

class HomeButton extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div className="row justify-content-center border-top py-3">
        <button
          type="button"
          onClick={this.props.func}
          className="btn btn-home"
        >
          <FormattedMessage id={this.props.text} />
        </button>
      </div>
    );
  }
}

export default HomeButton;
