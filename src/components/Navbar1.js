import React, {useState} from 'react'
import Hamburger from "./hamburger.png"
import { useDispatch, useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";
import Close from "./close.png"
import { logout, resetNotifications } from "../features/userSlice";
import logo from "./logo.png"
const Navbar = () => {

  const user = useSelector((state) => state.user);
  const [showingNav, setShowingNav] = useState(true)
  const handleOpenNav = () => {
    setShowingNav(false);
  };
  
  const handleClosesNav = () => {
    setShowingNav(true);
  };



   const dispatch = useDispatch();
   const logouts = useLogout();
const handleLogout =  () => {
    logouts();
    dispatch(logout());
}
 
  return (

    <>


    
    <div className='flexNav3'>
    <a className='navA'  href="/pizza"><img src={logo} className="log2"/> </a>
   
   
    {showingNav &&  <img  onClick={handleOpenNav}  className='burger' src={Hamburger}/>
}
    {!showingNav && (
            <div className="flex-colx">
           
    {!showingNav && <img onClick={handleClosesNav}  className='closeB' src={Close}/> }
                <form className="Modal2">
                <div className="flex-colx">
             <span className='un'>  <a className='navA' href="/cars"><span className='NavOption'>Buy</span> </a></span> 

                 
{user && (


  
<>
   <span className='un' > <a className='navA' href={`/listings/${user._id}`}><span className='NavOption'>My Listings</span> </a> </span>
  <span  className='un' > <a className='navA' href={`/checkout/${user._id}`}>  <span className='NavOption'>Sell</span> </a></span>
  <span  className='un' > <a className='navA' ><span onClick={handleLogout} className='NavOption'>Logout</span></a> </span>
   </>
   )}

    {!user && (

<>
         <span className='un' ><a className='navA' href="/login"><span className='NavOption'>Sell</span> </a> </span>
         <span className='un' ><a className='navA'href="/login"> <span className='NavOption'>Login</span> </a> </span>
</>
)}</div>

                </form>
        



              
            </div>
          )} 
      <div className='optionWrap'>

        { user?.seller &&
      <a className='navA' href="/cars"><span className='NavOption'>My Shop</span> </a>

        }

 
 
    {!user && (

      <>
            <a className='navA' href="/login"><span className='NavOption'>Sell</span> </a>
     <a className='navA'href="/login"> <span className='NavOption'>Login</span> </a>
     </>
     )}



{user && (


  
  <>
     <a className='navA' href={`/listings/${user._id}`}><span className='NavOption'>Dashboard</span> </a>
    
    
  {user?.seller === false ?  <a className='navA' href={`/checkout/${user._id}`}>  <span className='NavOption'>Sell</span> </a> : <></>}  
     <span onClick={handleLogout} className='NavOption'>Logout</span>
     </>
     )}


     </div>


</div>
    </>
  )
}

export default Navbar