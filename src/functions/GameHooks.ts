import React from 'react';
import {
  isOccupied,
  theresAWinner,
  initialState,
  alertWinner,
  Game,
  Player,
  Cell,
  Board,
  GeneralBoardIndex,
  BigBoard,
} from './HelperFunctions';
import makeMove, {
  cleanVariables,
  aiMadeAMove,
  playerMadeAMove,
  Difficulty,
} from './Ai';

type SetGameFn = (game: Game) => void;

// TODO: Check to modify all the hooks in this file to be a reducer
export function useGameHooks(game: Game, setGame: SetGameFn) {
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
        currentPlayer === Player.PLAYER_1
          ? Player.PLAYER_2
          : Player.PLAYER_1,
    });
  }, [setGame, game, currentPlayer]);

  const newGame = React.useCallback(() => {
    cleanVariables();
    setGame({ ...game, ...initialState() });
  }, [setGame, game]);

  return [canClick, pvpMove, newGame];
}

type Option = { value: Difficulty };

type AIHooksProps = {
  moveNumber: number,
  selectedOption: Option | null,
  setGame: SetGameFn,
  changeScore: (winner: Cell) => void,
  newGame: () => void,
  setSelectedOption: (option: Option) => void,
  game: Game
};

export function useAIHooks({
  moveNumber,
  selectedOption,
  setGame,
  changeScore,
  newGame,
  setSelectedOption,
  game,
}: AIHooksProps) {
  const aiMove = React.useCallback((boardCopy, id, newMoveNumber) => {
    const board = boardCopy;
    const difficulty = selectedOption === null ? 1 : selectedOption.value;
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

type AfterMoveProps = {
  ai: boolean,
  aiMove: (board: BigBoard, id: number, newMoveNumber: number) => void,
  changeScore: (winner: Cell) => void,
  newGame: () => void,
  pvpMove: (board: BigBoard, newMoveNumber: number, id: number) => void,
};

type AfterMoveCallbackProps = {
  winner: Cell | null,
  newMoveNumber: number,
  board: GeneralBoardIndex,
  boardCopy: BigBoard,
  id: number,
};

export function useAfterMove({
  ai, aiMove, changeScore, newGame, pvpMove,
}: AfterMoveProps) {
  const afterMove = React.useCallback(({
    winner, newMoveNumber, board, boardCopy, id,
  }: AfterMoveCallbackProps) => {
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
  }, [ai, aiMove, changeScore, newGame, pvpMove]);
  return afterMove;
}

type HandleClickProps = {
  canClick: (board: Board, id: number) => boolean,
  boardGame: BigBoard,
  moveNumber: number,
  currentPlayer: Player,
  afterMove: (args: AfterMoveCallbackProps) => void,
};

export function useHandleClick({
  canClick, boardGame, moveNumber, currentPlayer, afterMove,
}: HandleClickProps) {
  const handleSquareClick = React.useCallback((board, id) => {
    if (!canClick(board, id)) {
      return;
    }
    const boardCopy: BigBoard = [...boardGame];
    const newMoveNumber = moveNumber + 1;
    boardCopy[board][id] = currentPlayer === Player.PLAYER_1 ? Cell.X : Cell.O;
    const winner = theresAWinner(boardCopy[board]);
    afterMove({
      winner, newMoveNumber, board, boardCopy, id,
    });
  }, [canClick, boardGame, moveNumber, currentPlayer, afterMove]);
  return handleSquareClick;
}
