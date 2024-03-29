import type { BigBoard as BigBoardType, CurrentBoard } from "@/types/general";
import BoardRow from "./BoardRow";

export interface BigBoardProps {
  boardGame: BigBoardType;
  currentBoard: CurrentBoard;
  handleClick: (board: number, id: number) => void;
}

const BigBoard = ({ boardGame, currentBoard, handleClick }: BigBoardProps) => (
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

export default BigBoard;
