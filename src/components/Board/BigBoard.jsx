import React from "react";
import BoardRow from "./BoardRow";

const BigBoard = props => (
  <div className="game row justify-content-center">
    <div className="col-9 col-sm-8 col-md-7 col-lg-6 col-xl-6">
      <BoardRow
        rowNum={0}
        boardGame={props.boardGame}
        currentBoard={props.currentBoard}
        handleClick={props.handleClick}
      />
      <BoardRow
        rowNum={3}
        boardGame={props.boardGame}
        currentBoard={props.currentBoard}
        handleClick={props.handleClick}
      />
      <BoardRow
        rowNum={6}
        boardGame={props.boardGame}
        currentBoard={props.currentBoard}
        handleClick={props.handleClick}
      />
    </div>
  </div>
);

export default BigBoard;
