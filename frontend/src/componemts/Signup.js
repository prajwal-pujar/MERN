import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar-edit';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showAvatar, setShowAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [im, setIm] = useState("https://s3.amazonaws.com/37assets/svn/765-default-avatar.png");
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onCrop = (view) => {
    setAvatarPreview(view);
    setIm(view);
  };

  const onClose = () => {
    setAvatarPreview(null);
  };

  const Sub = (field, value) => {
    if (field === 'name') setName(value);
    else if (field === 'email') setEmail(value);
    else if (field === 'password') setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 5) {
      setMessage("Password length should be more than 5");
      setTimeout(() => setMessage(""), 3000);
      return;
    } else if (password.length > 10) {
      setMessage("Password length should be less than 10");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://mern-zeta-nine.vercel.app/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
          name,
          email,
          password,
          image: im,
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('../');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5 bg-gray-100">
      <div className="card border-0 shadow-sm rounded-3 w-100 fade-in" style={{ maxWidth: '450px' }}>
        <div className="card-body p-5">
          {message && (
            <div className="alert alert-warning text-center" role="alert">
              {message}
            </div>
          )}
          <h2 className="text-center fw-semibold text-dark mb-4">Sign Up</h2>

          {!showAvatar ? (
            <div className="mb-4 text-center">
              <p className="mb-2">Do you want a profile picture?</p>
              <button className="btn btn-outline-primary me-2" onClick={() => setShowAvatar(true)}>
                Yes, Upload
              </button>
             
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center mb-3">
              <Avatar
                width={250}
                height={250}
                onCrop={onCrop}
                onClose={onClose}
                src={null}
                label="Choose a photo"
              />
              <img
                src={im}
                alt="Avatar Preview"
                className="mt-3 rounded-circle border"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-medium text-dark">Name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="name"
                placeholder="Enter your name"
                onChange={(e) => Sub('name', e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-medium text-dark">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => Sub('email', e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-medium text-dark">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
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
                  ></div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100 mb-3"
              disabled={isLoading}
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>

            <p className="text-center text-muted mb-0">
              Already have an account?{' '}
              <a href="/login" className="text-primary fw-medium text-decoration-none">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
