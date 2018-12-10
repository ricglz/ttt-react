import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';

const BoardRow = ({
  rowNum, boardGame, currentBoard, handleClick,
}) => (
  <div className="game row">
    <Board
      boardNum={rowNum}
      boardGame={boardGame}
      currentBoard={currentBoard}
      handleClick={handleClick}
    />
    <Board
      boardNum={rowNum + 1}
      boardGame={boardGame}
      currentBoard={currentBoard}
      handleClick={handleClick}
    />
    <Board
      boardNum={rowNum + 2}
      boardGame={boardGame}
      currentBoard={currentBoard}
      handleClick={handleClick}
    />
  </div>
);

BoardRow.propTypes = {
  rowNum: PropTypes.number.isRequired,
  boardGame: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  currentBoard: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default BoardRow;
