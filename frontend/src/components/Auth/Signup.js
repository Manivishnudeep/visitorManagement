import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate} from 'react-router-dom';

const Signup = () => {
    const Navigate=useNavigate();
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
      localStorage.setItem('token', response.data.token); // Save token to localStorage
      Navigate('/'); // Redirect to dashboard after successful signup
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error signing up');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="security">Security</option>
            <option value="approver">Approver</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Signup;
