import { Link, useNavigate } from "react-router-dom";

export default function Btn(){

    const navigateTo = useNavigate();

    

    return(
    <div className="relative m-4" >
        <Link
        to="/home/createworkspace"
        className="m-4 group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#16a34a] hover:bg-[#15803d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Create Workspace
        </Link>
        </div>
    )
}