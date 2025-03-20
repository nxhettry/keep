// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQVje7YgqdTkxrQfSCkc_4UnhjzqVjm6E",
  authDomain: "keeper-10e79.firebaseapp.com",
  databaseURL:
    "https://keeper-10e79-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "keeper-10e79",
  storageBucket: "keeper-10e79.firebasestorage.app",
  messagingSenderId: "413220592847",
  appId: "1:413220592847:web:74ab15da06364a86f8abba",
  measurementId: "G-T4BYE7J300",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
