import React from 'react'
import logo from "./logo.png"

const Footer = () => {
  return (
    <div className="footer">


<a className='navA'  href="/cars"><img src={logo} className="log"/> </a>
    
    <div className="footer-wrap1">
    <ul>
    <h4>Track & Road</h4>
    <li>About Us</li>
    <li>F.A.Q</li>
    <li>Advertise</li>
    </ul>
    
    
    <ul>
        <h4>Account</h4>
        <li>support@trackandroad.com</li>
    <li>Sign up</li>
   
    </ul>
    
    
    
    

    </div>
    
    
    
    
    </div>
  )
}

export default Footer