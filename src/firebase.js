import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
    apiKey: "AIzaSyAvRxCrKYBVXXeSHunaqcvOcvsIv4HPLc8",
    authDomain: "course-6ab40.firebaseapp.com",
    databaseURL: "https://course-6ab40.firebaseio.com",
    projectId: "course-6ab40",
    storageBucket: "course-6ab40.appspot.com",
    messagingSenderId: "346684960816",
    appId: "1:346684960816:web:fdd8ed2590afc1f9bd3df5",
    measurementId: "G-0M3YZSGD24"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();