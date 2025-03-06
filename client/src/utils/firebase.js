// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "task123-41cc5.firebaseapp.com",
  projectId: "task123-41cc5",
  storageBucket: "task123-41cc5.firebasestorage.app",
  messagingSenderId: "1041363192384",
  appId: "1:1041363192384:web:60084894d44bfe4051eda5",
  measurementId: "G-9FSJJ3RPT6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);