import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBv2i2zLOraCjjQknJBxPBfpNrGpYXHMu0",
  authDomain: "drocsid-f50c2.firebaseapp.com",
  projectId: "drocsid-f50c2",
  storageBucket: "drocsid-f50c2.appspot.com",
  messagingSenderId: "368092363998",
  appId: "1:368092363998:web:bb0e42b145119a6f05164f",
  measurementId: "G-JKE29196PY",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore();

// firebase analytics
const analytics = getAnalytics(app);


export { app, auth, firestore };
