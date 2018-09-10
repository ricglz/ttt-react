import React, { Component } from 'react';
import Row from './Row';

class Board extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  boardClass() {
    var boardClass = "col-4 big-box";
    const boardNum = this.props.boardNum;
    const currentBoard = this.props.currentBoard;
    if (!(boardNum === currentBoard || currentBoard === -1)) {
      boardClass += " grey-bg";
    }
    return boardClass;
  }

  render(){
    return (
      <div className={this.boardClass()}>
        <Row
          rowNum={0}
          boardNum={this.props.boardNum}
          boardGame={this.props.boardGame}
          currentBoard={this.props.currentBoard}            
          handleClick={this.props.handleClick}
        />
        <Row
          rowNum={3}
          boardNum={this.props.boardNum}
          boardGame={this.props.boardGame}
          currentBoard={this.props.currentBoard}            
          handleClick={this.props.handleClick}
        />
        <Row
          rowNum={6}
          boardNum={this.props.boardNum}
          boardGame={this.props.boardGame}
          currentBoard={this.props.currentBoard}            
          handleClick={this.props.handleClick}
        />
      </div>
    );
  }
}

export default Board;