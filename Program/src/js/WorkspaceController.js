 import { db } from '../firebaseConfig';
 import { collection, where, orderBy, query, onSnapshot, addDoc} from 'firebase/firestore';
import { createContext,  useContext, useEffect, useState } from 'react';

 const workspaceRef = collection(db, 'Workspace');
 const WorkspaceUserRef = collection(db, 'WorkspaceUserDetail');
 const workspaceContext = createContext() 
 
 export const InputWorkspace = (newName, Desc, userId) => {
    
   console.log(newName + " " + Desc);
   try{
      addDoc(workspaceRef, {
         Name: newName,
         Description: Desc,
         Visibility: "public"
      })
      .then((doc) => {
         addDoc(WorkspaceUserRef, {
            IdUser: userId,
            IdWorkspace: doc.id,
            UserWorkspaceRole: "Admin"
         })
         
      })
   }catch (error){
      console.log(error)
   }
 }

 export const GetWorkspaceProvider = ({children}) => {
    
      const [workspaces, setWorkspaces] = useState([]);
      const [loadWs, setLoadWs] = useState('');
      const [usersWs, setUsersWs] = useState([]);
      const [loadUser, setLoadUser] = useState('');
      // const [user, setUser] = useState([]);

      useEffect(() => {
         // setLoad(true)
         let q = query(workspaceRef, orderBy('Name', 'asc'));
         const workspace = [];
         const userWs = [];
         onSnapshot(q, (snapShot)=>{
            snapShot.docs.forEach( (doc) => {
               workspace.push(
                  {
                     ...doc.data(),
                     id: doc.id
                  });
                  // console.log(doc.id)
                  let q = query(WorkspaceUserRef, where("IdWorkspace", "==", doc.id));
                  const users = [];
                  onSnapshot(q, (snapShot)=>{
                     snapShot.docs.forEach( (doc) => {
                        users.push(
                           {
                              ...doc.data()
                           });
                        })
                     })  
                     userWs.push(users);
               })
               setWorkspaces(workspace)
               setLoadWs(false)
            })  
            setUsersWs(userWs)
            setLoadUser(false)
           
         }, [])

    if(loadWs === false && loadUser === false){
      return (
         <workspaceContext.Provider
         value={{workspaces: workspaces, usersWs: usersWs}}>
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
