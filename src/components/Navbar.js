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
console.log(user?.seller)

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
    <a className='navA'  href="/cars"><img src={logo} className="log"/> </a>

    {showingNav &&  <img  onClick={handleOpenNav}  className='burger' src={Hamburger}/>
}
    {!showingNav && (
            <div className="flex-colx">
           
    {!showingNav && <img onClick={handleClosesNav}  className='closeB' src={Close}/> }
               <form className="Modal2">
                <div className="flex-colx">
                <a className='navA' href="/emaillist"><span className='NavOption'>Buy zza</span> </a>

                 

  {user?.seller === false ? (
<>
<span className='NavOption'>My Cart {user.cart?.count}</span> 
  <span  className='un' > <a className='navA' href={`/sellzza`}>  <span className='NavOption'>Sell</span> </a></span>
  <span  className='un' > <a className='navA' ><span onClick={handleLogout} className='NavOption'>Logout</span></a> </span>
 
 
   </> ) : <></>}

  

    {!user && (

<>
<a className='navA' href="/application"><span className='NavOption'>Sell zza</span> </a>
       
</>
)}</div>

                </form>
        



              
            </div>
          )} 
      <div className='optionWrap'>
      <a className='navA' href="/emaillist"><span className='NavOption'>Buy zza</span> </a>



 
 
    {!user && (

      <>
            <a className='navA' href="/application"><span className='NavOption'>Sell zza</span> </a>

     </>
     )}



{!user?.seller && (

  <>
    <a href="/cart"> <span className='NavOption'>My Cart {user?.cart?.count}</span> </a>
     <a className='navA' href={`/checkout/${user?._id}`}>  <span className='NavOption'>Sell</span> </a>
   
     </>
     )}

     {user && 
 <a className='navA'> <span onClick={handleLogout} className='NavOption'>Logout</span></a>
     }
     </div>

     </div>

    </>
  )
}

export default Navbar