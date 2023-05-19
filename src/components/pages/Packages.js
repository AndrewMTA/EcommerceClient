import React from "react";

import Confetti from 'react-confetti'
import "../styles/Onboarding.css"


    const Success= () => {
      
      
      const { width, height } = useWindowSize()
      
      return (
<>

<Confetti
      width={width}
      height={height}
      tweenDuration={3000}
    />
</>
      )
    }
    
    export default Success