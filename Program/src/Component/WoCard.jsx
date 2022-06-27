import React, { useEffect } from "react";
import { GetWorkspaceContext } from "../js/WorkspaceController";


export default function WoCard(){
    let workspaceContext = GetWorkspaceContext();
        
    const workspaces = workspaceContext['workspaces'];

    return(
        <div>
                       
                        <div id="workspaceCard">
                        { workspaces.map( (workspace) => {
                        return(
                            <li
                            key={workspace.id}
                            className="relative pl-4 pr-6 py-5 hover:bg-blue-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
                            >

                            <div className="flex items-center justify-between space-x-4">
                              <div className="min-w-0 space-y-3">
                                <div className="flex items-center space-x-3">
        
                                  <span className="block">
                                    <h2 className="text-sm font-medium">
                                        <span className="absolute inset-0" aria-hidden="true" />
                                        {workspace.Name}{' '}
                                    </h2>
                                  </span>
                                </div>
                                  <span className="relative group flex items-center space-x-2.5 text-sm text-gray-500 group-hover:text-gray-900 font-medium truncate">
                                    Visibility: {workspace.Visibility}
                                  </span>
                                  <span className="relative group flex items-center space-x-2.5 text-sm text-gray-500 group-hover:text-gray-900 font-medium truncate">
                                    Description: {workspace.Description}
                                  </span>
                              </div>
                            </div>
                          </li>
                        )
                        })}
                        </div>
                    </div>
    )
}