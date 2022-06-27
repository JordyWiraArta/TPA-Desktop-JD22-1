import React, {useEffect, useRef} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { InputWorkspace } from "../js/WorkspaceController";
import { UseCurrUser } from "../js/Auth";

export default function WorkspaceForm(){
    
    let NameRef = useRef();
    let DescRef = useRef();
    let user = UseCurrUser();
    
    function CreateWorkspace(e){

        console.log("masuk")
        let name = NameRef.current.value;
        let desc = DescRef.current.value;
        InputWorkspace(name, desc, user.currUser.uid);
        
 
        // useNavigate('/home');
        
    }



    return(
        <div>
            <div>
            <p className="text-white">t</p>
            <Link
                to="/home"
                className="mx-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#262626] hover:bg-[#404040] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                back to home
            </Link>
            </div>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                
                <div className="max-w-md w-full space-y-8">
                    <div>
                    
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Workspace</h2>
                    
                    </div>
                    {/* <form className="mt-8 space-y-6" action="/home" method=""> */}
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                    

                    <div>
                        <label htmlFor="email-address" className="my-2 block text-sm font-medium text-gray-700">
                            WorkspaceName
                        </label>
                        <input
                            id="workspaceName"
                            name="workspaceName"
                            type="text"
                            ref={NameRef}
                            autoComplete="off"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="name"
                        />
                        </div>
                        <div>
                        <label className="my-2 block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <input
                            id="workspaceDescription"
                            name="workspaceDescription"
                            type="text"
                            autoComplete="off"
                            ref={DescRef}
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="description"
                        />
                        </div>
                    </div>

                    <div>
                        <button
                        // type="submit"
                        onClick={CreateWorkspace}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#16a34a] hover:bg-[#15803d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                        >
                        create
                        </button>
                    </div>

                    

                    {/* </form> */}
                </div>
            </div>
        </div>

    )
}