import React from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import { FormattedMessage } from 'react-intl';
import BigBoard from '../Board/BigBoard';
import {
  isOccupied,
  theresAWinner,
  fbInitialState,
  initialState,
  alertWinner,
} from '../../functions/HelperFunctions';
import { boardReference } from '../../firebase/firebase';

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

  React.useEffect(() => {
    boardReference(gameId).on('value', (snapshot) => {
      setState(prevState => ({ ...prevState, ...snapshot.val() }));
    }, (err) => {
      NotificationManager.error(err.message);
    });
  }, [gameId, setState]);

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
    <React.Fragment>
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
    </React.Fragment>
  );
}

const ButtonsFooter = ({ reset, back }) => (
  <div className="row justify-content-center">
    <div className="col">
      <button type="button" className="btn btn-game btn-lg btn-danger" onClick={reset}>
        <FormattedMessage id="game.reset" default="Back" />
      </button>
    </div>
    <div className="col">
      <button type="button" className="btn btn-game btn-lg btn-danger" onClick={back}>
        <FormattedMessage id="shared.back" default="Back" />
      </button>
    </div>
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
