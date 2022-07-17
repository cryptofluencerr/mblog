// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGUhDYnRdIm3IXtdXMv7wFENltUrWbi-g",
  authDomain: "mblog-66458.firebaseapp.com",
  projectId: "mblog-66458",
  storageBucket: "mblog-66458.appspot.com",
  messagingSenderId: "246595818886",
  appId: "1:246595818886:web:1e90fc2e175799a2408807",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { db };
