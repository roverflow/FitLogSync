import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAA7gOxfJ10BZbXuKxfmc8uGeJL86OjF1M",
  authDomain: "workout-app-d965d.firebaseapp.com",
  projectId: "workout-app-d965d",
  storageBucket: "workout-app-d965d.appspot.com",
  messagingSenderId: "492490789763",
  appId: "1:492490789763:web:46deccffd1fd74a8e2dcb6",
  measurementId: "G-PD8KH9G3LR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
