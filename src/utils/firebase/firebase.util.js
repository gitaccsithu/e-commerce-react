import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

    const firebaseConfig = {
    apiKey: "AIzaSyDUS4nMnGFnjvLZxOX5CrX-1Mdc77PKhoM",
    authDomain: "crown-clothing-9c8fe.firebaseapp.com",
    projectId: "crown-clothing-9c8fe",
    storageBucket: "crown-clothing-9c8fe.appspot.com",
    messagingSenderId: "810890174836",
    appId: "1:810890174836:web:f40a8f3aed242d62cf8c21"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => {
    return signInWithPopup(auth, googleProvider);
};
export const signInWithGoogleRedirect = () => {
    return signInWithRedirect(auth, googleProvider);
}

export const db = getFirestore();
export const createUserDocFromAuth = async (userAuth, additionalInformation) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userDoc = await getDoc(userDocRef);
    console.log(userDoc.exists());

    if(!userDoc.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log("error catching the user", error);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password); 
}

export const signInUserWithEmailAndPass = async (email,password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
    return signOut(auth);
}

export const onAuthStateChangeHandler = (callback) => {
    onAuthStateChanged(auth, callback);
}