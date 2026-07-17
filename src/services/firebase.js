import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfSI09uk-V7vS5k526vUhKqLdBdQp7dtU",
  authDomain: "yesildefter.firebaseapp.com",
  projectId: "yesildefter",
  storageBucket: "yesildefter.firebasestorage.app",
  messagingSenderId: "852182000410",
  appId: "1:852182000410:web:74a409d7dc3f2c96c6c2a3",
  measurementId: "G-36ZBEE089D"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
