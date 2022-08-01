
import { UseCurrUser } from "../js/Auth.js";
import BtnCrtWo from '../Component/BtnCrtWo.jsx';
import WoCard from '../Component/WoCard.jsx';
import { useContext, useState } from "react";
import { homeContext } from "../App.js";
import ListBoard from "../Component/ListBoard.jsx";

export default function Home(){

    const [src, setSrc] = useState("");
    const home = useContext(homeContext);
    const view = home.compView[0];

            return(
                <div>
                    <input
                    id="search"
                    name="search"
                    className="block m-4 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                    onChange={(e) =>{setSrc(e.target.value)}}
                    />  
                    {view ==="wo" && <WoCard srcVal={src}/> }
                    {view ==="bo" && <ListBoard srcVal={src}/> }
                </div>
            )
        
            
            
}