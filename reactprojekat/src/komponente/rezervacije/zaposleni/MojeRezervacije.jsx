import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Mojerezervacije() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dohvati token iz sessionStorage
    const token = sessionStorage.getItem('token');

    // Kreiraj zaglavlje sa tokenom
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Izvrši Axios GET zahtev za rezervacijama zaposlenog sa dodatim zaglavljem
    axios.get('http://127.0.0.1:8000/api/rezervacije/getReservationsByEmployee', { headers })
      .then((response) => {
        setReservations(response.data.data);  
        setLoading(false);
      })
      .catch((error) => {
        console.error('Greška pri dobijanju rezervacija', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Učitavanje rezervacija...</p>;
  }

  return (
    <div>
      <h2>Moje Rezervacije</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Datum</th>
            <th>Vreme</th>
            <th>Korisnik</th>
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
              <td>{reservation.usluga.naziv}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Mojerezervacije;
