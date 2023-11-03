import { useContext, createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    OAuthProvider
} from "firebase/auth"
import { auth } from "../config/firebase";

const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const googleProvider = new GoogleAuthProvider();
    const microsoftProvider = new OAuthProvider('microsoft.com');

    const signUpUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const logInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOutUser = () => {
        return signOut(auth);
    }

    const signInWithMicrosoft = () => {
        return signInWithPopup(auth, microsoftProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        });
        return () => unsubscribe();
    }, [])

    return (
        <UserAuthContext.Provider value={{signUpUser, signInWithGoogle, signInWithMicrosoft, logInUser, logOutUser, user}}>
            {children}
        </UserAuthContext.Provider>
    )
}


export const useUserAuth = () => {
    return useContext(UserAuthContext);
}