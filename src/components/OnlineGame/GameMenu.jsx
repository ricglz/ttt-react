import React from 'react';
import PropTypes from 'prop-types';
import OnlineGame from './OnlineGame';
import { gamesReference, boardReference } from '../../firebase/firebase';
import { userPropType, historyProps } from '../../constants/props';
import { fbInitialState, initialState } from '../../functions/HelperFunctions';
import { useRooms } from '../../functions/OtherHooks';

function GameMenu({ user, logOut, history }) {
  const [gameId, setGameId] = React.useState(null);
  const { uid, name } = user;

  const hostNewGame = React.useCallback(() => {
    const newGame = fbInitialState(uid, name);
    const ref = gamesReference().push(newGame);
    setGameId(ref.key);
  }, [setGameId, name, uid]);

  const joinGame = React.useCallback((selectedGameId, hostUid) => {
    if (hostUid !== uid) {
      boardReference(selectedGameId).update({ guestUid: uid });
    }
    setGameId(selectedGameId);
  }, [uid, setGameId]);

  const [renderGames] = useRooms({ user, history, joinGame });

  const surrender = React.useCallback(({ guestUid, hostUid }) => {
    if (uid === hostUid) {
      if (guestUid === -1) {
        boardReference(gameId).remove();
      } else {
        const newState = initialState();
        newState.hostUid = guestUid;
        newState.guestUid = -1;
        newState.nextPlayerUid = guestUid;
        boardReference(gameId).update(newState);
      }
    } else {
      const newState = initialState();
      newState.guestUid = -1;
      newState.nextPlayerUid = hostUid;
      boardReference(gameId).update(newState);
    }
    setGameId(null);
  }, [uid, gameId, setGameId]);

  const handleLogOut = React.useCallback(() => {
    logOut();
    history.push('/login');
  }, [logOut, history]);

  return (
    <>
      {gameId ? (
        <OnlineGame gameId={gameId} userId={uid} back={surrender} />
      ) : (
        <>
          <div className="row justify-content-center">
            <h1>Rooms</h1>
          </div>
          <hr />
          <div className="row">
            <Button text="Host new game" func={hostNewGame} />
            <Button text="Log Out" func={handleLogOut} />
          </div>
          <ul className="list-group">
            {renderGames()}
          </ul>
        </>
      )}
    </>
  );
}

const Button = ({ text, func }) => (
  <div className="col text-center">
    <button className="btn btn-outline-dark" type="button" onClick={func}>
      {text}
    </button>
  </div>
);

GameMenu.propTypes = {
  user: userPropType, // eslint-disable-line react/require-default-props
  logOut: PropTypes.func.isRequired,
  history: historyProps.isRequired,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};

export default GameMenu;
