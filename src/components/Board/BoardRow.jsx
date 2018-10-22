import React from "react";
import Board from "./Board";

const BoardRow = props => (
  <div className="game row">
    <Board
      boardNum={props.rowNum}
      boardGame={props.boardGame}
      currentBoard={props.currentBoard}
      handleClick={props.handleClick}
    />
    <Board
      boardNum={props.rowNum + 1}
      boardGame={props.boardGame}
      currentBoard={props.currentBoard}
      handleClick={props.handleClick}
    />
    <Board
      boardNum={props.rowNum + 2}
      boardGame={props.boardGame}
      currentBoard={props.currentBoard}
      handleClick={props.handleClick}
    />
  </div>
);

export default BoardRow;
