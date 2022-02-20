import React from 'react';

import type { BigBoard, GeneralBoardIndex } from '../../@types/general';
import type { BoardProps } from './Board';

import { Player, Cell as CellEnum } from '../../@types/general_enums';

type Args = {
  boardGame: BigBoard,
  boardNum: GeneralBoardIndex,
  cellNum: GeneralBoardIndex
};

const currentValue = ({
  boardGame,
  boardNum,
  cellNum,
}: Args) => (
  boardGame[boardNum][cellNum]
);

function drawValue(args: Args) {
  switch (currentValue(args)) {
    case CellEnum.X:
      return Player.PLAYER_1;
    case CellEnum.O:
      return Player.PLAYER_2;
    default:
      return '';
  }
}

const emptyFunction = () => {};

interface Props extends BoardProps {
  cellNum: GeneralBoardIndex
}

const Cell = ({
  boardGame, boardNum, cellNum, handleClick,
}: Props) => {
  const value = drawValue({ boardGame, boardNum, cellNum });
  const onClick = React.useCallback(() => {
    handleClick(boardNum, cellNum);
  }, [boardNum, cellNum, handleClick]);
  return (
    <div
      className="col-4 box"
      onClick={onClick}
      onKeyDown={emptyFunction}
      role="button"
      tabIndex={-1}
    >
      <p className={value.toLowerCase()}>{value}</p>
    </div>
  );
};

export default Cell;
