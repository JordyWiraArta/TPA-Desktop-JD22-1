import React, {useEffect, useRef, useState, Fragment} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { workspaceRef } from "../js/WorkspaceController";
import { updateOwnedWorkspace } from "../js/UserController";
import { UseCurrUser } from "../js/Auth";
import { Dialog, Transition } from '@headlessui/react';
import { userRef } from "../js/UserController";
import { addDoc } from "@firebase/firestore";

export default function WorkspaceForm(){
    
    let NameRef = useRef();
    let DescRef = useRef();
    let userContext = UseCurrUser();

    const [open, setOpen] = useState(false);
    const [woId, setWoId] = useState("");
    let navigateTo = useNavigate();
    const cancelButtonRef = useRef();


    function CreateWorkspace(e){

        let name = NameRef.current.value;
        let desc = DescRef.current.value;

        let userId = userContext.user.id;
        let arrUser = [];
        arrUser.push(userId);

        try{
            addDoc(workspaceRef, {
                Name: name,
                Description: desc,
                Visibility: "public",
                AllWorkspaceAdminId: arrUser,
                AllWorkspaceBoardId: [],
                AllWorkspaceMemberId: []
            }).then((doc) => {
                updateOwnedWorkspace(userId, doc.id);
                setWoId(doc.id);
            })
            
        }catch (error){
            console.log(error)
        }
        
        setOpen(true);
    }

    const handleShorcut = (e) =>{
        if(e.key === "Escape"){
            navigateTo("/home")
        }
    }

    if(open){
        return(
            <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={open}
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
        
                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                        <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Do you want to invite a member?
                        </Dialog.Title>
                        
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                        onClick={() => {
                            navigateTo("/home/invite/" + woId)
                            }}
                        >
                        Yes
                        </button>
                        <button
                        type="button"
                        className=
                        "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                        
                        onClick={() => {
                            navigateTo("/home");
                            }}
                        ref={cancelButtonRef}
                        >
                        No
                        </button>
                    </div>
                    </div>
                </Transition.Child>
                </div>
            </Dialog>
            </Transition.Root>
        )
    } else {

        return(
            <div tabIndex={0} onKeyDown={handleShorcut}>
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
}