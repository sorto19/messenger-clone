import firebase from "firebase";

const firebaseApp = firebase.InizializeApp({
       apiKey: "AIzaSyDyy0RpGsBZwuagV10sIodN--yNF9uZF74",
        authDomain: "messenger-clone-40006.firebaseapp.com",
        databaseURL: "https://messenger-clone-40006.firebaseio.com",
        projectId: "messenger-clone-40006",
        storageBucket: "messenger-clone-40006.appspot.com",
        messagingSenderId: "436640968144",
        appId: "1:436640968144:web:0b230921da39113eed9dd5",
        measurementId: "G-QTQQTE8315"
  
});
const db = firebaseApp.firestore();

export default db;