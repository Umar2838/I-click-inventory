import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth ,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { getFirestore,collection, addDoc,serverTimestamp,getDocs,query, where,Timestamp,updateDoc,doc } from "firebase/firestore";

const firebaseConfig = {
// Your Database configuration
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);



export {app,auth,signInWithEmailAndPassword,signOut,collection,addDoc,db,serverTimestamp,getDocs,query, where,Timestamp,updateDoc,doc}