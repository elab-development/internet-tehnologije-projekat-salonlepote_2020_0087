import React, { useEffect, useState } from 'react';
import useUsluge from '../rezervacije/hooks/useUsluge';
 

function Cenovnik() {
  const [usluge] = useUsluge();

  return (
    <div>
      <h2>Cenovnik Usluga</h2>
      <table>
        <thead>
          <tr>
            <th>Naziv Usluge</th>
            <th>Cena</th>
            <th>Opis</th>
          </tr>
        </thead>
        <tbody>
          {usluge.map((usluga) => (
            <tr key={usluga.id}>
              <td>{usluga.naziv}</td>
              <td>{usluga.cena}</td>
              <td>{usluga.opis}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cenovnik;
