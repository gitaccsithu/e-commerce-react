import { useContext, useState } from "react";
import { createUserDocFromAuth, signInUserWithEmailAndPass, signInWithGooglePopUp } from "../../utils/firebase/firebase.util";
import Button from "../button/button.component";
import { userContext } from "../contexts/user.context";
import FormInput from "../form-input/form-input.component";
import './signin.styles.scss';

const signInDefaultField = {
    email: '',
    password: ''
}

const SignIn = () => {
    const [signInFormField, setSignInFormField] = useState(signInDefaultField);
    const {email, password} = signInFormField;

    const handleSignInFormChange = (event) => {
        const {name, value} = event.target;
        setSignInFormField({...signInFormField, [name]:value});
        console.log("This is signin form field, ", signInFormField);
    }

    const resetFormFields = () => {
        setSignInFormField(signInDefaultField);
    }

    const handleSignInSubmit = async (event) => {
        event.preventDefault();
        console.log("signing in....");
        try {
            const {user} = await signInUserWithEmailAndPass(email, password);
            console.log(user);
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Wrong password, please try again!")
                    resetFormFields();
                    break;
                case "auth/user-not-found":
                    alert("No user associated to this account!")
                    resetFormFields();
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
    }

    const GoogleSignIn = async () => {
        const {user} = await signInWithGooglePopUp();
        // setCurrentUser(user);
        console.log("this is user ", user.uid);
        const userDocRef = await createUserDocFromAuth(user);
        console.log("this is user document reference", userDocRef);
    }
    return (
        <div className="signin-container">
            <h2>
                I already have an account
            </h2>
            <span>
                Sign in with your Email and Password
            </span>
            <form onSubmit={handleSignInSubmit}>
                <FormInput 
                    label={"Email:"} 
                    required 
                    type="text" 
                    name="email" 
                    value={email} 
                    onChange={handleSignInFormChange}
                />
                <FormInput 
                    label={"Password:"} 
                    required 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={handleSignInFormChange}
                />
                <div className="signin-button-container">
                    <Button type="submit">
                        Sign in
                    </Button>
                    <Button type="button" buttonType={"google"} onClick={GoogleSignIn}>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignIn;