import "./App.scss"
import axios from "axios"
import toast from "react-hot-toast";
import Header from "../components/header/Header.jsx"
import ManhwaCard from "../components/manhwaCard/ManhwaCard.jsx";
import AddNewButt from "../components/addNewButt/AddNewButt.jsx";
import { useEffect, useState } from "react";

function App() {

    const [open, setOpen] = useState({ id: null, type: null });
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);


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

    return (
        <>
            <Header />

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
                        {comics
                            .filter((comic) =>
                                !comic.title.toLowerCase().includes("hentai") &&
                                comic.status.toLowerCase() !== "completed"
                            )
                            .map((comic, index) => (

                                <ManhwaCard
                                    key={comic.id}
                                    index={index}
                                    id={comic.id}
                                    open={open}
                                    setOpen={setOpen}
                                    comics={comics}
                                    setComics={setComics}
                                    {...comic}
                                />
                            ))}
                    </main>

                    <AddNewButt />
                </>
            )}
        </>
    );
}

export default App;
