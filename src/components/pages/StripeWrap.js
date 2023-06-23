    import React from 'react'
    import Register from '../Register'
    import {Elements} from '@stripe/react-stripe-js';
    import {loadStripe} from '@stripe/stripe-js';
    const StripeWrap = () => {
        const stripePromise = loadStripe("pk_live_51LGwewJ0oWXoHVY4hzmdZ1i4COqqKZ8PVlcoPHwL4lg6oAgqjEzR5EdVZXBrwjnToi3VfU9lT2vReJyVcRVuskDI00DovYoz0Y");

      return (
        <Elements stripe={stripePromise}>
        <Register/>
        </Elements>
      )
    }
    
    export default StripeWrap