import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './signup.styles.scss'

const defaultFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
        // console.log(formFields);
    }

    const resetFormFields = () => {
        setFormFields(defaultFields);
    }

    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("Password doesn't match");
            resetFormFields();
            return
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocFromAuth(user, { displayName });
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Can't create the user, email already in use.")
            } else {
                console.log("User creation encountered an error, ", error);
            }
        }

    }

    return (
        <div>
            <div className="signup-container">
                <h2>
                    Don't have an account?
                </h2>
                <span>
                    Sign up with your email and password
                </span>
                <form onSubmit={handleSignupSubmit}>
                    <FormInput 
                        label={"Display Name:"} 
                        required 
                        type="text" 
                        name="displayName" 
                        value={displayName} 
                        onChange={handleChange}
                    />

                    <FormInput 
                        label={"Email:"} 
                        required 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={handleChange}
                    />

                    <FormInput 
                        label={"Password:"}
                        required 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={handleChange}
                    />

                    <FormInput 
                        label={"Confirm Password:"} 
                        required 
                        type="password" 
                        name="confirmPassword" 
                        value={confirmPassword} 
                        onChange={handleChange}
                    />

                    <Button type="submit">Sign Up</Button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;