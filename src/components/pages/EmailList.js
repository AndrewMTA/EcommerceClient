import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';
import { Link } from "react-router-dom";

import logo from "./Frame 9.png"
 const REGISTER_URL = 'https://backend-6olc.onrender.com/register';
//const REGISTER_URL = :3500/register';

const Company = () => {
   
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [success2, setSuccess2] = useState(false)

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);








    const handleSubmit = async (e) => {
        e.preventDefault();
     
        
        try {
        
            const response = await axios.post("https://backendpizza.onrender.com/email",
                        JSON.stringify({ email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                },

            
              
  
            );
          
       setSuccess(true)


        }
         catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>



            {success ===  true ? (
                <section className="form">
                    <h1>Email Sent!</h1>
                    <>
                    <a className="as" href="/"><div className="buttonzz">Back to home</div><br/></a>
                    <br/> <>  <br/>
                    
                    {/**   Didn't see it?  <div  className="resend" onClick={handleResend}>Resend verification</div> */}</> 
                  
                    {success2 &&  <> Email Resent! </>}
                  
                    </>
                </section>
            ) : (
                <section>


               
                  
                    <form className="form" onSubmit={handleSubmit}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <a className='navA'  href="/cars"><img src={logo} className="loge"/> </a>
                   
                    <h1>We're Launching soon!</h1>  
                    <p>Stay up to date and get notified</p>
                        <label htmlFor="email">
                           Email:
                          
                        </label>
                        <input
                             className="inputOnboard"
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        
                        />
                       
                    

                        <button type="submit">Send</button>

                            <p>
                   
                        <span className="line">
                    
                        </span>
                    </p>
                    </form>
                
                </section>
            )}
        </>
    )
}

export default Company
