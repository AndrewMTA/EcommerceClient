import React, {useState} from 'react'
import Hamburger from "./hamburger.png"
import Close from "./close.png"
import { useDispatch, useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";
import { logout, resetNotifications } from "../features/userSlice";
import { FaHamburger } from 'react-icons/fa';
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


    
    <div className='flexNav6'>
    <a className='navA'  href="/pizza"><img src={logo} className="log2"/> </a>

    {showingNav &&  <img  onClick={handleOpenNav}  className='burger' src={Hamburger}/>
}
    {!showingNav && (
            <div className="flex-colx">
           
    {!showingNav && <img onClick={handleClosesNav}  className='closeB' src={Close}/> }
               <form className="Modal2">
                <div className="flex-colx">

                  {
                  
                  !user?.seller &&
                  <>
                <a className='navA' href="/emaillist"><span className='NavOption'>Buy zza</span> </a>
                </>   
                
                }
                 

  {user?.seller === false ? (
<>
<span className='NavOption'>My Cart {user.cart?.count}</span> 
  
  <span  className='un' > <a className='navA' ><span onClick={handleLogout} className='NavOption'>Logout</span></a> </span>
 
 
   </> ) : <></>}

  

    {!user && (

<>
<a className='navA' href="/register"><span className='NavOption'>Sell zza</span> </a>
<span className='un' ><a className='navA'href="/login"> <span className='NavOption'>Login</span> </a> </span>
</>
)}</div>

                </form>
        



              
            </div>
          )} 
      <div className='optionWrap'>
        
      {
                  
                  !user?.seller &&
                  <>
      <a className='navA' href="/pizza"><span className='NavOption'>Shop</span> </a>
</>
}


 
 
    {!user && (

      <>
            <a className='navA' href="/application"><span className='NavOption'>Sell zza</span> </a>
            <span className='un' ><a className='navA'href="/login"> <span className='NavOption'>Login</span> </a> </span>
</>
     
     )}
{user?.seller &&
<a className='navA' href={`/listings/${user._id}`}><span className='NavOption'>Dashboard</span> </a>


}
{!user?.seller && (

  <>
    <a href="/cart"> <span className='NavOption'>My Cart {user?.cart?.count}</span> </a>
  
   
     </>
     )}

     {user && 
 <a href="/"className='navA'> <span onClick={handleLogout} className='NavOption'>Logout</span></a>
     }
     </div>

     </div>

    </>
  )
}

export default Navbar