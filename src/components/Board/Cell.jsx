import React from "react";

const currentValue = (boardGame, boardNum, cellNum) =>
  boardGame[boardNum][cellNum];

function drawValue(boardGame, boardNum, cellNum) {
  switch (currentValue(boardGame, boardNum, cellNum)) {
    case 1:
      return "X";
    case -1:
      return "O";
    default:
      return "";
  }
}

const Cell = props => {
  var value = drawValue(props.boardGame, props.boardNum, props.cellNum);
  return (
    <div
      className="col-4 box"
      onClick={() =>
        props.handleClick(props.boardNum, props.cellNum)
      }
    >
      <p className={value}>{value}</p>
    </div>
  );
};

export default Cell;
