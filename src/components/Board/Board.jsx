import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

function boardClass(boardNum, currentBoard) {
  let klass = 'col-4 big-box';
  if (!(boardNum === currentBoard || currentBoard === -1)) {
    klass += ' grey-bg';
  }
  return klass;
}

const Board = ({
  boardNum, currentBoard, boardGame, handleClick,
}) => (
  <div className={boardClass(boardNum, currentBoard)}>
    <Row
      rowNum={0}
      boardNum={boardNum}
      boardGame={boardGame}
      currentBoard={currentBoard}
      handleClick={handleClick}
    />
    <Row
      rowNum={3}
      boardNum={boardNum}
      boardGame={boardGame}
      currentBoard={currentBoard}
      handleClick={handleClick}
    />
    <Row
      rowNum={6}
      boardNum={boardNum}
      boardGame={boardGame}
      currentBoard={currentBoard}
      handleClick={handleClick}
    />
  </div>
);

Board.propTypes = {
  boardNum: PropTypes.number.isRequired,
  currentBoard: PropTypes.number.isRequired,
  boardGame: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Board;
