import React, { Fragment, useState }  from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import RunContext from './components/RunContext';

//pages
import Home from './pages/Home';
import About from './pages/About';
import RunSubmitPage from './pages/RunSubmitPage';
import SearchResult from './pages/SearchResult';
import NoPage from './pages/NoPage';

//components
// import InputData from './components/InputData';
// import ListGames from './components/ListData';
import UserForm from './components/RunSubmitForm';



function App() {

  const [searchbarRuns, setSearchbarRuns] = useState([]);

  return (
    <div>
      <RunContext.Provider value={{ searchbarRuns, setSearchbarRuns}}>
      <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />} /> 
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/submit" element={<RunSubmitPage/>}/>
        <Route path="/searchResult" element={<SearchResult/>}/>
        <Route path="*" element={<NoPage/>}/>
      </Routes>
      </BrowserRouter>
      </div>

      <div>
        <Fragment>
          <div className = "container"> 
          </div>
        </Fragment>
      </div>
      </RunContext.Provider >
    </div>
  );
}

export default App;
