import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

var firebaseConfig = {
  apiKey: "AIzaSyCEfCRFUeWcPZ5wWQPua7ozj3_-iu9q2fQ",
  authDomain: "ivory-strategy-268307.firebaseapp.com",
  databaseURL: "https://ivory-strategy-268307.firebaseio.com",
  projectId: "ivory-strategy-268307",
  storageBucket: "ivory-strategy-268307.appspot.com",
  messagingSenderId: "387994896872",
  appId: "1:387994896872:web:d0ad8992a5cd26f2457c5d",
  measurementId: "G-6DLE7J09QD"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.provider = new app.auth.GoogleAuthProvider();
    this.db = app.database();
    this.firestore = app.firestore();
    this.analytics = app.analytics();
  }

  sendMedicalInfo = async (data) => (await this.firestore.collection('records').add(data))

  getUserById = async (personId) => (await this.firestore.collection('users').doc(personId).get()).data()
 
}

export default Firebase;