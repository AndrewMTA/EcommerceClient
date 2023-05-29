    import React from 'react'
    import Register from '../Register'
    import {Elements} from '@stripe/react-stripe-js';
    import {loadStripe} from '@stripe/stripe-js';
    const StripeWrap = () => {
        const stripePromise = loadStripe("pk_test_51LGwewJ0oWXoHVY4KaHYgICxXbe41zPhsxY9jYfVqgyEHK3oX4bwaoAvgXByAF2Ek2UAVZ0L6FjddQvAvBIMsB7t00fE5UAlwI");

      return (
        <Elements stripe={stripePromise}>
     <Register/>
        </Elements>
      )
    }
    
    export default StripeWrap