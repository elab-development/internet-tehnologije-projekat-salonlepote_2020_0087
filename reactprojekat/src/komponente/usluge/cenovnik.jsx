import React, { useEffect, useState } from 'react';
import useUsluge from '../rezervacije/hooks/useUsluge';
import { useQuery } from 'react-query';



function Cenovnik() {
  const [usluge] = useUsluge();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState('asc');
  const uslugePerPage = 5;
 
  const [odabranaValuta, setOdabranaValuta] = useState('USD');
  const [konvertovaneCene, setKonvertovaneCene] =  useState([]);
  

  //prepravljen kod zbog dodavanja opcije kesiranje
  //na ovaj nacin ce se prvo ucitavati kesirani podaci, ako postoje, a ako ne psotoje onda se kreira zahtev
  
  
  const fetchValute = async () => {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    return Object.keys(data.rates); // Vraća samo ključeve (valute) iz odgovora
  };
 

  const { data: valute, isLoading: isLoadingValute, error } = useQuery('valute', fetchValute);

  useEffect(() => {
    // Konverzija cena usluga u odabranu valutu
    if (odabranaValuta !== 'USD') {
      fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
        .then((res) => res.json())
        .then((data) => {
          const rate = data.rates[odabranaValuta];
          const konvertovane = usluge.map(usluga => ({
            ...usluga,
            cena: (usluga.cena * rate).toFixed(2)
          }));
          setKonvertovaneCene(konvertovane);
        });
    } else {
      setKonvertovaneCene(usluge);
    }
  }, [odabranaValuta, usluge]);


  const sortedUsluge = konvertovaneCene.slice().sort((a, b) => {
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
    <div className='glavniContainer'>
      <h2>Cenovnik Usluga</h2>
      {valute &&   <div>
        <label>Odaberite valutu:</label>
        <select value={odabranaValuta} onChange={(e) => setOdabranaValuta(e.target.value)}>
          {valute.map((valuta) => (
            <option key={valuta} value={valuta}>{valuta}</option>
          ))}
        </select>
      </div>}
      <button onClick={handleSortChange}>
        Sortiraj po ceni ({sortDirection === 'asc' ? 'Rastuće' : 'Opadajuće'})
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv Usluge</th>
            <th>Cena ({odabranaValuta})</th>
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
