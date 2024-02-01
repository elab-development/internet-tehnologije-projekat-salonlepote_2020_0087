import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rezervacije = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const token = sessionStorage.getItem('token');
 
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

   
    axios.get('http://127.0.0.1:8000/api/rezervacije', config)
      .then((response) => {
        setReservations(response.data.data);
      })
      .catch((err) => {
        setError('Greška pri učitavanju rezervacija');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Lista Rezervacija</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Datum</th>
            <th>Vreme</th>
            <th>Korisnik</th>
            <th>Zaposleni</th>
            <th>Usluga</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.datum}</td>
              <td>{reservation.vreme}</td>
              <td>{reservation.korisnik.name}</td>
              <td>{reservation.zaposleni.name}</td>
              <td>{reservation.usluga.naziv}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rezervacije;
