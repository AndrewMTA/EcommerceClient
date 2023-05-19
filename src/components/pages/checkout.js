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
  


    const stripePromise = loadStripe("pk_test_51LGwewJ0oWXoHVY4KaHYgICxXbe41zPhsxY9jYfVqgyEHK3oX4bwaoAvgXByAF2Ek2UAVZ0L6FjddQvAvBIMsB7t00fE5UAlwI");
 


return (

    <Elements stripe={stripePromise}>
      <CheckoutForm/>
    </Elements>


    
  )
  
}