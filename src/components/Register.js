import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import logo from "./pages/Frame 9.png"

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import CardInput from "./pages/CardInput";
// const REGISTER_URL = 'https://backend-6olc.onrender.com/register';
const REGISTER_URL = 'http://localhost:3500/register';
const stripePromise = loadStripe("pk_test_51LGwewJ0oWXoHVY4KaHYgICxXbe41zPhsxY9jYfVqgyEHK3oX4bwaoAvgXByAF2Ek2UAVZ0L6FjddQvAvBIMsB7t00fE5UAlwI");
const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [selectedOption, setSelectedOption] = useState('no');
    const [contactName, setContactName] = useState('');
    const [location, setLocation] = useState('')
    const [phone, setPhone] = useState('');
    const [cardName, setCardName] = useState(null);
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const [emailTaken, setEmailTaken] = useState(false);
    const [email, setEmail] = useState('');
    const [success2, setSuccess2] = useState(false)
    const [seller, setSeller] = useState(false)
    const [pwd, setPwd] = useState('');
    const [butter, setButter] = useState("potato");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [checkout, setCheckout] = useState(false);
    const [website, setWebsite] = useState(null)
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    const [buisnessName, setBuisnessName] = useState()
    const [memberAdded, setMemberAdded] = useState(null)
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

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



    const randomNum = Math.random().toString(36).substr(2) + Math.floor(1000000 + Math.random() * 95400678567440890) + Math.random().toString(36).substr(2) + Math.floor(1000 + Math.random() * 954004890) + Math.random().toString(36).substr(2)


    const handleResend = async (e) => {
        e.preventDefault();


        try {

            const response = await axios.put("http://localhost:3500/register/resend",
                JSON.stringify({ email, randomNum }),
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

    const handlePayment = async () => {

                            if (!stripe || !elements) {
                                // Stripe.js has not yet loaded.
                                // Make sure to disable form submission until Stripe.js has loaded.
                                return;
                              }
                          
                          
                              
                              const res = await axios.post("/create-payments", {
                                email: email,
                                amount: 2000
                              });
                          
                              const clientSecret = res.data["client_secret"];
                          
                              const result = await stripe.confirmCardPayment(clientSecret, {
                                payment_method: {
                                  card: elements.getElement(CardElement),
                                  billing_details: {
                                    email: email,
                                  },
                                },
                              });
                          
                              if (result.error) {
                                // Show error to your customer (e.g., insufficient funds)
                                console.log(result.error.message);
                              } else {
                                // The payment has been processed!
                                if (result.paymentIntent.status === "succeeded") {
                                  console.log("Money baby");
                                  console.log(email)
                              axios.put("http://localhost:3500/user/add-membership",  JSON.stringify({ email}),
                              {
                                  headers: { 'Content-Type': 'application/json' },
                                  withCredentials: true
                              },)
                                setMemberAdded(true)
                                setSuccess(true)
                                }
                              
            
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
        if (selectedOption === 'no') {




            try {

                const response = await axios.post(REGISTER_URL,
                    JSON.stringify({ email, pwd, randomNum }),
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


        else if (selectedOption === 'yes') {
            setSeller(true)
            if (website !== null) {
                setSelectedOption('')
               


                try {

                    const response = await axios.post('http://localhost:3500/register/seller',
                        JSON.stringify({ email, pwd, randomNum, contactName, buisnessName, phone, location, website }),
                        {
                            headers: { 'Content-Type': 'application/json' },
                            withCredentials: true   
                        },
    
    
    
    
                    );
   
    
                    console.log(JSON.stringify(response?.data));
                
    
                    setPwd('');
                    setMatchPwd('');
    
    setCheckout(true)
                    setSeller(null)

                
                        
              
    
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

         
          



        }






    }

    return (
        <>



            {success === true ? (
                <section className="form">

                    {memberAdded & <>
                      Payment Succesful!
                    
                    </>}                   
                    <>

                        <h3>An email verification has been sent to  {email}. </h3> <br /> <> Double check your spam folder if you don't see it in your inbox. <br />

                            {/**   Didn't see it?  <div  className="resend" onClick={handleResend}>Resend verification</div> */}</>

                        {success2 && <> Email Resent! </>}

                    </>
                </section>
            ) : (
                <section>




                    <form className="form" onSubmit={handleSubmit}>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <a className='navA' href="/cars"><img src={logo} className="loge" /> </a>
                        {seller === false && <>
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

                                aria-describedby="uidnote" />



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

                            <br />
                            <div>
                                Looking to sell pizza??
                                <label>
                                    <input
                                        type="radio"
                                        name="pizzaOption"
                                        style={{ marginLeft: '8px', marginRight: '3px' }}

                                        value="yes"
                                        checked={selectedOption === 'yes'}
                                        onChange={handleOptionChange}
                                    />
                                    Yes
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        name="pizzaOption"
                                        value="no"
                                        style={{ marginLeft: '8px', marginRight: '3px' }}
                                        checked={selectedOption === 'no'}
                                        onChange={handleOptionChange}
                                    />
                                    No
                                </label>
                            </div>

                            <button>Get Started</button>

                            <p>
                                Already registered?<br />
                                <span className="line">
                                    <Link to="/">Sign In</Link>
                                </span>
                            </p> </>}{seller === true &&
                                <>
                                    <h1>Apply to sell</h1>


{ emailTaken === true && <>
                                    <label >
                                        Email

                                    </label>
                                    <input
                                        className="inputOnboard"
                                        type="text"
                                        value={email}
                                        autoComplete="off"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                 
                                    /> </>
}
                                    <label >
                                        Buisness Name

                                    </label>
                                    <input
                                        className="inputOnboard"
                                        type="text"
                                    
                                        autoComplete="off"
                                        onChange={(e) => setBuisnessName(e.target.value)}
                                        required
                                 
                                    />



                                    <label >
                                        Location
                                    </label>
                                    <input
                                        className="inputOnboard"
                               
                                        required
                                        onChange={(e) => setLocation(e.target.value)}
                                    
                                    />
                                   


                                    <label htmlFor="confirm_pwd">
                                        Contact Name
                                    </label>
                                    <input
                                        className="inputOnboard"
                         
                                        id="confirm_pwd"
                                        onChange={(e) => setContactName(e.target.value)}
                                      
                                      
                                    />

                                    <label htmlFor="confirm_pwd">
                                        Website

                                    </label>
                                    <input
                                        className="inputOnboard"
                                        type="text"
                                        id="website"
                                        onChange={(e) => setWebsite(e.target.value)}
                                     required

                                    />

                                    <label htmlFor="confirm_pwd">
                                        Phone Number
                                    </label>
                                    <input
                                        className="inputOnboard"
                                    
                          
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                           
                                    <br />
                                    <div>
                                 


                                    </div>

                                    <button onClick={handleSubmit}type="submit">Nextt</button>

                                    <p>
                                        Have and access code?   <br />
                                        <span className="line">
                                            <Link to="/">Click here</Link>
                                        </span>
                                    </p> </>


                        }


                        {checkout && <>
                            <h1>Start Selling </h1>
                            <h1 className="big">$12<span className="lill">per month</span></h1>
                            <h1>✔ Unlimited Product posts</h1>
                            <h1>✔ Fedex Shipping solutions</h1>
                            <h1>✔ Accept Online Payments</h1>
                            <h1>✔ Ship Nationwide</h1>
                            <h1>✔ 24/7 email support</h1>
                            <input hidden value={butter} />
                            <br />
                            <input className="inputOnboard" onChange={(e) => setCardName(e.target.value)} placeholder="Name on card" />
                            <br />

                            <CardInput />


                            <button onClick={handlePayment} >Checkout</button>





                        </>
                        }
                    </form>

                </section>
            )}
        </>
    )
}

export default Register
