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
import GooglePlacesAutocomplete from 'react-google-autocomplete';

// const REGISTER_URL = 'https://backend-6olc.onrender.com/register';
const REGISTER_URL = `/register`;
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
    const [errState, setErrState] = useState(false);
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
    const [personNum, setPersonNum] = useState("")
    const stripe = useStripe();
    const elements = useElements();
    const [bankInfo, setBankInfo] = useState(false)
    const [person, setPerson] = useState(false)
    const [addressError, setAddressError] = useState(false)
    const [validAddress, setValidAddress] = useState({
      streetLine1: "",
      city:"",
    state: "", 
  zip : ""   })
    const [addAddress, setAddAddress] = useState(false)

    const [data, setData] = useState({
        email: "",
        companyName: "",
        phone: "",
        phoneContact: "",
        taxid: "",
        website: "",
        routing: "",
        account: "",
        nameOnAccount: "",
        firstName:"",
        lastName:"",
          line1: "",
          city: "",
          state: "",
          zip: "",
          contactLine1: "",
          contactCity: "",
          contactState: "",
          contactZip: "",
        contactEmail: "",
        firstName: "",
        lastName: "",
        contactPhone: "",
        title: "",
        last4: "",

        emailCOntact: "",
      });


      
     
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
    const handleAddDoc = (e) => {
        e.preventDefault()
        setPerson(false)
        setDocument(true)
    }
  
    //console.log(data)


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
            //console.log(piiToken);
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

    const fileInputRef = useRef(null);

    const handleSubmitDoc = async (event) => {
      event.preventDefault();
      setPerson(false);
      setCheckout(true);
      setDocument(false);
     
      const file = fileInputRef.current.files[0];
      //console.log(file);
      
      if (file) {
        const fileId = await uploadDocument(file);
        const person = personNum;
        const account = accountNum;
        updatePerson(person, account, fileId);
        setDocument(false);
      } else {
        //console.log("No file selected");
      }
    };
    const handleResend = async (e) => {
        e.preventDefault();


        try {

            const response = await axios.put(`/register/resend`,
                JSON.stringify({ email: data.email, randomNum }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                },




            );
            // TODO: remove //console.logs before deployment

            //console.log(JSON.stringify(response?.data));
            ////console.log(JSON.stringify(response))
            setSuccess2(true);


            //console.log("peanutz")



        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email Taken');
            } else {
             //console.log("")
            }
            errRef.current.focus();
        }
    }

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressError(false)
        if (name === "phone" || name === "phoneContact") {
          const formattedNumber = value.replace(/\D/g, ""); // Remove non-digit characters
      
          let formattedPhoneNumber = "";
      
          for (let i = 0; i < formattedNumber.length; i++) {
            if (i > 0 && i % 3 === 0 && i < 7) {
              formattedPhoneNumber += " ";
            }
            formattedPhoneNumber += formattedNumber.charAt(i);
          }
      
          if (formattedPhoneNumber.length <= 12) {
            setData((prev) => ({ ...prev, [name]: formattedPhoneNumber }));
          } else {
            setData((prev) => ({ ...prev, [name]: formattedPhoneNumber.slice(0, 12) }));
          }
        }else if (name === "taxid") {
            const formattedTaxId = value.replace(/\D/g, "").slice(0, 9); // Remove non-digit characters and limit to 12 characters
        
            let formattedTaxIdNumber = "";
        
            for (let i = 0; i < formattedTaxId.length; i++) {
              if (i === 2) {
                formattedTaxIdNumber += "-";
              }
              formattedTaxIdNumber += formattedTaxId.charAt(i);
            }
        
            setData((prev) => ({ ...prev, [name]: formattedTaxIdNumber }));
          }  else {
            setData((prev) => ({ ...prev, [name]: value }));
          }
        };
      
      
        const updatedAddress = {
          street: data.line1,
           city: data.city,
           state: data.state,
           zip: data.zip,
         }
