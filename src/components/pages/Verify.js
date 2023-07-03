import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useParams } from 'react-router-dom';
import Navbar from "../Navbar"
function Verify() {
  const [otp, setOTP] = useState('');
  const id = useParams()

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

const ID = id.id
  //console.log(id.id)
  const handleVerification = (e) => {
    e.preventDefault();
  
    axios
      .put(`/register/verify-user/${ID}`, {otp} ) 
      .then((response) => {
        if (response.data.verified) {
          
          alert("Verification successful!");
           setTimeout(function() {
            window.location.href = "/login";
          }, 2000); 
        } else if (response.data.error) {
         
          alert("Verification failed. Please try again.");
        }
      })
      .catch((error) => {
        
        alert("Verification failed. Please try again.");
        console.error('Error:', error);
      });
  };

  return (
<>
    <Navbar/>
    <div className="forgotpassword">
 
    <div className="reset-p">
    <form className="form"

     
    >
      <div className="bg-form">
      <h2 className="white">Verify</h2>
    
      <div className="form-group">
  
  
    
      <div className="inputWrap" onSubmit={handleVerification}>
        <label>
         <b> Enter your code </b>  </label>
          <input className="inputOnboard"type="text" value={otp} onChange={handleOTPChange} />
     
        <button onClick={handleVerification} type="submit">Verify</button>
      </div>
   
    </div>
 
    
      </div>
    </form>
    </div>
  </div>
  </>
    
  );
};

export default Verify;