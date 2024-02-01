import React, { useEffect, useState } from 'react';
import useUsluge from '../rezervacije/hooks/useUsluge';

function Cenovnik() {
  const [usluge] = useUsluge();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState('asc');
  const uslugePerPage = 5;

  const sortedUsluge = usluge.slice().sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.cena - b.cena;
    } else {
      return b.cena - a.cena;
    }
  });

  const indexOfLastUsluga = currentPage * uslugePerPage;
  const indexOfFirstUsluga = indexOfLastUsluga - uslugePerPage;
  const currentUsluge = sortedUsluge.slice(indexOfFirstUsluga, indexOfLastUsluga);

  const totalPages = Math.ceil(usluge.length / uslugePerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <h2>Cenovnik Usluga</h2>
      <button onClick={handleSortChange}>
        Sortiraj po ceni ({sortDirection === 'asc' ? 'Rastuće' : 'Opadajuće'})
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv Usluge</th>
            <th>Cena</th>
            <th>Opis</th>
          </tr>
        </thead>
        <tbody>
          {currentUsluge.map((usluga) => (
            <tr key={usluga.id}>
              <td>{usluga.id}</td>
              <td>{usluga.naziv}</td>
              <td>{usluga.cena}</td>
              <td>{usluga.opis}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prethodna strana
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Sledeća strana
        </button>
      </div>
    </div>
  );
}

export default Cenovnik;
