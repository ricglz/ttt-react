import { Difficulty } from '../@types/general';
import AiAction from './AiAction';
import type { Board, GeneralBoardIndex } from './HelperFunctions';
import { isOccupied, emptyArray, Cell } from './HelperFunctions';

// TODO: Create a class to stop using this things
let boardCopy: Board | null = null;
let currentBoard: GeneralBoardIndex = 0;
let currentDifficulty: Difficulty = Difficulty.EASY;
let amountOccupied = emptyArray();
let avoidBox = emptyArray();

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

function getAvailableMoves() {
  const availableMoves: AiAction[] = [];
  if (boardCopy == null) {
    return [];
  }
  boardCopy.forEach((element, index) => {
    if (isOccupied(element) || boardCopy == null) return;
    const args = {
      pos: index as GeneralBoardIndex,
      currentDifficulty,
      boardCopy,
      currentBoard,
      amountOccupied,
      avoidBox,
    };
    availableMoves.push(new AiAction(args));
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
