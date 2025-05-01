import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const username = localStorage.getItem('name');
  const userImage = localStorage.getItem('image') || 'https://via.placeholder.com/35';

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token1');
    localStorage.removeItem('grptoken');
    localStorage.removeItem('image');
    localStorage.removeItem('name');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container py-2">
        <Link className="navbar-brand fw-bold text-primary" to="/">We$Chat</Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">

            <li className="nav-item">
              <Link className="nav-link text-dark fw-medium" to="/about">About</Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark fw-medium" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark fw-medium" to="/signup">Signup</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <span
                      className="nav-link dropdown-toggle text-dark fw-medium"
                      id="userMenu"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                       style={{ cursor: 'pointer' }}
                        >
                      Actions
                      </span>
                  <ul className="dropdown-menu dropdown-menu-end animate-dropdown" aria-labelledby="userMenu">
                    <li><Link className="dropdown-item" to="/">Messages</Link></li>
                    <li><Link className="dropdown-item" to="/accreq">Accept Friends</Link></li>
                    <li><Link className="dropdown-item" to="/req">Req Friends</Link></li>
                    <li><Link className="dropdown-item" to="/grpfrt">Groups</Link></li>
                    <li><Link className="dropdown-item" to="/crgrp">Create Group</Link></li>
                  </ul>
                </li>

                <li className="nav-item d-flex align-items-center ms-3">
                  <img
                    src={userImage}
                    alt="User"
                    className="rounded-circle"
                    width="35"
                    height="35"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="ms-2 fw-medium text-dark">{username}</span>
                </li>

                <li className="nav-item ms-3">
                  <button
                    className="btn btn-outline-primary"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
