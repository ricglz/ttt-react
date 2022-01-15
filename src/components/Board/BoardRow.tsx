import React from 'react';
import type { BigBoard, CurrentBoard } from '../../functions/HelperFunctions';
import Board from './Board';

type Props = {
  rowNum: 0 | 3 | 6,
  boardGame: BigBoard,
  currentBoard: CurrentBoard,
  handleClick: () => void,
};

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

export default BoardRow;
