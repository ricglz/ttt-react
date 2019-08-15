import React from 'react';
import { getRedirect, gamesReference, boardReference } from '../firebase/firebase';
import Room from '../components/OnlineGame/Room';
import { alertError, fbInitialState, initialState } from './HelperFunctions';

function updateUser(setUser) {
  getRedirect().then((response) => {
    const tempUser = response.user;
    if (!tempUser) {
      return;
    }
    const {
      displayName, email, phoneNumber, photoUrl, uid,
    } = tempUser;
    const user = {
      name: displayName, email, phoneNumber, photoUrl, uid,
    };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  });
}

export function useUser() {
  const cachedUser = localStorage.getItem('user');
  const [user, setUser] = React.useState(
    cachedUser ? JSON.parse(cachedUser) : {},
  );

  React.useEffect(() => {
    updateUser(setUser);
  }, []);

  const logOut = React.useCallback(() => {
    setUser({});
    localStorage.removeItem('user');
  }, [setUser]);

  return [user, logOut];
}

export function useRooms({ user, history, joinGame }) {
  const [rooms, setRooms] = React.useState({});

  React.useEffect(() => {
    if (Object.keys(user).length === 0) {
      history.push('/login');
      return;
    }
    gamesReference().orderByChild('guestUid').equalTo(-1).on(
      'value',
      (snapshot) => {
        setRooms(snapshot.val() || {});
      }, alertError,
    );
  }, [user, history, setRooms]);

  const renderRoom = React.useCallback((key) => {
    const { hostUid, hostName } = rooms[key];
    return (
      <Room
        key={key}
        id={key}
        joinGame={joinGame}
        hostName={hostName}
        hostUid={hostUid}
      />
    );
  }, [rooms, joinGame]);

  const renderRooms = React.useCallback(
    () => Object.keys(rooms).map(renderRoom),
    [renderRoom, rooms],
  );

  return [renderRooms];
}

function hostSurrendered(guestUid, gameId) {
  if (guestUid === -1) {
    boardReference(gameId).remove();
  } else {
    boardReference(gameId).update({
      ...initialState(),
      hostUid: guestUid,
      guestUid: -1,
      nextPlayerUid: guestUid,
    });
  }
}

export function useGameFlow({ uid, name }) {
  const [gameId, setGameId] = React.useState(null);

  const hostNewGame = React.useCallback(() => {
    const ref = gamesReference().push(fbInitialState(uid, name));
    setGameId(ref.key);
  }, [setGameId, name, uid]);

  const joinGame = React.useCallback((selectedGameId, hostUid) => {
    if (hostUid !== uid) {
      boardReference(selectedGameId).update({ guestUid: uid });
    }
    setGameId(selectedGameId);
  }, [uid, setGameId]);

  const surrender = React.useCallback(({ guestUid, hostUid }) => {
    if (uid === hostUid) {
      hostSurrendered(guestUid, gameId);
    } else {
      boardReference(gameId).update({
        ...initialState(),
        guestUid: -1,
        nextPlayerUid: hostUid,
      });
    }
    setGameId(null);
  }, [uid, gameId, setGameId]);

  return [gameId, hostNewGame, joinGame, surrender];
}
