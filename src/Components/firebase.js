import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAb_hWBNbejkRiq1SmTrnOYVcDTsMxeLo",
  authDomain: "clone-299eb.firebaseapp.com",
  projectId: "clone-299eb",
  storageBucket: "clone-299eb.appspot.com",
  messagingSenderId: "248399392802",
  appId: "1:248399392802:web:cd2dea3f6c1d0ad975da7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
export { db, auth };