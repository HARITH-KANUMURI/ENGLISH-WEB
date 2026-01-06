import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/* 🔴 Replace with your Firebase WEB config */
const firebaseConfig = {
  apiKey: "AIzaSyCiluVMZZpfXklfOKME18Db9t9Nt85xzQk",
  aauthDomain: "learnova-61e5c.firebaseapp.com",
  projectId: "learnova-61e5c",
  appId: "1:742082902950:web:e894684980672a5b53ad67",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
