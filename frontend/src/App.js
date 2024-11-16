import {Routes, Route} from 'react-router-dom';
import './App.css';

import About from './componenets/about';
import Navbar from './componenets/navbar1';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<Navbar/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  );
}

export default App;
