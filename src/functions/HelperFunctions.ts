import { NotificationManager } from 'react-notifications';
import type {
  BigBoard, Board, GeneralBoardIndex, NumberBoard,
} from '../@types/general';
import { Cell, Player } from '../@types/general_enums';

export const getNextPlayer = (player: Player) => (
  player === Player.PLAYER_1 ? Player.PLAYER_2 : Player.PLAYER_1
);

export const getPlayerCellValue = (player: Player) => (
  player === Player.PLAYER_1 ? Cell.X : Cell.O
);

export function alertWinner(winner: Cell) {
  const winnerLabel = winner === Cell.X ? Player.PLAYER_1 : Player.PLAYER_2;
  NotificationManager.info(`Player ${winnerLabel} has won.`);
}

export function alertError(err: Error) {
  NotificationManager.error(err.message);
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
  return allThree(0, 3, 6, board) || allThree(1, 4, 7, board) || allThree(2, 5, 8, board);
}

function rowWin(board: Board) {
  return allThree(0, 1, 2, board) || allThree(3, 4, 5, board) || allThree(6, 7, 8, board);
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

export type CurrentBoard = GeneralBoardIndex | -1;

interface BaseGame {
  boardGame: BigBoard;
  currentPlayer: Player;
  moveNumber: number;
  currentBoard: CurrentBoard;
}

export function initialState(): BaseGame {
  return {
    boardGame: newBoard(),
    currentPlayer: Player.PLAYER_1,
    moveNumber: 0,
    currentBoard: -1,
  };
}

export interface FirebaseGame extends BaseGame {
  oWins: number;
  xWins: number;
  hostUid: string;
  hostName: string;
  guestUid: string;
  nextPlayerUid: string;
  timestamp: number;
}

export function fbInitialState(hostUid: string, hostName: string): FirebaseGame {
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

export type Game = BaseGame | FirebaseGame;
