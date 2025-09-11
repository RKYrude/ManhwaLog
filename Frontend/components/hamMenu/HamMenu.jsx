import "./HamMenu.scss"

import { useState } from "react";

export default function HamMenu() {

    const[hamCLicked ,sethamClicked] = useState(false);

    function handleHamClick(){
        sethamClicked(!hamCLicked);
    }

    return (
        <button onClick={handleHamClick} id="hamButt" className={hamCLicked ? "open" : ""}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}