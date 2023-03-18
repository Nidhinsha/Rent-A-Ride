// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs5ReDMJQbXrg_KuaIGbtHG_SrWPyfrWM",
  authDomain: "rentandride-1b8a0.firebaseapp.com",
  projectId: "rentandride-1b8a0",
  storageBucket: "rentandride-1b8a0.appspot.com",
  messagingSenderId: "699632728590",
  appId: "1:699632728590:web:d9ec710fdde1086b449a5f",
  measurementId: "G-L2BXS95F0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
// const analytics = getAnalytics(app);

export {auth,provider}