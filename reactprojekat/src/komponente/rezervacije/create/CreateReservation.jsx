import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import InputField from '../../login/InputField';

function CreateReservation( ) {
    const token= sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usluga_id: '',
    datum: '',
    vreme: '',
    zaposleni_id: '',
  });

  const [usluge, setUsluge] = useState([]);
  const [zaposleni, setZaposleni] = useState([]);

  useEffect(() => {
     
    axios
      .get('http://127.0.0.1:8000/api/usluge')
      .then((response) => {
        setUsluge(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error('Greška pri učitavanju usluga', error);
      });

    
    axios
      .get('http://127.0.0.1:8000/api/zaposleni')
      .then((response) => {
        setZaposleni(response.data.data);
        console.log(response.data.data)
      })
      .catch((error) => {
        console.error('Greška pri učitavanju zaposlenih', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://127.0.0.1:8000/api/rezervacije', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Rezervacija uspešno kreirana', response.data);
       
        navigate('/rezervacije');
      })
      .catch((error) => {
        console.error('Greška pri kreiranju rezervacije', error);
        // Tretirajte grešku pri kreiranju prema potrebi
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Create Reservation</h2>
        <div className="input-group">
            <select
                name="usluga_id"
                value={formData.usluga_id}
                onChange={handleChange}
            >
                <option value="" disabled>
                Select a service
                </option>
                {usluge.map((usluga) => (
                <option key={usluga.id} value={usluga.id}>
                    {usluga.naziv}
                </option>
                ))}
            </select>
            </div>
        <InputField
          name="datum"
          value={formData.datum}
          onChange={handleChange}
          placeholder="Date"
          type="date"
        />
        <InputField
          name="vreme"
          value={formData.vreme}
          onChange={handleChange}
          placeholder="Time"
          type="time"
        />
       <div className="input-group">
        <select
            name="zaposleni_id"
            value={formData.zaposleni_id}
            onChange={handleChange}
        >
            <option value="" disabled>
            Select an employee
            </option>
            {zaposleni.map((z) => (
            <option key={z.id} value={z.id}>
                {z.name}
            </option>
            ))}
        </select>
        </div>
        <div className="options">
          <button type="submit" className="login-button">
            Create Reservation
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateReservation;
