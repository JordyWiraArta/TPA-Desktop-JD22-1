import React, { useState, useEffect, createContext, useContext } from 'react';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import app from '../firebaseConfig';


const CurrUserContext = createContext({
    user:{
        uid:"",
        displayName:"",
        email: ""
    }
});

export const AuthProvider = ({ children }) => {
    const [currUser, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(getAuth(app), currUser => {
            setUser(currUser)
        })
    })

    return (
        <CurrUserContext.Provider
        value={{currUser}}>
            {children}
        </CurrUserContext.Provider>
    )
}

export const UseCurrUser = () => useContext(CurrUserContext)


