import React from 'react';
import PropTypes from 'prop-types';
import BigBoard from '../Board/BigBoard';
import {
  isOccupied,
  theresAWinner,
  fbInitialState,
  initialState,
  alertWinner,
  alertError,
} from '../../functions/HelperFunctions';
import { boardReference } from '../../firebase/firebase';
import ResetButton from '../Layout/ResetButton';
import DefaultButton from '../Layout/DefaultButton';

const CONSTANTS = {
  PLAYER1: 'X',
  PLAYER2: 'O',
};

function OnlineGame({ back, gameId, userId }) {
  const [state, setState] = React.useState(fbInitialState());
  const {
    boardGame, currentBoard, nextPlayerUid, moveNumber, currentPlayer, hostUid,
    guestUid, oWins, xWins,
  } = state;

  const setPreviousState = React.useCallback((snapshot) => {
    setState(prevState => ({ ...prevState, ...snapshot.val() }));
  }, [setState]);

  React.useEffect(() => {
    boardReference(gameId).on('value', setPreviousState, alertError);
  }, [gameId, setPreviousState]);

  const updateFirebase = React.useCallback((obj) => {
    const timestamp = Date.now();
    boardReference(gameId).update(Object.assign(obj, { timestamp }));
  }, [gameId]);

  const canClick = React.useCallback((board, id) => {
    const currentValue = boardGame[board][id];
    if (
      isOccupied(currentValue)
      || nextPlayerUid !== userId
    ) return false;
    return board === currentBoard || currentBoard === -1;
  }, [boardGame, currentBoard, nextPlayerUid, userId]);

  const pvpMove = React.useCallback(
    (newBoard, newMoveNumber, newCurrentBoard) => {
      const { PLAYER1, PLAYER2 } = CONSTANTS;
      const newCurrentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
      const newNextPlayerUid = nextPlayerUid === hostUid ? guestUid : hostUid;
      const newState = {
        boardGame: newBoard,
        moveNumber: newMoveNumber,
        currentBoard: newCurrentBoard,
        currentPlayer: newCurrentPlayer,
        nextPlayerUid: newNextPlayerUid,
      };
      updateFirebase(newState);
    },
    [currentPlayer, hostUid, guestUid, nextPlayerUid, updateFirebase],
  );

  const changeScore = React.useCallback((value) => {
    let newOWins = oWins;
    let newXWins = xWins;
    if (value === -1) {
      newOWins += 1;
    } else {
      newXWins += 1;
    }
    const newState = { oWins: newOWins, xWins: newXWins };
    updateFirebase(newState);
  }, [oWins, xWins, updateFirebase]);

  const handleBack = React.useCallback(() => {
    back(state);
  }, [back, state]);

  const newGame = React.useCallback(() => {
    updateFirebase(initialState());
  }, [updateFirebase]);

  const handleSquareClick = React.useCallback((board, id) => {
    if (canClick(board, id)) {
      const boardCopy = [...boardGame];
      const newMoveNumber = moveNumber + 1;
      boardCopy[board][id] = currentPlayer === CONSTANTS.PLAYER1 ? 1 : -1;
      const winner = theresAWinner(boardCopy[board]);
      if (winner) {
        alertWinner(winner);
        changeScore(winner);
        newGame();
      } else if (newMoveNumber === 81) {
        newGame();
      } else {
        pvpMove(boardCopy, newMoveNumber, id);
      }
    }
  }, [canClick, boardGame, moveNumber, currentPlayer, changeScore, newGame, pvpMove]);

  return (
    <>
      {guestUid === -1 ? (
        <h1 className="text-center"> Please wait until someone enters the room </h1>
      ) : (
        <div className="container text-center">
          <BigBoard
            handleClick={handleSquareClick}
            boardGame={boardGame}
            currentBoard={currentBoard}
          />
          <hr />
          <ButtonsFooter back={handleBack} reset={newGame} />
        </div>
      )}
    </>
  );
}

const ButtonsFooter = ({ reset, back }) => (
  <div className="row justify-content-center">
    <ResetButton onClick={reset} />
    <DefaultButton text="shared.back" defaultText="Back" onClick={back} />
  </div>
);

ButtonsFooter.propTypes = {
  reset: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
};

OnlineGame.propTypes = {
  back: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default OnlineGame;
