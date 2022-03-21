import type { Board, GeneralBoardIndex, NumberBoard } from "types/general";

import AiAction from "./AiAction";
import { Cell, Difficulty } from "types/general_enums";
import { isOccupied, emptyArray } from "./HelperFunctions";

interface Args {
  board: Board;
  currentBoard: GeneralBoardIndex;
  currentDifficulty: Difficulty;
}

interface AiProperties extends Args {
  amountOccupied: NumberBoard;
  avoidBox: NumberBoard;
}

function areTwoValue(value: Cell) {
  if (value === Cell.X) return 90;
  return 40;
}

// Checks which are the more factible actions to play
function different(availableMoves: AiAction[]) {
  const min = availableMoves[0].value;
  return availableMoves.findIndex((action) => action.value > min);
}

function deleteElements(availableMoves: AiAction[]) {
  availableMoves.sort((a, b) => b.value - a.value);
  const erasePos = different(availableMoves);
  if (erasePos !== -1) {
    availableMoves.splice(erasePos, availableMoves.length - erasePos);
  }
  return availableMoves;
}

function getAvailableMoves(props: AiProperties) {
  const availableMoves: AiAction[] = [];
  props.board.forEach((element, index) => {
    if (isOccupied(element)) {
      return;
    }
    const pos = index as GeneralBoardIndex;
    availableMoves.push(
      new AiAction({ pos, boardCopy: props.board, ...props })
    );
  });
  return availableMoves;
}

class Ai {
  board: Board;

  currentBoard: GeneralBoardIndex;

  currentDifficulty: Difficulty;

  amountOccupied = emptyArray();

  avoidBox = emptyArray();

  constructor({ board, currentBoard, currentDifficulty }: Args) {
    this.board = board;
    this.currentDifficulty = currentDifficulty;
    this.currentBoard = currentBoard;
  }

  setVariables = ({ board, currentBoard, currentDifficulty }: Args) => {
    this.board = board;
    this.currentDifficulty = currentDifficulty;
    this.currentBoard = currentBoard;
  };

  getProperties = (): AiProperties => ({
    amountOccupied: this.amountOccupied,
    avoidBox: this.avoidBox,
    board: this.board,
    currentBoard: this.currentBoard,
    currentDifficulty: this.currentDifficulty,
  });

  areTwo = (
    pos1: GeneralBoardIndex,
    pos2: GeneralBoardIndex,
    pos3: GeneralBoardIndex
  ) => {
    const value1 = this.board[pos1];
    const value2 = this.board[pos2];
    const value3 = this.board[pos3];

    const firstIsOccupied = isOccupied(value1);
    const secondIsOccupied = isOccupied(value2);

    if (
      (value1 === value2 && firstIsOccupied && !isOccupied(value3)) ||
      (value1 === value3 && firstIsOccupied && !secondIsOccupied)
    ) {
      return areTwoValue(value1);
    }
    if (value2 === value3 && secondIsOccupied && !firstIsOccupied) {
      return areTwoValue(value2);
    }
    return 0;
  };

  areTwoInTheColumn = () =>
    this.areTwo(0, 3, 6) + this.areTwo(1, 4, 7) + this.areTwo(2, 5, 8);

  areTwoInTheRow = () =>
    this.areTwo(0, 1, 2) + this.areTwo(3, 4, 5) + this.areTwo(6, 7, 8);

  areTwoInTheDiagonal = () => this.areTwo(0, 4, 8) + this.areTwo(2, 4, 6);

  areTwoInTheBoard = () =>
    this.areTwoInTheColumn() +
    this.areTwoInTheDiagonal() +
    this.areTwoInTheRow();

  playerMadeAMove = (boardId: GeneralBoardIndex, board: Board) => {
    this.amountOccupied[boardId] += 3;
    this.board = board;
    this.avoidBox[boardId] = this.areTwoInTheBoard();
  };

  aiMadeAMove = (board: Board) => {
    this.amountOccupied[this.currentBoard] += 1;
    this.board = board;
    this.avoidBox[this.currentBoard] = this.areTwoInTheBoard();
  };

  cleanVariables = () => {
    this.amountOccupied = emptyArray();
    this.avoidBox = emptyArray();
  };

  makeMove = (args: Args) => {
    this.setVariables(args);
    const properties = this.getProperties();
    let availableMoves = getAvailableMoves(properties);
    if (this.currentDifficulty >= Difficulty.NORMAL) {
      availableMoves = deleteElements(availableMoves);
    }
    const index = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[index].pos;
  };
}

export default Ai;
