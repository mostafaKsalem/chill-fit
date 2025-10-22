import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvzSjB1GlTVI1zGMPablMtVAFumX9FZQI",
  authDomain: "chill-fit.firebaseapp.com",
  projectId: "chill-fit",
  storageBucket: "chill-fit.firebasestorage.app",
  messagingSenderId: "795114734279",
  appId: "1:795114734279:web:d202a197255c9667cf74e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);