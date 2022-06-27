 import { db } from '../firebaseConfig';
 import { collection, where, orderBy, query, onSnapshot, addDoc} from 'firebase/firestore';
import { createContext,  useContext, useEffect, useState } from 'react';

 const workspaceRef = collection(db, 'Workspace');
 const WorkspaceUserRef = collection(db, 'WorkspaceUserDetail');

 const workspaceContext = createContext() 

 export const inputWorkspace = (newName, Desc) => {
   
   console.log(newName + " " + Desc);
   try{
      addDoc(workspaceRef, {
         Name: newName,
         Description: Desc,
         Visibility: "public"
      })
   }catch (error){
      console.log(error)
   }
 }

 export const GetWorkspaceProvider = ({children}) => {
    
      const [workspaces, setWorkspaces] = useState([]);
      const [load, setLoad] = useState('')

      useEffect(() => {
         // setLoad(true)
         let q = query(workspaceRef, orderBy('Name', 'asc'));
         const workspace = [];
          onSnapshot(q, (snapShot)=>{
             snapShot.docs.forEach( (doc) => {
                   workspace.push(
                            {
                               ...doc.data(),
                               id: doc.id
                            });
             })
             setWorkspaces(workspace)
             setLoad(false)
          })  
      }, [])
      console.log(workspaces)
    if(load === false){
      return (
         <workspaceContext.Provider
         value={{workspaces}}>
            {children}
         </workspaceContext.Provider>
      )
    }else{
       return(
          <div>
             Loading....
          </div>
       )
    }
 }


 export const GetWorkspaceContext = () => useContext(workspaceContext)


//  export const getWorkspaceMember = (IdWorkspace) => {
//       let q = query(WorkspaceUserRef, where('IdWorkspace', '==' , IdWorkspace))
//       let users = [];
//          onSnapshot(q, (snapShot)=>{
//             snapShot.docs.forEach( (doc) => {
//                   users.push(
//                            {
//                               ...doc.data()
//                            });
//          })
//          console.log(users);
//       })
//  }
