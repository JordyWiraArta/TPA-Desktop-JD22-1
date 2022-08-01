import React, { useEffect, useState} from "react";
import { workspaceRef } from "../js/WorkspaceController";
import { Link, useNavigate, useParams } from "react-router-dom";
import {orderBy, query, onSnapshot, where} from "firebase/firestore";
import { UseCurrUser } from "../js/Auth";
import { reopenBoard } from "../js/BoardController";


export default function MyWo( {srcVal, ...Attr}){

    const [workspaces, setWorkspaces] = useState([]);
    const [loadWs, setLoadWs] = useState(true);
    const [workspaces2, setWorkspaces2] = useState([]);
    const [loadWs2, setLoadWs2] = useState(true);
    const navigateTo = useNavigate();
    const {id} = useParams();
    const userContext = UseCurrUser();;
    const user = userContext.user;

    useEffect(() => {
       let q = query(workspaceRef);
       const workspace = [];
       
       onSnapshot(q, (snapShot)=>{
          snapShot.docs.forEach( (doc) => {
                if(doc.data().AllWorkspaceAdminId.includes(user.id)){
                    workspace.push(
                    {
                    
                        ...doc.data(),
                        id: doc.id
                    });
                }
             })
             setWorkspaces(workspace)
             setLoadWs(false)
          })  
       }, [!loadWs])

    useEffect(() => {
        let q = query(workspaceRef);
        const workspace2 = [];
        
        onSnapshot(q, (snapShot)=>{
           snapShot.docs.forEach( (doc) => {
                 if(doc.data().AllWorkspaceMemberId.includes(user.id)){
                     workspace2.push(
                     {
                     
                         ...doc.data(),
                         id: doc.id
                     });
                 }
              })
              setWorkspaces2(workspace2)
              setLoadWs2(false)
           })  
        }, [!loadWs2])

  if(loadWs){
    return(
      <div>
        Loading..
      </div>
    )
  }else {
    return(
        <div>
            <hr className="my-4"/>
            <div className="px-4">
                <h1 className="mt-4 text-3xl text-black-900">OwnedWorkspace</h1>
            </div>
            <hr className="my-4"/>
                    <div id="workspaceCard">
                        { workspaces != [] ? workspaces.map( (workspace, i=0) => {
                          i+=1;
                          
                          let visClass = "relative group flex items-center space-x-2.5 text-sm text-[#f87171] group-hover:text-gray-900 font-medium truncate";
                          if(workspace.Visibility == "public"){
                            visClass = "relative group flex items-center space-x-2.5 text-sm text-[#4ade80] group-hover:text-gray-900 font-medium truncate";
                          }

                          let stringUrl = "/home/workspacedetail/" + workspace.id;
                          let valid = false;
                          if(srcVal === null || srcVal === "" || srcVal === undefined){
                            valid = true;
                          } else if(workspace.Name.includes(srcVal) || workspace.Description.includes(srcVal)){
                            valid = true;
                          }
                          if (valid) return(
                            <div
                            
                            key={workspace.id}
                            
                            className="relative pl-4 pr-6 py-5 hover:bg-blue-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
                            >

                              <a
                              href="#"
                              onClick={() =>{
                                if(id != undefined){
                                  reopenBoard(id, workspace.id);
                                }
                                navigateTo(stringUrl); 
                              }}>
                                <div className="flex items-center justify-between space-x-4">
                                  <div className="min-w-0 space-y-3">
                                    <div className="flex items-center space-x-3">
            
                                      <span className="block">
                                        <h2 className="text-3xl font-medium">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            {workspace.Name}{' '}
                                        </h2>
                                        
                                      </span>
                                    </div>
                                      <span className={visClass}>
                                        {workspace.Visibility}
                                      </span>
                                      <span className="relative group flex items-center space-x-2.5 text-sm text-gray-500 group-hover:text-gray-900 font-medium truncate">
                                        Description: {workspace.Description}
                                      </span>
                                  </div>
                                </div>
                              </a>
                          </div>
                        )
                        }) : <h1 className="m-4 text-xl text-black-900">None..</h1>}
                        </div>
            
                        <hr className="my-4"/>
            <div className="px-4">
                <h1 className="mt-4 text-3xl text-black-900">JoinedWorkspace</h1>
            </div>
            <hr className="my-4"/>
                    <div id="workspaceCard">
                        { workspaces2 != [] ? workspaces2.map( (workspace, i=0) => {
                          i+=1;
                          
                          let visClass = "relative group flex items-center space-x-2.5 text-sm text-[#f87171] group-hover:text-gray-900 font-medium truncate";
                          if(workspace.Visibility == "public"){
                            visClass = "relative group flex items-center space-x-2.5 text-sm text-[#4ade80] group-hover:text-gray-900 font-medium truncate";
                          }

                          let stringUrl = "/home/workspacedetail/" + workspace.id;
                          let valid = false;
                          if(srcVal === null || srcVal === "" || srcVal === undefined){
                            valid = true;
                          } else if(workspace.Name.includes(srcVal) || workspace.Description.includes(srcVal)){
                            valid = true;
                          }
                          if (valid) return(
                            <div
                            
                            key={workspace.id}
                            
                            className="relative pl-4 pr-6 py-5 hover:bg-blue-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
                            >
 
                              <a
                              href="#"
                              onClick={() =>{
                                if(id != undefined){
                                  reopenBoard(id, workspace.id);
                                }
                                navigateTo(stringUrl); 
                              }}>
                                <div className="flex items-center justify-between space-x-4">
                                  <div className="min-w-0 space-y-3">
                                    <div className="flex items-center space-x-3">
            
                                      <span className="block">
                                        <h2 className="text-3xl font-medium">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            {workspace.Name}{' '}
                                        </h2>
                                        
                                      </span>
                                    </div>
                                      <span className={visClass}>
                                        {workspace.Visibility}
                                      </span>
                                      <span className="relative group flex items-center space-x-2.5 text-sm text-gray-500 group-hover:text-gray-900 font-medium truncate">
                                        Description: {workspace.Description}
                                      </span>
                                  </div>
                                </div>
                              </a>
                          </div>
                        )
                        }) : <h1 className="m-4 text-xl text-black-900">None..</h1>}
                    </div>
        </div>
    )

  }
}