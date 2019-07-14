import React from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import OnlineGame from './OnlineGame';
import { gamesReference, boardReference } from '../../firebase/firebase';
import { userPropType, historyProps } from '../../constants/props';
import { fbInitialState, initialState } from '../../functions/HelperFunctions';

function GameMenu({ user, logOut, history }) {
  const [state, setState] = React.useState({ games: {}, gameId: null });
  const { games, gameId } = state;
  const { uid, name } = user;

  React.useEffect(() => {
    if (Object.keys(user).length === 0) {
      history.push('/login');
      return;
    }
    gamesReference().orderByChild('guestUid').equalTo(-1).on(
      'value',
      (snapshot) => {
        let newGames = snapshot.val();
        newGames = newGames || {};
        setState({ ...state, games: newGames });
      }, (err) => {
        NotificationManager.error(err.message);
      },
    );
  }, [user, history, setState, state]);

  const hostNewGame = React.useCallback(() => {
    const newGame = fbInitialState(uid, name);
    const ref = gamesReference().push(newGame);
    setState({ ...state, gameId: ref.key });
  }, [setState, state, name, uid]);

  const joinGame = React.useCallback((selectedGameId, hostUid) => {
    if (hostUid !== uid) {
      boardReference(selectedGameId).update({ guestUid: uid });
    }
    setState({ ...state, gameId: selectedGameId });
  }, [uid, setState, state]);

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
    setState({ ...state, gameId: null });
  }, [uid, gameId, setState, state]);

  const handleLogOut = React.useCallback(() => {
    logOut();
    history.push('/login');
  }, [logOut, history]);

  const renderGames = React.useCallback(() => (
    Object.keys(games).map((key) => {
      const { hostUid, hostName } = games[key];
      return (
        <GameButton
          key={key}
          id={key}
          joinGame={joinGame}
          hostName={hostName}
          hostUid={hostUid}
        />
      );
    })
  ), [joinGame, games]);

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

const GameButton = ({
  joinGame, hostUid, hostName, id,
}) => {
  const onClick = React.useCallback(() => {
    joinGame(id, hostUid);
  }, [joinGame, id, hostUid]);
  return (
    <li className="list-group-item">
      <span>{hostName}</span>
      <button
        className="btn ml-5 btn-outline-dark"
        type="button"
        onClick={onClick}
      >
        Join Game
      </button>
    </li>
  );
};

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

GameButton.propTypes = {
  joinGame: PropTypes.func.isRequired,
  hostUid: PropTypes.string.isRequired,
  hostName: PropTypes.string.isRequired,
  id: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default GameMenu;
