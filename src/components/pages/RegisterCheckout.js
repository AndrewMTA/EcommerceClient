    import React from 'react'
    import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
    import CardInput from "./CardInput";
    import {Elements} from '@stripe/react-stripe-js';
    import {loadStripe} from '@stripe/stripe-js';



    const RegisterCheckout = () => {

        const stripePromise = loadStripe("pk_test_51LGwewJ0oWXoHVY4KaHYgICxXbe41zPhsxY9jYfVqgyEHK3oX4bwaoAvgXByAF2Ek2UAVZ0L6FjddQvAvBIMsB7t00fE5UAlwI");

      return (

        
<Elements stripe={stripePromise}>
        <div className="border-box-1">
      <CardInput/>
        </div>
        </Elements>
      )
    }
    
    export default RegisterCheckout