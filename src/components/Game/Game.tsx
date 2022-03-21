import { useEffect, useState } from "react";
import Header from "./Header";
import BigBoard from "../Board/BigBoard";
import ButtonsFooter from "./ButtonsFooter";
import type { Option } from "./DifficultySelect";
import DifficultySelect from "./DifficultySelect";
import { initialState } from "../../functions/HelperFunctions";
import {
  useGameHooks,
  useAIHooks,
  useScore,
  useAfterMove,
  useHandleClick,
} from "../../functions/GameHooks";
import Ai from "../../functions/Ai";

type Props = {
  isAi?: boolean;
};

const ai = new Ai({
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  currentBoard: 0,
  currentDifficulty: 1,
});

export default function Game({ isAi = true }: Props) {
  useEffect(() => {
    ai.cleanVariables();
  }, []);
  const [game, setGame] = useState(initialState());
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const { oWins, xWins, changeScore } = useScore();
  const { boardGame, currentBoard, moveNumber, currentPlayer } = game;
  const { canClick, pvpMove, newGame } = useGameHooks(game, setGame, ai);
  const { aiMove, handleChange } = useAIHooks({
    moveNumber,
    selectedOption,
    setGame,
    game,
    changeScore,
    newGame,
    setSelectedOption,
    ai,
  });
  const afterMove = useAfterMove({
    ai,
    aiMove,
    changeScore,
    newGame,
    pvpMove,
    isAi,
  });
  const handleSquareClick = useHandleClick({
    canClick,
    boardGame,
    moveNumber,
    currentPlayer,
    afterMove,
  });

  return (
    <div className="container text-center">
      <Header ai={isAi} oScore={oWins} xScore={xWins} />
      <hr />
      <BigBoard
        handleClick={handleSquareClick}
        boardGame={boardGame}
        currentBoard={currentBoard}
      />
      <hr />
      {ai && (
        <DifficultySelect
          selectedOption={selectedOption}
          handleChange={handleChange}
        />
      )}
      <ButtonsFooter back="/" reset={newGame} />
    </div>
  );
}
