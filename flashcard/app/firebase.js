import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// REPLACE This with your firebase keys if env doesn't work
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
