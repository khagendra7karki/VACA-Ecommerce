// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn7vPtkXzqaUNGhaphIivdOJaXrnYtajY",
  authDomain: "ecommerce-pulchowk.firebaseapp.com",
  projectId: "ecommerce-pulchowk",
  storageBucket: "ecommerce-pulchowk.firebasestorage.app",
  messagingSenderId: "318738884757",
  appId: "1:318738884757:web:22eddbe4422651befe939c",
  measurementId: "G-417H79Y7ER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
// const analytics = getAnalytics(app);