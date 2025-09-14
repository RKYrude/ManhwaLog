import { useState, useEffect } from 'react';
import EditDelete from '../edit-delete/EditDelete'
import { copyText } from '../../utils/copyText';
import './ManhwaCard.scss'

export default function ManhwaCard({ index, id, title, last_read, last_ch, status, cover_url, read_at, open, setOpen, comics, setComics }) {


    const [statusColor, setStatusColor] = useState();
    const fallbackCoverURL = '/brokenImage.png'


    const handleToggle = (type) => {
        if (open.id === id && open.type === type) {
            setOpen({ id: null, type: null });
        } else {
            setOpen({ id, type });
        }

    };



    useEffect(() => {

        switch (status) {
            case "ONGOING":
                setStatusColor("ongoing");
                break;
            case "HAITUS":
                setStatusColor("haitus");
                break;
            case "COMPLETED":
                setStatusColor("completed");
                break;

            default:
                break;
        }
    }, [comics]);

    return (

        <div className="manhwa-card">
            <div className="allInfoSec">

                <section
                    onClick={() => window.open(read_at, "_blank", "noopener,noreferrer")}
                >
                    <p>Read Here</p>
                    <img
                        src={cover_url}
                        alt={title + " [cover image]"}
                        className="manhwa-image"
                        onError={(e) => e.target.src = fallbackCoverURL}
                    />
                </section>

                <div className="manhwa-content">
                    {/* card top */}
                    <div className="manhwa-title">
                        <h3 onClick={()=>copyText(title)} >{title}</h3>
                        <p className="last-read">Last Read: <span>{last_read}</span></p>
                    </div>

                    {/* card bottom */}
                    <div className='manhwa-info'>
                        <div className='chapAndStatusCont'>
                            <div className="chapter-info">
                                <span className="label">Last Chapter:</span>
                                <div className="chapter-tag">{last_ch}</div>
                            </div>

                            <div className="chapter-status">
                                <span className="label">Status:</span>
                                <div className={`status-tag ${statusColor}`}>{status}</div>
                            </div>
                        </div>

                        <div className="delete-edit">
                            <button onClick={() => handleToggle("edit")} className='deleteButt'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#60a5fa" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg>
                            </button>

                            <button onClick={() => handleToggle("delete")} className='editButt'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ef4444" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {open.id === id && (
                <EditDelete
                    open={open.type}
                    setOpen={setOpen}
                    setComics={setComics}
                    index={index}
                    id={id}
                    title={title}
                    cover_url={cover_url}
                    read_at={read_at}
                    last_ch={last_ch}
                    last_read={last_read}
                    status={status}
                />

            )}

        </div>



















    )
}



