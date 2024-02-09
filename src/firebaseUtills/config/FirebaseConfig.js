// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const FirebaseConfig = {
  apiKey: "AIzaSyD7XO8fosY0QDxmh-f03VH4P9SgOArbkdI",
  authDomain: "auth-todo-2a25d.firebaseapp.com",
  projectId: "auth-todo-2a25d",
  storageBucket: "auth-todo-2a25d.appspot.com",
  messagingSenderId: "871125605810",
  appId: "1:871125605810:web:88deb54f0f998f65ccd8ab",
  measurementId: "G-WSKFFKBD0T",
};

// Initialize Firebase
const todoApp = initializeApp(FirebaseConfig);
const auth = getAuth();
const db = getFirestore(todoApp);

export { db, todoApp, auth };
