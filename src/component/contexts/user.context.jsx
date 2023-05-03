import { createContext, useEffect, useState } from "react";
import { createUserDocFromAuth, onAuthStateChangeHandler } from "../../utils/firebase/firebase.util";

export const userContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const UserContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubcribe = onAuthStateChangeHandler((user) => {
            if (user) {
                createUserDocFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubcribe;
    }, []);

    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    )
}