import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; 

const InputField = ({ name, value, onChange, placeholder, type }) => {
  const icon = name === 'username' ? faUser : faLock;

  return (
    <div className="input-group">
      <FontAwesomeIcon icon={icon} className="input-icon" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default InputField;
