import React, { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Form1";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {

  
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  


const content= (
  <>

 

<h1>ghyh</h1>

</>
)
  return (
 content
  );
}

export default Payment;
