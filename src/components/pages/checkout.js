import { PaymentElement } from "@stripe/react-stripe-js";
import React ,{ useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import ProductStore, { productsArray } from "./ProductStore"
import List from "./List"
import {useContext} from 'react'

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
 export default function Checkout() {
  


    const stripePromise = loadStripe("pk_live_51LGwewJ0oWXoHVY4hzmdZ1i4COqqKZ8PVlcoPHwL4lg6oAgqjEzR5EdVZXBrwjnToi3VfU9lT2vReJyVcRVuskDI00DovYoz0Y");
 


return (

    <Elements stripe={stripePromise}>
      <CheckoutForm/>
    </Elements>


    
  )
  
}