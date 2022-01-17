import React from 'react';

import BigBoard from '../Board/BigBoard';
import {
  FirebaseGame,
  fbInitialState,
  getNextPlayer,
  initialState,
  isOccupied,
} from '../../functions/HelperFunctions';
import { readGame, updateGame } from '../../firebase/firebase';
import ResetButton from '../Layout/ResetButton';
import DefaultButton from '../Layout/DefaultButton';
import { useAfterMoveOnline, useHandleClick } from '../../functions/GameHooks';

type ButtonsFooterProps = {
  reset: () => void,
  back: () => void,
};

const ButtonsFooter = ({ reset, back }: ButtonsFooterProps) => (
  <div className="row justify-content-center">
    <ResetButton onClick={reset} />
    <DefaultButton text="shared.back" defaultText="Back" onClick={back} />
  </div>
);

type Props = {
  back: (game: FirebaseGame) => void,
  gameId: string,
  userId: string,
};

function OnlineGame({ back, gameId, userId }: Props) {
  const [state, setState] = React.useState(fbInitialState('', ''));
  const {
    boardGame, currentBoard, nextPlayerUid, moveNumber, currentPlayer, hostUid,
    guestUid, oWins, xWins,
  } = state;

  const setPreviousState = React.useCallback((snapshot) => {
    setState((prevState) => ({ ...prevState, ...snapshot.val() }));
  }, [setState]);

  React.useEffect(() => readGame(gameId, setPreviousState), [gameId, setPreviousState]);

  const updateFirebase = React.useCallback((obj: Partial<FirebaseGame>) => {
    updateGame(gameId, { ...obj, timestamp: Date.now() });
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
      const newCurrentPlayer = getNextPlayer(currentPlayer);
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

  const afterMove = useAfterMoveOnline({ changeScore, newGame, pvpMove });
  const handleSquareClick = useHandleClick({
    afterMove,
    boardGame,
    canClick,
    currentPlayer,
    moveNumber,
  });

  return (
    guestUid === '-1' ? (
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
    )
  );
}

export default OnlineGame;
