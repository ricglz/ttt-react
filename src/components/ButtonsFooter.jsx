import React, { Component } from "react";
import BoardButton from "./BoardButton";

class ButtonsFooter extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <div className="row justify-content-center">
        <BoardButton text="game.reset" func={this.props.reset} />
        <BoardButton text="shared.back" func={this.props.back} />
      </div>
    );
  }
}

export default ButtonsFooter;
