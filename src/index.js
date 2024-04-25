import { initializeApp } from 'firebase/app'; // Import initializeApp directly
import { getFirestore } from 'firebase/firestore'; // Import getFirestore directly
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Assuming your main component is named App and located in App.js

const firebaseConfig = {
  apiKey: "AIzaSyC-VvCeAVXtxgtE3B2xeAu0WrvK8Ip5F5Q",
  authDomain: "realtime-8d524.firebaseapp.com",
  projectId: "realtime-8d524",
  storageBucket: "realtime-8d524.appspot.com",
  messagingSenderId: "130900366608",
  appId: "1:130900366608:web:69fe63600c8bb2146a0195",
  measurementId: "G-8Z58VKMZMT"
};

const firebaseApp = initializeApp(firebaseConfig); // Initialize Firebase
const firestore = getFirestore(firebaseApp); // Access Firestore instance

ReactDOM.render(
  <React.StrictMode>
    <App firestore={firestore} /> {/* Pass the Firestore instance as props to your App component */}
  </React.StrictMode>,
  document.getElementById('root')
);
