import React, { useContext, useEffect, useState } from 'react';
import Livemssgcontext from '../context/LivemssgContext';

function Accreq() {
    const { getreq, req, setSent, accept, loading } = useContext(Livemssgcontext);
    const [message, setMessage] = useState("");
    const [clicked, setClicked] = useState({});

    useEffect(() => {
        getreq();
    }, []);

    const sub = async (index) => {
        if (clicked[index]) return;

        // Instantly disable the button
        setClicked(prev => ({ ...prev, [index]: true }));
        setMessage("Accepting...");

        try {
            await setSent(index);
            await accept();
            let updated = [...req];
            updated.splice(index, 1);
            getreq(updated);
            setMessage("Friend request accepted ✅");
        } catch (err) {
            setMessage("Failed to accept request ❌");
            setClicked(prev => ({ ...prev, [index]: false }));
        }

        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4 fw-semibold text-dark animate-title">Friends Request</h1>

            {message && (
                <div className="alert alert-success text-center" role="alert">
                    {message}
                </div>
            )}

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted mt-2">Fetching requests...</p>
                </div>
            ) : req.length === 0 ? (
                <div className="text-center">
                    <p className="text-muted fs-4">No users found</p>
                </div>
            ) : (
                <div className="row justify-content-center g-4">
                    {req.map((ele, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-4">
                            <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                                <div className="card-body p-4 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between">
                                    <div className="d-flex align-items-center mb-3 mb-md-0">
                                        <img
                                            src={ele.image}
                                            alt="user"
                                            className="img-fluid rounded-circle me-2"
                                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                        />
                                        <h5 className="card-title mb-0 fw-medium text-dark">
                                            {ele.name.charAt(0).toUpperCase() + ele.name.slice(1)}
                                        </h5>
                                    </div>
                                    <button
                                        onClick={() => sub(index)}
                                        className="btn btn-outline-primary btn-sm px-3 py-1"
                                        disabled={clicked[index]}
                                    >
                                        {clicked[index] ? "Accepted" : "Accept"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Accreq;
