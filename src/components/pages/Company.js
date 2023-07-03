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

    const [success2, setSuccess2] = useState(false)

    const [pwd, setPwd] = useState('');


    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

   const [details, setDetails] = useState({

email: "",
buisnessName: '',
location: "",
description: '',
ship: '',
socials: '',
contact: '',
contactRole: '',



   })


   //console.log(details)

    const handleChange = (e) => {
      const {name, value} = e.target
          setDetails((prev) => {
            return {...prev, [name]: value}
          })
    }


    useEffect(() => {

        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])



const handleSubmit = () => {

           
    try {
 axios.post('https://backendpizza.onrender.com/application', details)
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

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    
  
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



const randomNum  = Math.random().toString(36).substr(2) + Math.floor(1000000 + Math.random() * 95400678567440890) +  Math.random().toString(36).substr(2) +  Math.floor(1000 + Math.random()  * 954004890 ) + Math.random().toString(36).substr(2)





   

    return (
        <>



            {success ===  true ? (
                <section className="form">
                    <h1>Application Sent!</h1>
                    <>
                    
                    <h3>We'll be in touch!  </h3> <br/> <> <a className="as"href="/"><div className="buttonzz">Back to home</div><br/></a>
                    
                    {/**   Didn't see it?  <div  className="resend" onClick={handleResend}>Resend verification</div> */}</> 
                  
                    {success2 &&  <> Email Resent! </>}
                  
                    </>
                </section>
            ) : (
                <section>


               
                  
                    <form onSubmit={handleSubmit} className="form" >
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <a className='navA'  href="/cars"><img src={logo} className="loge"/> </a>
                   
                    <h1>Apply to sell</h1>  
                        <label htmlFor="email">
                           Email:
                          
                        </label>
                        <input
                             className="inputOnboard"
                            type="text"
                            
                            name='email'
                            required
                            onChange={handleChange}
                            
                          
                        />
                       
                       <label htmlFor="email">
                           Buisness Name
                          
                        </label>
                        <input
                             className="inputOnboard"
                            type="text"
                            id="email"
                            name="buisnessName"

                            ref={userRef}
                            autoComplete="off"
                            onChange={handleChange}
                            
                            required
                         
                            aria-describedby="uidnote"
                          
                        />

<label htmlFor="email">
                           Location
                          
                        </label>
                        <input
                             className="inputOnboard"
                            type="text"
                            id="email"
                            name="location"
                            ref={userRef}
                            autoComplete="off"
                            onChange={handleChange}
                            
                            required
                         
                            aria-describedby="uidnote"
                          
                        />

<label htmlFor="email">
                          Describe your pizza / dishes and a little information about your company
                          
                        </label>
                        <textarea
                             className="textOnboard"
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={handleChange}
                            
                            required
                            name="description"
                            aria-describedby="uidnote"
                          
                        />

<label htmlFor="email">
                          Feel free to include any social links
                          
                        </label>
                        <textarea
                             className="textOnboard"
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={handleChange}
                            
                            required
                            name="socials"
                            aria-describedby="uidnote"
                          
                        />
                       
                       <label htmlFor="email">
                           Do you already ship?
                          
                        </label>
                        <select
                             className="inputOnboard"
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={handleChange}
                            
                            required
                            name="ship"
                            aria-describedby="uidnote"
                          
                        



                            > <option>No</option> <option>Yes</option>  </select>
                        <label htmlFor="email">
                           
                          Contact Name
                        </label>
                        <input
                             className="inputOnboard"
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={handleChange}
                            
                            required
                            name="contact"
                            aria-describedby="uidnote"
                          
                        />
                         <label htmlFor="email">
                           
                           Your Role
                         </label>
                         <input
                              className="inputOnboard"
                             type="text"
                             id="email"
                             ref={userRef}
                             autoComplete="off"
                             onChange={handleChange}
                             
                             required
                             name="contactRole"
                             aria-describedby="uidnote"
                           
                         />
                         
                        


                      
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button>Send</button>

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
