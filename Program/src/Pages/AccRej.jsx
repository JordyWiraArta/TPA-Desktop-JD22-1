/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { UseCurrUser } from '../js/Auth';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../firebaseConfig';
import { addWorkspaceMember } from '../js/WorkspaceController';
import { joinWorkspace } from '../js/UserController';

export default function AccRej(){

    const [open, setOpen] = useState(true);
    const [inviteData, setInviteData] = useState([]);
    const [loadData, setLoadData] = useState(true);
    const cancelButtonRef = useRef();
    const navigateTo = useNavigate();
    const {id} = useParams();
    const userContext = UseCurrUser();
    const user = userContext.user;
    


    useEffect(() => {

        getDoc( doc(db, "InviteLink", id) )
        .then( (doc) => {
            setInviteData(doc.data());
            setLoadData(false)
        })

    }, [!loadData])

    if(!loadData){
        let linkCreated = inviteData.dateCreated.seconds;
        let currTime = new Date().getTime()/1000
        let valid = ""
        if(userContext.currUser === null){
            navigateTo('/login/' + id);
        } else if(user.data.OwnedWorkspacesId.includes(inviteData.workspaceId) || user.data.JoinedWorkspacesId.includes(inviteData.workspaceId)){
            valid = "joined";
        } else if((currTime - linkCreated) > 14400){
            valid = "expired";
        }

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
                            {valid === "" && "Would you like to accept the invitation?"}
                            {valid === "joined" && "You already joined!"}
                            {valid === "expired" && "link already expired"}
                        </Dialog.Title>
                        
                        </div>
                    </div>
                    <div className={valid === "" ? "mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
                                    : "mt-5 sm:mt-6 sm:gap-3 sm:grid-flow-row-dense"}>
                        {valid === "" && <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#16a34a] hover:bg-[#15803d] text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                        onClick={() => {
                            addWorkspaceMember(user.id, inviteData.workspaceId);
                            joinWorkspace(user.id, inviteData.workspaceId);
                            navigateTo("/home/workspacedetail/" + inviteData.workspaceId);
                            }}
                        >
                        Accept
                        </button>}
                        <button
                        type="button"
                        className={valid === "" ? 
                        "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                        : "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"}
                        onClick={() => {
                            navigateTo("/home");
                            }}
                        ref={cancelButtonRef}
                        >
                        {valid !== "" ? "Confirm" : "Reject"}
                        </button>
                    </div>
                    </div>
                </Transition.Child>
                </div>
            </Dialog>
            </Transition.Root>
        )
    } else {
        return (
            <div>Loading..</div>
        )
    }

}
