import { toast } from 'react-hot-toast';
import type {
  BigBoard,
  Board,
  GeneralBoardIndex,
  NumberBoard,
  BaseGame,
  FirebaseGame,
} from '../@types/general';
import { Cell, Player } from '../@types/general_enums';

export const getNextPlayer = (player: Player) => (player === Player.PLAYER_1 ? Player.PLAYER_2 : Player.PLAYER_1);

export const getPlayerCellValue = (player: Player) => (player === Player.PLAYER_1 ? Cell.X : Cell.O);

export function alertWinner(winner: Cell) {
  const winnerLabel = winner === Cell.X ? Player.PLAYER_1 : Player.PLAYER_2;
  toast(`Player ${winnerLabel} has won.`);
}

export function alertError(err: Error) {
  toast.error(err.message);
}

export function emptyArray(): NumberBoard {
  return [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

export function isOccupied(value: Cell) {
  return value !== Cell.NONE;
}

function allThree(
  first: GeneralBoardIndex,
  second: GeneralBoardIndex,
  third: GeneralBoardIndex,
  board: Board,
) {
  const firstValue = board[first];
  const secondValue = board[second];
  const thirdValue = board[third];
  if (
    firstValue === secondValue
    && secondValue === thirdValue
    && isOccupied(firstValue)
  ) {
    return firstValue;
  }
  return null;
}

function columnWin(board: Board) {
  return (
    allThree(0, 3, 6, board)
    || allThree(1, 4, 7, board)
    || allThree(2, 5, 8, board)
  );
}

function rowWin(board: Board) {
  return (
    allThree(0, 1, 2, board)
    || allThree(3, 4, 5, board)
    || allThree(6, 7, 8, board)
  );
}

function diagonalWin(board: Board) {
  return allThree(0, 4, 8, board) || allThree(2, 4, 6, board);
}

export function theresAWinner(board: Board) {
  return columnWin(board) || rowWin(board) || diagonalWin(board);
}

export function newBoard(): BigBoard {
  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
}

export function initialState(): BaseGame {
  return {
    boardGame: newBoard(),
    currentPlayer: Player.PLAYER_1,
    moveNumber: 0,
    currentBoard: -1,
  };
}

export function fbInitialState(
  hostUid: string,
  hostName: string,
): FirebaseGame {
  return {
    ...initialState(),
    oWins: 0,
    xWins: 0,
    hostUid,
    hostName,
    guestUid: '-1',
    nextPlayerUid: hostUid,
    timestamp: Date.now(),
  };
}
