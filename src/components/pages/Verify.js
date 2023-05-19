import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const Verify = () => {
     const [success, setSuccess] = useState()
    const randomNum = useParams()
    const id = useParams()



    console.log("num", randomNum)
    useEffect( () => 
        {
    const res = axios.put(`http://localhost:3500/register/verify/${randomNum.randomNum}`)


 if (res.err) {
    
        console.log(res.err);
      } else  {
      setSuccess(true) 
      }
    }
    
     )
  return (
  
<>
{

    success === true ? (<>
      <form className="form">
        <div className='lil'>
        <h1>Success</h1>
        <br/>
        <p>Account Verified</p>
             <a  href={"/login"}>    <div className="login">Login</div></a>  
                   </div>
                    </form>
    </>) : <> 
    something went wrong, resend email</>

}
   
</>
  )
}

export default Verify