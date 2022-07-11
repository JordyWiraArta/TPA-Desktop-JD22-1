/* This example requires Tailwind CSS v2.0+ */
import { createContext, Fragment, useContext, useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import { Popover, Transition } from '@headlessui/react'
import { UseCurrUser } from '../js/Auth';
import { useNavigate } from 'react-router';
import { signOut, getAuth } from '@firebase/auth';
import app from '../firebaseConfig';
import BtnCrtWo from '../Component/BtnCrtWo.jsx';
import WoCard from '../Component/WoCard';
import MyWo from '../Component/myWo';
import ClosedBoard from '../Component/ClosedBoard';
import ListBoard from '../Component/ListBoard';
import FavoriteBoard from '../Component/FavoriteBoard';

export default function HeaderLoged(){

  let navigateTo = useNavigate();
  let user = UseCurrUser();

  const [view, setView] = useState("wolist");

  const handleShorcut = (e) =>{
    console.log(e.key);
    if(e.key === "c" || e.key === "C"){
        navigateTo("/home/createworkspace")
    }
}
  const active = "border-b-4 text-base font-medium text-gray-500 hover:text-gray-900";
  const nonactive = "text-base font-medium text-gray-500 hover:text-gray-900";

  return (
    <div tabIndex={0} onKeyDown={handleShorcut}>
      <Popover className="relative bg-white">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                
              
                <Popover.Group as="nav" className="hidden md:flex space-x-10">
                

                  <a
                  onClick={()=>setView("wolist")} 
                  href="#" className={view === "wolist" ? active : nonactive}>
                  List of Workspace
                  </a>
                  <a 
                  onClick={()=>setView("mywo")} 
                  href="#" className={view === "mywo" ? active : nonactive}>
                  My Workspace
                  </a>
                  <a 
                  onClick={()=>setView("libo")} 
                  href="#" className={view === "libo" ? active : nonactive}>
                  List of Board
                  </a>
                  <a 
                  onClick={()=>setView("favbo")} 
                  href="#" className={view === "favbo" ? active : nonactive}>
                  Favorite Board
                  </a>
                  <a 
                  onClick={()=>setView("clobo")} 
                  href="#" className={view === "clobo" ? active : nonactive}>
                  Closed Board
                  </a>

                  
                </Popover.Group>
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                  
                  <button
                  onClick = {e => signOut(getAuth(app)).then(navigateTo('/'))}>
                      logOut
                  </button>

                </div>
              </div>
            </div>

          
          </>
        )}
      </Popover>
      <div>
          <BtnCrtWo/>
          {view === "wolist" && <WoCard/>}
          {view === "mywo" && <MyWo/>}
          {view === "libo" && <ListBoard/>}
          {view === "favbo" && <FavoriteBoard/>}
          {view === "clobo" && <ClosedBoard/>}
      </div>
    </div>
  )
}
