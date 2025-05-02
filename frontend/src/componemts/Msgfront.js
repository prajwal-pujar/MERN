import React, { useContext, useEffect } from 'react';
import Livemssgcontext from '../context/LivemssgContext';
import { useNavigate } from "react-router-dom";
import "./Msgfront.css"
function Msgfront() {
    const { friends, auth, getusers, setToken ,getfriends , loading , setCred } = useContext(Livemssgcontext);
    const navigate = useNavigate();

    useEffect(() => {
        getfriends()
    }, []);

    const sub = async(index) => {
        await setToken(index);
        setCred(index)
        navigate("/musg");
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5 fw-semibold text-dark animate-title">Personal Message</h1>

            {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-2">Fetching friends...</p>
        </div>
      ) : friends.length === 0 ? (
        <div className="text-center">
          <p className="text-muted fs-4">No users found</p>
        </div>
      ) :
           ( <div className="row justify-content-center g-4">
                {friends.map((ele, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4">
                        <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                            <div className="card-body p-4 d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                   <img src={ele.image} alt="user" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", marginRight: "10px" }} />
                                    <h5 className="card-title mb-0 fw-medium text-dark"> {ele.name.charAt(0).toUpperCase() + ele.name.slice(1)}</h5>
                                </div>
                                <button 
                                    onClick={() => sub(index)} 
                                    className="btn btn-outline-primary btn-sm px-3 py-1"
                                >
                                    Chat
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>)}
        </div>
    );
}

export default Msgfront;
