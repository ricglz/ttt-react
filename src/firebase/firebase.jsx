import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithRedirect,
  useDeviceLanguage,
} from 'firebase/auth';
import {
  getDatabase,
  ref,
} from 'firebase/database';

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

export function boardReference(gameId) {
  return ref(database, `/games/${gameId}`);
}

export function gamesReference() {
  return ref(database, '/games');
}

export function getRedirect() {
  return getRedirectResult(auth);
}

export function firebaseAuth() {
  return signInWithRedirect(auth, provider);
}
