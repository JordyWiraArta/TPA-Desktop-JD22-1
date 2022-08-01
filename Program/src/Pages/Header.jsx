/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from 'react'
import {Link} from "react-router-dom";
import { Popover, Transition } from '@headlessui/react';
import { homeContext } from '../App';

export default function Example() {
  const home = useContext(homeContext);
  const setView = home.compView[1];
  const view = home.compView[0];
  const active = "border-b-4 text-base font-medium text-gray-500 hover:text-gray-900";
  const nonactive = "text-base font-medium text-gray-500 hover:text-gray-900";

  return (
    <Popover className="relative bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
              
             
              <Popover.Group as="nav" className="hidden md:flex space-x-10">
              

              <a
                  onClick={()=>setView("wo")} 
                  href="#" className={view === "wo" ? active : nonactive}>
                  List of Workspace
              </a>
              <a 
                  onClick={()=>setView("bo")} 
                  href="#" className={view === "bo" ? active : nonactive}>
                  List of Board
              </a>

                
              </Popover.Group>
              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">

                <Link 
                to={"/login/" + undefined }
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                  Sign in
                </Link>
                
                <Link
                  to={"/registration/"+undefined}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </Link>

              </div>
            </div>
          </div>

         
        </>
      )}
    </Popover>
  )
}
