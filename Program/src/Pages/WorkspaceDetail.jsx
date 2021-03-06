import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { UseCurrUser } from "../js/Auth.js";
import { useEffect, useState, Fragment, useRef } from "react";
import { doc, getDoc, where } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { RevokeUser, GrantUser, RemoveUserWo } from "../js/UserController";
import { RevokeWorkspaceUser, GrantWorkspaceUser, removeWorkspaceUser, deleteWorkspace } from "../js/WorkspaceController";
import { Dialog, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { SetVisibility } from "../js/WorkspaceController";
import RestrictionPopup from "../Component/RestrictionPopup.jsx";
import { ExclamationIcon } from '@heroicons/react/outline';

export default function WorkspaceDetail(){
    let {id} = useParams()
    let navigateTo = useNavigate()
    let userContext = UseCurrUser()
    let user = userContext.user;

    const [workspace, setWorkspace] = useState([]);
    const [boards, setBoards] = useState([]);
    const [admins, setAdmin] = useState([]);
    const [members, setMember] = useState([]);
    const [load, setLoad] = useState(true);
    const [manage, setManage] = useState(false);
    const [open, setOpen] = useState(false);
    const [confirm, setConfirm] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [remove, setRemove] = useState(false);
    const cancelButtonRef = useRef();

    const handleShorcut = (e) =>{
      console.log(e.key)
      if(e.key === "Escape" && !manage){
        navigateTo("/home");
      } else if(e.key === "Escape" && manage){
        setManage(false);
      }
    }

    useEffect(() => {
       getDoc(doc(db, "Workspace", id))
        .then((doc) =>{
            let workspace = doc.data();
            setWorkspace(workspace);
            setBoards(workspace.AllWorkspaceBoardId);
            setAdmin(workspace.AllWorkspaceAdminId);
            setMember(workspace.AllWorkspaceMemberId);
            setLoad(false)
        })
       }, [!load])

    useEffect(() => {
        if(userContext.currUser === null){
            navigateTo('/registration/'+undefined)
        } 
     
    }, [])

    function LoadMembers(){
            
      if(members.length == 0){
          return(
              <div></div>
          )
      } else{
          return(
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-8" >
              {members.map((memberId) => {
              let memberName = GetUserName(memberId);
              return(
                  <div
                  key={memberId}
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                  
                  <div className="flex min-w-0">
                      <p className="text-sm font-medium text-gray-900">{memberName}</p>
                      {manage && !remove &&
                      <a
                      href="#"
                      onClick={() => {
                        setOpen(true);
                        setConfirm("grant");
                        setSelectedId(memberId);
                      }}
                       className="ml-4 text-sm font-bold text-[#16a34a] hover:text-[#15803d]">Grant</a> }

                       { manage && remove &&
                       <a
                      href="#"
                      onClick={() => {
                        setOpen(true);
                        setConfirm("remove");
                        setSelectedId(memberId);
                      }}
                       className="ml-4 p-1 text-sm font-bold text-red-500 hover:text-red-600]">remove</a> 

                       }
                  </div>

                  </div>
              )})}
          </div>

          )
      }
  }

  function LoadAdmins(){
      if(admins.length == 0){
          return(
              <div></div>
          )
      } else{
          return(
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-8">
              {admins.map((adminId) => {
                  let adminName = GetUserName(adminId);

                  return(
                  <div
                  key={adminId}
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                  
                  <div className="flex min-w-0">
                      <p className="text-sm font-medium text-gray-900">{adminName}</p>
                      {manage && adminId === user.id && !remove && <p className="ml-4 text-sm font-bold text-blue-600">You</p>}
                      {manage && adminId !== user.id && !remove &&
                      <a
                      href="#"
                      onClick={() => {
                          setOpen(true);
                          setConfirm("revoke");
                          setSelectedId(adminId);
                      }}
                       className="ml-4 text-sm font-bold text-red-600 hover:text-red-500">revoke</a> }
                       
                      
                  </div>

                  </div>
              )})}
              </div>

          )
      }
  }

  function GetUserName(userId){
      const [userName, setUserName]  = useState("");
              
      getDoc(doc(db, "User", userId))
          .then((doc) =>{
              let user = doc.data();
              setUserName(user.Name)
          })
      return userName;
  }

  function GetBoardData(boardId){
    const [board, setBoard] = useState("");

    getDoc(doc(db, "Board", boardId))
          .then((doc) =>{
              let board = doc.data();
              setBoard(board)
          })
      return board;
  }



    function ConfirmationPopup(type, userId) {
      let needGrant = false;
      if(type == "leave" && admins.length <=1 && members.length <=1){
        type = "deleteLeave";
      } else if(type == "leave" && admins.length<2){
        needGrant = true;
      }
      
      return (
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
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        {!needGrant && type !== "deleteLeave" ? "Confirmation! Are You Sure?": "Please Grant one of your member admin role"}
                        {type === "deleteLeave" && "Confirmation! Are You Sure? The workspace will automatically deleted"}
                      </Dialog.Title>
                      
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setOpen(false);
                      }}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="mt-3 mx-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setOpen(false);
                        
                        if(type == "grant"){
                          GrantUser(userId, id);
                          GrantWorkspaceUser(userId, id);
                        } else if(type == "revoke"){
                          RevokeUser(userId, id);
                          RevokeWorkspaceUser(userId, id);
                        } else if(type == "remove"){
                          RemoveUserWo(userId, id);
                          removeWorkspaceUser(userId, id);
                        } else if(type == "leave" && !needGrant){
                          removeWorkspaceUser(userId, id);
                          RemoveUserWo(userId, id);
                          navigateTo("/home");
                        } else if(type == "deleteLeave"){
                          removeWorkspaceUser(userId, id);
                          deleteWorkspace(id);
                          navigateTo("/home");
                        } else if(type == "delete"){
                          deleteWorkspace(id);
                          admins.forEach( (adminId) => RemoveUserWo(adminId,id));
                          members.forEach( (memberId) => RemoveUserWo(memberId,id));
                          navigateTo("/home");
                        }
                        setLoad(true);
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )
    }


    if(load === true){
        return(
            <h1>loading..</h1>
        )
    } else if(workspace.Visibility === "private" && !(admins.includes(user.id) || members.includes(user.id))){
        
            console.log(workspace.Visibility)
            return(
                <RestrictionPopup/>

            )
        
    } else if(open){
      return(
        <div>
          {ConfirmationPopup(confirm, selectedId)}
        </div>
      )
    } else{
        
        function LoadBoards(){
            if(boards.length == 0){
                return(
                    <h1 className="mt-4 mx-6 text-l text-black-900">none</h1>
                )
            } else{
                return(
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {boards.map((boardId) => {
                      let board = GetBoardData(boardId);
                      if(!board.StatusClosed){
                        return (
                          <Link
                          to={"/boarddetail/"+id+"/"+boardId}
                          key={boardId}
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
        
    
        function DropdownVisibility(visibility){

            function classNames(...classes) {
                return classes.filter(Boolean).join(' ')
            }
            
            var selection = visibility === "public" ? "private" : "public";
        
            return (
                <Menu as="div" className="relative inline-block text-left">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md border border-blue-300 shadow-sm px-4 py-2 bg-blue-300 text-sm font-medium text-gray-700 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                      {visibility}
                      <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                  </div>
        
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              onClick={() => {
                                SetVisibility(selection, id);
                                setLoad(true);
                                }}
                              className={classNames(
                                active ? 'bg-blue-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {selection}
                            </a>
                          )}
                        </Menu.Item>
                       
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
            )
        }

      
        function ManageWorkspace(){

            return (
                <div className="my-6 flex w-full">
                    <button
                    onClick={() => setManage(false)}
                    className="mx-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#262626] hover:bg-[#404040] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Back
                    </button>
                    <Link
                    to={"/home/invite/" + id}
                    className="mx-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#16a34a] hover:bg-[#15803d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Member
                    </Link>
                    <button
                    onClick={()=>{
                      if(!remove){
                        setRemove(true);
                      } else {
                        setRemove(false);
                      }
                    }}
                    className={
                      !remove ? "mx-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      : "mx-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}
                    >
                        {!remove ? "Remove Member" : "Grant/Revoke"}
                    </button>
                    {DropdownVisibility(workspace.Visibility)}
                   
                </div>
            )
        }
        
        return(
            <div tabIndex={0} onKeyDown={handleShorcut}>
                <h2 className="mt-6 text-center text-2xl font-extrabold text-blue-500">Workspace Detail</h2>
                <h2 className="mt-6 text-center text-6xl font-extrabold text-gray-900">{workspace.Name}</h2>
                <h2 className="mt-6 text-center text-xl font-extrabold text-gray-500">{"visibility: " + workspace.Visibility}</h2>
                {(user.data.OwnedWorkspacesId.includes(id) || user.data.JoinedWorkspacesId.includes(id)) && <button
                    onClick={()=>{
                      setOpen(true);
                      setConfirm("leave");
                      setSelectedId(user.id);
                    }}
                    className="m-4 group absolute top-0 right-0 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Leave Workspace
                </button>}
                <hr className="mt-6"></hr> 

                <div className="m-8 flex-1">
                    <Link
                    to="/home"
                    className="mx-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#262626] hover:bg-[#404040] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    back to home
                    </Link>
                    { user.data.OwnedWorkspacesId.includes(id) && manage &&
                      <button
                      onClick={()=>{
                        setOpen(true);
                        setConfirm("delete");
                        
                      }}
                      className="mx-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#f97316] hover:bg-[#ea580c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                      Delete Workspace
                      </button>
                    }

                    {user.data.OwnedWorkspacesId.includes(id) && !manage && <button
                        onClick={() => setManage(true)}
                        className="m-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Manage Workspace
                        </button>}
                    {user.data.OwnedWorkspacesId.includes(id) && manage && <ManageWorkspace/>}
                    {(user.data.OwnedWorkspacesId.includes(id) || user.data.JoinedWorkspacesId.includes(id)) && !manage && <Link
                    to={"/createboard/"+id}
                    className="mx-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#16a34a] hover:bg-[#15803d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Create Board
                    </Link>}
                    {manage && <div tabIndex={0} onKeyDown={handleShorcut}></div>}

                </div>

                <hr className="mt-6"></hr> 

                <div className="flex-1">

                    <div className="px-4">
                        <h1 className="my-4 text-3xl text-black-900">Admins</h1>
                        <LoadAdmins/>
                    </div>

                    <div className="px-4">
                        <h1 className="my-4 text-3xl text-black-900">Members</h1>
                        <LoadMembers/>
                    </div>
                
                </div>

                <hr className="mt-6"></hr> 
                {!manage && <div className="px-4">
                <h1 className="my-4 text-3xl text-black-900">Boards</h1>
                <LoadBoards/>
                </div>}
            </div>
        )

    }
    
   
}
