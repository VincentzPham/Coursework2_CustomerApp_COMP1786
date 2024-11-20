// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOXalEJZhJpUvnXqFxkzs895NLESV-C00",
  authDomain: "yogaapp-7ef04.firebaseapp.com",
  databaseURL: "https://yogaapp-7ef04-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yogaapp-7ef04",
  storageBucket: "yogaapp-7ef04.appspot.com",
  messagingSenderId: "955926275162",
  appId: "1:955926275162:web:27c2bdce139fbe2f63a463",
  measurementId: "G-SXFG71G4ZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db };
