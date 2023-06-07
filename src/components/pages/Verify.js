import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Verify = () => {
  const [success, setSuccess] = useState(false);
  const { randomNum } = useParams();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.put(`http://localhost:3500/register/verify/${randomNum}`);

          setSuccess(true);
    
        
      } catch (error) {
        console.log(error);
      }
    };
  
    verifyUser();
  }, [randomNum]);
  



  return (
    <>
      {success ? (
        <form className="form">
          <div className="lil">
            <h1>Success</h1>
            <br />
            <p>Account Verified</p>
            <a href="/login">
              <div className="login">Login</div>
            </a>
          </div>
        </form>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default Verify;
