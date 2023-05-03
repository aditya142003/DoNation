import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlEt2cqsGVO6SZECuv70zu_Hgzu6RKnBs",
  authDomain: "donation-web-ideathon.firebaseapp.com",
  projectId: "donation-web-ideathon",
  storageBucket: "donation-web-ideathon.appspot.com",
  messagingSenderId: "468891071993",
  appId: "1:468891071993:web:8487d22f2926a787e5b928",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
