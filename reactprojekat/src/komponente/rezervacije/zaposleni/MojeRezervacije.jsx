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
        const sortedReservations = response.data.data.sort((a, b) => {
          // Sortiraj rezervacije po datumu i vremenu
          const dateA = new Date(a.datum + ' ' + a.vreme);
          const dateB = new Date(b.datum + ' ' + b.vreme);
          return dateA - dateB;
        });

        setReservations(sortedReservations);  
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

  // Razdvajamo rezervacije prema datumu
  const todayReservations = reservations.filter((reservation) => {
    const today = new Date();
    const reservationDate = new Date(reservation.datum);
    return reservationDate.toDateString() === today.toDateString();
  });

  const tomorrowReservations = reservations.filter((reservation) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const reservationDate = new Date(reservation.datum);
    return reservationDate.toDateString() === tomorrow.toDateString();
  });

  return (
    <div>
      <h2>Moje Rezervacije</h2>
      <div className="column">
        <h3>Današnje rezervacije</h3>
        <table>
          {/* Prikazujemo današnje rezervacije */}
          {todayReservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.vreme}</td>
              <td>{reservation.korisnik.name}</td>
              <td>{reservation.usluga.naziv}</td>
            </tr>
          ))}
        </table>
      </div>
      <div className="column">
        <h3>Sutrašnje rezervacije</h3>
        <table>
          {/* Prikazujemo sutrašnje rezervacije */}
          {tomorrowReservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.vreme}</td>
              <td>{reservation.korisnik.name}</td>
              <td>{reservation.usluga.naziv}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Mojerezervacije;
