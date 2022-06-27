import React, {useRef} from "react";
import {Link, useNavigate} from 'react-router-dom';
import app from "../firebaseConfig";
import { signInWithEmailAndPassword, getAuth } from "@firebase/auth";

export default function Login(){

    let emailRef = useRef();
    let passRef = useRef();
    let navigateTo = useNavigate();

    function login(e){
        e.preventDefault();
        let email = emailRef.current.value;
        let password = passRef.current.value;

        let auth = getAuth(app)
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            
            navigateTo("/home");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            
        });


    }

    return(
        <div className="bg-gray-50 ">

        <div>
        <p className="text-white">t</p>
        <Link
            to="/"
            className="mx-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#262626] hover:bg-[#404040] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            back to home
        </Link>
        </div>

        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
                
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                

                <div>
                    <label htmlFor="email-address" className="my-2 block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        ref={emailRef}
                        autoComplete="off"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                    </div>
                    <div>
                    <label htmlFor="password" className="my-2 block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="off"
                        ref={passRef}
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                    </div>
                </div>

                <div>
                    <button
                    type="submit"
                    onClick={login}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Sign In
                    </button>
                </div>

                <label className="my-2 block text-sm text-gray-700 flex justify-center">
                        Not have account?
                </label>

                <div>
                    <Link
                    to="/registration"
                    className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  bg-[#fafafa] hover:bg-[#f4f4f5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Sign up
                    </Link>
                </div>

                </form>
            </div>
        </div>
    </div>
    )
}