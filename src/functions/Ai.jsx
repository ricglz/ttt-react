import { isOccupied, emptyArray } from './HelperFunctions';

let boardCopy = null;
let currentBoard = null;
let currentDifficulty = null;
let amountOccupied = emptyArray();
let avoidBox = emptyArray();

function someOneCouldWin(value1, value2, player = false) {
  const hopedValue = player ? 1 : -1;
  return (value1 === hopedValue && !isOccupied(value2))
    || (value2 === hopedValue && !isOccupied(value1));
}

// Identifies which letter are the one near it and if it would be more valuable
// to do the move or not
function whatAreBoth(column1, column2) {
  const value1 = boardCopy[column1];
  const value2 = boardCopy[column2];
  if (value1 === value2) {
    if (value1 === 1) return 50;
    if (value2 === -1) return 9000;
  }
  let value = 0;
  if (someOneCouldWin(value1, value2, true)) value += 15;
  if (someOneCouldWin(value1, value2)) value += 40;
  return value;
}

// Checks if the position chosen could stop a winning of the oponent or if
// itself could win in diagonal
function extraValueDiagonal(div, pos) {
  if (pos === 1 || pos === 3 || pos === 5 || pos === 7) return 0;
  if (pos === 4) return whatAreBoth(0, 8) || whatAreBoth(2, 6);
  if (div !== 0) {
    if (pos === 8) return whatAreBoth(0, 4);
    return whatAreBoth(2, 4);
  }
  if (pos === 0) return whatAreBoth(4, 8);
  return whatAreBoth(4, 6);
}

// Checks if the position chosen could stop a winning of the oponent or if itself could win in a row
function extraValueRow(div, mod) {
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
function extraValueColumn(div, mod) {
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

function positiveValues(pos) {
  const div = Math.floor(pos / 3);


  const mod = pos % 3;
  return (
    extraValueColumn(div, mod)
    + extraValueRow(div, mod)
    + extraValueDiagonal(div, pos)
  );
}

function recursiveMovement(pos) {
  if (pos === currentBoard) return 20;
  return 0;
}

function negativeValues(pos) {
  return recursiveMovement(pos) + amountOccupied[pos] + avoidBox[pos];
}

function getValue(pos) {
  let value = positiveValues(pos);
  if (currentDifficulty === 3) value -= negativeValues(pos);
  return value;
}

// Checks which are the more factible actions to play
function different(availableMoves) {
  const min = availableMoves[0].value;
  let erasePos = 1;
  while (
    erasePos < availableMoves.length
    && min === availableMoves[erasePos].value
  ) {
    erasePos += 1;
  }
  return erasePos;
}

function deleteElements(availableMoves) {
  if (availableMoves.length > 1) {
    availableMoves.sort((a, b) => b.value - a.value);
    const erasePos = different(availableMoves);
    if (erasePos < availableMoves.length) {
      availableMoves.splice(erasePos, availableMoves.length - erasePos);
    }
  }
  return availableMoves;
}

function AiAction(pos) {
  this.pos = pos;
  this.value = getValue(pos);
}

function getAvailableMoves() {
  const availableMoves = [];
  for (let index = 0; index < boardCopy.length; index += 1) {
    const element = boardCopy[index];
    if (!isOccupied(element)) {
      availableMoves.push(new AiAction(index));
    }
  }
  return availableMoves;
}

function areTwoValue(value) {
  if (value === 1) return 90;
  return 40;
}

function areTwo(pos1, pos2, pos3) {
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

export function playerMadeAMove(boardId, board) {
  amountOccupied[boardId] += 3;
  boardCopy = board;
  avoidBox[boardId] = areTwoInTheBoard();
}

export function aiMadeAMove(boardId, board) {
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

export default function makeMove(board, boardId, difficulty) {
  boardCopy = board;
  currentBoard = boardId;
  currentDifficulty = difficulty;
  let availableMoves = getAvailableMoves();
  if (currentDifficulty >= 2) {
    availableMoves = deleteElements(availableMoves);
  }
  return availableMoves[Math.floor(Math.random() * availableMoves.length)].pos;
}
