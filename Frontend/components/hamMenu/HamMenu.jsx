import "./HamMenu.scss"
import FilterMenu from "../filterMenu/FilterMenu";
import { useState } from "react";

export default function HamMenu({setFilterStatus}) {

    const[hamCLicked ,setHamClicked] = useState(false);

    function handleHamClick(){
        setHamClicked(!hamCLicked);
    }

    return (
        <div onClick={handleHamClick} id="hamButt" className={hamCLicked ? "open" : ""}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

            <FilterMenu
                hamCLicked={hamCLicked}
                setHamClicked={setHamClicked}
                setFilterStatus={setFilterStatus}
            />
        </div>
    )
}