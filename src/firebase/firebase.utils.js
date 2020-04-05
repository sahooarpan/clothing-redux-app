import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAA9DGRRib5VfvEP9hrVvrXPWHxIBpSHqs",
  authDomain: "shopping-app-1ec15.firebaseapp.com",
  databaseURL: "https://shopping-app-1ec15.firebaseio.com",
  projectId: "shopping-app-1ec15",
  storageBucket: "shopping-app-1ec15.appspot.com",
  messagingSenderId: "681212231829",
  appId: "1:681212231829:web:9cc5dab2525ec011f7db9c"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
