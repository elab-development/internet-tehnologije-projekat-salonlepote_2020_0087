 
import { useState } from 'react';
import './App.css';
import Login from './komponente/login/Login';
import Rezervacije from './komponente/rezervacije/Rezervacije';
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Navbar from './komponente/navbar/Navbar';
import CreateReservation from './komponente/rezervacije/create/CreateReservation';
 
function App() {
  const [token,setToken] = useState(null);
  return (
    <div className="App">
      
        <BrowserRouter>
        <Navbar token={token} setToken={setToken}/>
          <Routes>
            <Route path="/" element ={<Login  setToken={setToken}></Login>  }/>
            <Route path="/rezervacije/dodaj" element ={ <CreateReservation></CreateReservation>  }/>

            <Route path="/rezervacije" element ={ <Rezervacije></Rezervacije>  }/>
           
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
