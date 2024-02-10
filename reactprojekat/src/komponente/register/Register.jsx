import React, { useState } from 'react';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';
import InputField from '../login/InputField';

function Registration() {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', userInfo);
      console.log(response.data);
      
   
      navigate('/');
    } catch (error) {
      console.error('Registration error', error);
      alert(error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Sign Up</h2>
        <InputField
          name="name"
          value={userInfo.name}
          onChange={handleChange}
          placeholder="Full Name"
          type="text"
        />
        <InputField
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
        />
        <InputField
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
        />
        <div className="options">
          <button type="submit" className="registration-button">Register</button>
        </div>
        <div className="footer">
          <a href="/login">Already have an account? Sign In</a>
        </div>
      </form>
    </div>
  );
}

export default Registration;
