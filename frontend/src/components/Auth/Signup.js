import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const Navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('security'); // or 'approver'
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/users/register', {
        username,
        password,
        role,
      });
      localStorage.setItem('token', response.data.token);
      Navigate('/login');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error signing up');
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
          Signup
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
          <div className="form-group mb-3">
            <label>Role</label>
            <select
              className="form-control"
              style={{ height: '45px', borderRadius: '10px' }}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="security">Security</option>
              <option value="approver">Approver</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-success btn-block"
            style={{
              height: '50px',
              borderRadius: '10px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
            }}
          >
            Sign Up
          </button>
        </form>
        {errorMessage && (
          <p className="text-danger mt-3 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
