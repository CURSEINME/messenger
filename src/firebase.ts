import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9Iigeu-Lj9OOxAzutRwUJl4EIMchPLIg",
  authDomain: "messenger-ec860.firebaseapp.com",
  projectId: "messenger-ec860",
  storageBucket: "messenger-ec860.appspot.com",
  messagingSenderId: "265575936443",
  appId: "1:265575936443:web:73994ca3f2b66622e2949e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app)
