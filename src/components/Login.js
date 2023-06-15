import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from "../services/appApi";
import axios from '../api/axios';
import logo from "./pages/Frame 9.png"
 //const LOGIN_URL = 'https://backend-6olc.onrender.com/auth';
const LOGIN_URL = 'http://localhost:3500/auth';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/pizza";
    const [email, setEmail] = useState("");
    const userRef = useRef();
    const errRef = useRef();
    const [login, { isError, isLoading, error }] = useLoginMutation();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, pwd, roles, accessToken });
            login({ email, pwd });
            setUser('');
            setPwd('');
       


if (response?.data?.user?.sellerMembership === true) {
    navigate("/orders"); 
} else {
    navigate(from, { replace: true });
}
 
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }



    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <form onSubmit={handleSubmit}  className="form">

            <a className='navA'  href="/"><img src={logo} className="loge"/> </a>
       
<h1>Welcome Back</h1>
<label htmlFor="username">Email:</label>
                <input
                    className="inputOnboard"
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />


          
                <label htmlFor="password">Password:</label>
                <input
                     className="inputOnboard"
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
                <p>
                Need an Account? <Link to="/register">Sign Up</Link><br />
                <span className="line">
                <Link to="/forgotpassword">Forgot Password?</Link><br />
                </span>
            </p>
          
            </form>
          
        </section>

    )
}

export default Login
