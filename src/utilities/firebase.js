import { getDatabase, onValue, ref, update} from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAqFJ86rtEunGoiy-NZKugTYHNX77oNbE",
  authDomain: "tutorial-72236.firebaseapp.com",
  databaseURL: "https://tutorial-72236-default-rtdb.firebaseio.com",
  projectId: "tutorial-72236",
  storageBucket: "tutorial-72236.appspot.com",
  messagingSenderId: "794370293914",
  appId: "1:794370293914:web:b65acc1b82a5f645ec1f23"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};