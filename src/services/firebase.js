import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getAuth, FacebookAuthProvider } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyB5Jo3y4W9Ak82wpZciGCdcspf2mrkR9SA",
    authDomain: "microproyecto-j-a.firebaseapp.com",
    projectId: "microproyecto-j-a",
    storageBucket: "microproyecto-j-a.appspot.com",
    messagingSenderId: "48880280725",
    appId: "1:48880280725:web:72ed4ad48a5a37de93a79c"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const facebook = new FacebookAuthProvider();


// export const storage = firebase.storage();