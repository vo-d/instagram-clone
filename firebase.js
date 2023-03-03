// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOOPaqcwMrbZazK7XzagG5vavv0ZzTmEQ",
  authDomain: "instagram-clone-dedeb.firebaseapp.com",
  projectId: "instagram-clone-dedeb",
  storageBucket: "instagram-clone-dedeb.appspot.com",
  messagingSenderId: "668607896415",
  appId: "1:668607896415:web:d60e36d3f49159f38f74ea",
  measurementId: "G-D1JD3G902N"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()


const db = getFirestore();
const storage = getStorage();


export {app, db, storage}