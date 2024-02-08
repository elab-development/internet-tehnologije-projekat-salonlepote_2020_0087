import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar({ token, setToken,role, setRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setToken(null);
        setRole(null);
        navigate('/');
      })
      .catch((error) => {
        console.error('Greška pri odjavljivanju', error);
      });
  };

  return (
    <nav>
      <ul>
        {token === null && (
          <>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/cenovnik">Cenovnik</Link>
        </li>
        {token && role=="korisnik" && (
          <>
            <li>
              <Link to="/rezervacije">Rezervacije</Link>
            </li>
           
            <li>
              <Link to="/rezervacije/dodaj">Dodaj</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}

      {token && role=="sminker" && (


            <li>
            <Link to="/usluge">Usluge</Link>
            </li>
            )}
      </ul>
    </nav>
  );
}

export default Navbar;
