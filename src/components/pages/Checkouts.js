import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../services/appApi";
import { useAddAddressMutation } from "../../services/appApi";

import {   useRemoveFromCartMutation} from "../../services/appApi";
import CardInput from "./CardInput";
import  NotificationContext from "../../context/NotificationContext";
import { useContext } from "react";
function CheckoutForm() {
   
 
  const axiosPrivate = useAxiosPrivate();
    const stripe = useStripe();
    const elements = useElements();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
      const [removeFromCart, {loading}] = useRemoveFromCartMutation()
    const [alertMessage, setAlertMessage] = useState("");
    const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation();
    const [addAddress, {  isAdded }] = useAddAddressMutation();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [nextPage, setNextPage] = useState("");
    const [show, setshow] = useState("");
    const [addressError, setAddressError] = useState(false)
    const [errState, setErrState] = useState(false);
    const [validAddress, setValidAddress] = useState({
      streetLine1: "",
      city:"",
    state: "", 
  zip : ""   })
    const [paying, setPaying] = useState(false);
    const [details, setDetails] = useState({
            contactName: "",
            phone: "",
        street: "",
        street2: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        id: user._id
        });

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
                    streetLines: [details.street],
                    city: details.city,
                    stateOrProvinceCode: details.state,
                    postalCode: details.zip,
                    countryCode: "US"
                  }
                }
              ]
            };
          
            try {
              const response = await axiosPrivate.post(`/verify-address`, checkAddress);
              ////console.log(response.data);
          
              if (response.data.customerMessages && response.data.customerMessages.length > 0) {
                setErrState(true);
                setAddressError(true)
              } else {
                const resolvedAddress = response.data;
                const { streetLinesToken, city, stateOrProvinceCode, postalCode } = resolvedAddress;
                setAddressError(false)
                setValidAddress({
                  streetLine1: streetLinesToken[0],
                  city: city,
                  state: stateOrProvinceCode,
                  zip: postalCode
                });
             
              
      
                        
      ////console.log(validAddress.streetLine1)
                if (validAddress.streetLine1 == "") {
              setAddressError(true)
            } 
               
              }
            } catch (error) {
              setAddressError(true);
              ////console.log(error);
            }
          };
        const { clearNotification, setSeller } = useContext(NotificationContext);
        const handleAddress = (e) => {
            setNextPage(true)
           
        }

        const handleChange = (e) => {
           const {name, value} = e.target
           setAddressError(false)
            setDetails((prev) => {
                return { ...prev, [name]: value}
            })
        }

////console.log( "hh", user.address.length)


const saveAddress = async (e) => {
  validateAddress();
    e.preventDefault();
   const post = axiosPrivate.post(`/user/address/${user._id}`, details)
   ////console.log(post)
   setNextPage(true)
  
}



    


  
    
    const handlePay = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
    
      const orderData = {
        userId: user._id,
        cart: user.cart,
        address: user.address,
      };
      const cartItems = Object.values(user.cart);
      const cart = cartItems.map((item) => {
        if (
          item.beforeShipping === undefined ||
          item.sellerId === undefined ||
          item.stripeId === undefined ||
          item.total === undefined
        ) {
          return null; // Skip this item
        }
      
        return {
          amount: item.beforeShipping,
          sellerId: item.sellerId,
          listId: item.stripeId,
          total: item.total
        };
      }).filter((item) => item !== null); // Remove skipped items
      
      ////console.log(cart);
      

      ////console.log("Cart", cart)
    
      const orderInfo = {
        cart: cart,
        email: "riveraandrew830@gmail.com",
        payment_method: "card",
      };
    
      try {
        const res = await axiosPrivate.post("/process-orders", orderInfo);
        const clientSecrets = res.data.paymentIntents;
        ////console.log("Received client secrets:", clientSecrets); // Verify the client secrets array in the console
    
        for (const clientSecret of clientSecrets) {
          ////console.log("Confirming payment intent with client secret:", clientSecret);
          const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                email: user.email,
              },
            },
          });
    
          if (result.error) {
            // Handle payment error
            console.error(result.error);
            return false;
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "succeeded") {
              // Continue with successful payment
            } else {
              // Handle payment failure
              return false;
            }
          }
        }
    
        // All payments were successful
        const orderResponse = await axiosPrivate.post(`/orders/sellerId`, orderData);
        createOrder(orderData)
        const confirmationResponse = await axiosPrivate.post(`/confirm-order`, { email: user.email });
        ////console.log("Order response:", orderResponse.data);
        ////console.log("Confirmation response:", confirmationResponse.data);
        navigate("/success");
        await removeFromCart({ userId: user._id });
        setSeller(orderResponse.data);
      } catch (error) {
        ////console.log(error.message);
      }
    };
    
  

