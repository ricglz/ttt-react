import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import BigBoard from '../Board/BigBoard';
import ButtonsFooter from './ButtonsFooter';
import DifficultySelect from './DifficultySelect';
import {
  theresAWinner,
  initialState,
  alertWinner,
} from '../../functions/HelperFunctions';
import {
  playerMadeAMove,
} from '../../functions/Ai';
import { useGameHooks, useAIHooks } from '../../functions/CustomHooks';

function Game({ ai }) {
  const [game, setGame] = React.useState(initialState());
  const [oWins, setOWins] = React.useState(0);
  const [xWins, setXWins] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const {
    boardGame, currentBoard, moveNumber, currentPlayer,
  } = game;

  const [canClick, pvpMove, newGame] = useGameHooks(game, setGame);

  const changeScore = React.useCallback((value) => {
    if (value === -1) {
      setOWins(oWins + 1);
    } else {
      setXWins(xWins + 1);
    }
  }, [setOWins, setXWins, oWins, xWins]);

  const [aiMove, handleChange] = useAIHooks({
    moveNumber,
    selectedOption,
    setGame,
    game,
    changeScore,
    newGame,
    setSelectedOption,
  });

  const handleSquareClick = React.useCallback((board, id) => {
    if (canClick(board, id)) {
      const boardCopy = [...boardGame];
      const newMoveNumber = moveNumber + 1;
      boardCopy[board][id] = currentPlayer === 'X' ? 1 : -1;
      const winner = theresAWinner(boardCopy[board]);
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
    }
  }, [
    canClick, boardGame, moveNumber, currentPlayer, ai, changeScore, newGame, aiMove, pvpMove,
  ]);

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

Game.propTypes = {
  ai: PropTypes.bool,
};

Game.defaultProps = {
  ai: false,
};
export default Game;
