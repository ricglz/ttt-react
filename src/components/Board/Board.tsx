import type { CurrentBoard, GeneralBoardIndex } from "@/types/general";
import Row from "./Row";
import type { BigBoardProps } from "./BigBoard";

function boardClass(boardNum: GeneralBoardIndex, currentBoard: CurrentBoard) {
  let klass = "col-4 big-box";
  if (currentBoard !== -1 && boardNum !== currentBoard) {
    klass += " grey-bg";
  }
  return klass;
}

export interface BoardProps extends BigBoardProps {
  boardNum: GeneralBoardIndex;
}

const Board = ({
  boardNum,
  currentBoard,
  boardGame,
  handleClick,
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
