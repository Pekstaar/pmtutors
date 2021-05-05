import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC0_7eNte9uGqbP5XHyCU1xmyYVy4bOFWY",
  authDomain: "pmtutorsweb.firebaseapp.com",
  projectId: "pmtutorsweb",
  storageBucket: "pmtutorsweb.appspot.com",
  messagingSenderId: "882075193418",
  appId: "1:882075193418:web:4fa33f927593efd02116b3",
  measurementId: "G-20G8XC1QYJ"
};

  firebase.initializeApp(firebaseConfig);

  firebase.firestore().settings({timeStampsInSnapshots:true});

  export default firebase;