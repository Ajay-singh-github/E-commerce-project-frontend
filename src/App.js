import './App.css';
import Category from './Components/Category';
import DisplayAllCategory from './Components/DisplayAllCategory';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Brands from './Components/Brands';

import AdminLogin from './Components/AdminLogin';
import Dashboard from './Components/Deshboard';
import Home from './Components/userInterface/components/screens/Home';
import ProductPurchaseScreen from './Components/userInterface/components/screens/ProductPurchaseScreen';
import PlusMinusComponent from './Components/userInterface/components/PlusMinusComponent';
import Cart from './Components/userInterface/components/screens/Cart';
import LoginMyProfile from './Components/userInterface/components/LoginComponent';
import Otp from './Components/userInterface/components/OtpComponent';
import UserAccount from './Components/userInterface/components/UserAccount';
import ProductFilterScreen from './Components/userInterface/components/screens/ProductFilterScreen';
import BoxScreenForDashboard from './Components/userInterface/components/BoxScreenForDashboard';
function App() {
  return (
    <div >
       <Router>
           <Routes>
              <Route element={<Category/>} path='/category' />
              <Route element={<DisplayAllCategory/>} path='/displayallcategory' />
              <Route element={<Brands/>} path='/brands' />
             
              <Route element={<AdminLogin/>} path='/adminlogin' />
              <Route element={<Dashboard/>} path='/dashboard/*' />
              <Route element={<Home/>} path='/home' />
              <Route element={<ProductPurchaseScreen/>} path='/productpurchasescreen' />
              <Route element={<PlusMinusComponent/>} path='/plusminus' />
              <Route element={<Cart/>} path='/cart' />
             
              <Route element={< LoginMyProfile/>} path='/loginmyprofile' />
              <Route element={< Otp/>} path='/otp' />
              <Route element={< UserAccount/>} path='/useraccount' />
              <Route element={< ProductFilterScreen/>} path='/filterscreen' />

           </Routes>
       </Router>
       
    </div>
  );
}

export default App;
