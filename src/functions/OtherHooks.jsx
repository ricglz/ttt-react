import React from 'react';
import { NotificationManager } from 'react-notifications';
import { getRedirect, gamesReference } from '../firebase/firebase';
import Room from '../components/OnlineGame/Room';

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
  const initialUser = cachedUser ? JSON.parse(cachedUser) : {};
  const [user, setUser] = React.useState(initialUser);

  React.useEffect(() => {
    updateUser(setUser);
  }, [setUser]);

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
        let newRooms = snapshot.val();
        newRooms = newRooms || {};
        setRooms(newRooms);
      }, (err) => {
        NotificationManager.error(err.message);
      },
    );
  }, [user, history, setRooms]);

  const renderRooms = React.useCallback(() => (
    Object.keys(rooms).map((key) => {
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
    })
  ), [joinGame, rooms]);

  return [renderRooms];
}
