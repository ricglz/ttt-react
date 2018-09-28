import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

class Header extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    let text;
    if (this.props.ai) {
      text = <FormattedMessage id="shared.sp" default="Single Player" />;
    } else {
      text = <FormattedMessage id="shared.mp" default="Local Multiplayer" />;
    }
    let score = <FormattedMessage id="game.score" default="Score" />;
    let xScore = <FormattedMessage id="game.xScore" default="X's score" />;
    let oScore = <FormattedMessage id="game.oScore" default="O's score" />;
    return (
      <div className="row">
        <div className="col-12">
          <h1>{text}</h1>
        </div>
        <div className="col-12">
          <h2>{score}</h2>
        </div>
        <div className="col-12">
          <div className="row justify-content-between">
            <div className="col xScore">
              <p> {xScore}: {this.props.xScore} </p>
            </div>
            <div className="col oScore">
              <p> {oScore}: {this.props.oScore} </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
