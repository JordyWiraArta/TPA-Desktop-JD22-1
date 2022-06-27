
import { UseCurrUser } from "../js/Auth.js";
import BtnCrtWo from '../Component/BtnCrtWo.jsx';
import WoCard from '../Component/WoCard.jsx';

export default function Home(){

        let user = UseCurrUser();
        
        console.log(user.currUser)
        if (user.currUser != null) {
            return(
                <div>
                    <BtnCrtWo/>
                    <WoCard/>
                </div>
            )
        } else {

            return(
                <WoCard/> 
            )
        }
            
            
}