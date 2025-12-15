// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5ErHlaEv5DrObUzyGVMvh-wytJgkva8M",
    authDomain: "tourism-fea6d.firebaseapp.com",
    projectId: "tourism-fea6d",
    storageBucket: "tourism-fea6d.firebasestorage.app",
    messagingSenderId: "359942122352",
    appId: "1:359942122352:web:e94ff6a4a00ac6837a3db5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log("Firebase Initialized:", app);

export { app, db, ref, set, get, child }; 
