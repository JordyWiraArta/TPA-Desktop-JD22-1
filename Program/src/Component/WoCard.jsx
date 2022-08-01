import React, { useEffect, useState} from "react";
import { workspaceRef } from "../js/WorkspaceController";
import { Link } from "react-router-dom";
import {orderBy, query, onSnapshot} from "firebase/firestore";
import { UseCurrUser } from "../js/Auth";


export default function WoCard( {srcVal, ...Attr}){

    const [workspaces, setWorkspaces] = useState([]);
    const [loadWs, setLoadWs] = useState(true);

    useEffect(() => {
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
             setLoadWs(false)
          })  
       }, [!loadWs])

  if(loadWs){
    return(
      <div>
        Loading..
      </div>
    )
  }else {
    return(
        <div>
            <div id="workspaceCard">
            { workspaces.map( (workspace, i=0) => {
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

                  <Link
                  to={stringUrl}>
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
                  </Link>
              </div>
            )
            })}
            </div>
          </div>
    )

  }
}