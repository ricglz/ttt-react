import { useCallback, useState } from "react";

import { Cell } from "@/types/general_enums";
import type { BigBoard, Board, Game, GeneralBoardIndex } from "@/types/general";
import type { Player } from "@/types/general_enums";

import {
  isOccupied,
  theresAWinner,
  initialState,
  alertWinner,
  getNextPlayer,
  getPlayerCellValue,
} from "./HelperFunctions";
import type { Option } from "../components/Game/DifficultySelect";
import type Ai from "./Ai";

type SetGameFn = (game: Game) => void;

// TODO: Check to modify all the hooks in this file to be a reducer
export function useGameHooks(game: Game, setGame: SetGameFn, ai: Ai) {
  const { boardGame, currentBoard, currentPlayer } = game;

  const canClick = useCallback(
    (board, id) => {
      const currentValue = boardGame[board][id];
      if (isOccupied(currentValue)) return false;
      return board === currentBoard || currentBoard === -1;
    },
    [boardGame, currentBoard]
  );

  const pvpMove = useCallback(
    (boardCopy, newMoveNumber, id) => {
      setGame({
        ...game,
        boardGame: boardCopy,
        moveNumber: newMoveNumber,
        currentBoard: id,
        currentPlayer: getNextPlayer(currentPlayer),
      });
    },
    [setGame, game, currentPlayer]
  );

  const newGame = useCallback(() => {
    ai.cleanVariables();
    setGame({ ...game, ...initialState() });
  }, [setGame, game]);

  return { canClick, pvpMove, newGame };
}

type AIHooksProps = {
  moveNumber: number;
  selectedOption: Option | null;
  setGame: SetGameFn;
  changeScore: (winner: Cell) => void;
  newGame: () => void;
  setSelectedOption: (option: Option) => void;
  game: Game;
  ai: Ai;
};

export function useAIHooks({
  moveNumber,
  selectedOption,
  setGame,
  changeScore,
  newGame,
  setSelectedOption,
  game,
  ai,
}: AIHooksProps) {
  const aiMove = useCallback(
    (boardCopy, id, newMoveNumber) => {
      const board = [...boardCopy] as BigBoard;
      const currentDifficulty =
        selectedOption === null ? 1 : selectedOption.value;
      const move = ai.makeMove({
        board: board[id],
        currentBoard: id,
        currentDifficulty,
      });
      board[id][move] = -1;
      const winner = theresAWinner(board[id]);
      if (winner) {
        alertWinner(winner);
        changeScore(winner);
        newGame();
      } else {
        ai.aiMadeAMove(board[id]);
        setGame({
          ...game,
          boardGame: board,
          moveNumber: newMoveNumber + 1,
          currentBoard: move,
        });
      }
    },
    [changeScore, newGame, selectedOption, setGame, game]
  );

  const handleChange = useCallback(
    (newSelectedOption) => {
      setSelectedOption(newSelectedOption);
      if (moveNumber >= 0) {
        newGame();
      }
    },
    [setSelectedOption, moveNumber, newGame]
  );

  return { aiMove, handleChange };
}

export function useScore() {
  const [oWins, setOWins] = useState(0);
  const [xWins, setXWins] = useState(0);
  const changeScore = useCallback(
    (value: Cell) => {
      if (value === Cell.O) {
        setOWins(oWins + 1);
      } else {
        setXWins(xWins + 1);
      }
    },
    [setOWins, setXWins, oWins, xWins]
  );
  return { oWins, xWins, changeScore };
}

interface AfterMoveOnlineProps {
  changeScore: (winner: Cell) => void;
  newGame: () => void;
  pvpMove: (board: BigBoard, newMoveNumber: number, id: number) => void;
}

type AfterMoveCallbackProps = {
  winner: Cell | null;
  newMoveNumber: number;
  board: GeneralBoardIndex;
  boardCopy: BigBoard;
  id: number;
};

export function useAfterMoveOnline({
  changeScore,
  newGame,
  pvpMove,
}: AfterMoveOnlineProps) {
  const afterMove = useCallback(
    ({ winner, newMoveNumber, boardCopy, id }: AfterMoveCallbackProps) => {
      if (winner) {
        alertWinner(winner);
        changeScore(winner);
        newGame();
      } else if (newMoveNumber === 81) {
        newGame();
      } else {
        pvpMove(boardCopy, newMoveNumber, id);
      }
    },
    [changeScore, newGame, pvpMove]
  );
  return afterMove;
}

interface AfterMoveProps extends AfterMoveOnlineProps {
  ai: Ai;
  aiMove: (board: BigBoard, id: number, newMoveNumber: number) => void;
  isAi: boolean;
}

export function useAfterMove({
  ai,
  aiMove,
  changeScore,
  newGame,
  pvpMove,
  isAi,
}: AfterMoveProps) {
  const afterMove = useCallback(
    ({
      winner,
      newMoveNumber,
      board,
      boardCopy,
      id,
    }: AfterMoveCallbackProps) => {
      if (winner) {
        alertWinner(winner);
        changeScore(winner);
        newGame();
      } else if (newMoveNumber === 81) {
        newGame();
      } else if (isAi) {
        ai.playerMadeAMove(board, boardCopy[board]);
        aiMove(boardCopy, id, newMoveNumber);
      } else {
        pvpMove(boardCopy, newMoveNumber, id);
      }
    },
    [ai, aiMove, changeScore, newGame, pvpMove]
  );
  return afterMove;
}

type HandleClickProps = {
  canClick: (board: Board, id: number) => boolean;
  boardGame: BigBoard;
  moveNumber: number;
  currentPlayer: Player;
  afterMove: (args: AfterMoveCallbackProps) => void;
};

export function useHandleClick({
  canClick,
  boardGame,
  moveNumber,
  currentPlayer,
  afterMove,
}: HandleClickProps) {
  const handleSquareClick = useCallback(
    (board, id) => {
      if (!canClick(board, id)) {
        return;
      }
      const boardCopy: BigBoard = [...boardGame];
      const newMoveNumber = moveNumber + 1;
      boardCopy[board][id] = getPlayerCellValue(currentPlayer);
      const winner = theresAWinner(boardCopy[board]);
      afterMove({
        winner,
        newMoveNumber,
        board,
        boardCopy,
        id,
      });
    },
    [canClick, boardGame, moveNumber, currentPlayer, afterMove]
  );
  return handleSquareClick;
}
