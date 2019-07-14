import React from 'react';
import { getRedirect } from '../firebase/firebase';

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

// eslint-disable-next-line import/prefer-default-export
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