console.log("UPDATED", updatedAddress)

    const handlePayment = async () => {
      console.log("PAY");

                            if (!stripe || !elements) {
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
                                setErrMsg( "There was an issue with your payment. Payment Declined");
                                //console.log(result.error.message);
                              } else {
                                // The payment has been processed!
                                if (result.paymentIntent.status === "succeeded") {
                                  //console.log("Money baby");
                                const email = data.email
                                const sellerName = data.companyName
                                const phone = data.phone
                                const accountNum = accountNum
                              console.log("ACCOUNT", accountNum)
                             
                              axios.put(`/user/add-membership`,  ({updatedAddress, email, sellerName, accountNum, phone}),
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
createBankAccount()
    }

    async function createBankAccount() {
      const stripe = await stripePromise;
      let tokenId;
    
      try {
        const tokenResponse = await stripe.createToken('bank_account', {
          country: 'us',
          currency: 'USD',
          account_number: data.account,
          routing_number: data.routing,
          account_holder_type: 'company',
          account_holder_name: data.nameOnAccount
        });
    
        tokenId = tokenResponse.token.id;
        setBankToken(tokenId);
    
        if (tokenId) {
          try {
            const response = await axios.post(`/create-account`, { bankToken: tokenId, data });
            setAccountNum(response.data);
            console.log(response.data)
            if (response.data) {
              setPerson(true);
              setBankInfo(false);
            }
          } catch (error) {
            console.error('Error creating account:', error);
            setBankInfo(false);
            setSeller(true);
            setErrMsg("Something went wrong. Check your info and try again, or contact support.");
          }
        }
        else if (!tokenId)
         {setErrMsg("Something went wrong. Check your info and try again, or contact support.");

        }
      } catch (error) {
        console.error('Error creating token:', error);
        setErrMsg("Something went wrong. Check your info and try again, or contact support.");
      }
    }
    
      
console.log("NUM", accountNum)
      
const createPerson = async (e) => {
  e.preventDefault()
  try {
    const sellerTrue = true
    const res = await axios.post(`/create-person`, { data, accountNum });
    const response = await axios.post(REGISTER_URL,

      JSON.stringify({ email: data.email, pwd, randomNum , seller: sellerTrue}),
      {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      },




  );
    setPersonNum(res.data);
    //console.log("person", res.data);
    setPerson(false);
    setDocument(true);
  } catch (error) {
    setErrMsg('Something went wrong, Double check info and try again. Or Contact support');
  }
};

console.log("DATA",updatedAddress)
     
const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.set('purpose', 'identity_document');
  formData.set('file', file);

  try {
      //console.log("Sending file")
    const response = await fetch('https://files.stripe.com/v1/files', {
      method: 'POST',
      headers: {
        Authorization: `Bearer pk_test_51LGwewJ0oWXoHVY4KaHYgICxXbe41zPhsxY9jYfVqgyEHK3oX4bwaoAvgXByAF2Ek2UAVZ0L6FjddQvAvBIMsB7t00fE5UAlwI`,
      },
       
      body: formData,
    });

    const data = await response.json();
    //console.log(data);
    //console.log(data.id);
    return data.id;
  } catch (error) {
    console.error(error);
  }
};

const updatePerson = async (person, account, fileId, ) => {
  try {
    const response = await fetch('https://andrewmta-cautious-space-spoon-57667qxr4j524x69-3500.preview.app.github.dev/update-person-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        person,
        account,
        file: fileId,
        sellerName: data.companyName,
        email: data.email
      }),
    });

    const data = await response.json();
    //console.log(data);
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
    const stateOptions = [
      { value: 'AL', label: 'Alabama' },
      { value: 'AK', label: 'Alaska' },
      { value: 'AZ', label: 'Arizona' },
      { value: 'AR', label: 'Arkansas' },
      { value: 'CA', label: 'California' },
      { value: 'CO', label: 'Colorado' },
      { value: 'CT', label: 'Connecticut' },
      { value: 'DE', label: 'Delaware' },
      { value: 'FL', label: 'Florida' },
      { value: 'GA', label: 'Georgia' },
      { value: 'HI', label: 'Hawaii' },
      { value: 'ID', label: 'Idaho' },
      { value: 'IL', label: 'Illinois' },
      { value: 'IN', label: 'Indiana' },
      { value: 'IA', label: 'Iowa' },
      { value: 'KS', label: 'Kansas' },
      { value: 'KY', label: 'Kentucky' },
      { value: 'LA', label: 'Louisiana' },
      { value: 'ME', label: 'Maine' },
      { value: 'MD', label: 'Maryland' },
      { value: 'MA', label: 'Massachusetts' },
      { value: 'MI', label: 'Michigan' },
      { value: 'MN', label: 'Minnesota' },
      { value: 'MS', label: 'Mississippi' },
      { value: 'MO', label: 'Missouri' },
      { value: 'MT', label: 'Montana' },
      { value: 'NE', label: 'Nebraska' },
      { value: 'NV', label: 'Nevada' },
      { value: 'NH', label: 'New Hampshire' },
      { value: 'NJ', label: 'New Jersey' },
      { value: 'NM', label: 'New Mexico' },
      { value: 'NY', label: 'New York' },
      { value: 'NC', label: 'North Carolina' },
      { value: 'ND', label: 'North Dakota' },
      { value: 'OH', label: 'Ohio' },
      { value: 'OK', label: 'Oklahoma' },
      { value: 'OR', label: 'Oregon' },
      { value: 'PA', label: 'Pennsylvania' },
      { value: 'RI', label: 'Rhode Island' },
      { value: 'SC', label: 'South Carolina' },
      { value: 'SD', label: 'South Dakota' },
      { value: 'TN', label: 'Tennessee' },
      { value: 'TX', label: 'Texas' },
      { value: 'UT', label: 'Utah' },
      { value: 'VT', label: 'Vermont' },
      { value: 'VA', label: 'Virginia' },
      { value: 'WA', label: 'Washington' },
      { value: 'WV', label: 'West Virginia' },
      { value: 'WI', label: 'Wisconsin' },
      { value: 'WY', label: 'Wyoming' },
    ];
    
    const validateAddress = async () => {
      const checkAddress = {
        addressesToValidate: [
          {
            address: {
              streetLines: [data.line1],
              city: data.city,
              stateOrProvinceCode: data.state,
              postalCode: data.zip,
              countryCode: "US"
            }
          }
        ]
      };
    
      try {
        const response = await axios.post(`/verify-address`, checkAddress);
        //console.log(response.data);
    
        if (response.data.customerMessages && response.data.customerMessages.length > 0) {
          setErrState(true);
          setAddressError(true)
        } else {
          const resolvedAddress = response.data;
          const { streetLinesToken, city, stateOrProvinceCode, postalCode } = resolvedAddress;
    
          setValidAddress({
            streetLine1: streetLinesToken[0],
            city: city,
            state: stateOrProvinceCode,
            zip: postalCode
          });
          setAddressError(false)
          setErrState(false);
          setBankInfo(true)

                    setSeller(null)
//console.log(validAddress.streetLine1)
          if (validAddress.streetLine1 == "") {
        setAddressError(true)
      } 
         
        }
      } catch (error) {
        setAddressError(true);
        //console.log(error);
      }
    };
    //console.log(validAddress.streetLine1)

    const handleError = () => {
      if (validAddress.streetLine1 == "") {
        setAddressError(true)
      } else {
        setAddressError(true)
      }
    }
    //console.log(validAddress.streetLine1)

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("pot")
        if (selectedOption === 'no') {

            try {

                const response = await axios.post(REGISTER_URL,
                    JSON.stringify({ email: data.email, pwd, randomNum }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    },




                );
                // TODO

         
                ////console.log(JSON.stringify(response))
                setSuccess(true);

                setPwd('');
                setMatchPwd('');




            }
            catch (err) {
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 409) {
                    setErrMsg('Email Taken');
                }
                errRef.current.focus();
            }
        }


        else if (selectedOption === 'yes') {
            setSeller(true)
            //console.log("Yeah")
            console.log("YEAH")
            if (data.website !== '') {
              console.log("READY")
                setSelectedOption('')
               


                try {

                    const response = await axios.post(`/register/seller`,
                        JSON.stringify({ email: data.email, pwd, randomNum, sellerName: data.companyName, accountNum , data}),
                        {
                            headers: { 'Content-Type': 'application/json' },
                            withCredentials: true   
                        },

                    );
   
    
                    //console.log(JSON.stringify(response?.data));
                
    
                    setPwd('');
                    setMatchPwd('');
 
    
validateAddress()
                
                        
              
    
                }
                catch (err) {
                    if (!err?.response) {
                        setErrMsg('No Server Response');
                    } else if (err.response?.status === 409) {
                        setErrMsg('Email Taken');
                    } 
                    errRef.current.focus();
                }

            }

         
          



        }






    }

    return (
        <>

{errState && <p style={{ color: 'red' }}>Double check address</p>}

            {success === true ? (
                <section className="form">

                          
                    <>
                        <h3>An email verification has been sent to  {data.email}. </h3> <br /> <> Double check your spam folder if you don't see it in your inbox. <br />

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

<label htmlFor="_pwd">
    Password:           
</label>
<input
    className="inputOnboard"
    type="password"
    id="password"
    onChange={(e) => setPwd(e.target.value)}
    value={pwd}
    required
    minLength={8}
    maxLength={28}
    pattern="^(?=.*\d).{8,28}$"
    onFocus={() => setPwdFocus(true)}
    onBlur={() => setPwdFocus(false)}
/>
<p className={pwdFocus && (!pwd || pwd.length < 8 || pwd.length > 28 || !/\d/.test(pwd)) ? "instruction" : "offscreen"}>

    Password must be between 8 and 28 characters and contain at least one number.     <FontAwesomeIcon icon={faInfoCircle} />
</p>

<label htmlFor="confirm_pwd">
    Confirm Password             
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
<p id="confirmnote" className={matchFocus && (!validMatch || matchPwd !== pwd) ? "instruction" : "offscreen"}>
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
                                        name="companyName"
                                        value={data.companyName}
                                        onChange={handleChange}
                                        required
                                 
                                    />
                                    <label htmlFor="confirm_pwd">
                                        Website

                                    </label>
                                    <input
                                    value={data.website}
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
                                        value={data.taxid}
                                        name="taxid"
                                        onChange={handleChange}
                                     required

                                    />


                                    <label htmlFor="confirm_pwd">
                                        Phone Number
                                    </label>
                                    <input
                                        className="inputOnboard"
                                        name="phone"
                                        value={data.phone}
                                        onChange={handleChange}
                                        required
                                    />
                           <br/>
                           <h4>Address</h4><input className="vert" type="checkbox" hidden checked/>


<label>Street Name</label>
<input   className={`inputOnboard ${addressError ? 'error-input' : ''}`} onChange={handleChange}     value={data.line1} name="line1" placeholder="Address Line 1"/>
<label>City</label>
<input   className={`inputOnboard ${addressError ? 'error-input' : ''}`} onChange={handleChange} name="city" value={data.city} placeholder="City"/>
<label>State</label>
<select   className={`inputOnboard ${addressError ? 'error-input' : ''}`} name="state"  value={data.state} onChange={handleChange}>
      {stateOptions.map((state) => (
        <option key={state.value} value={state.value}>
          {state.label}
        </option>
      ))}
    </select>
<label>Zip</label>
<input
value={data.zip} 
  className={`inputOnboard ${addressError ? 'error-input' : ''}`}
  onChange={handleChange}
  name="zip"
  placeholder="Zip"
/>
 
                                    <br />
                                    <div>
                                 
 {addressError && <p style={{ color: 'red' }}>Error occurred while validating address</p>}
                                    </div>

                                    <div className="button" onClick={validateAddress}>Next</div>

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
<input className="inputOnboard" onChange={handleChange} value={data.nameOnAccount} name="nameOnAccount"  placeholder="Account Holder Name"/>
 {/** <label>Account Type</label>
<select  className="inputOnboard"  placeholder="Buisness Account"> 
<option>
    - Account Type -
</option>
<option>
   Buisness
</option>
<option>
   Individual
</option>
</select> */}
<label >Routing Number</label>
<input  value={data.routing} className="inputOnboard" name="routing" onChange={handleChange} placeholder="Routing Number"/>
<label>Account Number</label>
<input  value={data.account} className="inputOnboard" name="account" onChange={handleChange} placeholder="Account Number"/>
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

                      
<label>First Name</label>
<input className="inputOnboard" onChange={handleChange} name="firstName" placeholder="First Name"/>
                     
<label>Last Name</label>
<input className="inputOnboard" onChange={handleChange} name="lastName" placeholder="Last Name"/>


<label>Title</label>
<input className="inputOnboard" onChange={handleChange} name="title" placeholder="Your title"/>
<label htmlFor="confirm_pwd">
                                        Phone Number
                                    </label>
                                    <input
                                        className="inputOnboard"
                                        name="phoneContact"
                                        value={data.phoneContact}
                                        onChange={handleChange}
                                        required
                                    />
<label>Email</label>
<input className="inputOnboard" onChange={handleChange} name="emailContact" placeholder="Email"/>

<label>Last 4 SSN</label>
<input
  className="inputOnboard"
  type="text"
  pattern="[0-9]{4}"
  maxLength="4"
  onChange={handleChange}
  name="last4"
  placeholder="Last 4 SSN"
  required
/>
     
<button onClick={createPerson}>Next</button>

</>}

{ document && <>
    <label>Upload ID</label>

<p className="tiny">ShipSlices requires an image of a State issued I.D or Drivers License of the account representitive.</p>
<fieldset className="inputOnboard">
      <input type="file" id="file" ref={fileInputRef} name="file" className="field" onChange={handleFileChange} />
    </fieldset>
            <button onClick={handleSubmitDoc}>Next</button>

</>}

                        {checkout && <>
                            <h1>Start Selling Nationally</h1>
                
                            <h1 className="big">$20<span className="lill">per month</span></h1>
                            <p className="tiny">+ 7.5% per product sold + 3% payment fee</p>
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

<br/>
                            <div  className="pay-button" onClick={handlePayment} >Checkout</div> 





                        </>
                        }
                    </form>

                </section>
            )}
        </>
    )
}

export default Register
