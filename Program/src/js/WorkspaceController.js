 import { db } from '../firebaseConfig';
 import { collection, addDoc, updateDoc, doc, arrayRemove, arrayUnion, deleteDoc, getDoc} from 'firebase/firestore';
import { createContext,  useContext, useEffect, useState } from 'react';
import { closeBoard } from './BoardController';

 export const workspaceRef = collection(db, 'Workspace');
 const workspaceContext = createContext() 
 

 export function RevokeWorkspaceUser(userId, workspaceId){
   try {

      updateDoc( doc(db, "Workspace", workspaceId), {
         AllWorkspaceAdminId: arrayRemove(userId),
         AllWorkspaceMemberId: arrayUnion(userId)
      })

  } catch (error) {
      console.log(error)
  }
 }

 export function GrantWorkspaceUser(userId, workspaceId){
   try {

      updateDoc( doc(db, "Workspace", workspaceId), {
         AllWorkspaceAdminId: arrayUnion(userId),
         AllWorkspaceMemberId: arrayRemove(userId)
      })

  } catch (error) {
      console.log(error)
  }
 }

 export function SetVisibility(visibility, workspaceId){
   console.log(workspaceId + " " + visibility)
   try {

      updateDoc( doc(db, "Workspace", workspaceId), {
         Visibility: visibility
      })

  } catch (error) {
      console.log(error)
  }
 }

 export function addWorkspaceMember(userId, workspaceId){
   try {

      updateDoc( doc(db, "Workspace", workspaceId), {
         AllWorkspaceMemberId: arrayUnion(userId)
      })

  } catch (error) {
      console.log(error)
  }
 }

 export function removeWorkspaceUser(userId, workspaceId){
   try {

      updateDoc( doc(db, "Workspace", workspaceId), {
         AllWorkspaceAdminId: arrayRemove(userId),
         AllWorkspaceMemberId: arrayRemove(userId)
      })

  } catch (error) {
      console.log(error)
  }
 }

 export function updateBoardWorkspace(workspaceId, boardId){
   try {

      updateDoc( doc(db, "Workspace", workspaceId), {
         AllWorkspaceBoardId: arrayUnion(
            boardId
         )
      })

  } catch (error) {
      console.log(error)
  }
 }

export async function deleteWorkspace(workspaceId){
   await getDoc(doc(db, "Workspace", workspaceId))
   .then((doc)=>{
      let workspace = doc.data();
      workspace.AllWorkspaceBoardId.forEach(boardId => {
         closeBoard(boardId);
      });
   deleteDoc(doc.ref);
   })
}



 export const GetWorkspaceProvider = ({children}) => {
    
   //    const [workspaces, setWorkspaces] = useState([]);
   //    const [loadWs, setLoadWs] = useState(true);

   //    useEffect(() => {
   //       setLoadWs(true)
   //       let q = query(workspaceRef, orderBy('Name', 'asc'));
   //       const workspace = [];
         
   //       onSnapshot(q, (snapShot)=>{
   //          snapShot.docs.forEach( (doc) => {
   //             workspace.push(
   //                {
   //                   ...doc.data(),
   //                   id: doc.id
   //                });
                  
   //             })
   //             setWorkspaces(workspace)
   //             setLoadWs(false)
   //          })  
   //       }, [])

   //  if(loadWs === false){
   //    return (
   //       <workspaceContext.Provider
   //       value={{workspaces: workspaces, newWorkspace: true}}>
   //          {children}
   //       </workspaceContext.Provider>
   //    )
   //  }else{
   //     return(
   //        <div>
   //           Loading....
   //        </div>
   //     )
   //  }
 }




 export const GetWorkspaceContext = () => useContext(workspaceContext)