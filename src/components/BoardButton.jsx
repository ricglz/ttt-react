import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

class BoardButton extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div className="col">
        <button
          className="btn btn-game btn-lg btn-danger"
          onClick={this.props.func}
        >
          <FormattedMessage id={this.props.text} default="Back" />
        </button>
      </div>
    );
  }
}

export default BoardButton;
