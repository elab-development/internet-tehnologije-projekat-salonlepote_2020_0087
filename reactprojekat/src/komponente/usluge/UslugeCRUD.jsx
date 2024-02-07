import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Usluge() {
  const [usluge, setUsluge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    naziv: '',
    opis: '',
    cena: '',
  });
  const [editingUsluga, setEditingUsluga] = useState(null);

  useEffect(() => {
    // Dohvati token iz sessionStorage
    const token = sessionStorage.getItem('token');

    // Kreiraj zaglavlje sa tokenom
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Izvrši Axios GET zahtev za dobijanje svih usluga sa dodatim zaglavlje
    axios.get('http://127.0.0.1:8000/api/usluge', { headers })
      .then((response) => {
        setUsluge(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Greška pri dobijanju usluga', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dohvati token iz sessionStorage
    const token = sessionStorage.getItem('token');

    // Kreiraj zaglavlje sa tokenom
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Izvrši Axios POST zahtev za kreiranje nove usluge sa dodatim zaglavlje
    axios.post('http://127.0.0.1:8000/api/usluge', formData, { headers })
      .then((response) => {
        // Dodaj novu uslugu u state
        setUsluge([...usluge, response.data.data]);
        // Resetuj formu
        setFormData({ naziv: '', opis: '', cena: '' });
      })
      .catch((error) => {
        console.error('Greška pri kreiranju usluge', error);
      });
  };

  const handleEdit = (usluga) => {
    setEditingUsluga(usluga);
  };

  const handleInputChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditingUsluga({ ...editingUsluga, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Dohvati token iz sessionStorage
    const token = sessionStorage.getItem('token');

    // Kreiraj zaglavlje sa tokenom
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Izvrši Axios PUT zahtev za ažuriranje usluge sa dodatim zaglavlje
    axios.put(`http://127.0.0.1:8000/api/usluge/${editingUsluga.id}`, editingUsluga, { headers })
      .then((response) => {
        // Ažuriraj uslugu u state
        setUsluge((prevUsluge) => {
          const updatedUsluge = prevUsluge.map((usluga) => {
            if (usluga.id === editingUsluga.id) {
              return response.data.data;
            }
            return usluga;
          });
          return updatedUsluge;
        });

        // Završi uređivanje
        setEditingUsluga(null);
      })
      .catch((error) => {
        console.error('Greška pri ažuriranju usluge', error);
      });
  };

  const handleCancelEdit = () => {
    setEditingUsluga(null);
  };

  const handleDelete = (id) => {
    // Dohvati token iz sessionStorage
    const token = sessionStorage.getItem('token');

    // Kreiraj zaglavlje sa tokenom
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Izvrši Axios DELETE zahtev za brisanje usluge sa dodatim zaglavlje
    axios.delete(`http://127.0.0.1:8000/api/usluge/${id}`, { headers })
      .then(() => {
        // Ukloni uslugu iz state
        setUsluge(usluge.filter((usluga) => usluga.id !== id));
      })
      .catch((error) => {
        console.error('Greška pri brisanju usluge', error);
      });
  };

  if (loading) {
    return <p>Učitavanje usluga...</p>;
  }

  return (
    <div>
      <h2>Upravljanje uslugama</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="naziv"
          placeholder="Naziv usluge"
          value={formData.naziv}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="opis"
          placeholder="Opis usluge"
          value={formData.opis}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="cena"
          placeholder="Cena usluge"
          value={formData.cena}
          onChange={handleInputChange}
        />
        <button type="submit">Dodaj uslugu</button>
      </form>
      <ul>
        {usluge.map((usluga) => (
          <li key={usluga.id}>
            <p>Naziv: {usluga.naziv}</p>
            <p>Opis: {usluga.opis}</p>
            <p>Cena: {usluga.cena}</p>
            <button onClick={() => handleDelete(usluga.id)}>Obriši</button>
            <button onClick={() => handleEdit(usluga)}>Uredi</button>
          </li>
        ))}
      </ul>
      {editingUsluga && (
        <form onSubmit={handleUpdate}>
          <h3>Uređivanje usluge</h3>
          <input
            type="text"
            name="naziv"
            placeholder="Naziv usluge"
            value={editingUsluga.naziv}
            onChange={handleInputChangeEdit}
          />
          <input
            type="text"
            name="opis"
            placeholder="Opis usluge"
            value={editingUsluga.opis}
            onChange={handleInputChangeEdit}
          />
          <input
            type="number"
            name="cena"
            placeholder="Cena usluge"
            value={editingUsluga.cena}
            onChange={handleInputChangeEdit}
          />
          <button type="submit">Sačuvaj izmene</button>
          <button onClick={handleCancelEdit}>Otkaži</button>
        </form>
      )}
    </div>
  );
}

export default Usluge;
