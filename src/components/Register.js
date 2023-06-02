import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import logo from "./pages/Frame 9.png"
import lock from "./pages/lock.png"
import card from "./card.png"
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
    const [same, setSame] = useState(false)
    const [butter, setButter] = useState("potato");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [checkout, setCheckout] = useState(false);
    const [document, setDocument] = useState(false);
    const [website, setWebsite] = useState(null)
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    const [buisnessName, setBuisnessName] = useState()
    const [memberAdded, setMemberAdded] = useState(null)
    const [errMsg, setErrMsg] = useState('');
    const [accountNum, setAccountNum] = useState('');
    const [success, setSuccess] = useState(false);
    const [bankToken, setBankToken] = useState("")
    const stripe = useStripe();
    const elements = useElements();
    const [bankInfo, setBankInfo] = useState(false)
    const [person, setPerson] = useState(false)
    const [addAddress, setAddAddress] = useState(false)
    const [data, setData] = useState({
        email:"",
        businessName: "",
        phone: "",
        tax_id: "",
        website:"",
        routing:"",
        account:"",
        nameOnAccount:"",
        address: {
            line1:"",
            city:"",
            state:"",
            zip:"",
            contactLine1:"",
            contactCity:"",
            contactState:"",
            contactZip:"",
        },
    })
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
    const handleAddDoc = (e) => {
        e.preventDefault()
        setPerson(false)
        setDocument(true)
    }
  
    console.log(data)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((prev) => {
            return { ...prev, [name]: value}
        })
    }

    useEffect(() => {

        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd])



    const [piiData, setPiiData ]= useState({
        pii: {
          ssn_last_4: '' // Example SSN, replace with actual values
        },
        first_name: '',
        last_name: '',
        address: {
          line1: '',
          city: '',
          state: '',
          postal_code: '',
          country: 'US'
        },
        companyAddress: {
            line1: '',
            city: '',
            state: '',
            postal_code: '',
            country: 'US'
          },
        // Add other required PII fields here
      });
      
     {/*
      stripe.createToken('pii', piiData)
        .then(function(result) {
          if (result.error) {
            // Handle error
            console.error(result.error);
          } else {
            // PII token created successfully
            const piiToken = result.token;
            // Use the piiToken for further processing or sending to the server
            console.log(piiToken);
          }
        });
*/}
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
                JSON.stringify({ email: data.email, randomNum }),
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

    const handlePayment = async (bankToken) => {

                            if (!stripe || !elements) {
                                // Stripe.js has not yet loaded.
                                // Make sure to disable form submission until Stripe.js has loaded.
                                return;
                              }
                          
                          
                              
                              const res = await axios.post("/create-payments", {
                                email: data.email,
                                amount: 2000
                              });
                          
                              const clientSecret = res.data["client_secret"];
                          
                              const result = await stripe.confirmCardPayment(clientSecret, {
                                payment_method: {
                                  card: elements.getElement(CardElement),
                                  billing_details: {
                                    email: data.email,
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

    const handleAddPerson = (e) => {
e.preventDefault()
setPerson(true)
setBankInfo(false)
createBankAccount()
    }


    async function createBankAccount() {
        const stripe = await stripePromise;
      
      {/** function createAccount() {
          axios.post("http://localhost:3500/create-account", { bankToken, data })
            .then(function(response) {
              console.log(response.data);
              setAccountNum(response.data);
            })
            .catch(function(error) {
              console.error('Error creating account:', error);
            });
        }
      */}  
        stripe.createToken('bank_account', {
          country: 'us',
          currency: 'USD',
          account_number: data.account,
          routing_number: data.routing,
          account_holder_type: 'company',
          account_holder_name: data.nameOnAccount
        })
          .then(function(response) {
            console.log(response.token.id);
            setBankToken(response.token.id);
            return response.token.id;
          })
          .then(function(tokenId) {
            console.log("next fun")
          })
          .catch(function(error) {
            console.error('Error creating bank account token:', error);
          });
      }
      

      
        function createPerson() {
            const data = {
                accountNum: accountNum
            }
            console.log(data)
            axios.post("http://localhost:3500/create-person", {data})
        }

        const handleSubmitDoc = async (event) => {
            event.preventDefault();
            setPerson(false)
            setCheckout(true)
            setDocument(false)
            console.log("doc", document)
            const file = event.target.file.files[0];
          
            if (file) {
              const fileId = await uploadDocument(file);
              const person = event.target.person.value;
              const account = event.target.account.value;
        
              updatePerson(person, account, fileId);
              setDocument(false)
            }

           
          };
        
          const uploadDocument = async (file) => {
            const formData = new FormData();
            formData.set('purpose', 'identity_document');
            formData.set('file', file);
        
            try {
              const response = await fetch('https://files.stripe.com/v1/files', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${stripePromise}`,
                },
                body: formData,
              });
        
              const data = await response.json();
              console.log(data);
              return data.id;
            } catch (error) {
              console.error(error);
            }
          };
        
          const updatePerson = async (person, account, fileId) => {
            try {
              const response = await fetch('/update-person-file', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  person,
                  account,
                  file: fileId,
                }),
              });
        
              const data = await response.json();
              console.log(data);
            } catch (error) {
              console.error(error);
            }
          };
        

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
        console.log("pot")
        if (selectedOption === 'no') {


console.log("Nah")

            try {

                const response = await axios.post(REGISTER_URL,
                    JSON.stringify({ email: data.email, pwd, randomNum }),
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
            console.log("Yeah")
            if (data.website !== '') {
                setSelectedOption('')
               


                try {

                    const response = await axios.post('http://localhost:3500/register/seller',
                        JSON.stringify({ email: data.email, pwd, randomNum, buisnessName: data.buisnessName, phone: data.phone, website: data.website }),
                        {
                            headers: { 'Content-Type': 'application/json' },
                            withCredentials: true   
                        },

                    );
   
    
                    console.log(JSON.stringify(response?.data));
                
    
                    setPwd('');
                    setMatchPwd('');
 
    setBankInfo(true)

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




                    <form onSubmit={handleSubmit} className="form" >
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <a className='navA' href="/"><img src={logo} className="loge" /> </a>
            



                        {seller === false && <>
                          <h1>Register</h1>

                            
                            <label htmlFor="email">
                                Email:

                            </label>
                            <input
                                className="inputOnboard"
                                type="text"
                                id="email"
                                name="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={handleChange}
                             
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
                                Looking to sell pizza?
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
                            </p> </>  }{seller === true &&
                                <>
                                    <h1>Apply to sell</h1>


{ emailTaken === true && <>
                                    <label >
                                        Email

                                    </label>
                                    <input
                                        className="inputOnboard"
                                        type="text"
                                  
                                        autoComplete="off"
                                        onChange={handleChange}
                                        required
                                 
                                    /> </>
}
                                    <label >
                                        Business Name

                                    </label>
                                    <input
                                        className="inputOnboard"
                                        type="text"
                                        name="businessName"
                                        
                                        onChange={handleChange}
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
                                        Website

                                    </label>
                                    <input
                                        className="inputOnboard"
                                        type="text"
                                        id="website"
                                        name="website"
                                        onChange={handleChange}
                                     required

                                    />


<label htmlFor="confirm_pwd">
                                        Tax ID

                                    </label>
                                    <input
                                        className="inputOnboard"
                                        type="text"
                                        id="website"
                                        name="tax_id"
                                        onChange={handleChange}
                                     required

                                    />


                                    <label htmlFor="confirm_pwd">
                                        Phone Number
                                    </label>
                                    <input
                                        className="inputOnboard"
                                        name="phone"
                          
                                        onChange={handleChange}
                                        required
                                    />
                           
                                    <br />
                                    <div>
                                 


                                    </div>

                                    <button onClick={handleSubmit}type="submit">Next</button>

                                    <p>
                                        Have and access code?   <br />
                                        <span className="line">
                                            <Link to="/">Click here</Link>
                                        </span>
                                    </p> </>


                        }

                        {addAddress && <>
                        <>line1</>
                        <>City</>
                        <>State</>
                        <>Zip</>
                        </>  

                        }

{bankInfo && <>
  
<h1>Get paid</h1>
<p>Link a banking institution to your account.</p>
<label>Name</label>
<input className="inputOnboard" onChange={handleChange} name="nameOnAccount"  placeholder="Account Holder Name"/>
<label>Account Type</label>
<select className="inputOnboard"  placeholder="Buisness Account"> 
<option>
    - Account Type -
</option>
<option>
   Buisness
</option>
<option>
   Individual
</option>
</select>
<label>Routing Number</label>
<input className="inputOnboard" name="routing" onChange={handleChange} placeholder="Routing Number"/>
<label>Account Number</label>
<input className="inputOnboard" name="account" onChange={handleChange} placeholder="Account Number"/>
<p className="tiny">Personal data is handled with industry standard encryption to keep information secure. Shipslices uses a PCI complaint payment provider for all transactions.<img className="lock"src={lock}/></p>
<button onClick={handleAddPerson}>Next</button>

</>}

{person && <>

<h4>Main Contact</h4>
   <div> 
                                Are you the business owner?
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

                      
<label>Contact Name</label>
<input className="inputOnboard" onChange={handleChange} name="title" placeholder="Your Title"/>
<label>Title</label>
<input className="inputOnboard" onChange={handleChange} name="contactPhone" placeholder="Phone"/>
<label>Email</label>
<input className="inputOnboard" onChange={handleChange} name="contactEmail" placeholder="Email"/>
<label>Last 4 SSN</label>
<input className="inputOnboard" type="password" onChange={handleChange} name="last4" placeholder="Last 4 SSN"/>
<br/>
<h4>Address</h4> <div className="row-wrap"><p>Same as business address</p><input className="vert" type="checkbox" checked/></div>
{same && <>

<label>Street Name</label>
<input className="inputOnboard" onChange={handleChange} name="contactLine1" placeholder="Address Line 1"/>
<label>City</label>
<input className="inputOnboard" onChange={handleChange} name="contactCity" placeholder="City"/>
<label>State</label>
<input className="inputOnboard" onChange={handleChange} name="contactState" placeholder="State"/>
<label>Zip</label>
<input className="inputOnboard" onChange={handleChange} name="contactZip" placeholder="Zip"/>
</>

            
}
      
<button onClick={handleAddDoc}>Next</button>

</>}

{document && <>
    <label>Upload ID</label>
{document === true ? <>Hi</> : <> Nh</>}
<p className="tiny">ShipSlices requires an image of a State issued I.D or Drivers License of the account representitive.</p>
<fieldset className="inputOnboard">
   
              <input type="file" id="file" className="field" onChange={handleFileChange} />
               
            </fieldset>
            <button onClick={handleSubmitDoc}>Next</button>

</>}

                        {checkout && <>
                            <h1>Start Selling Nationally</h1>
                
                            <h1 className="big">$16<span className="lill">per month</span></h1>
                            <h2>✔ Unlimited Product posts</h2>
                            <h2>✔ Fedex Shipping solutions</h2>
                            <h2>✔ Accept Online Payments</h2>
                            <h2>✔ Ship Nationwide</h2>
                            <h2>✔ 24/7 email support</h2>

                           
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
