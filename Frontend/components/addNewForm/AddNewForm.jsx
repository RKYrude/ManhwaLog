import "./AddNewForm.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddNewForm({ open, setOpen }) {

    const fallbackCoverURL = "../../src/assets/brokenImage.png";
    const apiURL = import.meta.env.VITE_API_URL;

    const [editImgURL, setEditImgURL] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        cover_url: "",
        read_at: "",
        last_ch: "",
        status: "ONGOING",
        last_read: ""
    });


    function handleInputChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value.trim(),
        }));
    }

    function handleInputClear(e) {
        e.preventDefault();

        setEditImgURL("");

        setFormData(
            {
                title: "",
                cover_url: "",
                read_at: "",
                last_ch: "",
                status: "ONGOING",
                last_read: ""
            }
        );
    }

    function handleSubmit(e) {
        e.preventDefault();

        const now = new Date();
        const month = now.toLocaleString("en-US", { month: "short" }); //* "Sep"
        const day = now.getDate(); //* 3
        formData["last_read"] = `${month} ${day}`; //* "Sep 3"

        toast.promise(

            axios.post(`${apiURL}/api/addNew`, formData),

            {
                loading: "Adding new comic...",
                success: "Added comic successful!",
                error: "Failed to add new comic!",
            }

        ).then(res => {
            console.log("Server updated:", res.data);
            setOpen(false);

        }).catch(err => {
            console.error("Update failed:", err);
        });

    }

    return (
        <div className="addNew">
            <h3>Add NEW Comic</h3>

            <img
                src={editImgURL && editImgURL.trim() !== ""
                    ? editImgURL
                    : "../../src/assets/DefaultCover.jpg"}
                onError={(e) => { e.target.src = fallbackCoverURL }}
                alt="Cover image"
            />


            <form onSubmit={handleSubmit}>
                <div className="title-wrapper">
                    <input onChange={handleInputChange} name="title" value={formData.title} type="text" required />
                    <label>Title</label>
                </div>

                <div className="cover-wrapper">
                    <input onChange={(e) => { setEditImgURL(e.target.value); handleInputChange(e) }} name="cover_url" value={formData.cover_url} type="url" required />
                    <label>Cover URL</label>
                </div>

                <div className="readAt-wrapper">
                    <input onChange={handleInputChange} name="read_at" value={formData.read_at} type="url" required />
                    <label>Read At URL</label>
                </div>

                <section className="lastChAndstatus-cont">
                    <div className="lastCh-wrapper">
                        <input onChange={handleInputChange} name="last_ch" value={formData.last_ch} type="number" required />
                        <label>Last Chapter</label>
                    </div>

                    <div className="status-wrapper">
                        <select onChange={handleInputChange} name="status" value={formData.status} id="ststus">
                            <option defaultValue="ONGOING">ONGOING</option>
                            <option defaultValue="HAITUS">HAITUS</option>
                            <option defaultValue="COMPLETED">COMPLETED</option>
                        </select>
                    </div>
                </section>

                <div className="saveButt-cont">
                    <button onClick={handleInputClear} >Clear</button>
                    <button >Save Changes</button>
                </div>
            </form>
        </div>
    )
}