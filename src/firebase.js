import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAu1pxSgtGUZFvBMkDHtY7IsRHD8n8AFvQ",
    authDomain: "crud-udemy-react-8d445.firebaseapp.com",
    projectId: "crud-udemy-react-8d445",
    storageBucket: "crud-udemy-react-8d445.appspot.com",
    messagingSenderId: "223135117665",
    appId: "1:223135117665:web:02754f28df98a2b3b95520"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export{firebase}