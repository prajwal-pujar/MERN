import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const username = localStorage.getItem('name');
  const userImage = localStorage.getItem('image') || 'https://via.placeholder.com/35';

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container py-2">
      {!isLoggedIn ? (
        <>
      <Link className="navbar-brand fw-bold text-primary" href="/">We$Chat</Link>
        </>
      ):(
        <>
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
           </>)
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
                <li className="nav-item position-relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="btn btn-light fw-medium text-dark d-flex align-items-center"
                    style={{ border: '1px solid #ccc', borderRadius: '6px' }}
                  >
                    Actions
                    <span className="ms-2">&#9662;</span>
                  </button>
                  <ul className={`custom-dropdown ${dropdownOpen ? 'show' : ''}`}>
                    <li><Link to="/">Messages</Link></li>
                    <li><Link to="/accreq">Accept Friends</Link></li>
                    <li><Link to="/req">Req Friends</Link></li>
                    <li><Link to="/grpfrt">Groups</Link></li>
                    <li><Link to="/crgrp">Create Group</Link></li>
                  </ul>
                </li>

                

                <li className="nav-item ms-3">
                  <button className="btn btn-outline-primary" onClick={logout}>
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
