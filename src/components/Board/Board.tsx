import React from 'react';
import Row from './Row';
import type { CurrentBoard, GeneralBoardIndex } from '../../@types/general';
import type { BigBoardProps } from './BigBoard';

function boardClass(boardNum: GeneralBoardIndex, currentBoard: CurrentBoard) {
  let klass = 'col-4 big-box';
  if (!(boardNum === currentBoard || currentBoard === -1)) {
    klass += ' grey-bg';
  }
  return klass;
}

export interface BoardProps extends BigBoardProps {
  boardNum: GeneralBoardIndex,
}

const Board = ({
  boardNum, currentBoard, boardGame, handleClick,
}: BoardProps) => (
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

export default Board;
