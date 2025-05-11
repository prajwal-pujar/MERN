import React, { useContext, useEffect, useState } from 'react';
import Livemssgcontext from '../context/LivemssgContext';
import { useNavigate } from 'react-router-dom';
import './Msgfront.css';

function Req() {
  const { users, getusers, setToken, sendreq, loading, friends } = useContext(Livemssgcontext);
  const [message, setMessage] = useState('');
  const [disabledIndexes, setDisabledIndexes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getusers();
  }, []);

  const nonFriendUsers = users.filter(
    (user) => !friends.some((friend) => friend.name === user.name)
  );

  const sendRequest = async (index) => {
    setDisabledIndexes((prev) => [...prev, index]);
    setMessage('Sending...');

    try {
      await setToken(index);
      await sendreq();
      setMessage('Friend request sent ✅');
    } catch {
      setDisabledIndexes((prev) => prev.filter((i) => i !== index));
      setMessage('Failed to send request ❌');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold text-primary animate-title">Add New Friends</h1>

      {message && (
        <div className="alert alert-info text-center shadow-sm fw-medium">{message}</div>
      )}

      {loading ? (
        <div className="d-flex flex-column align-items-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-muted">Fetching users...</p>
        </div>
      ) : nonFriendUsers.length === 0 ? (
        <div className="text-center mt-5">
          <p className="fs-4 text-muted">No users available to send requests</p>
        </div>
      ) : (
        <div className="row g-4 justify-content-center">
          {nonFriendUsers.map((user, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="card border-0 shadow rounded-4 h-100">
                <div className="card-body d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img
                      src={user.image}
                      alt="user"
                      className="rounded-circle"
                      style={{
                        width: '48px',
                        height: '48px',
                        objectFit: 'cover',
                        marginRight: '15px',
                        border: '2px solid #0d6efd'
                      }}
                    />
                    <div>
                      <h5 className="mb-1 text-dark fw-semibold">
                        {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                      </h5>
                      <small className="text-muted">Send a friend request</small>
                    </div>
                  </div>
                  <button
                    onClick={() => sendRequest(index)}
                    className="btn btn-outline-primary btn-sm px-3"
                    disabled={disabledIndexes.includes(index)}
                  >
                    {disabledIndexes.includes(index) ? 'Sent' : 'Send'}
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

export default Req;
