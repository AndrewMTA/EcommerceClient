import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";


// const REGISTER_URL = 'https://backend-6olc.onrender.com/register';
const REGISTER_URL = 'http://localhost:3500/register';

const Register = () => {
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



    useEffect(() => {

        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd])





    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     * Using Math.round() will give you a non-uniform distribution!
     */
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



const randomNum  = Math.random().toString(36).substr(2) + Math.floor(1000000 + Math.random() * 95400678567440890) +  Math.random().toString(36).substr(2) +  Math.floor(1000 + Math.random()  * 954004890 ) + Math.random().toString(36).substr(2)


const handleResend= async (e) => {
    e.preventDefault();
 
    
    try {
    
        const response = await axios.put("http://localhost:3500/register/resend",
                    JSON.stringify({ email, randomNum}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            },

        
          

        );
        // TODO: remove console.logs before deployment
   
        console.log(JSON.stringify(response?.data));
        //console.log(JSON.stringify(response))
        setSuccess2(true);
  
      
  console.log("peanutz")
         


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


  const processPayment = async () => {
    try {
   //   const response = await axios.post('/process-payment', {// accountId, amount });
     // setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error(error);
    }
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
     
        
        try {
        
            const response = await axios.post(REGISTER_URL,
                        JSON.stringify({ email, pwd , randomNum}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                },

            
              
  
            );
            // TODO: remove console.logs before deployment
       
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
      
            setPwd('');
            setMatchPwd('');
      
             


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
                    
                    <h3>A verification has been sent to  {email}. </h3> <br/> <> Double check your spam folder if you don't see it in your inbox. <br/>
                    
                    {/**   Didn't see it?  <div  className="resend" onClick={handleResend}>Resend verification</div> */}</> 
                  
                    {success2 &&  <> Email Resent! </>}
                  
                    </>
                </section>
            ) : (
                <section>


               
                  
                    <form className="form" onSubmit={handleSubmit}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <div className="NavTitle3">Track & Road</div>
                   
                    <h1>Register</h1>  
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
                         
                            aria-describedby="uidnote"
                          
                        />
                       


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                             className="inputOnboard"
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                             className="inputOnboard"
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button>Sign Up</button>

                            <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/">Sign In</Link>
                        </span>
                    </p>
                    </form>
                
                </section>
            )}
        </>
    )
}

export default Register
