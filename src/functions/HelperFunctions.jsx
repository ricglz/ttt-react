import { NotificationManager } from 'react-notifications';

let boardCopy = null;

export function alertWinner(winner) {
  const winnerLabel = winner === 1 ? 'X' : 'O';
  NotificationManager.info(`Player ${winnerLabel} has won.`);
}

export function emptyArray() {
  return [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

export function isOccupied(value) {
  return value !== 0;
}

function allThree(first, second, third) {
  const firstValue = boardCopy[first];
  const secondValue = boardCopy[second];
  const thirdValue = boardCopy[third];
  if (
    firstValue === secondValue
    && secondValue === thirdValue
    && isOccupied(firstValue)
  ) {
    return firstValue;
  }
  return null;
}

function columnWin() {
  return allThree(0, 3, 6) || allThree(1, 4, 7) || allThree(2, 5, 8);
}

function rowWin() {
  return allThree(0, 1, 2) || allThree(3, 4, 5) || allThree(6, 7, 8);
}

function diagonalWin() {
  return allThree(0, 4, 8) || allThree(2, 4, 6);
}

export function theresAWinner(board) {
  boardCopy = board;
  return columnWin() || rowWin() || diagonalWin();
}

export function newBoard() {
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

export function initialState() {
  return {
    boardGame: newBoard(),
    currentPlayer: 'X',
    moveNumber: 0,
    currentBoard: -1,
  };
}

export function fbInitialState(hostUid, hostName) {
  return {
    boardGame: newBoard(),
    currentPlayer: 'X',
    moveNumber: 0,
    currentBoard: -1,
    oWins: 0,
    xWins: 0,
    hostUid,
    hostName,
    guestUid: -1,
    nextPlayerUid: hostUid,
    timestamp: Date.now(),
  };
}
