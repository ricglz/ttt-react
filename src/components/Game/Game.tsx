import React from 'react';
import Header from './Header';
import BigBoard from '../Board/BigBoard';
import ButtonsFooter from './ButtonsFooter';
import DifficultySelect, { Option } from './DifficultySelect';
import {
  initialState,
} from '../../functions/HelperFunctions';
import {
  useGameHooks, useAIHooks, useScore, useAfterMove, useHandleClick,
} from '../../functions/GameHooks';

type Props = {
  ai: boolean
};

function Game({ ai }: Props) {
  const [game, setGame] = React.useState(initialState());
  const [selectedOption, setSelectedOption] = React.useState<Option | null>(null);
  const { oWins, xWins, changeScore } = useScore();
  const {
    boardGame, currentBoard, moveNumber, currentPlayer,
  } = game;
  const { canClick, pvpMove, newGame } = useGameHooks(game, setGame);
  const { aiMove, handleChange } = useAIHooks({
    moveNumber,
    selectedOption,
    setGame,
    game,
    changeScore,
    newGame,
    setSelectedOption,
  });
  const afterMove = useAfterMove({
    ai, aiMove, changeScore, newGame, pvpMove,
  });
  const handleSquareClick = useHandleClick({
    canClick, boardGame, moveNumber, currentPlayer, afterMove,
  });

  return (
    <div className="container text-center">
      <Header ai={ai} oScore={oWins} xScore={xWins} />
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

export default Game;
