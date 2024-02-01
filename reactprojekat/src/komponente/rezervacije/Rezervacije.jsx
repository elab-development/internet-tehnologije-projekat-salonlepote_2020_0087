import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import RedTabele from './RedTabele';

const Rezervacije = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

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
        setFilteredReservations(response.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Greška pri učitavanju rezervacija');
        setIsLoading(false);
      });
  }, []);

  const searchReservations = (text) => {
    setSearchText(text);
    const lowercasedText = text.toLowerCase();
    const filtered = reservations.filter(reservation => {
      return searchInObject(reservation, lowercasedText);
    });
    setFilteredReservations(filtered);
  };

  const debouncedSearch = debounce(searchReservations, 300);

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const searchInObject = (obj, searchText) => {
    if (obj === null) return false;
    if (typeof obj === 'object') {
      return Object.values(obj).some(value => searchInObject(value, searchText));
    }
    return String(obj).toLowerCase().includes(searchText);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Lista Rezervacija</h2>
      <input
        type="text"
        placeholder="Pretraži rezervacije..."
        onChange={handleSearchChange}
      />
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
          {filteredReservations.map((reservation) => (
            <RedTabele key={reservation.id} reservation={reservation} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rezervacije;
