import React, { Component } from "react";
import Cell from "./Cell";

class Row extends Component {
  render() {
    return (
      <div className="game row cell-row">
        <Cell
          cellNum={this.props.rowNum}
          boardNum={this.props.boardNum}
          boardGame={this.props.boardGame}
          currentBoard={this.props.currentBoard}
          handleClick={this.props.handleClick}
        />
        <Cell
          cellNum={this.props.rowNum + 1}
          boardNum={this.props.boardNum}
          boardGame={this.props.boardGame}
          currentBoard={this.props.currentBoard}
          handleClick={this.props.handleClick}
        />
        <Cell
          cellNum={this.props.rowNum + 2}
          boardNum={this.props.boardNum}
          boardGame={this.props.boardGame}
          currentBoard={this.props.currentBoard}
          handleClick={this.props.handleClick}
        />
      </div>
    );
  }
}

export default Row;
