 
import React from 'react';

const RedTabele = ({ reservation }) => {
  return (
    <tr>
      <td>{reservation.id}</td>
      <td>{reservation.datum}</td>
      <td>{reservation.vreme}</td>
      <td>{reservation.korisnik.name}</td>
      <td>{reservation.zaposleni.name}</td>
      <td>{reservation.usluga.naziv}</td>
    </tr>
  );
};

export default RedTabele;
