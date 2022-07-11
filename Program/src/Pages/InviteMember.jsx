/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUsers, joinBoard } from '../js/UserController';
import { addWorkspaceMember } from '../js/WorkspaceController';
import { joinWorkspace } from '../js/UserController';
import { invitationRef } from '../js/InvitationController';
import { addDoc } from 'firebase/firestore';
import { addBoardMember } from '../js/BoardController';

export default function InviteMember() {
  const [open, setOpen] = useState(true);
  const [method, setMethod] = useState("");
  const [users, setUsers] = useState([]);
  const {id} = useParams();
  const [link, setLink] = useState("");
  const navigateTo = useNavigate();

  let emailRef = useRef();
  const cancelButtonRef = useRef();

  const GenInviteLink = (workspaceId) => {
    
    try{
        addDoc(invitationRef, {
            workspaceId: workspaceId,
            dateCreated: new Date()
        }).then((doc) => {
            setLink("http://localhost:3000/invitationlink/" + doc.id)
        })

    }catch (error){
       console.log(error)
    }
  }

  function invite(){
    let user = []
    getUsers().then(
        (docs) =>{
            docs.forEach( doc => {
                user.push({
                   email: doc.data().Email,
                   id: doc.id
                });
            });
            setUsers(user);
        }
    )    

  }
  let splited = id.split("("); 

  if(users != []){
      var msg = ""
      users.forEach((user) => {
          if(user.email == emailRef.current.value){
               
              if(splited[0] == "board"){
                addBoardMember(user.id, splited[1]);
                joinBoard(user.id, splited[1]);
              } else {
                addWorkspaceMember(user.id, id);
                joinWorkspace(user.id, id);
              }
              msg = "success";
          }
      })
      if(msg !== "success"){
        msg = "email invalid" 
      }
  }


  if(open && method !== "link"){
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
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Select Invitation Method
                      </Dialog.Title>
                      
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                      onClick={() => {
                          setMethod("link");
                          GenInviteLink(id);
                        }}
                    >
                      By link
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      onClick={() => {
                          setOpen(false);
                          setMethod("email");
                        }}
                      ref={cancelButtonRef}
                    >
                      by email
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )
  }else if(method == "email"){
    return(
    <div className="bg-gray-50 ">

        <div>
        <p className="text-white">t</p>
        <Link
            to={splited[0] === "board" ?  "/boarddetail/" + splited[2] + "/" + splited[1] :("/home/workspacedetail/" + id)}
            className="mx-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#262626] hover:bg-[#404040] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            {splited[0] === "board" ? "back to board detail" : "back to workspace Detail"}
        </Link>
        </div>

        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Input Email Address</h2>
                
                </div>
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
                    
                </div>

                <div>
                    <button
                    onClick={invite}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    invite
                    </button>
                    <p className={msg != "success" ? "text-l text-red-500" : "text-l text-[#16a34a]"}>{msg}</p>
                </div>
            </div>
        </div>
    </div>
    )
  } else if( method === "link"){
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
                        Here is the link, it will expired in 4 hours
                      </Dialog.Title>
                      <p>{link != "" ? link : "please wait.."}</p>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      onClick={() => {
                          setOpen(false);
                          navigateTo("/home/workspacedetail/" + id);
                        }}
                    >
                      confirm
                    </button>
                    
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
    )
  }

}
