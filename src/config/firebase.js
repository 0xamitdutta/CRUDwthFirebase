import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: "firebasecrud-387510",
    storageBucket: "firebasecrud-387510.appspot.com",
    messagingSenderId: "178221905899",
    appId: "1:178221905899:web:d4e5aeaf1e528e2cdc4bae"
};
console.log("API KEY: ", import.meta.env.VITE_FIREBASE_API_KEY);
console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);