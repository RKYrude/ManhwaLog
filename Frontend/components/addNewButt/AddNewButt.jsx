import { useState } from "react";
import AddNewForm from "../addNewForm/AddNewForm";
import "./AddNewButt.scss";

export default function AddNewButt() {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen(!open);

    return (
        <div className="addNew">
            {/* Floating button */}
            <div className={`addNew__button ${open ? "active" : ""}`} onClick={toggleOpen}>
                <div></div>
                <div></div>
            </div>

            {/* Overlay */}
            {open && <div className="addNew__overlay" onClick={toggleOpen} />}

            {/* Expanding container */}
            <div className={`addNew__expanded ${open ? "open" : ""}`}>
                <AddNewForm 
                    open={open}
                    setOpen={setOpen}
                />
            </div>
        </div>
    );
}
