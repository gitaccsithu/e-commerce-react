import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("Password doesn't match");
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
            <h1>
                Sign up with your email and password
            </h1>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label={"Display Name:"} 
                    required type="text" 
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

                <input type="submit" value="Sign up" />
            </form>
        </div>
    )
}

export default SignUp;