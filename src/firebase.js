// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHMJJElW6B4KL-ebZTl9n-VgOwS4uI8e8",
  authDomain: "imagebox-c1b2a.firebaseapp.com",
  projectId: "imagebox-c1b2a",
  storageBucket: "imagebox-c1b2a.appspot.com",
  messagingSenderId: "332014073454",
  appId: "1:332014073454:web:8d8c22d85e8572625c587f",
  measurementId: "G-EV9V5ZJRNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);