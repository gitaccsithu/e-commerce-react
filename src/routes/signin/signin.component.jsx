import SignUp from "../../component/signup/signup.component";
import { createUserDocFromAuth, signInWithGooglePopUp } from "../../utils/firebase/firebase.util";

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopUp();
        console.log("this is user ", user.uid);
        const userDocRef = await createUserDocFromAuth(user);
        console.log("this is user document reference", userDocRef);
    }

    return (
        <div>
            <h1>
                Hello I am sign-in page
            </h1>
            <button onClick={logGoogleUser}>
                Sign in with Google PopUp
            </button>
            <SignUp/>
        </div>
    )
}

export default SignIn;