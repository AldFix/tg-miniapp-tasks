// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-SWL22l5mvvzJvhpBR6tUkTtifgSfsZM",
  authDomain: "telegramminiapptasks.firebaseapp.com",
  databaseURL: "https://telegramminiapptasks-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "telegramminiapptasks",
  storageBucket: "telegramminiapptasks.appspot.com",
  messagingSenderId: "95276291",
  appId: "1:95276291:web:2ca466b0ea6c37d648ed36",
  measurementId: "G-G1TM0NNT4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase modules
export const auth = getAuth(app);
export const database = getDatabase(app);
