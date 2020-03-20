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

export const createUserProfileDocument = async (userAuth, additionalData) => {

  if (!userAuth) return;
  // console.log(userAuth);
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // console.log(snapShot);

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch(error) {
        console.log('error creating user', error.message);
    }
  }

  return userRef;

};

firebase.initializeApp(config);

// Call to programmatically add collections to firebase database once
// Add to app.js componentDidMount
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj)
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollections = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  // returns map where each collections has key=title
  return transformedCollections.reduce( (accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
  
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;