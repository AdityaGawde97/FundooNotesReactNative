import firebase from 'firebase'


const firebaseConfig = {
apiKey: "AIzaSyBDL-wXmvgtMqMlRzRnA9NqClLVCHdeAU8",
authDomain: "fundoo-notes-b7e8e.firebaseapp.com",
databaseURL: "https://fundoo-notes-b7e8e.firebaseio.com",
projectId: "fundoo-notes-b7e8e",
storageBucket: "fundoo-notes-b7e8e.appspot.com",
messagingSenderId: "440304323539",
appId: "1:440304323539:android:8aff7284978a04995d7d26"
};
// web:3a215e7e20ac4c825d7d26:
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase