import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAQju5rHUeELtZqxb2nCkpwIpJyGliRpmw",
    authDomain: "reactcrud-206d7.firebaseapp.com",
    databaseURL: "https://reactcrud-206d7-default-rtdb.firebaseio.com",
    projectId: "reactcrud-206d7",
    storageBucket: "reactcrud-206d7.appspot.com",
    messagingSenderId: "759494302063",
    appId: "1:759494302063:web:d2ebf549ba4483f559309a"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
 
export default firebase;