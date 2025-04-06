// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBie6oohEVHdR2fLCCdn3D_qwO_IcqLDX8",
  authDomain: "musify-f5b89.firebaseapp.com",
  projectId: "musify-f5b89",
  storageBucket: "musify-f5b89.firebasestorage.app",
  messagingSenderId: "485704833199",
  appId: "1:485704833199:web:4972aaeb94ba4a6b429c5a",
  measurementId: "G-ZZJMNRS759"
};




const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 
export let _Auth=getAuth(app)
export let _DB= getFirestore(app)