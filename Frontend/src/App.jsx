import "./App.scss"
import axios from "axios"
import toast from "react-hot-toast";
import Header from "../components/header/Header.jsx"
import ManhwaCard from "../components/manhwaCard/ManhwaCard.jsx";
import AddNewButt from "../components/addNewButt/AddNewButt.jsx";
import { useEffect, useState, useRef } from "react";

function App() {

    const [open, setOpen] = useState({ id: null, type: null });
    const [comics, setComics] = useState([]);
    const [showingNo, SetShowingNo] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchVal, setSearchVal] = useState("");
    const [filterStatus, setFilterStatus] = useState("default");



    const comicRefs = useRef({});

    const setComicRef = (id, el) => {
        if (el) comicRefs.current[id] = el;
    };

    // Function passed to Header
    const scrollToComic = (searchTerm) => {
        const found = comics.find(c =>
            c.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
        );

        if (found && comicRefs.current[found.id]) {
            comicRefs.current[found.id].scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            console.log(comicRefs);

        } else {
            toast.error("No matching comic found!");
        }
    };

    async function fetchData() {
        const apiURL = `${import.meta.env.VITE_API_URL}/api/comics`;

        try {
            const response = await axios.get(apiURL);
            setComics(response.data);

        } catch (err) {
            toast.error(err.message);
            console.error("Error fetching data:", err);

        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    function filterComics() {
        const search = searchVal.trim().toLowerCase();

        //* 🔍 If searching hentai → only show hentai ongoing/haitus
        if (search.includes("hentai")) {
            return comics.filter(
                (comic) =>
                    comic.title.toLowerCase().includes("hentai") 
                    //. && comic.status.toLowerCase() !== "completed"
            );
        }

        let noHentai = comics.filter(
            (comic) => !comic.title.toLowerCase().includes("hentai")
        );

        let filtered;

        if (filterStatus === "default") {
            filtered = noHentai.filter(
                (comic) =>
                    comic.status.toLowerCase() === "ongoing" ||
                    comic.status.toLowerCase() === "haitus"
            );
        }

        else if (filterStatus === "ongoing") {
            filtered = noHentai.filter(
                (comic) => comic.status.toLowerCase() === "ongoing"
            );
        }

        else if (filterStatus === "haitus") {
            filtered = noHentai.filter(
                (comic) => comic.status.toLowerCase() === "haitus"
            );
        }

        else if (filterStatus === "completed") {
            filtered = noHentai.filter(
                (comic) => comic.status.toLowerCase() === "completed"
            );
        }

        else {
            filtered = noHentai; // all statuses but no hentai
        }


        return filtered;
    }
    useEffect(() => {
        const filteredComics = filterComics();
        SetShowingNo(filteredComics.length);
    }, [filterStatus, comics, searchVal]);





    return (
        <>
            <Header
                comicLen={comics.length}
                showingNo={showingNo}
                scrollToComic={scrollToComic}
                searchVal={searchVal}
                setSearchVal={setSearchVal}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
            />

            {loading ? (

                <div className="loader-wrapper">
                    <div className="loader"></div>
                    <p>Fetching comics...</p>
                </div>

            ) : comics.length === 0 ? (

                <p className="noComic">No Comic Available</p>
            ) : (
                <>
                    <main className="manhwaCont">
                        {filterComics().map((comic, index) => (

                            < div
                                id={comic.title}
                                className="manhwaCardWrapper"
                                ref={(el) => setComicRef(comic.id, el)}
                                key={comic.id}
                            >
                                <ManhwaCard
                                    index={index}
                                    id={comic.id}
                                    open={open}
                                    setOpen={setOpen}
                                    comics={comics}
                                    setComics={setComics}
                                    {...comic}
                                />
                            </div>
                        ))}
                    </main>

                    <AddNewButt
                        setComics={setComics}
                    />
                </>
            )
            }
        </>
    );
}

export default App;
