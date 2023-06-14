import React, { useEffect, useState, useRef, useContext } from 'react';
import Register from './components/pages/StripeWrap';
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
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import Edit from './components/pages/Edit'
import axios from './api/axios'
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
import Account from './components/pages/Account'
import { useLoginMutation, useSetNewOrderFalseMutation, useFindNewOrderMutation } from './services/appApi';
import { Link, useLocation, useParams } from 'react-router-dom';
import CardInput from "./components/pages/CardInput";
import {Elements} from '@stripe/react-stripe-js';
import alertSound from './Alert.wav';
import { useDispatch, useSelector } from "react-redux";
import { logout, resetNotifications } from "./features/userSlice";
import io from 'socket.io-client';
import { addNotification } from "./features/userSlice";
import NotificationContext from "./context/NotificationContext";
import Off from "./on.png"
import On from "./off.png"
import Navbar from './components/Navbar';
const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  const user = useSelector((state) => state.user);
  const { bob,  clearNotification, seller } = useContext(NotificationContext);

  
  const [notifications, setNotifications] = useState([]);
const userId = user?._id;


  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
      try {
        const userId = user?._id;
        console.log(userId)
        const res = await axios.post(`orders/notifications/`, {userId});
        setNotifications(res.data);
      } catch (error) {
        console.error(error);
      }}
    };
console.log("dd", notifications)
    fetchNotifications();

    // Continuously checkconsole for new notifications every 5 seconds
    const interval = setInterval(fetchNotifications, 25000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [userId]);
  const matchingSellerIds =  seller?.sellerIds?.filter(sellerId => sellerId === user?._id) 

  
 


  console.log("bob", bob)

  const stripePromise = loadStripe("pk_test_51LGwewJ0oWXoHVY4KaHYgICxXbe41zPhsxY9jYfVqgyEHK3oX4bwaoAvgXByAF2Ek2UAVZ0L6FjddQvAvBIMsB7t00fE5UAlwI");
  const { page } = useParams();
  const location = useLocation();
  console.log(location.pathname)
  console.log("User",user)
 console.log(page)
console.log("aoo", seller)


const [close, setclose] = useState(false);

  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (notifications.length > 0) {
      const newAudio = new Audio(alertSound);
      setAudio(newAudio);
      playSound(newAudio);
    }

    return () => {
      if (audio) {
        stopSound();
      }
    };
  }, [user]);

  const stopSound = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const playSound = (audio) => {
    audio.loop = true;
    audio.play()
      .catch(error => {
        // Handle any playback errors
        console.error('Failed to play audio:', error);
      });

    setTimeout(() => {
      stopSound();
    }, 20000);
  };
  const silenceNoti = () => {
    if (audio) {
      stopSound();
      setAudio(null); // Update the audio state to null to indicate no active audio
    }
  };
  

const markAllNotificationsAsRead = async () => {
  setclose(true)
  silenceNoti()
  try {
    await axios.put(`/orders/notifications/mark-read`);
    // Optionally, you can update the 'notifications' state in your component to mark all notifications as read
  } catch (error) {
    console.error(error);
  }
};



  

  
  return (

    <>     


<>
<Navbar />
{/** 
{updatedOrder !== false && <>
{show &&  <>
   
{user?.newOrder && <div className='OverLay'>
  
  <div className="Modal-small">New Order
  <Link to="/orders">
        <button onClick={handleClose}className= 'pulse' >
          Go to Orders
        </button>  </Link>
  </div></div>}
  </>}
  </>}*/}
  </> 
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
        <Route path="/verify/:randomNum" element={<Verify/>} />
        <Route path="/" element={<Hero/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/add-product" element={<Product/>} />
        <Route path="/orders/status/:id" element={<Status/>} />
        
        <Route path="/success" element={<Success />} />
        <Route path="/account-settings" element={<Account />} />

     


   

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

    {!close && <>
    <div>
 {notifications.length > 0 && 
  <div className='OverLay'>
<><div  className="Modal-small">  
<div className="modal-flex">
<div onClick={markAllNotificationsAsRead} className="close-modal">x</div>


{audio !== null ? 
 <img onClick={silenceNoti} className="icon-on" src={On}/>:  <img onClick={silenceNoti} className="icon-on" src={Off}/> }</div>
{notifications?.slice(0, 1).map((notification, index) => (
  <a href='/orders' key={index}>
    <h1>{notification?.message}</h1>
  </a>
))}
  <Link to="/orders">
        <button  onClick={markAllNotificationsAsRead} className= 'pulse' >
          Go to Orders
        </button>  </Link>
</div>
     </>
    

  </div>
}
   
    </div>
    </>}
    </> 
  );
}

export default App; 
