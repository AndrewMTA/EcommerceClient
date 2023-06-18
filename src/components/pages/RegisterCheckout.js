    import React from 'react'
    import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
    import CardInput from "./CardInput";
    import {Elements} from '@stripe/react-stripe-js';
    import {loadStripe} from '@stripe/stripe-js';



    const RegisterCheckout = () => {

        const stripePromise = loadStripe("pk_live_51LGwewJ0oWXoHVY4hzmdZ1i4COqqKZ8PVlcoPHwL4lg6oAgqjEzR5EdVZXBrwjnToi3VfU9lT2vReJyVcRVuskDI00DovYoz0Y");

      return (

        
<Elements stripe={stripePromise}>
        <div className="border-box-1">
      <CardInput/>
        </div>
        </Elements>
      )
    }
    
    export default RegisterCheckout