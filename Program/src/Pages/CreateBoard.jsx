import { addDoc } from "@firebase/firestore";
import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import { UseCurrUser } from "../js/Auth";
import { BoardRef } from "../js/BoardController";
import { updateOwnedBoard } from "../js/UserController";
import { updateBoardWorkspace } from "../js/WorkspaceController";

export default function BoardForm(){
    
    let NameRef = useRef();
    let DescRef = useRef();
    let userContext = UseCurrUser();
    let navigateTo = useNavigate()
    const {id} = useParams();
    const workspaceId = id;
    const [boardId, setBoardId] = useState("");

    function CreateBoard(e){

        let name = NameRef.current.value;
        let desc = DescRef.current.value;
        let userId = userContext.user.id;
        let arrUser = [];
        arrUser.push(userId);

        try{
            addDoc(BoardRef, {
                Name: name,
                Description: desc,
                Visibility: "workspace-visible",
                StatusClosed: false,
                AllBoardAdminId: arrUser,
                WorkspaceId: workspaceId,
                AllBoardMemberId: [],
                AllBoardListId: []

            }).then((doc) => {
                updateOwnedBoard(userId, doc.id);
                updateBoardWorkspace(workspaceId, doc.id);
                setBoardId(doc.id);
            })
            
        }catch (error){
            console.log(error)
        }
        
        navigateTo('/home/workspacedetail/' + id);
    }

    const handleShorcut = (e) =>{
        if(e.key === "Escape"){
            navigateTo("/home/workspacedetail/" + id)
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
                    
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Board</h2>
                    
                    </div>
                    {/* <form className="mt-8 space-y-6" action="/home" method=""> */}
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                    

                    <div>
                        <label htmlFor="email-address" className="my-2 block text-sm font-medium text-gray-700">
                            BoardName
                        </label>
                        <input
                            id="BoardName"
                            name="BoardName"
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
                            id="BoardDescription"
                            name="BoardDescription"
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
                        onClick={CreateBoard}
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