import React, { useState } from 'react';
import axios from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; 

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);
      console.log(response.data);
     
    } catch (error) {
      console.error('Login error', error);
   
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Sign In</h2>
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="options">
        
          <button type="submit" className="login-button">Login</button>
        </div>
        <div className="footer">
          <a href="/signup">Don't have an account? Sign Up</a>
          <a href="/forgot-password">Forgot Password</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
