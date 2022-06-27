import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { UseCurrUser } from "../js/Auth.js";
import { useEffect } from "react";


export default function WorkspaceDetail(){
    let {id} = useParams()
    let user = UseCurrUser()
    let navigateTo = useNavigate()
    
    useEffect(() => {
        if(user.currUser === null){
            navigateTo('/registration')
        }

    }, [])

    return(
        <h1>{id}</h1>
    )
}