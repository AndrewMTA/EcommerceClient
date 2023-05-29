import React, { useState,  useContext, useRef, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/appApi";
import "../styles/Onboarding.css"
import axios from "axios"
import useAuth from '../../components/hooks/useAuth';

    const Login = () => {
        const [user, setUser] = useState("");
        const [pwd, setPwd] = useState("");
        const [email, setEmail] = useState("");
        const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
   const LOGIN_URL="http://localhost:3500/auth/"
    const userRef = useRef();
    const errRef = useRef();
    const [login, { isError, isLoading, error }] = useLoginMutation();
    const [errMsg, setErrMsg] = useState('');

    
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

   

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            
            setAuth({ user, pwd, accessToken });
            login({ email, pwd: password });
            setUser('');
            setPwd('');
            login({ email, password: pwd });

            if (response?.data?.seller === true)
                navigate("/orders")
          
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
       
        }
    }

    


    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    const togglePersist = () => {
        setPersist(prev => !prev);
    }
      return (
        <div className="wrapping">

<form onSubmit={handleLogin} className="form">
        <div className="inputWrap">
        <div className="NavTitle">Trackz & Road</div>
<h1>Welcome Back</h1>
          <label className="onboardLabel1" htmlFor="username">Email</label>
          <input
            className="inputOnboard"
            type="user"
            name="user"
            placeholder="Email"
            onChange={(e) =>
              setEmail(e.target.value)} value={email} required />
              <br/>
                        <label className="onboardLabel1" htmlFor="username">Username</label>
          <input
            className="inputOnboard"
            type="user"
            name="user"
            placeholder="username"
            onChange={(e) =>
              setUser(e.target.value)} value={user} required />
        </div>
        <div  className="inputWrap">
          <label className="onboardLabel" htmlFor="pwd">pwd</label>
          <input
            className="inputOnboard"
            type="password"
            placeholder="password"
            name="pwd"
            onChange={(e) =>
              setPwd(e.target.value)} value={pwd} required />
        </div>
        <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    /><label htmlFor="persist">Trust This Device</label>
          <span  className="bs1">
         <a className="authRoute" href="/forgotpassword">Forgot Pasword?</a>
        </span>
        <button type="submit" className="Submiter">Submit</button>
        <span className="bs">Don't have an account?<a className="authRoute" href="/Signup"> Sign up</a>
       
       
       
        </span>
       
      </form>




        </div>
      )
    }
    
    export default Login