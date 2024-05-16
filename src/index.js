import { initializeApp } from 'firebase/app'; // Import initializeApp directly
import { getFirestore } from 'firebase/firestore'; // Import getFirestore directly
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Assuming your main component is named App and located in App.js

const firebaseConfig = {
  apiKey: "AIzaSyDXf7nweLURkhBJ8oIjnqj67hqTh50rgd4",
  authDomain: "realtimedusri.firebaseapp.com",
  projectId: "realtimedusri",
  storageBucket: "realtimedusri.appspot.com",
  messagingSenderId: "885162211561",
  appId: "1:885162211561:web:67fcd0ee0f62f17fc91878",
  measurementId: "G-K3VEDEGP5L"
};

const firebaseApp = initializeApp(firebaseConfig); // Initialize Firebase
const firestore = getFirestore(firebaseApp); // Access Firestore instance

ReactDOM.render(
  <React.StrictMode>
    <App firestore={firestore} /> {/* Pass the Firestore instance as props to your App component */}
  </React.StrictMode>,
  document.getElementById('root')
);
