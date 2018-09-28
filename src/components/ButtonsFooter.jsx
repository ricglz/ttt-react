import React, { Component } from "react";
import BoardButton from "./BoardButton";
import { FormattedMessage } from "react-intl";

class ButtonsFooter extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    let reset = <FormattedMessage id="game.reset" default="Easy" />;
    let back = <FormattedMessage id="shared.back" default="Back" />;
    return (
      <div className="row justify-content-center">
        <BoardButton text={reset} func={this.props.reset} />
        <BoardButton text={back} func={this.props.back} />
      </div>
    );
  }
}

export default ButtonsFooter;
