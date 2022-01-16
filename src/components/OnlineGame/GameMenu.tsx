import React from 'react';
import { useHistory } from 'react-router-dom';

import OnlineGame from './OnlineGame';
import { useRooms, useGameFlow, User } from '../../functions/OtherHooks';

type ButtonProps = {
  text: string,
  func: () => void,
};

const Button = ({ text, func }: ButtonProps) => (
  <div className="col text-center">
    <button className="btn btn-outline-dark" type="button" onClick={func}>
      {text}
    </button>
  </div>
);

type Props = {
  user: User,
  logOut: () => void,
};

function GameMenu({ user, logOut }: Props) {
  const { uid, name } = user;
  const {
    gameId,
    hostNewGame,
    joinGame,
    surrender,
  } = useGameFlow({ uid, name });
  const [renderGames] = useRooms({ user, joinGame });
  const history = useHistory();

  const handleLogOut = React.useCallback(() => {
    logOut();
    history.push('/login');
  }, [logOut, history]);

  return (
    <>
      {gameId != null ? (
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

export default GameMenu;
