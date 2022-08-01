import { onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseCurrUser } from "../js/Auth";
import { BoardRef } from "../js/BoardController";

export default function ClosedBoard( {srcVal, ...Attr} ){

    const [boards, setBoards] = useState([]);
    const [loadBo, setLoadBo] = useState(true);
    const navigateTo = useNavigate();
    const userContext = UseCurrUser();
    let user = userContext.user;


    useEffect(() => {
       let q = query(BoardRef, where("StatusClosed", "==", true));
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
                   if(board.AllBoardAdminId.includes(user.id)){
                       
                    let valid = false;
                    if(srcVal === null || srcVal === "" || srcVal === undefined){
                    valid = true;
                    } else if(board.Name.includes(srcVal) || board.Description.includes(srcVal)){
                    valid = true;
                    }
                    if (valid)return (
                         <a
                         onClick={()=>{
                             navigateTo("/choose/"+ board.id);
                         }}
                         href="#"
                         key={board.id}
                         className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 bg-gray-300 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                         >
                         
                         <div className="flex-1 min-w-0">
                             <div className="focus:outline-none">
                             <span className="absolute inset-0" aria-hidden="true" />
                             <p className="text-sm font-medium text-gray-900">{board.Name}</p>
                             <p className="text-sm font-medium text-blue-500">reopen</p>
           
                             </div>
                         </div>
                         <div>
                             <p className="text-sm font-medium text-gray-900">{"description: " + board.Description}</p>
                         </div>
                         </a>
                     )
                   }
                 
               })}
               </div>
           )
       }
}