{/*
  

    ////console.log("addy", user)
*/ }
    return (
        <div >
            <form className="formCheck" onSubmit={handlePay}>
{!nextPage && 
<>
           {user.address.length < 1 ? <>
           
           
           <div>
                 <br/>

                    <h3>Ship to:</h3>
                    <div md={6}>
                        <div className="mb-3">
                            <label>Full Name</label>
                            <input name="contactName" className="inputOnboard" type="text" placeholder="Full Name" onChange={handleChange} value={user.contactName}  />
                        </div>
                    </div>
                  
                    <div md={6}>
                        <div className="mb-3">
                            <label>Phone</label>
                            <input name="phone" className="inputOnboard" type="text" placeholder="Phone" onChange={handleChange} value={user.phone}  />
                            </div>            </div>
                </div>
                <div>
                    <div md={7}>
                        <div className="mb-3">
                        <label>Address</label>
                            <input className={`inputOnboard ${addressError ? 'error-input' : ''}`} type="text" placeholder="Address" name="street" onChange={handleChange} required />
                            <label>Address (Apt #, PO BOX)</label>
                            <input className={`inputOnboard ${addressError ? 'error-input' : ''}`} type="text" placeholder="Address" name="street2" onChange={handleChange} required />
                        </div>
                        
                    </div>
                    <div md={5}>
                        <div className="mb-3">
                            <label>City</label>
                            <input  className={`inputOnboard ${addressError ? 'error-input' : ''}`} type="text" placeholder="City" name="city" onChange={handleChange} required />
                        </div>
                    </div>
                    <div md={5}>
                        <div className="mb-3">
                        
                            <label>State</label>
<select className={`inputOnboard ${addressError ? 'error-input' : ''}`} name="state" onChange={handleChange}>
      {stateOptions.map((state) => (
        <option key={state.value} value={state.value}>
          {state.label}
        </option>
      ))}
    </select>
                        </div>
                    </div>
                    <div md={5}>
                        <div className="mb-3">
                            <label>Country</label>
                            <input  className={`inputOnboard ${addressError ? 'error-input' : ''}`} type="text" placeholder="Country" name="country" onChange={handleChange} required />
                        </div>
                    </div>
                    <div md={5}>
                        <div className="mb-3">
                            <label>Zip</label>
                            <input  className={`inputOnboard ${addressError ? 'error-input' : ''}`} type="text" placeholder="Zip" name="zip" onChange={handleChange} required />
                        </div>
                    </div>
                    {validAddress?.streetLine1} {validAddress?.city} {validAddress?.state} {validAddress?.zip}
                    <div onClick={saveAddress} className="Save">Save</div>

                </div></>
                : <>
                     <h3>Ship To:</h3>
                {user.address.map((info, index) => {
                    return (
                        <div onClick={handleAddress} className="addressBox">
                           <b>{user?.contactName} || ""</b> 
                            <br/>
                             {info.street}
                             <br/>
                            {info.street2}
                            <br/>
                            {info.city}
                            <br/>
                            {info.state}
                            <br/>
                            {info.country}
                            <br/>
                            {info.zip}
                        </div>
                    )
                })}
    <div>Shipping: FREE {details?.state == "Hawaii" && <>$30</>}{details?.state == "Alaska" && <>$30</>}</div>
                <div className="Save">Add a Different Address</div>
                </>}
                </>
            }
{nextPage && <>
          <h3>Checkout</h3>
          <br/>
          <div className="wrap">
          Total:<div className="tots"> ${user.cart.total} | {user.cart.count} items </div>
          </div>
          <br/>
          <div className="wrap">
        <div className="min">Ship to:</div> 
                 
                        <div className="smaller">
                           <b>{user.contactName}</b> {user.address[0]?.street} {user.address[0]?.street2} {user.address[0]?.city} {user.address[0]?.state} {user.address[0]?.country} {user.address[0]?.zip}
                       {details?.street} {details?.street2} {details?.city} {details?.state} {details?.country} {details?.zip}
                        </div>
                
                 </div>
          <br/>
          <h3>Add Payment</h3>
          <br/>
                <label htmlFor="card-element">Card Info</label>
                <div className="border-box">
              <CardInput />
            </div>
            {user.address.address2}
                <div>Name on Card</div>
                <input className="inputOnboard60"/>
                <br/>
                {user.address.address}
                <button type="submit" disabled={user.cart.count <= 0 || paying || isSuccess}>
                    {paying ? "Processing..." : "Checkout"}
                </button>
             

</>}
            </form>

          
        </div>
    );
}

export default CheckoutForm;