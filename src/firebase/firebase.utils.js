import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA3_yEb9UtRa-Lt1AYKr0dgTW-so-8GKrQ",
  authDomain: "crwn-db-20201213.firebaseapp.com",
  projectId: "crwn-db-20201213",
  storageBucket: "crwn-db-20201213.appspot.com",
  messagingSenderId: "544303307923",
  appId: "1:544303307923:web:eeddd2d43a843b3c000166",
  measurementId: "G-VJXHMPH2HT",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("New user could not be created", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
