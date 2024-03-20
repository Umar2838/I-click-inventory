import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth ,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { getFirestore,collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf3jVjNmvMriVymMlRjvaSWoRSW0Z2Vmw",
  authDomain: "react-todo-app-5c2a3.firebaseapp.com",
  databaseURL: "https://react-todo-app-5c2a3-default-rtdb.firebaseio.com",
  projectId: "react-todo-app-5c2a3",
  storageBucket: "react-todo-app-5c2a3.appspot.com",
  messagingSenderId: "401611102872",
  appId: "1:401611102872:web:1607b8ae565e507a104eed",
  measurementId: "G-K51BP81RTX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);



export {app,auth,signInWithEmailAndPassword,signOut,collection,addDoc,db}