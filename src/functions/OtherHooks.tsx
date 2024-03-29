import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { onValue } from "firebase/database";

import type { FirebaseGame } from "@/types/general";
import Room from "../components/OnlineGame/Room";
import { alertError, initialState } from "./HelperFunctions";
import {
  getRedirect,
  gamesReference,
  deleteGame,
  updateGame,
  createGame,
} from "../firebase/firebase";

export type User = {
  email: string;
  name: string;
  phoneNumber: string;
  photoUrl: string;
  uid: string;
};

async function updateUser(setUser: (user: User) => void) {
  const response = await getRedirect();
  if (response == null) {
    return;
  }
  const tempUser = response.user;
  if (!tempUser) {
    return;
  }
  const user: User = {
    name: tempUser.displayName ?? "",
    email: tempUser.email ?? "",
    phoneNumber: tempUser.phoneNumber ?? "",
    photoUrl: tempUser.photoURL ?? "",
    uid: tempUser.uid ?? "",
  };
  setUser(user);
  localStorage.setItem("user", JSON.stringify(user));
}

export function useUser() {
  const [user, setUser] = useState(() => {
    const cachedUserString = localStorage.getItem("user");
    const cachedUser: User | null = cachedUserString
      ? JSON.parse(cachedUserString)
      : null;
    return cachedUser;
  });

  useEffect(() => {
    updateUser(setUser);
  }, []);

  const logOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, [setUser]);

  return { user, logOut };
}

type UseRoomsProps = {
  user: User | null;
  joinGame: (id: string, hostUid: string) => void;
};

type Rooms = {
  [key: string]: FirebaseGame;
};

export function useRooms({ user, joinGame }: UseRoomsProps) {
  const [rooms, setRooms] = useState<Rooms>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) {
      navigate("/login");
      return;
    }
    onValue(
      gamesReference,
      (snapshot) => {
        setRooms(snapshot.val() || {});
      },
      alertError
    );
  }, [user, navigate, setRooms]);

  const renderRoom = useCallback(
    (key) => {
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
    },
    [rooms, joinGame]
  );

  const renderRooms = useCallback(
    () => Object.keys(rooms).map(renderRoom),
    [renderRoom, rooms]
  );

  return [renderRooms];
}

function hostSurrendered(guestUid: string, gameId: string) {
  if (guestUid === "-1") {
    deleteGame(gameId);
  } else {
    updateGame(gameId, {
      ...initialState(),
      hostUid: guestUid,
      guestUid: "-1",
      nextPlayerUid: guestUid,
    });
  }
}

type UseGameFlowProps = {
  uid: string;
  name: string;
};

export function useGameFlow({ uid, name }: UseGameFlowProps) {
  const [gameId, setGameId] = useState<string | null>(null);

  const hostNewGame = useCallback(() => {
    const ref = createGame([uid, name]);
    setGameId(ref.key);
  }, [setGameId, name, uid]);

  const joinGame = useCallback(
    (selectedGameId, hostUid) => {
      setGameId(selectedGameId);
      if (hostUid === uid) {
        return;
      }
      updateGame(selectedGameId, { guestUid: uid });
    },
    [uid, setGameId]
  );

  const surrender = useCallback(
    ({ guestUid, hostUid }) => {
      if (gameId == null) {
        return;
      }
      setGameId(null);
      if (uid === hostUid) {
        hostSurrendered(guestUid, gameId);
      } else {
        updateGame(gameId, {
          ...initialState(),
          guestUid: "-1",
          nextPlayerUid: hostUid,
        });
      }
    },
    [uid, gameId, setGameId]
  );

  return {
    gameId,
    hostNewGame,
    joinGame,
    surrender,
  };
}
