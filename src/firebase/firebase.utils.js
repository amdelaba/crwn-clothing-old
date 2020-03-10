import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAS1_7vP67VE0XmGH3KfCp0NmxSOAylkqc",
  authDomain: "crwn-db-cd5b1.firebaseapp.com",
  databaseURL: "https://crwn-db-cd5b1.firebaseio.com",
  projectId: "crwn-db-cd5b1",
  storageBucket: "crwn-db-cd5b1.appspot.com",
  messagingSenderId: "280423869079",
  appId: "1:280423869079:web:196e0458096022f6f1d7d2",
  measurementId: "G-X9732TJTP9"
};

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;