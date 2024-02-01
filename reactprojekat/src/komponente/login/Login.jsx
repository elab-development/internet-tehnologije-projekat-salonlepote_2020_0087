import React, { useState } from 'react';
import axios from 'axios'; 
import InputField from './InputField'; 

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
        <InputField
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          type="text"
        />
        <InputField
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
        />
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
