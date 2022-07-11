import React, { useState, useEffect, createContext, useContext } from 'react';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import app from '../firebaseConfig';
import { onSnapshot, query, where } from 'firebase/firestore';
import { userRef } from './UserController.js';


const CurrUserContext = createContext({
    user:{
        uid:"",
        displayName:"",
        email: ""
    }
});

export const AuthProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState(null);
    const [user, setUser] = useState(['none']);
    
    useEffect(() => {
        onAuthStateChanged(getAuth(app), currUser => {
            setCurrUser(currUser)
            if(currUser != null){
                const q = query(userRef, where("UserId", '==', currUser.uid));
    
                onSnapshot(q, (snapshot) => {
                    let u = {
                        id: snapshot.docs[0].id,
                        data: snapshot.docs[0].data()
                    };
                    setUser(u)
                })
            } else{
                setUser(null)
            }
        })
    },['none'])

    return (
        <CurrUserContext.Provider
        value={{currUser: currUser, user: user}}>
            {children}
        </CurrUserContext.Provider>
    )
}

export const UseCurrUser = () => useContext(CurrUserContext)


