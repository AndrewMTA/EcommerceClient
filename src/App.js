import Register from './components/Register';
import Login from './components/Login';
import Home from './components/pages/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Payout from './components/pages/Payouts';
import Sellzza from './components/pages/Company'
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Listings from "./components/pages/myListings"
import Payment from "./components/pages/checkout"
import PasswordReset from "./components/pages/PasswordReset"
import ForgotPassword from "./components/pages/ForgotPassword"
import Delete from "./components/pages/Delete"
import SetPrivate from "./components/pages/SetPrivate"
import Seller from "./components/pages/Seller"
import Edit from './components/pages/Edit'
import Info from './components/pages/CarInfo'
import Success from "./components/pages/Success"
import Verify from "./components/pages/Verify"
import Hero from "./components/pages/Hero"
import EmailList from "./components/pages/EmailList"
import Reset from "./components/pages/PasswordReset"
import Private from "./components/PrivateRoute"
import Private2 from "./components/Private2"
import { Routes, Route } from 'react-router-dom';
import Orders from './components/pages/Orders';
import Status from './components/pages/Status';
import Footer from './components/Footer';
import Product from './components/pages/checkout';
import Cart from './components/pages/CartPage'
const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
     
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="emaillist" element={<EmailList/>} />
        <Route path="/pizza" element={<Home/>} />
        <Route path="/payout" element={<Payout/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/register/seller" element={<Register/>} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/listing/:carID" element={<Info/>} />
        <Route path="/application" element={<Sellzza />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/" element={<Hero/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/add-product" element={<Product/>} />
        <Route path="/orders/status/:id" element={<Status/>} />
       

     


   

        <Route element={<Private />}>
  
          </Route>
          
     <Route element={<PersistLogin />}>
          <Route element={<Private />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/success/:carID" element={<Success/>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/success/:carID" element={<Success/>} />
          </Route>
          </Route>
          <Route element={<Private2 />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/delete/:carID" element={<Delete />} />
          </Route>
          </Route>
          
          <Route element={<Private2 />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/private/:carID" element={<SetPrivate />} />
          </Route>
          </Route>

    <Route element={<Private2 />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="edit/:carID" element={<Edit />} />
          </Route>
          </Route>

          <Route element={<Private />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/listings/:carID" element={<Listings/>} />
          </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path={`/delete/:carID`} element={<Lounge />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />


      </Route>
    </Routes>
  );
}

export default App; 
