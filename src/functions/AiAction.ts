import type { GeneralBoardIndex, Board, NumberBoard } from "types/general";
import { Cell, Difficulty } from "types/general_enums";

import { isOccupied } from "./HelperFunctions";

type AiArgs = {
  pos: GeneralBoardIndex;
  currentDifficulty: Difficulty;
  boardCopy: Board;
  currentBoard: GeneralBoardIndex;
  amountOccupied: NumberBoard;
  avoidBox: NumberBoard;
};
type ArgsWithoutDifficulty = Omit<AiArgs, "currentDifficulty">;

function someOneCouldWin(value1: Cell, value2: Cell, player = false) {
  const hopedValue = player ? Cell.X : Cell.O;
  return (
    (value1 === hopedValue && !isOccupied(value2)) ||
    (value2 === hopedValue && !isOccupied(value1))
  );
}

const aiCouldWin = (value1: Cell, value2: Cell) =>
  someOneCouldWin(value1, value2);
const playerCouldWin = (value1: Cell, value2: Cell) =>
  someOneCouldWin(value1, value2, true);

// Identifies which letter are the one near it and if it would be more valuable
// to do the move or not
function whatAreBoth(
  column1: GeneralBoardIndex,
  column2: GeneralBoardIndex,
  { boardCopy }: ArgsWithoutDifficulty
) {
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
function extraValueDiagonal(
  div: number,
  pos: GeneralBoardIndex,
  args: ArgsWithoutDifficulty
) {
  if (pos === 1 || pos === 3 || pos === 5 || pos === 7) return 0;
  if (pos === 4) return whatAreBoth(0, 8, args) + whatAreBoth(2, 6, args);
  if (div !== 0) {
    if (pos === 8) return whatAreBoth(0, 4, args);
    return whatAreBoth(2, 4, args);
  }
  if (pos === 0) return whatAreBoth(4, 8, args);
  return whatAreBoth(4, 6, args);
}

// Checks if the position chosen could stop a winning of the oponent or if itself could win in a row
function extraValueRow(div: number, mod: number, args: ArgsWithoutDifficulty) {
  switch (div) {
    case 0:
      if (mod === 0) return whatAreBoth(1, 2, args);
      if (mod === 1) return whatAreBoth(0, 2, args);
      return whatAreBoth(0, 1, args);
    case 1:
      if (mod === 0) return whatAreBoth(4, 5, args);
      if (mod === 1) {
        return whatAreBoth(3, 5, args);
      }
      return whatAreBoth(3, 4, args);
    default:
      if (mod === 0) return whatAreBoth(7, 8, args);
      if (mod === 1) return whatAreBoth(6, 8, args);
      return whatAreBoth(6, 7, args);
  }
}

// Checks if the position chosen could stop a winning of the oponent or if
// itself could win in a column
function extraValueColumn(
  div: number,
  mod: number,
  args: ArgsWithoutDifficulty
) {
  switch (mod) {
    case 0:
      if (div === 0) return whatAreBoth(3, 6, args);
      if (div === 1) return whatAreBoth(0, 6, args);
      return whatAreBoth(0, 3, args);
    case 1:
      if (div === 0) return whatAreBoth(4, 7, args);
      if (div === 1) return whatAreBoth(1, 7, args);
      return whatAreBoth(1, 4, args);
    default:
      if (div === 0) return whatAreBoth(5, 8, args);
      if (div === 1) return whatAreBoth(2, 8, args);
      return whatAreBoth(2, 5, args);
  }
}

function positiveValues(args: ArgsWithoutDifficulty) {
  const { pos } = args;
  const div = Math.floor(pos / 3);
  const mod = pos % 3;
  return (
    extraValueColumn(div, mod, args) +
    extraValueRow(div, mod, args) +
    extraValueDiagonal(div, pos, args)
  );
}

const recursiveMovement = ({ pos, currentBoard }: ArgsWithoutDifficulty) =>
  pos === currentBoard ? 20 : 0;

function negativeValues(args: ArgsWithoutDifficulty) {
  const { amountOccupied, avoidBox, pos } = args;
  return recursiveMovement(args) + amountOccupied[pos] + avoidBox[pos];
}

function getValue({ currentDifficulty, ...rest }: AiArgs) {
  let value = positiveValues(rest);
  if (currentDifficulty === Difficulty.HARD) value -= negativeValues(rest);
  return value;
}

class AiAction {
  pos: GeneralBoardIndex;

  value: number;

  constructor(args: AiArgs) {
    this.pos = args.pos;
    this.value = getValue(args);
  }
}

export default AiAction;
