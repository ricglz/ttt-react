export function isOccupied(value) {
  return value !== 0; 
}

var boardCopy = null;

function allThree(first, second, third) {
  const firstValue = boardCopy[first];
  const secondValue = boardCopy[second];
  const thirdValue = boardCopy[third];
  if (firstValue === secondValue && secondValue === thirdValue && isOccupied(firstValue)) {
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