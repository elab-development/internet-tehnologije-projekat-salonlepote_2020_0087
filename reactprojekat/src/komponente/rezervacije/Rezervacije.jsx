import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RedTabele from './RedTabele';

const Rezervacije = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Dodajte stanje isLoading

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
        setIsLoading(false);  
      })
      .catch((err) => {
        setError('Greška pri učitavanju rezervacija');
        setIsLoading(false);  
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;  
  }

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
            <RedTabele key={reservation.id} reservation={reservation} />  
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rezervacije;
