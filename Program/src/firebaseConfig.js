// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJTz5xGrIdAkIffxFOiVt2DQsb-ygvLLk",
  authDomain: "tpa-desktop-9f695.firebaseapp.com",
  projectId: "tpa-desktop-9f695",
  storageBucket: "tpa-desktop-9f695.appspot.com",
  messagingSenderId: "513117362192",
  appId: "1:513117362192:web:4d79a558479021b164d295"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()

export default app

