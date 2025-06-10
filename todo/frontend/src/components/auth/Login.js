import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const defaultUsers = [
    'alice_wonder',
    'bob_builder', 
    'charlie_brown',
    'diana_prince',
    'eve_online'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(username, password);
    
    if (!result.success) {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const handleQuickLogin = async (user) => {
    setLoading(true);
    setError('');
    
    const result = await login(user, 'password123');
    
    if (!result.success) {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Todo App Login</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" disabled={loading} className="login-button">
            {loading ? <LoadingSpinner size="small" /> : 'Login'}
          </button>
        </form>

        <div className="quick-login">
          <h3>Quick Login (Demo Users)</h3>
          <div className="quick-login-buttons">
            {defaultUsers.map(user => (
              <button
                key={user}
                onClick={() => handleQuickLogin(user)}
                disabled={loading}
                className="quick-login-button"
              >
                {user}
              </button>
            ))}
          </div>
          <p className="demo-note">Default password: password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;