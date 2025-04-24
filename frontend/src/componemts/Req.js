import React, { useContext, useEffect, useState } from 'react';
import Livemssgcontext from '../context/LivemssgContext';
import { useNavigate } from "react-router-dom";
import "./Msgfront.css";

function Req() {
    const { users, auth, getusers, setToken, sendreq ,loading , friends} = useContext(Livemssgcontext);
    const [message, setMessage] = useState("");
    const [disabledIndexes, setDisabledIndexes] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        getusers();
        
    }, []);

 

    const sub = async (index) => {
        await setToken(index);
        await sendreq();
        setMessage("Friend request sent ✅");

        setDisabledIndexes(prev => [...prev, index]);

        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4 fw-semibold text-dark animate-title">Send Request</h1>

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
          <p className="text-muted mt-2">Fetching users...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center">
          <p className="text-muted fs-4">No users found</p>
        </div>
      ) :
           ( <div className="row justify-content-center g-4">
                {users.map((ele, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4">
                        <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                            <div className="card-body p-4 d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div className="avatar-circle bg-primary text-white me-3">
                                        {ele.name.charAt(0).toUpperCase()}
                                    </div>
                                    <h5 className="card-title mb-0 fw-medium text-dark">
                                        {ele.name.charAt(0).toUpperCase() + ele.name.slice(1)}
                                    </h5>
                                </div>
                                <button 
                                    onClick={() => sub(index)} 
                                    className="btn btn-outline-primary btn-sm px-3 py-1"
                                    disabled={disabledIndexes.includes(index)}
                                >
                                    {disabledIndexes.includes(index) ? "Sent" : "Send"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>)}
        </div>
    );
}

export default Req;
