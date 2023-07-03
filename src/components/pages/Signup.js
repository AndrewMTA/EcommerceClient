import React, { useState,  useContext } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

import "../styles/Onboarding.css"


    const Signup = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();





      function handleSubmit(e) {
          e.preventDefault();
          if (!email || !password) {
              return alert("Please fill out all the fields");
          }
        
            const data = {
              email , password
            }
        
           axios.post("/user/" , data).then((response) => {




            //console.log(response);
               
                    setEmail("");
                    setPassword("");
                  
                      navigate("/");
                  })
              
          
                }
      
      
  
      
      return (
        <div className="wrapping">

<form onSubmit={handleSubmit} className="form">
        <div className="inputWrap">
        <div className="NavTitle">Track & Road</div>
<h1>Create your account</h1>
          <label className="onboardLabel1" htmlFor="email">Email</label>
     
          <input
            className="inputOnboard"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setEmail(e.target.value)} value={email} required />
        </div>
        <div  className="inputWrap">
          <label className="onboardLabel" htmlFor="password">Password</label>
          <input
            className="inputOnboard"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setPassword(e.target.value)} value={password} required />
        </div>
        <div className="inputWrap">
        <label className="onboardLabel" htmlFor="password"> Confirm Password</label>
      
        <input
            className="inputOnboard"
            type="password"
            placeholder="Confirm Password"
            name="password"
           />
          </div>
        <button type="submit" className="Submiter">Submit</button>
        <span className="bs">
          Already an account? <a className="authRoute" href="/Login">Log in</a>
        </span>
       
      </form>




        </div>
      )
    }
    
    export default Signup