import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
 
const root = ReactDOM.createRoot(document.getElementById('root'));

// Begin Firebase Config
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAqFJ86rtEunGoiy-NZKugTYHNX77oNbE",
  authDomain: "tutorial-72236.firebaseapp.com",
  projectId: "tutorial-72236",
  storageBucket: "tutorial-72236.appspot.com",
  messagingSenderId: "794370293914",
  appId: "1:794370293914:web:b65acc1b82a5f645ec1f23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// End of Firebase Config

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
