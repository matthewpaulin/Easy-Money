import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD2O2c5iGMlCE1oL17EN9-LcyR58NIbBPs",
    authDomain: "easy-money-1.firebaseapp.com",
    databaseURL: "https://easy-money-1.firebaseio.com",
    projectId: "easy-money-1",
    storageBucket: "easy-money-1.appspot.com",
    messagingSenderId: "399241917635",
    appId: "1:399241917635:web:cd9c746f16211a21cc1e76"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;