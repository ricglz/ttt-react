import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyAiNpaJDXyBIkHVfLV3aEOhNnYKBWWG82E',
  authDomain: 'ttt-hl-react.firebaseapp.com',
  databaseURL: 'https://ttt-hl-react.firebaseio.com',
  projectId: 'ttt-hl-react',
  storageBucket: 'ttt-hl-react.appspot.com',
  messagingSenderId: '870184829747',
});

firebase.auth().useDeviceLanguage();
const provider = new firebase.auth.GoogleAuthProvider();

export function boardReference(gameId) {
  return firebase.database().ref('/games/' + gameId);
}

export function gamesReference() {
  return firebase.database().ref('/games');
}

export function getRedirect() {
  return firebase.auth().getRedirectResult();
}

export function firebaseAuth() {
  return firebase.auth().signInWithRedirect(provider);
}