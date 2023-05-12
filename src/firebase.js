import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhj1OasGPOQbQb4bO0RQm11bSBy_-qkQ0",
  authDomain: "chat-app-3e321.firebaseapp.com",
  projectId: "chat-app-3e321",
  storageBucket: "chat-app-3e321.appspot.com",
  messagingSenderId: "16917270147",
  appId: "1:16917270147:web:121a545846500a439355b6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);
