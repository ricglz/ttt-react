import React from 'react';
import PropTypes from 'prop-types';

export default function Room({
  joinGame, hostUid, hostName, id,
}) {
  const onClick = React.useCallback(() => {
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

Room.propTypes = {
  joinGame: PropTypes.func.isRequired,
  hostUid: PropTypes.string.isRequired,
  hostName: PropTypes.string.isRequired,
  id: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
