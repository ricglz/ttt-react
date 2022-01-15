import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithRedirect,
  useDeviceLanguage,
} from 'firebase/auth';
import {
  DataSnapshot,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  update,
} from 'firebase/database';
import { alertError, fbInitialState, FirebaseGame } from '../functions/HelperFunctions';

const app = initializeApp({
  apiKey: 'AIzaSyAiNpaJDXyBIkHVfLV3aEOhNnYKBWWG82E',
  authDomain: 'ttt-hl-react.firebaseapp.com',
  databaseURL: 'https://ttt-hl-react.firebaseio.com',
  projectId: 'ttt-hl-react',
  storageBucket: 'ttt-hl-react.appspot.com',
  messagingSenderId: '870184829747',
});
const database = getDatabase(app);
const auth = getAuth(app);

// eslint-disable-next-line react-hooks/rules-of-hooks
useDeviceLanguage(auth);
const provider = new GoogleAuthProvider();

export const gameReference = (gameId: string) => ref(database, `/games/${gameId}`);
export const deleteGame = (gameId: string) => remove(gameReference(gameId));
export const updateGame = (gameId: string, toUpdateFields: Partial<FirebaseGame>) => (
  update(gameReference(gameId), toUpdateFields)
);
export const readGame = (gameId: string, updateFn: (snapshot: DataSnapshot) => void) => (
  onValue(gameReference(gameId), updateFn, alertError)
);

export const gamesReference = ref(database, '/games');
export const createGame = ([uid, name]: Parameters<(typeof fbInitialState)>) => (
  push(gamesReference, fbInitialState(uid, name))
);

export function getRedirect() {
  return getRedirectResult(auth);
}
export function firebaseAuth() {
  return signInWithRedirect(auth, provider);
}
