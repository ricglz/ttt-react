import type { Board, GeneralBoardIndex } from './HelperFunctions';
import { isOccupied, emptyArray, Cell } from './HelperFunctions';

export const enum Difficulty {
  EASY = 1,
  NORMAL = 2,
  HARD = 3,
}

// TODO: Create a class to stop using this things
let boardCopy: Board | null = null;
let currentBoard: GeneralBoardIndex = 0;
let currentDifficulty: Difficulty = Difficulty.EASY;
let amountOccupied = emptyArray();
let avoidBox = emptyArray();

function someOneCouldWin(value1: Cell, value2: Cell, player = false) {
  const hopedValue = player ? Cell.X : Cell.O;
  return (value1 === hopedValue && !isOccupied(value2))
    || (value2 === hopedValue && !isOccupied(value1));
}

const aiCouldWin = (value1: Cell, value2: Cell) => someOneCouldWin(value1, value2);
const playerCouldWin = (value1: Cell, value2: Cell) => someOneCouldWin(value1, value2, true);

// Identifies which letter are the one near it and if it would be more valuable
// to do the move or not
function whatAreBoth(column1: GeneralBoardIndex, column2: GeneralBoardIndex) {
  if (boardCopy == null) {
    throw Error('At this point board should have a copy');
  }
  const value1 = boardCopy[column1];
  const value2 = boardCopy[column2];
  if (value1 === value2) {
    if (value1 === Cell.X) return 50;
    if (value2 === Cell.O) return 9000;
  }
  let value = 0;
  if (playerCouldWin(value1, value2)) value += 15;
  if (aiCouldWin(value1, value2)) value += 40;
  return value;
}

// Checks if the position chosen could stop a winning of the oponent or if
// itself could win in diagonal
function extraValueDiagonal(div: number, pos: GeneralBoardIndex) {
  if (pos === 1 || pos === 3 || pos === 5 || pos === 7) return 0;
  if (pos === 4) return whatAreBoth(0, 8) + whatAreBoth(2, 6);
  if (div !== 0) {
    if (pos === 8) return whatAreBoth(0, 4);
    return whatAreBoth(2, 4);
  }
  if (pos === 0) return whatAreBoth(4, 8);
  return whatAreBoth(4, 6);
}

// Checks if the position chosen could stop a winning of the oponent or if itself could win in a row
function extraValueRow(div: number, mod: number) {
  switch (div) {
    case 0:
      if (mod === 0) return whatAreBoth(1, 2);
      if (mod === 1) return whatAreBoth(0, 2);
      return whatAreBoth(0, 1);
    case 1:
      if (mod === 0) return whatAreBoth(4, 5);
      if (mod === 1) {
        return whatAreBoth(3, 5);
      }
      return whatAreBoth(3, 4);
    default:
      if (mod === 0) return whatAreBoth(7, 8);
      if (mod === 1) return whatAreBoth(6, 8);
      return whatAreBoth(6, 7);
  }
}

// Checks if the position chosen could stop a winning of the oponent or if
// itself could win in a column
function extraValueColumn(div: number, mod: number) {
  switch (mod) {
    case 0:
      if (div === 0) return whatAreBoth(3, 6);
      if (div === 1) return whatAreBoth(0, 6);
      return whatAreBoth(0, 3);
    case 1:
      if (div === 0) return whatAreBoth(4, 7);
      if (div === 1) return whatAreBoth(1, 7);
      return whatAreBoth(1, 4);
    default:
      if (div === 0) return whatAreBoth(5, 8);
      if (div === 1) return whatAreBoth(2, 8);
      return whatAreBoth(2, 5);
  }
}

function positiveValues(pos: GeneralBoardIndex) {
  const div: number = Math.floor(pos / 3);
  const mod: number = (pos % 3);
  return (
    extraValueColumn(div, mod)
    + extraValueRow(div, mod)
    + extraValueDiagonal(div, pos)
  );
}

function recursiveMovement(pos: GeneralBoardIndex) {
  return pos === currentBoard ? 20 : 0;
}

function negativeValues(pos: GeneralBoardIndex) {
  return recursiveMovement(pos) + amountOccupied[pos] + avoidBox[pos];
}

function getValue(pos: GeneralBoardIndex) {
  let value = positiveValues(pos);
  if (currentDifficulty === Difficulty.HARD) value -= negativeValues(pos);
  return value;
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

class AiAction {
  pos: GeneralBoardIndex;

  value: number;

  constructor(pos: GeneralBoardIndex) {
    this.pos = pos;
    this.value = getValue(pos);
  }
}

function isWithinRange(index: number): index is GeneralBoardIndex {
  return index >= 0 && index <= 8;
}

function getAvailableMoves() {
  const availableMoves: AiAction[] = [];
  if (boardCopy == null) {
    return [];
  }
  boardCopy.forEach((element, index) => {
    if (isOccupied(element) || !isWithinRange(index)) return;
    availableMoves.push(new AiAction(index));
  });
  return availableMoves;
}

function areTwoValue(value: Cell) {
  if (value === Cell.X) return 90;
  return 40;
}

function areTwo(pos1: GeneralBoardIndex, pos2: GeneralBoardIndex, pos3: GeneralBoardIndex) {
  if (boardCopy == null) {
    return 0;
  }
  const value1 = boardCopy[pos1];
  const value2 = boardCopy[pos2];
  const value3 = boardCopy[pos3];
  if (
    (value1 === value2 && isOccupied(value1) && !isOccupied(value3))
    || (value1 === value3 && isOccupied(value1) && !isOccupied(value2))
  ) {
    return areTwoValue(value1);
  }
  if (value2 === value3 && isOccupied(value2) && !isOccupied(value1)) {
    return areTwoValue(value2);
  }
  return 0;
}

function areTwoInTheColumn() {
  return areTwo(0, 3, 6) + areTwo(1, 4, 7) + areTwo(2, 5, 8);
}

function areTwoInTheRow() {
  return areTwo(0, 1, 2) + areTwo(3, 4, 5) + areTwo(6, 7, 8);
}

function areTwoInTheDiagonal() {
  return areTwo(0, 4, 8) + areTwo(2, 4, 6);
}

function areTwoInTheBoard() {
  return areTwoInTheColumn() + areTwoInTheDiagonal() + areTwoInTheRow();
}

export function playerMadeAMove(boardId: GeneralBoardIndex, board: Board) {
  amountOccupied[boardId] += 3;
  boardCopy = board;
  avoidBox[boardId] = areTwoInTheBoard();
}

export function aiMadeAMove(boardId: GeneralBoardIndex, board: Board) {
  amountOccupied[boardId] += 1;
  boardCopy = board;
  avoidBox[boardId] = areTwoInTheBoard();
}

export function cleanVariables() {
  amountOccupied = emptyArray();
  avoidBox = emptyArray();
}

/* function print(availableMoves) {
  for (consti = 0; i < availableMoves.length; i++) {
    const element = availableMoves[i];
    console.log(element.pos + ": " + element.value);
  }
} */

export default function makeMove(board: Board, boardId: GeneralBoardIndex, difficulty: Difficulty) {
  boardCopy = board;
  currentBoard = boardId;
  currentDifficulty = difficulty;
  let availableMoves = getAvailableMoves();
  if (currentDifficulty >= 2) {
    availableMoves = deleteElements(availableMoves);
  }
  return availableMoves[Math.floor(Math.random() * availableMoves.length)].pos;
}
