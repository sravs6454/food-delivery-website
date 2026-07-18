/*import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {  

  const {url,setToken} = useContext(StoreContext);

    const [currState,setCurrState] = useState("Login")
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })


    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {

      event.preventDefault()
      let newUrl = url;
      if(currState==="Login"){
        newUrl += "/api/user/login"
      }
      else{
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl,data);
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);
      }
      else{
        alert(response.data.message);
      }
    }
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=' ' />
        </div>
        <div className='login-popup-inputs'>
            {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
            <input name='email' onChange={onChangeHandler} value={data.email} type = "email" placeholder='Your email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type = "password" placeholder='password' required />
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className='login-popup-condition'>
            <input type='Checkbox' required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"
        ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
*/


/*import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { auth, sendPasswordResetEmail } from "../../firebaseConfig";


const LoginPopup = ({ setShowLogin }) => {  
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = `${url}/api/user/${currState === "Login" ? "login" : "register"}`;

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  const onForgotPassword = async () => {
    if (!resetEmail) {
      alert("Please enter your email to reset password.");
      return;
    }

    const response = await axios.post(`${url}/api/user/forgot-password`, { email: resetEmail });
    alert(response.data.message);
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{forgotPassword ? "Reset Password" : currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>

        {!forgotPassword ? (
          <>
            <div className="login-popup-inputs">
              {currState === "Sign Up" && (
                <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />
              )}
              <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
              <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
            </div>

            /* Forgot Password placed above Login Button 
            {currState === "Login" && (
              <p className="forgot-password-text" onClick={() => setForgotPassword(true)}>Forgot Password?</p>
            )}

            <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>

            <div className="login-popup-condition">
              <input type="checkbox" required />
              <p>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
            </div>

            {currState === "Login" ? (
              <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
            )}
          </>
        ) : (
          <>
            <div className="login-popup-inputs">
              <input
                name="resetEmail"
                onChange={(e) => setResetEmail(e.target.value)}
                value={resetEmail}
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <button type="button" onClick={onForgotPassword}>Reset Password</button>
            <p onClick={() => setForgotPassword(false)} className="back-to-login">Back to Login</p>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
*/1



/*
import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { auth } from "../../firebase"; // ✅ Import auth from firebase.js
import { sendPasswordResetEmail } from "firebase/auth"; // ✅ Import separately

const LoginPopup = ({ setShowLogin }) => {  
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Login or Register API Call
  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    let newUrl = `${url}/api/user/${currState === "Login" ? "login" : "register"}`;

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Firebase Password Reset
  /*const onForgotPassword = async () => {
    if (!resetEmail) {
      alert("Please enter your email to reset the password.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent! Check your inbox.");
      setForgotPassword(false); // Switch back to login screen
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  //
  const onForgotPassword = async () => {
    if (!resetEmail) {
      alert("Please enter your email to reset the password.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent! Check your inbox.");
      setResetEmail(""); // Clear the input after sending email
      setForgotPassword(false); // Switch back to login screen
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
};

// Function to clear input when clicking "Back to Login"
const handleBackToLogin = () => {
    setForgotPassword(false);
    setResetEmail(""); // Clear input field
};


  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{forgotPassword ? "Reset Password" : currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>

        {!forgotPassword ? (
          <>
            <div className="login-popup-inputs">
              {currState === "Sign Up" && (
                <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />
              )}
              <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
              <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
            </div>

            {currState === "Login" && (
              <p className="forgot-password-text" onClick={() => setForgotPassword(true)}>Forgot Password?</p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : currState === "Sign Up" ? "Create Account" : "Login"}
            </button>

            <div className="login-popup-condition">
              <input type="checkbox" required />
              <p>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
            </div>

            {currState === "Login" ? (
              <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
            )}
          </>
        ) : (
          <>
            <div className="login-popup-inputs">
              <input
                name="resetEmail"
                onChange={(e) => setResetEmail(e.target.value)}
                value={resetEmail}
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <button type="button" onClick={onForgotPassword} disabled={loading}>
              {loading ? "Sending..." : "Reset Password"}
            </button>
            
            <p onClick={() => setForgotPassword(false)} className="back-to-login" style={{ cursor: "pointer" }}>
              Back to Login
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
*/2


import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const endpoint = currState === "Login" ? "login" : "register";
    const newUrl = `${url}/api/user/${endpoint}`;

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message || "Login/Register failed.");
      }
    } catch (error) {
      console.error("Auth Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onForgotPassword = async () => {
    if (!resetEmail) {
      alert("Please enter your email to reset the password.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent! Check your inbox.");
      setResetEmail("");
      setForgotPassword(false);
    } catch (error) {
      console.error("Reset Error:", error.message);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setForgotPassword(false);
    setResetEmail("");
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{forgotPassword ? "Reset Password" : currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>

        {!forgotPassword ? (
          <>
            <div className="login-popup-inputs">
              {currState === "Sign Up" && (
                <input
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                  type="text"
                  placeholder="Your name"
                  required
                />
              )}
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Your email"
                required
              />
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="Password"
                required
              />
            </div>

            {currState === "Login" && (
              <p className="forgot-password-text" onClick={() => setForgotPassword(true)}>Forgot Password?</p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : currState === "Sign Up" ? "Create Account" : "Login"}
            </button>

            <div className="login-popup-condition">
              <input type="checkbox" required />
              <p>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
            </div>

            {currState === "Login" ? (
              <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
            )}
          </>
        ) : (
          <>
            <div className="login-popup-inputs">
              <input
                name="resetEmail"
                onChange={(e) => setResetEmail(e.target.value)}
                value={resetEmail}
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <button type="button" onClick={onForgotPassword} disabled={loading}>
              {loading ? "Sending..." : "Reset Password"}
            </button>

            <p onClick={handleBackToLogin} className="back-to-login" style={{ cursor: "pointer" }}>
              Back to Login
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
