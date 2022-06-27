import React, { useEffect, useState} from "react";
import { GetWorkspaceContext, passWorkspaceId } from "../js/WorkspaceController";
import { Link } from "react-router-dom";
import { UseCurrUser } from "../js/Auth";


export default function WoCard(){
    let workspaceContext = GetWorkspaceContext();
    let userContext = UseCurrUser();
    
    const workspaces = workspaceContext['workspaces'];
    const usersWs = workspaceContext['usersWs'];
    
    console.log(workspaces[0])

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
                        return(
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