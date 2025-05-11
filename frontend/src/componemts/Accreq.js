import React, { useContext, useEffect, useState } from 'react';
import Livemssgcontext from '../context/LivemssgContext';
import './Msgfront.css';

function Accreq() {
  const { getreq, req, setSent, accept, loading, removeReq } = useContext(Livemssgcontext);
  const [message, setMessage] = useState('');
  const [clicked, setClicked] = useState({});

  useEffect(() => {
    getreq();
  }, []);

  const handleAccept = async (index) => {
    if (clicked[index]) return;

    setClicked((prev) => ({ ...prev, [index]: true }));
    setMessage('Accepting...');

    try {
      await setSent(index);
      await accept();
      removeReq(index);
      setMessage('Friend request accepted ✅');
    } catch (err) {
      setMessage('Failed to accept request ❌');
      setClicked((prev) => ({ ...prev, [index]: false }));
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold text-primary animate-title">Friend Requests</h1>

      {message && (
        <div className="alert alert-info text-center shadow-sm fw-medium">{message}</div>
      )}

      {loading ? (
        <div className="d-flex flex-column align-items-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-muted">Fetching friend requests...</p>
        </div>
      ) : req.length === 0 ? (
        <div className="text-center mt-5">
          <p className="fs-4 text-muted">No friend requests</p>
        </div>
      ) : (
        <div className="row g-4 justify-content-center">
          {req.map((user, index) => (
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
                        border: '2px solid #0d6efd',
                      }}
                    />
                    <div>
                      <h5 className="mb-1 text-dark fw-semibold">
                        {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                      </h5>
                      <small className="text-muted">Wants to connect with you</small>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAccept(index)}
                    className="btn btn-outline-primary btn-sm px-3"
                    disabled={clicked[index]}
                  >
                    {clicked[index] ? 'Accepted' : 'Accept'}
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
