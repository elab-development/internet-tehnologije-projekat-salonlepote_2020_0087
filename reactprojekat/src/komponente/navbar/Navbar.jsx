import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
 axios.post('http://127.0.0.1:8000/api/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      
      setToken(null);
      navigate('/');
    })
    .catch((error) => {
      console.error('Greška pri odjavljivanju', error);
      // Tretirajte grešku pri odjavljivanju prema potrebi
    });
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Početna</Link>
        </li>
        <li>
            <Link to="/cenovnik">Cenovnik</Link>
          </li>
        {token && (<>
          <li>
            <Link to="/rezervacije">Rezervacije</Link>
          </li>
          <li>
          <Link to="/rezervacije/dodaj">Dodaj</Link>
        </li></>
        )}
        {token && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
