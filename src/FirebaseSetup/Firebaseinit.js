import { initializeApp } from "firebase/app";
import firebaseConfig from "./FirebaseConfig";
const initializationapp = () => {
    return initializeApp(firebaseConfig);
}

export default initializationapp;