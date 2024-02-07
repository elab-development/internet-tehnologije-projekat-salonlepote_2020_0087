 
import { useState } from 'react';
import './App.css';
import Login from './komponente/login/Login';
import Rezervacije from './komponente/rezervacije/Rezervacije';
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Navbar from './komponente/navbar/Navbar';
import CreateReservation from './komponente/rezervacije/create/CreateReservation';
import Cenovnik from './komponente/usluge/cenovnik';
import Registration from './komponente/register/Register';
import Mojerezervacije from './komponente/rezervacije/zaposleni/MojeRezervacije';
 
function App() {
  const [token,setToken] = useState(null);
  return (
    <div className="App">
      
        <BrowserRouter>
        <Navbar token={token} setToken={setToken}/>
          <Routes>
            <Route path="/" element ={<Login  setToken={setToken}></Login>  }/>
            <Route path="/rezervacije/dodaj" element ={ <CreateReservation></CreateReservation>  }/>
            <Route path="/register" element={<Registration />} />    {/*dodato za seminarski  */}
        
          <Route path="/sminker" element={<Mojerezervacije />} /> {/*dodato za seminarski  */}
            <Route path="/rezervacije" element ={ <Rezervacije></Rezervacije>  }/>
            <Route path="/cenovnik" element={<Cenovnik />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
