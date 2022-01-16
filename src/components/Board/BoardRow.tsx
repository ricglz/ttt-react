import React from 'react';
import type { GeneralBoardIndex } from '../../functions/HelperFunctions';
import type { BigBoardProps } from './BigBoard';
import Board from './Board';

interface Props extends BigBoardProps {
  rowNum: 0 | 3 | 6,
}

const BoardRow = ({
  rowNum, boardGame, currentBoard, handleClick,
}: Props) => (
  <div className="game row">
    <Board
      boardNum={rowNum}
      boardGame={boardGame}
      currentBoard={currentBoard}
      handleClick={handleClick}
    />
    <Board
      boardNum={rowNum + 1 as GeneralBoardIndex}
      boardGame={boardGame}
      currentBoard={currentBoard}
      handleClick={handleClick}
    />
    <Board
      boardNum={rowNum + 2 as GeneralBoardIndex}
      boardGame={boardGame}
      currentBoard={currentBoard}
      handleClick={handleClick}
    />
  </div>
);

export default BoardRow;
