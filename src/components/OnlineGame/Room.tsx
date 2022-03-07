import { useCallback } from 'react';

type Pros = {
  joinGame: (id: string, hostUid: string) => void,
  hostUid: string,
  hostName: string,
  id: string,
};

export default function Room({
  joinGame, hostUid, hostName, id,
}: Pros) {
  const onClick = useCallback(() => {
    joinGame(id, hostUid);
  }, [joinGame, id, hostUid]);
  return (
    <li className="list-group-item mt-3">
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
}
