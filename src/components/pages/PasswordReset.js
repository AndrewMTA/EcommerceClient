import React, {useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import "../../styles/Onboarding.css"
import Navbar from "../Navbar";


    const Packages = () => {
      const [fail, seFail] = useState(false)
      const [success, setSuccess] = useState(false)
      const [password, setPassword] = useState("")
      const resetToken = useParams()

      const [confirmPassword, setConfirmPassword] = useState("");
      const [error, setError] = useState("");


     
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };


        if (password !== confirmPassword) {
          setPassword("");
          setConfirmPassword("");
          setTimeout(() => {
            setError("");
          }, 5000);
          return setError("Passwords don't match");
        }

        try {
          const { data } = await axios.put(`https://backend-6olc.onrender.com/user/resetpassword/${resetToken.resetToken}`,
          {
            password,
          },
          config
        );
  
        ////console.log(data);
        setSuccess(data.data);
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };


      return (
        <>
        <Navbar/>
      
        <div className="wrapping">
   
<form onSubmit={handleSubmit }className="reset">
<h1>Reset Password</h1>

{error && <span className="error-message">{error} </span>}
        {success && (
          <span className="success-message">
            {success} <>Login</>
          </span>
        )}


<br/>
<p></p>
<input onChange={(e) => {setPassword(e.target.value)}}placeHolder='Enter a new password' type="password"className="inputOnboard"/>

<input
            type="password"
            required
            className="inputOnboard"
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <br/>

<button className="selectbtn">Submit</button>
</form>


        </div>
        </>
      )
    }
    
    export default Packages