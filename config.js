import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCKy1LlVoVA5lPqxwgUABzi6__YJhrnxJM",
    authDomain: "login-sign-up-26a2b.firebaseapp.com",
    projectId: "login-sign-up-26a2b",
    storageBucket: "login-sign-up-26a2b.appspot.com",
    messagingSenderId: "424222396107",
    appId: "1:424222396107:web:aa023d0ae22265109f554e",
    measurementId: "G-SW7GYCN2ZX"
  };

  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
