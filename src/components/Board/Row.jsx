import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

const Row = ({
  rowNum, boardNum, boardGame, currentBoard, handleClick,
}) => (
  <div className="game row cell-row">
    <Cell
      cellNum={rowNum}
      boardNum={boardNum}
      boardGame={boardGame}
      currentBoard={currentBoard}
      handleClick={handleClick}
    />
    <Cell
      cellNum={rowNum + 1}
      boardNum={boardNum}
      boardGame={boardGame}
      currentBoard={currentBoard}
      handleClick={handleClick}
    />
    <Cell
      cellNum={rowNum + 2}
      boardNum={boardNum}
      boardGame={boardGame}
      currentBoard={currentBoard}
      handleClick={handleClick}
    />
  </div>
);

Row.propTypes = {
  rowNum: PropTypes.number.isRequired,
  boardNum: PropTypes.number.isRequired,
  boardGame: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentBoard: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Row;
