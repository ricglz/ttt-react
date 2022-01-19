import type { Cell, Player } from './general_enums';

type GeneralBoard<T> = [T, T, T, T, T, T, T, T, T];
export type GeneralBoardIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type NumberBoard = GeneralBoard<number>;
export type Board = GeneralBoard<Cell>;
export type BigBoard = GeneralBoard<Board>;
export type CurrentBoard = GeneralBoardIndex | -1;

export interface BaseGame {
  boardGame: BigBoard;
  currentPlayer: Player;
  moveNumber: number;
  currentBoard: CurrentBoard;
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

export type Game = BaseGame | FirebaseGame;
