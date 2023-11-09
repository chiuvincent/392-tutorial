import {
  onValue,
  ref,
  update,
  getDatabase,
  connectDatabaseEmulator,
} from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithCredential,
  connectAuthEmulator,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAqFJ86rtEunGoiy-NZKugTYHNX77oNbE",
  authDomain: "tutorial-72236.firebaseapp.com",
  // databaseURL: "http://127.0.0.1:9000/?ns=tutorial-72236-default-rtdb",
  databaseURL: "https://tutorial-72236-default-rtdb.firebaseio.com",
  projectId: "tutorial-72236",
  storageBucket: "tutorial-72236.appspot.com",
  messagingSenderId: "794370293914",
  appId: "1:794370293914:web:b65acc1b82a5f645ec1f23",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);

if (!globalThis.EMULATION && import.meta.env.MODE === "development") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);

  signInWithCredential(
    auth,
    GoogleAuthProvider.credential(
      '{"sub": "4RuQsupZRaffLwjoLw4zPRvkndbX", "email": "a@example.com", "displayName":"testUser", "email_verified": true}'
    )
  );

  // set flag to avoid connecting twice, e.g., because of an editor hot-reload
  globalThis.EMULATION = true;
}

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(firebase), setUser), []);

  return [user];
};
