import React, { Fragment }  from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import InputData from './components/InputData';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';


function App() {
  return (
    <div>
      <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />} /> 
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="*" element={<NoPage/>}/>
      </Routes>
      </BrowserRouter>
      </div>

      <div>
        <Fragment>
          <div className = "container"> 
          <InputData/>
          </div>
        </Fragment>
      </div>



    </div>
  );
}

export default App;
