import "./Header.scss"
import HamMenu from "../hamMenu/HamMenu";
import SearchBar from "../searchBar/SearchBar";
import toast from 'react-hot-toast';

export default function Header() {

    

    return (

        <header className="headerSection">
            <img src="../src/assets/rky-letter-logo-nobg.png" alt="Logo" />

            <SearchBar />

            <HamMenu />


        </header>

    )
}