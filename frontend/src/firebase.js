/*import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace with your Firebase project keys
const firebaseConfig = {
    apiKey: "AIzaSyB3gGW3ny28GMwdPB3OJDOnBv-1JXotswY",
    authDomain: "food-delivery-2dfd3.firebaseapp.com",
    projectId: "food-delivery-2dfd3",
    storageBucket: "food-delivery-2dfd3.appspot.com", // Fixed typo in storage bucket
    messagingSenderId: "844395589255",
    appId: "1:844395589255:web:4e28eba07dbd4126485222",
    measurementId: "G-HFXZZXVJ2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
*/


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3gGW3ny28GMwdPB3OJDOnBv-1JXotswY",
  authDomain: "food-delivery-2dfd3.firebaseapp.com",
  projectId: "food-delivery-2dfd3",
  storageBucket: "food-delivery-2dfd3.appspot.com",
  messagingSenderId: "844395589255",
  appId: "1:844395589255:web:4e28eba07dbd4126485222",
  measurementId: "G-HFXZZXVJ2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
