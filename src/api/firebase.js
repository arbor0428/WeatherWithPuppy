import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDSuL8_lrWDKj-lEUevwrdFc2uhojp6TH8",
    authDomain: "miselogin-f453a.firebaseapp.com",
    projectId: "miselogin-f453a",
    storageBucket: "miselogin-f453a.appspot.com",
    messagingSenderId: "560525045430",
    appId: "1:560525045430:web:92edcbc17ad71501f6c017",
    measurementId: "G-MRK0KLKB31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);