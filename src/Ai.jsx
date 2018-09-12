import {isOccupied} from './HelperFunctions';

var boardCopy = null;

function getAvailableMoves() {
  var availableMoves = [];
  for (let index = 0; index < boardCopy.length; index++) {
    const element = boardCopy[index];
    if (!isOccupied(element)) {
      availableMoves.push(index);
    }
  }
  return availableMoves;
}

export default function makeMove(board) {
  boardCopy = board;
  var availableMoves = getAvailableMoves();
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}