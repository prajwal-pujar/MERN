import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navi = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token1');
    localStorage.removeItem('grptoken');
    navi('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm">
        <div className="container py-2">
          <a className="navbar-brand fw-bold text-primary" href="/">We$Chat</a>
          <button
            className="navbar-toggler border-0 animate-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
           
          
            
              {!localStorage.getItem('token') ? (
                <>
                  <li className="nav-item">
                  <a
                  className="nav-link fw-medium text-dark px-3 transition-colors animate-nav-link"
                  href="/about"
                  >
                    About
                  </a>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link fw-medium text-dark px-3 transition-colors animate-nav-link"
                      to="/login"
                      role="button"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link fw-medium text-dark px-3 transition-colors animate-nav-link"
                      to="/signup"
                      role="button"
                    >
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                  <li className="nav-item">
                <a
                  className="nav-link fw-medium text-dark px-3 transition-colors animate-nav-link"
                  aria-current="page"
                  href="/accreq"
                >
                  Accept friends
                </a>
              </li>
            <li className="nav-item">
                <a
                  className="nav-link fw-medium text-dark px-3 transition-colors animate-nav-link"
                  aria-current="page"
                  href="/req"
                >
                  Req friends
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-medium text-dark px-3 transition-colors animate-nav-link"
                  aria-current="page"
                  href="/"
                >
                  Messages
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-medium text-dark px-3 transition-colors animate-nav-link"
                  aria-current="page"
                  href="/grpfrt"
                >
                  Groups
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-medium text-dark px-3 transition-colors animate-nav-link"
                  aria-current="page"
                  href="/crgrp"
                >
                  Create Grp
                </a>
              </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-outline-primary animate-btn"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
