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

    if (editingUsluga) {
      // Izvrši Axios PUT zahtev za ažuriranje usluge sa dodatim zaglavlje
      axios.put(`http://127.0.0.1:8000/api/usluge/${editingUsluga.id}`, formData, { headers })
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
          // Resetuj formu
          setFormData({ naziv: '', opis: '', cena: '' });
        })
        .catch((error) => {
          console.error('Greška pri ažuriranju usluge', error);
        });
    } else {
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
    }
  };

  const handleEdit = (usluga) => {
    setEditingUsluga(usluga);
    // Popuni formu sa podacima usluge koja se uređuje
    setFormData({ naziv: usluga.naziv, opis: usluga.opis, cena: usluga.cena });
  };

  const handleCancelEdit = () => {
    setEditingUsluga(null);
    // Resetuj formu
    setFormData({ naziv: '', opis: '', cena: '' });
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
    <div style={{ margin: "5%" }}>
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
        <button type="submit">{editingUsluga ? 'Sačuvaj izmene' : 'Dodaj uslugu'}</button>
        {editingUsluga && <button onClick={handleCancelEdit}>Otkaži</button>}
      </form>
      <table>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Cena</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {usluge.map((usluga) => (
            <tr key={usluga.id}>
              <td>{usluga.naziv}</td>
              <td>{usluga.opis}</td>
              <td>{usluga.cena}</td>
              <td>
                <button onClick={() => handleDelete(usluga.id)}>Obriši</button>
                <button onClick={() => handleEdit(usluga)}>Uredi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usluge;
