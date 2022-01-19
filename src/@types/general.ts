import type { Cell } from './general_enums';

type GeneralBoard<T> = [T, T, T, T, T, T, T, T, T];
export type GeneralBoardIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type NumberBoard = GeneralBoard<number>;
export type Board = GeneralBoard<Cell>;
export type BigBoard = GeneralBoard<Board>;
