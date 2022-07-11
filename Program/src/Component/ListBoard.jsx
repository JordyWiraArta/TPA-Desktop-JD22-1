import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BoardRef } from "../js/BoardController";

export default function ListBoard(){

    const [boards, setBoards] = useState([]);
    const [loadBo, setLoadBo] = useState(true);
    const navigateTo = useNavigate();

    useEffect(() => {
       let q = query(BoardRef, orderBy("Name", "asc"));
       const board = [];
       
       onSnapshot(q, (snapShot)=>{
          snapShot.docs.forEach( (doc) => {
             board.push(
                {
                   ...doc.data(),
                   id: doc.id
                });
                
             })
             setBoards(board)
             setLoadBo(false)
          })  
       }, [!loadBo])

       if(loadBo){
           return(
            <div>
                Loading..
            </div>
           )
       } else{

           return(
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
               {boards.map((board) => {
                    
                    if(!board.StatusClosed){
                        return (
                          <Link
                          to={"/boarddetail/"+board.WorkspaceId+"/"+board.id}
                          key={board.id}
                          className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                          
                          <div className="flex-1 min-w-0">
                              <div className="focus:outline-none">
                              <span className="absolute inset-0" aria-hidden="true" />
                              <p className="text-sm font-medium text-gray-900">{board.Name}</p>
                              <p className={board.Visibility === "public" ? "text-[#4ade80]" : "text-red-400"}>{board.Visibility}</p>
  
                              </div>
                          </div>
                          <div>
                              <p className="text-sm font-medium text-gray-900">{"description: " + board.Description}</p>
                          </div>
                          </Link>
                      )
                    }
                 
               })}
               </div>
           )
       }
}

