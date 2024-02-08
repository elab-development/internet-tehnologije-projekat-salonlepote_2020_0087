import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto'; 
import axios from 'axios';
 

const Admin = () => {
  const [statistics, setStatistics] = useState(null);

  const fetchAdminStatistics = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get('http://127.0.0.1:8000/api/admin/statistike', {
        headers: headers,
      });

      if (!response.data) {
        throw new Error('Greška prilikom dohvatanja statistike');
      }
      setStatistics(response.data);
    } catch (error) {
      console.error('Greška:', error);
    }
  };

  useEffect(() => {
    fetchAdminStatistics();
  }, []);

  const servicesData = {
    labels: statistics ? Object.keys(statistics.ukupan_broj_rezervacija_po_usluzi) : [],
    datasets: [
      {
        label: 'Broj rezervacija po usluzi',
        data: statistics ? Object.values(statistics.ukupan_broj_rezervacija_po_usluzi) : [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const employeesData = {
    labels: statistics ? Object.keys(statistics.ukupan_broj_rezervacija_po_zaposlenom) : [],
    datasets: [
      {
        label: 'Broj rezervacija po zaposlenom',
        data: statistics ? Object.values(statistics.ukupan_broj_rezervacija_po_zaposlenom) : [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div className="admin-container"> 
     <div>
        <h2>Ostali podaci</h2>
        <p>Ukupan broj zaposlenih: {statistics ? statistics.ukupan_broj_zaposlenih : ''}</p>
        <p>Ukupan broj usluga: {statistics ? statistics.ukupan_broj_usluga : ''}</p>
        <p>Ukupan broj korisnika: {statistics ? statistics.ukupan_broj_korisnika : ''}</p>
       
      </div>
      <div className="chart-container">  
        <h2>Grafikon broja rezervacija po uslugama</h2>
        <Bar data={servicesData} />
      </div>
      <div className="chart-container"> 
        <h2>Grafikon broja rezervacija po zaposlenom</h2>
        <Bar data={employeesData} />
      </div>
     
    </div>
  );
};

export default Admin;
