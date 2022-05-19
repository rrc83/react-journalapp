import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDCPm8E1Xh84kqjClHHsLO2gR_bTCxrmTY",
    authDomain: "react-app-curso-rrcc.firebaseapp.com",
    projectId: "react-app-curso-rrcc",
    storageBucket: "react-app-curso-rrcc.appspot.com",
    messagingSenderId: "834642465781",
    appId: "1:834642465781:web:0ee09a72230db6d14806bc"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  export{
      db,
      googleAuthProvider,
      firebase
  };