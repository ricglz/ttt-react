import React from 'react';
import Row from './Row';

function boardClass(boardNum, currentBoard) {
  let boardClass = 'col-4 big-box';
  if (!(boardNum === currentBoard || currentBoard === -1)) {
    boardClass += ' grey-bg';
  }
  return boardClass;
}

const Board = props => (
  <div className={boardClass(props.boardNum, props.currentBoard)}>
    <Row
      rowNum={0}
      boardNum={props.boardNum}
      boardGame={props.boardGame}
      currentBoard={props.currentBoard}
      handleClick={props.handleClick}
    />
    <Row
      rowNum={3}
      boardNum={props.boardNum}
      boardGame={props.boardGame}
      currentBoard={props.currentBoard}
      handleClick={props.handleClick}
    />
    <Row
      rowNum={6}
      boardNum={props.boardNum}
      boardGame={props.boardGame}
      currentBoard={props.currentBoard}
      handleClick={props.handleClick}
    />
  </div>
);

export default Board;
