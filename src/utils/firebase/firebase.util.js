import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => {
    return signInWithPopup(auth, provider);
};

export const db = getFirestore();
export const createUserDocFromAuth = async (userAuth) => {
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
                createdAt
            });
        } catch (error) {
            console.log("error catching the user", error);
        }
    }

    return userDocRef;

}