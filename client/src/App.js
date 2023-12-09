import React, { Fragment, useState }  from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import RunContext from './components/RunContext';

//pages
import About from './pages/About';
import RunSubmitPage from './pages/RunSubmitPage';
import SearchResult from './pages/SearchResult';
import NoPage from './pages/NoPage';
import SimilarRuns from './pages/SimilarRunPage';
import CategorySubmitPage from './pages/CategorySubmitPage';
import GameSubmitPage from './pages/GameSubmitPage';
import UpdateUsernamePage from './pages/UpdateUsername';

function App() {

  const [searchbarRuns, setSearchbarRuns] = useState([]);
  const [similarRunsResults, setSimilarRuns] = useState([]);
  const [rowData, setRowData] = useState(null);



  return (
    <div>
    <RunContext.Provider value={{ searchbarRuns, setSearchbarRuns, similarRunsResults, setSimilarRuns, rowData, setRowData}}>
      <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<About />} /> 
        <Route path="/about" element={<About/>}/>
        <Route path="/similarRuns" element={<SimilarRuns/>}/>
        <Route path="/submit" element={<RunSubmitPage/>}/>
        <Route path="/submitCategory" element={<CategorySubmitPage/>}/>
        <Route path="/submitGame" element={<GameSubmitPage/>}/>
        <Route path="/searchResult" element={<SearchResult/>}/>
        <Route path="/updateUsername" element={<UpdateUsernamePage/>}/>
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
