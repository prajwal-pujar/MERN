import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navi = useNavigate();

  const Sub = (field, value) => {
    if (field === 'name') {
      setName(value);
    }
    if (field === 'email') {
      setEmail(value);
    }
    if (field === 'password') {
      setPassword(value);
    }
  };

  const handle = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const response = await fetch('https://mern-xi-eight.vercel.app/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode:"cors",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      localStorage.setItem('token', data);
      
      navi('../');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5 bg-gray-100">
      <div className="card border-0 shadow-sm rounded-3 w-100 fade-in" style={{ maxWidth: '400px' }}>
        <div className="card-body p-5">
          <h2 className="text-center fw-semibold text-dark mb-4">Sign Up</h2>
          <form onSubmit={handle}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-medium text-dark">
                Name
              </label>
              <input
                type="text"
                className="form-control form-control-lg transition-all duration-300 focus:ring-1 focus:ring-indigo-400"
                id="name"
                placeholder="Enter your name"
                onChange={(e) => Sub('name', e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-medium text-dark">
                Email
              </label>
              <input
                type="email"
                className="form-control form-control-lg transition-all duration-300 focus:ring-1 focus:ring-indigo-400"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => Sub('email', e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-medium text-dark">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg transition-all duration-300 focus:ring-1 focus:ring-indigo-400"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => Sub('password', e.target.value)}
                required
              />
            </div>
            {isLoading && (
              <div className="mb-3">
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                    role="progressbar"
                    style={{ width: '100%' }}
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 mb-3 transition-all duration-300 hover:bg-indigo-600"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
            <p className="text-center text-muted mb-0">
              Already have an account?{' '}
              <a href="/login" className="text-primary fw-medium text-decoration-none hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;