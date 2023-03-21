import { createUserDocFromAuth, signInWithGooglePopUp } from "../../utils/firebase/firebase.util";

const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopUp();
    console.log("this is user ", user.uid);
    const userDocRef = await createUserDocFromAuth(user);
}

const SignIn = () => {
    return (
        <div>
            <h1>
                Hello I am sign-in page
            </h1>
            <button onClick={logGoogleUser}>
                Sign in with Google PopUp
            </button>
        </div>
    )
}

export default SignIn;