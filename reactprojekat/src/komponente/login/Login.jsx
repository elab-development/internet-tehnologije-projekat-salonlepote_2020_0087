import React, { useState } from 'react';
import axios from 'axios'; 
import InputField from './InputField'; 
import { useNavigate } from 'react-router-dom';

function Login({ setToken ,setRole}) {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: 'rolfson.pierce@example.com',
    password: 'password',
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
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("id", response.data.user.id);
      setToken(response.data.token);
      setRole(response.data.user.role);
      // Proveri ulogu korisnika i preusmeri ga na odgovarajuću putanju
      const userRole = response.data.user.role;
      if (userRole === 'sminker') {
        navigate('/sminker');
      } else if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/rezervacije');
      }
    } catch (error) {
      console.error('Login error', error);
      alert(error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Sign In</h2>
        <InputField
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Username"
          type="email"
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
          <a href="/register">Don't have an account? Sign Up</a>
          <a href="/forgot-password">Forgot Password</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
