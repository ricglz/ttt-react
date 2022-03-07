import { useCallback, lazy } from 'react';
import { useNavigate } from 'react-router-dom';

import type { User } from '../../functions/OtherHooks';
import { useRooms, useGameFlow } from '../../functions/OtherHooks';

const OnlineGame = lazy(() => import('./OnlineGame'));

type ButtonProps = {
  text: string;
  func: () => void;
};

const Button = ({ text, func }: ButtonProps) => (
  <div className="col text-center">
    <button className="btn btn-outline-dark" type="button" onClick={func}>
      {text}
    </button>
  </div>
);

type Props = {
  user: User;
  logOut: () => void;
};

function GameMenu({ user, logOut }: Props) {
  const { uid, name } = user;
  const {
    gameId, hostNewGame, joinGame, surrender,
  } = useGameFlow({
    uid,
    name,
  });
  const [renderGames] = useRooms({ user, joinGame });
  const navigate = useNavigate();

  const handleLogOut = useCallback(() => {
    logOut();
    navigate('/login');
  }, [logOut, navigate]);

  return gameId != null ? (
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
      <ul className="list-group">{renderGames()}</ul>
    </>
  );
}

export default GameMenu;
