import React, { useEffect, useState, useContext } from 'react';
import Livemssgcontext from '../context/LivemssgContext';
import LivegrpContext from '../context/LivegrpConstext';
import './Msgfront.css';

function Create() {
  const { friends, getfriends, auth } = useContext(Livemssgcontext);
  const { create } = useContext(LivegrpContext);

  const currentUser = localStorage.getItem('token');
  const [creusers, setCreusers] = useState([currentUser]);
  const [groupName, setGroupName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getfriends();
  }, []);

  const toggleUser = (index) => {
    const token = auth[index];
    setCreusers((prev) =>
      prev.includes(token) ? prev.filter((t) => t !== token) : [...prev, token]
    );
  };

  const handleCreate = () => {
    if (!groupName.trim()) {
      setMessage('Group name cannot be empty ❌');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    create(groupName.trim(), creusers);
    setMessage('Group created successfully ✅');
    setGroupName('');
    setCreusers([currentUser]);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fw-bold text-primary animate-title">Create a Group</h1>

      {message && (
        <div className="alert alert-info text-center shadow-sm fw-medium">{message}</div>
      )}

      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-8">
          <label htmlFor="groupName" className="form-label fw-medium text-dark">
            Group Name
          </label>
          <input
            type="text"
            className="form-control shadow-sm"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
          />
        </div>
      </div>

      <div className="row justify-content-center g-4">
        {friends.map((user, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body d-flex align-items-center justify-content-between p-3">
                <div className="d-flex align-items-center">
                  <img
                    src={user.image}
                    alt="user"
                    className="rounded-circle"
                    style={{
                      width: '44px',
                      height: '44px',
                      objectFit: 'cover',
                      marginRight: '15px',
                      border: '2px solid #0d6efd',
                    }}
                  />
                  <h5 className="mb-0 fw-semibold text-dark">
                    {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                  </h5>
                </div>
                <button
                  onClick={() => toggleUser(index)}
                  className={`btn btn-sm px-3 ${
                    creusers.includes(auth[index])
                      ? 'btn-outline-danger'
                      : 'btn-outline-success'
                  }`}
                >
                  {creusers.includes(auth[index]) ? 'Remove' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <button
          onClick={handleCreate}
          className="btn btn-primary px-4 py-2 fw-semibold rounded-pill shadow-sm"
          disabled={!groupName.trim() || creusers.length < 2}
        >
          Create Group
        </button>
        <p className="text-muted mt-2" style={{ fontSize: '0.9rem' }}>
          Select at least one friend to create a group
        </p>
      </div>
    </div>
  );
}

export default Create;
