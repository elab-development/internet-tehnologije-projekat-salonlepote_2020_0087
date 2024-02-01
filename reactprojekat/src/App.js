 
import './App.css';
import Login from './komponente/login/Login';
import Rezervacije from './komponente/rezervacije/Rezervacije';
import {BrowserRouter, Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element ={<Login></Login>  }/>
            <Route path="/rezervacije" element ={ <Rezervacije></Rezervacije>  }/>
           
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
