import React, { useContext, useEffect } from 'react';
import Livemssgcontext from '../context/LivemssgContext';
import { useNavigate } from 'react-router-dom';
import './Msgfront.css';

function Msgfront() {
  const { friends, getfriends, loading, setToken, setCred } = useContext(Livemssgcontext);
  const navigate = useNavigate();

  useEffect(() => {
    getfriends();
  }, []);

  const startChat = async (index) => {
    await setToken(index);
    setCred(index);
    navigate('/musg');
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold text-primary animate-title">Chats</h1>

      {loading ? (
        <div className="d-flex flex-column align-items-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-muted">Loading friends...</p>
        </div>
      ) : friends.length === 0 ? (
        <div className="text-center mt-5">
          <p className="fs-4 text-muted">No users found</p>
        </div>
      ) : (
        <div className="row g-4 justify-content-center">
          {friends.map((friend, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="card border-0 shadow rounded-4 h-100">
                <div className="card-body d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img
                      src={friend.image}
                      alt="user"
                      className="rounded-circle"
                      style={{
                        width: '48px',
                        height: '48px',
                        objectFit: 'cover',
                        marginRight: '15px',
                        border: '2px solid #007bff'
                      }}
                    />
                    <div>
                      <h5 className="mb-1 text-dark fw-semibold">
                        {friend.name.charAt(0).toUpperCase() + friend.name.slice(1)}
                      </h5>
                      <small className="text-muted">Click chat to start conversation</small>
                    </div>
                  </div>
                  <button
                    onClick={() => startChat(index)}
                    className="btn btn-primary btn-sm px-3"
                  >
                    Chat
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

export default Msgfront;
