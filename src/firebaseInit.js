import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCNeJA536kxFNoSLU58ahIvLDR4lCROPqM",
    authDomain: "buybusy-3f7ae.firebaseapp.com",
    projectId: "buybusy-3f7ae",
    storageBucket: "buybusy-3f7ae.appspot.com",
    messagingSenderId: "370108147986",
    appId: "1:370108147986:web:060ff9197c566581586bcb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };