import React from 'react';
import PropTypes from 'prop-types';
import BoardRow from './BoardRow';

const BigBoard = ({ boardGame, currentBoard, handleClick }) => (
  <div className="game row justify-content-center">
    <div className="col-9 col-sm-8 col-md-7 col-lg-6 col-xl-6">
      <BoardRow
        rowNum={0}
        boardGame={boardGame}
        currentBoard={currentBoard}
        handleClick={handleClick}
      />
      <BoardRow
        rowNum={3}
        boardGame={boardGame}
        currentBoard={currentBoard}
        handleClick={handleClick}
      />
      <BoardRow
        rowNum={6}
        boardGame={boardGame}
        currentBoard={currentBoard}
        handleClick={handleClick}
      />
    </div>
  </div>
);

BigBoard.propTypes = {
  boardGame: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentBoard: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default BigBoard;
