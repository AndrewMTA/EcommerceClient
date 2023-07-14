import { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";


const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "https://pizzaserver.onrender.comuser/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (

    <>
         <Navbar/>
    <div className="forgotpassword">
 
      <div className="reset-p">
      <form className="form"
        onSubmit={forgotPasswordHandler}
       
      >
        <div className="bg-form">
        <h2 className="white">Forgot Password?</h2>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
            <br/>
          <p className="white">
            Email support@shipslices.com to get a password reset link.
          </p>
<br/>
{/** 
<div className="inputWrap">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            id="email"
            className="inputOnboard"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>*/}
        </div>{/** 
        <button type="submit"className="select">
          Send Email
        </button>*/}
        </div>
      </form>
      </div>
    </div>
    </>
  );
};

export default ForgotPasswordScreen;