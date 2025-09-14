import "./Header.scss"
import HamMenu from "../hamMenu/HamMenu";
import SearchBar from "../searchBar/SearchBar";
import toast from "react-hot-toast";
export default function Header({ comicLen, showingNo, scrollToComic, searchVal, setSearchVal, filterStatus, setFilterStatus }) {

    function logoClick() {
        setFilterStatus("default");
        // toast.success(`Showing ONGOING+HAITUS`);

        toast.success(
            <span>
                {"Showing  "}
                <span
                    className="toastSpan"
                    style={{
                        color: "#7ed957",
                        fontWeight: "bold",
                    }}
                >
                    ONGOING
                </span>
                +
                <span
                    className="toastSpan"
                    style={{
                        color: "#ff5757",
                        fontWeight: "bold",
                    }}
                >
                    HAITUS
                </span>
            </span>
        );
    }

    return (

        <header className="headerSection">
            <div className="img_data">
                <img onClick={logoClick} src="/rky-letter-logo-nobg.png" alt="Logo" />
                <div className="dataCont">
                    <p className={filterStatus}>{filterStatus.toUpperCase()}</p>
                    <p>Total: <span>{comicLen}</span></p>
                    <p>Showing: <span>{showingNo}</span></p>
                </div>
            </div>

            <SearchBar
                scrollToComic={scrollToComic}
                searchVal={searchVal}
                setSearchVal={setSearchVal}
            />

            <HamMenu
                setFilterStatus={setFilterStatus}
            />
        </header>
    )
}