import React, { Fragment }  from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
//css
import './App.css';

//pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';

//components
// import InputData from './components/InputData';
// import ListTodos from './components/ListData';
import UserForm from './components/RunSubmitForm';


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
          {/* <UserForm/> */}
          {/* <InputData/> */}
          {/* <ListTodos/> */}
          </div>
        </Fragment>
      </div>
    </div>
  );
}

export default App;
