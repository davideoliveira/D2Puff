// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8lj9PRrafWnwe43-QjSCJI_6BhVANHTM",
  authDomain: "dd-pods.firebaseapp.com",
  databaseURL: "https://dd-pods-default-rtdb.firebaseio.com/",
  projectId: "dd-pods",
  storageBucket: "dd-pods.appspot.com",
  messagingSenderId: "630785452408",
  appId: "1:630785452408:web:ac381524d9a5fe6c5f008d",
  measurementId: "G-B0X82GNYP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);



export {app, analytics, auth, database}