import { isOccupied } from "./HelperFunctions";

var boardCopy = null;

function aiAction(pos) {
  this.pos = pos;
  this.value = getValue(pos);
}

//Identifies which letter are the one near it and if it would be more valuable to do the move or not
function whatAreBoth(column1, column2) {
  var value1 = boardCopy[column1],
      value2 = boardCopy[column2];
  if (value1 === value2) {
    if (value1 === 1) return 50;
    if (value2 === -1) return 9000;
  }
  var value = 0;
  if (
    (value1 === 1 && !isOccupied(value2)) ||
    (value2 === 1 && !isOccupied(value1))
  )
    value += 15;
  if (
    (value1 === -1 && !isOccupied(value2)) ||
    (value2 === -1 && !isOccupied(value1))
  )
    value += 40;
  return value;
};

//Checks if the position chosen could stop a winning of the oponent or if itself could win in diagonal
function extraValueDiagonal(div, pos) {
  if (pos === 1 || pos === 3 || pos === 5 || pos === 7) return 0;
  if (pos === 4) return whatAreBoth(0, 8) || whatAreBoth(2, 6);
  if (div !== 0) {
    if (pos === 8) return whatAreBoth(0, 4);
    return whatAreBoth(2, 4);
  }
  if (pos === 0) return whatAreBoth(4, 8);
  return whatAreBoth(4, 6);
};

//Checks if the position chosen could stop a winning of the oponent or if itself could win in a row
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
};

//Checks if the position chosen could stop a winning of the oponent or if itself could win in a column
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
};

function getValue(pos) {
  var div = Math.floor(pos / 3),
    mod = pos % 3;
  return (
    extraValueColumn(div, mod) +
    extraValueRow(div, mod) +
    extraValueDiagonal(div, pos)
  );
}

//Checks which are the more factible actions to play
function different(availableMoves){
  var min = availableMoves[0].value,
      erasePos = 1;
  while(erasePos < availableMoves.length && min === availableMoves[erasePos].value){
      erasePos++;
  }
  return erasePos;
};

function deleteElements(availableMoves) {
  if(availableMoves.length > 1){
    availableMoves.sort(function(a, b){
        return b.value - a.value;
    });
    var erasePos = different(availableMoves);
    if(erasePos < availableMoves.length){
        availableMoves.splice(erasePos, availableMoves.length-erasePos);
    }
  }
  return availableMoves;
}

function getAvailableMoves() {
  var availableMoves = [];
  for (let index = 0; index < boardCopy.length; index++) {
    const element = boardCopy[index];
    if (!isOccupied(element)) {
      availableMoves.push(new aiAction(index));
    }
  }
  return availableMoves;
}

export default function makeMove(board) {
  boardCopy = board;
  var availableMoves = getAvailableMoves();
  availableMoves = deleteElements(availableMoves);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)].pos;
}
