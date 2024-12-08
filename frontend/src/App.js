import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './componenets/home/home';
import About from './componenets/about';
import Apartments from './componenets/categories/apartments';
import Signin from './componenets/sign/signin';
import Signinowner from './componenets/sign/signinowner';
import Signup from './componenets/sign/signup';
import Signupowner from './componenets/sign/signupowner';
import Created from './componenets/sign/created';
import Reserv1 from './componenets/reservation/reserv1';
import Reserv2 from './componenets/reservation/reserv2';
import Booked from './componenets/reservation/booked';
import VacationHouses from './componenets/categories/vacationHouses';
import Details from './componenets/Details/details';
import { Addreview } from './componenets/profile/addreview';
import PropertyOwnerProfile from './componenets/profile/propertyOwnerProfile';
import Profile from './componenets/profile/profile';
import AddProperty from './componenets/profile/addProperty';
import UpdateReservation from './componenets/reservation/updateReservation';
import OwnerApartmentDetails from './componenets/Details/ownerApartmentDetails';
import EditDetails from './componenets/Details/editDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/apartments' element={<Apartments />} />
        <Route path='/vacation_houses' element={<VacationHouses />} />
        <Route path='/Sign_in' element={<Signin />} />
        <Route path='/Sign_in_as_owner' element={<Signinowner />} />
        <Route path='/Sign_up' element={<Signup />} />
        <Route path='/Sign_up_as_owner' element={<Signupowner />} />
        <Route path='/sign_up/created' element={<Created />} />
        <Route path='/booking/:owner_id/:id' element={<Reserv1 />} />
        <Route path='/payment/:owner_id/:id' element={<Reserv2 />} />
        <Route path='/booked/:owner_id/:id' element={<Booked />} />
        <Route path='/details/:owner_id/:id' element={<Details />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/Add_review' element={<Addreview />} />
        <Route path='/property_owner_profile' element={<PropertyOwnerProfile />} />
        <Route path='/add_property' element={<AddProperty />} />
        <Route path='/update_reservation' element={<UpdateReservation />} />
        <Route path='/property_details/:owner_id/:id' element={<OwnerApartmentDetails />} />
        <Route path='/property_details/:owner_id/:id/update' element={<EditDetails />} />

      </Routes>
    </div>
  );
}

export default App;
