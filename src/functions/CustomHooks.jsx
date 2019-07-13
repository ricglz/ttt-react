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
  playerMadeAMove,
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
  moveNumber, selectedOption, setGame, changeScore, newGame, setSelectedOption,
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

export function useScore() {
  const [oWins, setOWins] = React.useState(0);
  const [xWins, setXWins] = React.useState(0);
  const changeScore = React.useCallback((value) => {
    if (value === -1) {
      setOWins(oWins + 1);
    } else {
      setXWins(xWins + 1);
    }
  }, [setOWins, setXWins, oWins, xWins]);
  return [oWins, xWins, changeScore];
}

export function useAfterMove({
  ai, aiMove, changeScore, newGame, pvpMove,
}) {
  const afterMove = React.useCallback(
    (winner, newMoveNumber, board, boardCopy, id) => {
      if (winner) {
        alertWinner(winner);
        changeScore(winner);
        newGame();
      } else if (newMoveNumber === 81) {
        newGame();
      } else if (ai) {
        playerMadeAMove(board, boardCopy[board]);
        aiMove(boardCopy, id, newMoveNumber);
      } else {
        pvpMove(boardCopy, newMoveNumber, id);
      }
    }, [ai, aiMove, changeScore, newGame, pvpMove],
  );
  return afterMove;
}

export function useHandleClick({
  canClick, boardGame, moveNumber, currentPlayer, afterMove,
}) {
  const handleSquareClick = React.useCallback((board, id) => {
    if (canClick(board, id)) {
      const boardCopy = [...boardGame];
      const newMoveNumber = moveNumber + 1;
      boardCopy[board][id] = currentPlayer === 'X' ? 1 : -1;
      const winner = theresAWinner(boardCopy[board]);
      afterMove(winner, newMoveNumber, board, boardCopy, id);
    }
  }, [canClick, boardGame, moveNumber, currentPlayer, afterMove]);
  return handleSquareClick;
}
