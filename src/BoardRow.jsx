import React, { Component } from 'react';
import Board from './Board';

class BoardRow extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render(){
    return (
      <div className="row">
        <Board
          boardNum={this.props.rowNum}
          boardGame={this.props.boardGame}
          currentBoard={this.props.currentBoard}            
          handleClick={this.props.handleClick}
        />
        <Board
          boardNum={this.props.rowNum + 1}
          boardGame={this.props.boardGame}
          currentBoard={this.props.currentBoard}            
          handleClick={this.props.handleClick}
        />
        <Board
          boardNum={this.props.rowNum + 2}
          boardGame={this.props.boardGame}
          currentBoard={this.props.currentBoard}            
          handleClick={this.props.handleClick}
        />
      </div>
    );
  }
}

export default BoardRow;