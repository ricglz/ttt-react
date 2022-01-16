import React from 'react';
import { GeneralBoardIndex } from '../../functions/HelperFunctions';
import type { BoardProps } from './Board';
import Cell from './Cell';

interface Props extends BoardProps {
  rowNum: 0 | 3 | 6,
}

const Row = ({
  rowNum, boardNum, boardGame, currentBoard, handleClick,
}: Props) => (
  <div className="game row cell-row">
    <Cell
      cellNum={rowNum}
      boardNum={boardNum}
      boardGame={boardGame}
      currentBoard={currentBoard}
      handleClick={handleClick}
    />
    <Cell
      cellNum={rowNum + 1 as GeneralBoardIndex}
      boardNum={boardNum}
      boardGame={boardGame}
      currentBoard={currentBoard}
      handleClick={handleClick}
    />
    <Cell
      cellNum={rowNum + 2 as GeneralBoardIndex}
      boardNum={boardNum}
      boardGame={boardGame}
      currentBoard={currentBoard}
      handleClick={handleClick}
    />
  </div>
);

export default Row;
