// import "./FilterMenu.scss"
// import toast from "react-hot-toast";

// export default function FilterMenu({ hamCLicked, setFilterStatus }) {

//     function handleFilterClick(filter) {
//         setFilterStatus(filter);
//         toast.success(`Showing ${filter.toUpperCase()}`);
//     }

//     return (
//         <div className={`filterMenu ${hamCLicked ? "" : "show"}`}>
//             <button onClick={() => handleFilterClick("ongoing")}>ONGOING</button>
//             <button onClick={() => handleFilterClick("haitus")}>HAITUS</button>
//             <button onClick={() => handleFilterClick("completed")}>COMPLETED</button>
//             <button onClick={() => handleFilterClick("all")}>ALL</button>
//         </div>
//     )
// }


import "./FilterMenu.scss";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";

export default function FilterMenu({ hamCLicked, setHamClicked, setFilterStatus }) {
    const menuRef = useRef(null);

    function handleFilterClick(filter) {
        let txtColor;
        setFilterStatus(filter);

        switch (filter) {
            case "ongoing":
                txtColor = "#7ed957"
                break;

            case "haitus":
                txtColor = "#ff5757"
                break;

            case "completed":
                txtColor = "#a6a6a6"
                break;

            default:
                txtColor = "black"
                break;
        }

        toast.success(
            <span>
                Showing
                <span
                    className="toastSpan"
                    style={{
                        color: txtColor,
                        fontWeight: "bold",
                    }}
                >
                    {"  "+filter.toUpperCase()}
                </span>
            </span>
        );

    }""

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setHamClicked(false);
            }
        }

        if (hamCLicked) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [hamCLicked, setHamClicked]);

    return (
        <div
            ref={menuRef}
            className={`filterMenu ${hamCLicked ? "" : "show"}`}
        >
            <button onClick={() => handleFilterClick("ongoing")}>ONGOING</button>
            <button onClick={() => handleFilterClick("haitus")}>HAITUS</button>
            <button onClick={() => handleFilterClick("completed")}>COMPLETED</button>
            <button onClick={() => handleFilterClick("all")}>ALL</button>
        </div>
    );
}
