import axios from "axios";
import { useEffect, useState } from "react";
const useZaposleni = () => {
    const [zaposleni, setZaposleni] = useState([]);
  
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/zaposleni')
        .then((response) => {
          setZaposleni(response.data.data);
        })
        .catch((error) => {
          console.error('Greška pri učitavanju zaposlenih', error);
        });
    }, []);
  
    return [zaposleni, setZaposleni];
  };

  export default useZaposleni;