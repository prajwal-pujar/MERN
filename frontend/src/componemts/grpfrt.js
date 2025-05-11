import React, { useEffect, useContext } from 'react';
import LivegrpContext from '../context/LivegrpConstext';
import { useNavigate } from 'react-router-dom';
import './Msgfront.css';

function Grpfrt() {
  const { get, users, set, loading } = useContext(LivegrpContext);
  const navigate = useNavigate();

  useEffect(() => {
    get();
  }, []);

  const handleSelectGroup = (index) => {
    set(index);
    navigate('../grpmssg');
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fw-bold text-primary animate-title">Your Groups</h1>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-2">Fetching groups...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center">
          <p className="text-muted fs-4">No groups found</p>
        </div>
      ) : (
        <div className="row justify-content-center g-4">
          {users.map((groupName, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body d-flex align-items-center justify-content-between p-4">
                  <h5 className="mb-0 fw-semibold text-dark text-truncate" title={groupName}>
                    {groupName.charAt(0).toUpperCase() + groupName.slice(1)}
                  </h5>
                  <button
                    onClick={() => handleSelectGroup(index)}
                    className="btn btn-outline-primary btn-sm rounded-pill px-3 py-1"
                  >
                    Message
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

export default Grpfrt;
