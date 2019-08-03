import React from 'react';
import PropTypes from 'prop-types';
import OnlineGame from './OnlineGame';
import { userPropType, historyProps } from '../../constants/props';
import { useRooms, useGameFlow } from '../../functions/OtherHooks';

function GameMenu({ user, logOut, history }) {
  const { uid, name } = user;
  const [gameId, hostNewGame, joinGame, surrender] = useGameFlow({ uid, name });
  const [renderGames] = useRooms({ user, history, joinGame });

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
