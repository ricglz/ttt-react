import React from 'react';
import {
  isOccupied,
  theresAWinner,
  initialState,
  alertWinner,
} from './HelperFunctions';
import makeMove, {
  cleanVariables,
  aiMadeAMove,
} from './Ai';

const CONSTANTS = {
  PLAYER1: 'X',
  PLAYER2: 'O',
};

export function useGameHooks(game, setGame) {
  const {
    boardGame, currentBoard, currentPlayer,
  } = game;

  const canClick = React.useCallback((board, id) => {
    const currentValue = boardGame[board][id];
    if (isOccupied(currentValue)) return false;
    return board === currentBoard || currentBoard === -1;
  }, [boardGame, currentBoard]);

  const pvpMove = React.useCallback((boardCopy, newMoveNumber, id) => {
    setGame({
      ...game,
      boardGame: boardCopy,
      moveNumber: newMoveNumber,
      currentBoard: id,
      currentPlayer:
        currentPlayer === CONSTANTS.PLAYER1
          ? CONSTANTS.PLAYER2
          : CONSTANTS.PLAYER1,
    });
  }, [setGame, game, currentPlayer]);

  const newGame = React.useCallback(() => {
    cleanVariables();
    setGame({ ...game, ...initialState() });
  }, [setGame, game]);

  return [canClick, pvpMove, newGame];
}

export function useAIHooks({
  moveNumber,
  selectedOption,
  setGame,
  changeScore,
  newGame,
  setSelectedOption,
  game,
}) {
  const aiMove = React.useCallback((boardCopy, id, newMoveNumber) => {
    const board = boardCopy;
    const difficulty = selectedOption == null ? 1 : selectedOption.value;
    const move = makeMove(board[id], id, difficulty);
    board[id][move] = -1;
    const winner = theresAWinner(board[id]);
    if (winner) {
      alertWinner(winner);
      changeScore(winner);
      newGame();
    } else {
      aiMadeAMove(id, board[id]);
      setGame({
        ...game,
        boardGame: board,
        moveNumber: newMoveNumber + 1,
        currentBoard: move,
      });
    }
  }, [changeScore, newGame, selectedOption, setGame, game]);

  const handleChange = React.useCallback((newSelectedOption) => {
    setSelectedOption(newSelectedOption);
    if (moveNumber >= 0) {
      newGame();
    }
  }, [setSelectedOption, moveNumber, newGame]);

  return [aiMove, handleChange];
}
