// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyDEZY9LH5pnSoiv7x6B9qNiiBI1MVtbOi0",
  authDomain: "pulse-app-e693a.firebaseapp.com",
  projectId: "pulse-app-e693a",
  storageBucket: "pulse-app-e693a.firebasestorage.app",
  messagingSenderId: "936400119916",
  appId: "1:936400119916:web:a1938b825f8afb5e135049",
  measurementId: "G-JLNZKB3F93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);