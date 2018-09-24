import React, { Component } from "react";

class Cell extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  currentValue() {
    return this.props.boardGame[this.props.boardNum][this.props.cellNum];
  }

  drawValue() {
    switch (this.currentValue()) {
      case 1:
        return "X";
      case -1:
        return "O";
      default:
        return "";
    }
  }

  render() {
    return (
      <div
        className="col-4 box"
        onClick={() =>
          this.props.handleClick(this.props.boardNum, this.props.cellNum)
        }
      >
        <p className={this.drawValue()}>{this.drawValue()}</p>
      </div>
    );
  }
}

export default Cell;
