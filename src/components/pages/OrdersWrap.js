import React from 'react'
import Orders from './Orders'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const StripeWrap = () => {
    const stripePromise = loadStripe("pk_test_51LGwewJ0oWXoHVY4KaHYgICxXbe41zPhsxY9jYfVqgyEHK3oX4bwaoAvgXByAF2Ek2UAVZ0L6FjddQvAvBIMsB7t00fE5UAlwI");

  return (
    <Elements stripe={stripePromise}>
    <Orders/>
    </Elements>
  )
}

export default StripeWrap