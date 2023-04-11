import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4fjhF1sOPW1qJnFCtI26tpojl5fUxyKQ",
  authDomain: "booklist-reduxtoolkit.firebaseapp.com",
  projectId: "booklist-reduxtoolkit",
  storageBucket: "booklist-reduxtoolkit.appspot.com",
  messagingSenderId: "1008618091184",
  appId: "1:1008618091184:web:cb7e08deaa7a86ff2d0175",
  measurementId: "G-52D002SWQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;