import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import axios from "../../api/axios"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../services/appApi";
import {   useRemoveFromCartMutation} from "../../services/appApi";
import CardInput from "./CardInput";
function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
      const [removeFromCart, {loading}] = useRemoveFromCartMutation()
    const [alertMessage, setAlertMessage] = useState("");
    const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [nextPage, setNextPage] = useState("");
    const [show, setshow] = useState("");
  
    const [paying, setPaying] = useState(false);
    const [details, setDetails] = useState({
            
        street: "",
        street2: "",
        city: "",
        state: "",
        country: "",
        zip: "",

        });



        const handleAddress = (e) => {
            setNextPage(true)
           
        }

        const handleChange = (e) => {
           const {name, value} = e.target
            setDetails((prev) => {
                return { ...prev, [name]: value}
            })
        }

console.log( "hh", user.address.length)



    const saveAddress = async (e) => {
        e.preventDefault();
       const post = axios.post(`http://localhost:3500/user/address/${user._id}`, details)
       console.log(post)
       setNextPage(true)
      
    }




    const getToken = (e) => {
        e.preventDefault()
        const response = axios.post('http://localhost:3500/orders/fedex', {

        grant_type: 'client_credentials',
        client_id: "l788aa739b8bf64ff09ef3ab09514ec0fa",
        client_secret: "83507d5ba01f481fa9220a2b502f566b"
      
      
      
        }, {
            headers: {
              'Access-Control-Allow-Origin': '*'
            }})

        console.log(response.data.access_token)
    }

console.log(user.address[0].street)
   const handlePay = async (e) => {

    e.preventDefault()
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
  
    
    const res = await axios.post("/process-payment", {
      email: user.email,
      amount: user.cart.total * 100,
      accountId: "acct_1NBayLR3TKOw16t6"
    });

    


    const clientSecret = res.data["client_secret"];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: user.email,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        console.log(orderData)
        createOrder(orderData);

        removeFromCart(orderData)
        console.log("Money baby");
        navigate("/success");
      
      }
    }
  };

{/*
    async function handlePay(e) {
        e.preventDefault();
        if (!stripe || !elements || user.cart.count <= 0) return;
        setPaying(true);
        const { client_secret } = await fetch("http://localhost:3500/create-payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ",
            },
            body: JSON.stringify({ amount: user.cart.total }),
        }).then((res) => res.json());
        const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });
        setPaying(false);

        if (paymentIntent) {
            createOrder({ userId: user._id, cart: user.cart, address, country }).then((res) => {
                if (!isLoading && !isError) {
                    setAlertMessage(`Payment ${paymentIntent.status}`);
                    setTimeout(() => {
                        // navigate("/orders");
                    }, 3000);
                }
            });
        }
    }

    console.log("addy", user)
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
                            <input className="inputOnboard"type="text" placeholder="First Name" value={user.name}  />
                        </div>
                    </div>
                  
                  
                </div>
                <div>
                    <div md={7}>
                        <div className="mb-3">
                        <label>Address</label>
                            <input className="inputOnboard" type="text" placeholder="Address" name="street" onChange={handleChange} required />
                            <label>Address</label>
                            <input className="inputOnboard" type="text" placeholder="Address" name="street" onChange={handleChange} required />
                            <label>Address (Apt #, PO BOX)</label>
                            <input className="inputOnboard" type="text" placeholder="Address" name="street2" onChange={handleChange} required />
                        </div>
                        
                    </div>
                    <div md={5}>
                        <div className="mb-3">
                            <label>City</label>
                            <input  className="inputOnboard" type="text" placeholder="City" name="city" onChange={handleChange} required />
                        </div>
                    </div>
                    <div md={5}>
                        <div className="mb-3">
                            <label>State</label>
                            <input  className="inputOnboard" type="text" placeholder="State" name="state" onChange={handleChange} required />
                        </div>
                    </div>
                    <div md={5}>
                        <div className="mb-3">
                            <label>Country</label>
                            <input  className="inputOnboard" type="text" placeholder="Country" name="country" onChange={handleChange} required />
                        </div>
                    </div>
                    <div md={5}>
                        <div className="mb-3">
                            <label>Zip</label>
                            <input  className="inputOnboard" type="text" placeholder="Zip" name="zip" onChange={handleChange} required />
                        </div>
                    </div>

                    <div onClick={saveAddress} className="Save">Save</div>

                </div></>
                : <>
                     <h3>Ship To:</h3>
                {user.address.map((info, index) => {
                    return (
                        <div onClick={handleAddress} className="addressBox">
                           <b>Bob Dylan</b> 
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
                           <b>Bob Dylan</b>   
                            {user.address[0].street}
                            {user.address[0].street2}
                            {user.address[0].city}
                            {user.address[0].state}
                            {user.address[0].country}
                            {user.address[0].zip}
                       {details.street} {details.street2} {details.city} {details.state} {details.country} {details.zip}
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