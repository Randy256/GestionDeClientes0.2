// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASNJij7qdB1GCPPqY-6f9ca668ZgbGZk0",
  authDomain: "gestiondeclientes-48d68.firebaseapp.com",
  projectId: "gestiondeclientes-48d68",
  storageBucket: "gestiondeclientes-48d68.firebasestorage.app",
  messagingSenderId: "373376591127",
  appId: "1:373376591127:web:8c63c443a7630f6188c352"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;