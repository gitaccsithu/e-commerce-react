import { useContext } from "react";
import { userContext } from "../../component/contexts/user.context";
import SignIn from "../../component/signin/signin.component";
import SignUp from "../../component/signup/signup.component";
import { createUserDocFromAuth, signInWithGooglePopUp } from "../../utils/firebase/firebase.util";
import './authentication.styles.scss'

const Authentication = () => {
    const user = useContext(userContext);
    console.log("This is user context, ", user);
    
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopUp();
        console.log("this is user ", user.uid);
        const userDocRef = await createUserDocFromAuth(user);
        console.log("this is user document reference", userDocRef);
    }

    return (
        <div className="signin-page-container">
            <SignIn/>
            <SignUp/>
        </div>
    )
}

export default Authentication;