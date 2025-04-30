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

  const handleChange = (field, value) => {
    if (field === 'name') setName(value);
    else if (field === 'email') setEmail(value);
    else if (field === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 5 || password.length > 10) {
      setMessage("Password must be 5-10 characters long.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('https://mern-zeta-nine.vercel.app/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, image: im }),
      });

      if (!res.ok) throw new Error('Signup failed');
      const data = await res.json();
      localStorage.setItem('token', data);
      navigate('../');
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card p-4 shadow-sm rounded-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-4 text-dark">Create Your Account</h3>

        {message && (
          <div className="alert alert-danger text-center" role="alert">
            {message}
          </div>
        )}

        {!showAvatar ? (
          <div className="text-center mb-4">
            <p className="text-muted mb-2">Would you like to upload a profile picture?</p>
            <button className="btn btn-outline-primary" onClick={() => setShowAvatar(true)}>
              Upload Photo
            </button>
          </div>
        ) : (
          <div className="text-center mb-4">
            <Avatar
              width={300}
              height={250}
              onCrop={onCrop}
              onClose={onClose}
              src={null}
              label="Upload your avatar"
            />
            <img
              src={im}
              alt="Preview"
              className="rounded-circle border mt-3"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="John Doe"
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@example.com"
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="5–10 characters"
              onChange={(e) => handleChange('password', e.target.value)}
              required
            />
          </div>

          {isLoading && (
            <div className="mb-3">
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-info"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-4">
          <small className="text-muted">Already have an account?</small>{' '}
          <a href="/login" className="text-decoration-none">Login here</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
