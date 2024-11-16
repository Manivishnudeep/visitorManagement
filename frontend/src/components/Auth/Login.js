import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const Navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/users/login', {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      const role = JSON.parse(atob(token.split('.')[1])).role;
      if (role === 'security') Navigate('/security');
      else if (role === 'approver') Navigate('/approver');
      else Navigate('/');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{
          width: '400px',
          borderRadius: '15px',
          background: 'linear-gradient(to bottom, #f7f7f7, #e6e6e6)',
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#333' }}>
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              style={{ height: '45px', borderRadius: '10px' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              style={{ height: '45px', borderRadius: '10px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{
              height: '50px',
              borderRadius: '10px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
            }}
          >
            Log In
          </button>
        </form>
        {errorMessage && (
          <p className="text-danger mt-3 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Login;