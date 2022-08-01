import { addDoc } from "@firebase/firestore";
import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import { UseCurrUser } from "../js/Auth";
import { updateListBoard } from "../js/BoardController";
import { ListRef } from "../js/ListController";

export default function ListForm(){
    
    let NameRef = useRef();
    let userContext = UseCurrUser();
    let navigateTo = useNavigate()
    const {id, workspaceId} = useParams();

    function CreateList(e){

        let name = NameRef.current.value;
        let userId = userContext.user.id;
        let arrUser = [];
        arrUser.push(userId);

        try{
            addDoc(ListRef, {
                Name: name,
                AllListCard: []

            }).then((doc) => {
                updateListBoard(id, doc.id);
            })
            
        }catch (error){
            console.log(error)
        }
        
        navigateTo('/boarddetail/' + workspaceId+"/"+ id);
    }

    const handleShorcut = (e) =>{
        if(e.key === "Escape"){
            navigateTo('/boarddetail/' + workspaceId+"/"+ id)
        }
    }

    return(
        <div tabIndex={0} onKeyDown={handleShorcut}>
            <div>
            <p className="text-white">t</p>
            <Link
                to={"/home/workspacedetail/" + id}
                className="mx-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#262626] hover:bg-[#404040] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                back
            </Link>
            </div>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                
                <div className="max-w-md w-full space-y-8">
                    <div>
                    
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create List</h2>
                    
                    </div>
                    {/* <form className="mt-8 space-y-6" action="/home" method=""> */}
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                    

                    <div>
                        <label htmlFor="email-address" className="my-2 block text-sm font-medium text-gray-700">
                            ListName
                        </label>
                        <input
                            id="ListName"
                            name="ListName"
                            type="text"
                            ref={NameRef}
                            autoComplete="off"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="name"
                        />
                        </div>
                        
                    </div>

                    <div>
                        <button
                        // type="submit"
                        onClick={CreateList}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
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