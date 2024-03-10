import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyB2TaxkGBpzv8MRCcDKB6uKAoG4uVtfvfo",
    authDomain: "microproyecto-2-a-j.firebaseapp.com",
    projectId: "microproyecto-2-a-j",
    storageBucket: "microproyecto-2-a-j.appspot.com",
    messagingSenderId: "488798011933",
    appId: "1:488798011933:web:8ac6086e6dc815263fbcf4",
    measurementId: "G-YB824E1BQ1"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();


// export const storage = firebase.storage();