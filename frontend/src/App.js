import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './componenets/home/home';
import About from './componenets/about';
import Apartments from './componenets/categories/apartments';
import Signin from './componenets/sign/signin';
import Signup from './componenets/sign/signup';
import Signupowner from './componenets/sign/signupowner';
import Created from './componenets/sign/created';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/apartments' element={<Apartments />} />
        <Route path='/Sign_in' element={<Signin />}/>
        <Route path='/Sign_up' element={<Signup />}/>
        <Route path='/Sign_up_as_owner' element={<Signupowner />}/>
        <Route path='/sign_up/created' element={<Created />}/>
      </Routes>
    </div>
  );
}

export default App;
