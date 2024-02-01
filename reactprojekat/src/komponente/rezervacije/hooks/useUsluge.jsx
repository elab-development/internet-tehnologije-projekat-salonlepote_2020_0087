import axios from "axios";
import { useEffect, useState } from "react";

const useUsluge = () => {
    const [usluge, setUsluge] = useState([]);
  
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/usluge')
        .then((response) => {
          setUsluge(response.data.data);
        })
        .catch((error) => {
          console.error('Greška pri učitavanju usluga', error);
        });
    }, []);
  
    return [usluge, setUsluge];
  };

  export default useUsluge;