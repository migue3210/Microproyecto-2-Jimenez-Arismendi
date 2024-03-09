import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBtWVBcxZwndNWoTn46rU4Sq3IOLrVavV8",
    authDomain: "microproyecto-2-j-a.firebaseapp.com",
    projectId: "microproyecto-2-j-a",
    storageBucket: "microproyecto-2-j-a.appspot.com",
    messagingSenderId: "792480611047",
    appId: "1:792480611047:web:980d23afa9d473e4830042"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

// export const storage = firebase.storage();