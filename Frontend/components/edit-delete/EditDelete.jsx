import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import "./EditDelete.scss"

export default function EditDelete({ open, setComics, index, id, title, cover_url, read_at, last_ch, last_read, status, }) {

    const fallbackCoverURL = "../../src/assets/brokenImage.png";
    const initialData = { title, cover_url, read_at, last_ch, last_read, status };
    const apiURL = import.meta.env.VITE_API_URL;

    const [editImgURL, setEditImgURL] = useState(cover_url);
    const [disableSaveChanges, setDisableSaveChanges] = useState(false);
    const [disableDelete, setDisabledDelete] = useState(true);
    const [formData, setFormData] = useState(initialData)


    function updateComicAtIndex(updatedComic) {
        setComics(prevComics =>
            prevComics.map(c => (c.id === updatedComic.id ? updatedComic : c))
        );
    }

    function handleInputChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value.trim(),
        }));
    }

    function handleTitleChange(e) { //* Delete Button
        if (e.target.value === title) {
            setDisabledDelete(false);
        } else {
            setDisabledDelete(true);
        }
    }

    function handleDelete() {

        setDisabledDelete(true)

        toast.promise(

            axios.delete(`${apiURL}/api/delete/${id}`),
            {
                loading: "Deleting Comic...",
                success: "Comic Deletion successful!",
                error: "Failed to Delete Comic!",
            }
        ).then(res => {
            console.log("Server updated:", res.data);
        }).catch(err => {
            console.error("Update failed:", err);
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setDisableSaveChanges(true);
        const changes = {};

        if (formData.last_ch > initialData.last_ch) {
            const now = new Date();
            const month = now.toLocaleString("en-US", { month: "short" }); //* "Sep"
            const day = now.getDate(); //* 3
            changes.last_read = `${month} ${day}`; //* "Sep 3"
        }

        for (const key in formData) {
            if (formData[key] !== initialData[key]) {
                changes[key] = formData[key];
            }
        }

        console.log(Object.keys(changes).length);


        if (Object.keys(changes).length !== 0) {

            toast.promise(

                axios.patch(`${apiURL}/api/update/${id}`, changes),
                {
                    loading: "Saving Changes...",
                    success: "Changes Saved successful!",
                    error: "Save failed!",
                }
            ).then(res => {
                updateComicAtIndex(res.data.updatedComic);

                console.log("Server updated:", res.data.message);
            }).catch(err => {
                console.error("Update failed:", err);
            }).finally(() => {
                setDisableSaveChanges(false);
            });
        } else {
            setDisableSaveChanges(false);
        }

    }


    return (
        <div className="edit-delete">
            <div className={`edit ${open === 'edit' ? "show" : ""}`}>

                <img src={editImgURL} onError={(e) => e.target.src = fallbackCoverURL} alt="Cover image" />

                <form onSubmit={handleSubmit}>
                    <div className="title-wrapper">
                        <input onChange={handleInputChange} name="title" type="text" defaultValue={title} required />
                        <label>Title</label>
                    </div>

                    <div className="cover-wrapper">
                        <input onChange={(e) => { setEditImgURL(e.target.value); handleInputChange(e) }} name="cover_url" type="url" defaultValue={cover_url} required />
                        <label>Cover URL</label>
                    </div>

                    <div className="readAt-wrapper">
                        <input onChange={handleInputChange} name="read_at" type="url" defaultValue={read_at} required />
                        <label>Read At URL</label>
                    </div>

                    <section className="lastChAndstatus-cont">
                        <div className="lastCh-wrapper">
                            <input onChange={handleInputChange} name="last_ch" type="number" defaultValue={last_ch} required />
                            <label>Last Chapter</label>
                        </div>

                        <div className="status-wrapper">
                            <select onChange={handleInputChange} name="status" id="ststus" value={status}>
                                <option defaultValue="ONGOING">ONGOING</option>
                                <option defaultValue="HAITUS">HAITUS</option>
                                <option defaultValue="COMPLETED">COMPLETED</option>
                            </select>
                        </div>
                    </section>

                    <div className="saveButt-cont">
                        <button disabled={disableSaveChanges} >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            <div className={`delete ${open === 'delete' ? "show" : ""}`}>
                <p>To confirm, please enter comic title:</p>
                <div className="DelConfirm-wrapper">
                    <input onChange={handleTitleChange} type="text" required />
                    <label>Enter Title</label>
                </div>

                <div className="deleteContButt">
                    <button onClick={handleDelete} disabled={disableDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-x-icon lucide-book-x"><path d="m14.5 7-5 5" /><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /><path d="m9.5 7 5 5" /></svg>
                        <p>Delete Permanently</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

