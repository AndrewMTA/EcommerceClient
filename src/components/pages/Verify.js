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
    console.log(response.data)
        if (response.data?.url) {
          window.location.href = response.data.url;
          console.log(response.data)
          console.log(response.data.url)
        } else {
          setSuccess(true);
          console.log(response.data)
        }
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
        <p>loading.</p>
      )}
    </>
  );
};

export default Verify;

{/** 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Verify = () => {
  const [success, setSuccess] = useState(false);
  const { randomNum } = useParams();

  
    const verifyUser = async (e) => {
e.preventDefault()
    
      try {
        const email = "2353andrew@gmail.com"
        console.log(email)
        const response = await axios.put(`http://localhost:3500/register/verify/`, {email});
    console.log("111", response);
        if (response.data?.url) {
          window.location.href = response.data.url;
          console.log(response.data)
          console.log(response.data.url)
        } else {
          setSuccess(true);
          console.log(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
  
   
  



  return (
    <>
   
        <div className="form">
          <div className="lil">
            <button onClick={verifyUser}>Send onboard</button>
            <br />
        
            <a href="/login">
              <div className="login">Login</div>
            </a>
          </div>
        </div>
     
    </>
  );
};

export default Verify;
*/}