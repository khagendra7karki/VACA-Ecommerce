// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJdVVgoBWIRjzrD1KYgP04qWWbx78Pu1o",
  authDomain: "vaca-ecommerce.firebaseapp.com",
  projectId: "vaca-ecommerce",
  storageBucket: "vaca-ecommerce.appspot.com",
  messagingSenderId: "411518206321",
  appId: "1:411518206321:web:47c3ab19954e864264b6d0",
  measurementId: "G-8BWMC9H7CX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
// const analytics = getAnalytics(app);